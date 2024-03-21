//카드 맞추기 ,
import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getOne } from "../api/cardApi";
import StopMenu from "../components/Button/StopMenu";
import "./GuessCardPage.css";
const GuessCardPage = () => {
  const [answer, setAnswer] = useState([]);
  const location = useLocation();
  const { step, usedNumberCards, usedPictureCards } = location.state;
  const [card, setCard] = useState(null);
  const pickCnt = step === 1 ? 4 : step === 2 ? 7 : 9; //스텝에 따른 문제수
  const pickCards = [usedPictureCards, usedNumberCards];
  const [choice, setChoice] = useState(null);
  const [score, setScore] = useState(0); //점수
  const order = useRef(0);
  const pickIndex = Math.floor(Math.random() * pickCards.length); //랜덤으로 문제카드 구하기
  const otherIndex = pickIndex === 0 ? 1 : 0; //짝지 카드

  const pictureCards = [
    "가방",
    "강아지",
    "기타",
    "꽃",
    "연필",
    "우산",
    "주전자",
    "지구",
    "티켓",
    "편지",
    "폰",
    "풍선",
    "나무",
    "나비",
    "노트북",
    "비누",
    "사과",
    "사탕",
    "시계",
    "책",
    "카메라",
    "커피",
    "케익",
    "쿠키",
    "쿼카",
    "크레용",
    "토끼",
  ].filter((card) => card != pickCards[otherIndex][order.current]); //정답을 뺀 그림카드 전체 배열
  const numberCards = Array.from({ length: 10 }, (_, i) =>
    (i + 1).toString()
  ).filter((card) => card != pickCards[otherIndex][order.current]); //정답을 뺀 숫자카드 전체 배열
  const choicePictureCards = pictureCards.filter((card) => card != answer);
  const choiceNumberCards = numberCards.filter((card) => card != answer); //선택지에 갈 카드들, 정답 제외
  const otherChoice = pickIndex === 0 ? choiceNumberCards : choicePictureCards;
  const [choiceUrls, setChoiceUrls] = useState([]);

  //   useEffect(() => {
  const fetchCard = async () => {
    const imageUrl = await getOne(
      `${pickCards[pickIndex][order.current]}.png` //문제카드
    );
    setCard(imageUrl);
  };
  const handleCardClick = (clickedCard) => {
    if (clickedCard === answer) {
      console.log(answer);
      alert("정답입니다!");
      setScore((prevScore) => prevScore + 1); // 정답 카운트 상태 업데이트
      order.current++; // 다음 문제를 위해 order 업데이트
      setCard(null); // 카드 초기화
      setAnswer(null); // 정답 초기화
      // 다음 문제 카드 가져오기
      fetchCard();
    } else {
      console.log(answer);
      alert("틀렸습니다! 다시 골라보세요");
    }
  };

  // fetchCard();
  //   }, [usedNumberCards, usedPictureCards]);

  useEffect(() => {
    const fetchAnswer = async () => {
      const imageUrl = await getOne(
        `${pickCards[otherIndex][order.current]}.png` //정답카드
      );
      setAnswer(imageUrl);
    };
    fetchAnswer();
  }, [usedNumberCards, usedPictureCards]);
  useEffect(() => {
    fetchCard();
  }, [usedNumberCards, usedPictureCards]);

  const shuffle = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }; //Fisher-Yates 알고리즘
  const fiveCards = shuffle([...otherChoice].slice(0, 6));

  useEffect(() => {
    const fetchUrls = async () => {
      const fiveUrls = [];
      for (const card of fiveCards) {
        const url = await getOne(`${card}.png`);
        fiveUrls.push(url);
      }
      console.log(fiveUrls);
      return fiveUrls;
    };
    fetchUrls().then((fiveUrls) => {
      setChoiceUrls(fiveUrls);
    });
  }, []);
  console.log(choiceUrls);
  const shuffledCards = shuffle([answer, ...choiceUrls]);

  return (
    <div>
      <div className="step-info">
        {step}단계 게임 <StopMenu />
      </div>
      <div className="card-container">
        <div>
          <img className="match-card" src={card} alt="그림카드" />
        </div>
        <div>
          <div className="choices">
            {shuffledCards.slice(0, 3).map((card, index) => (
              <img
                key={index}
                className="choice-cards"
                src={card}
                alt="선택지 카드"
                onClick={() => handleCardClick(card)}
              />
            ))}
          </div>
          <div className="choices">
            {shuffledCards.slice(3, 6).map((card, index) => (
              <img
                key={index}
                className="choice-cards"
                src={card}
                alt="선택지 카드"
                onClick={() => handleCardClick(card)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuessCardPage;
