import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { getOne } from "../api/cardApi";
import "./GameCard.css";

const GameNumber = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const step = parseInt(searchParams.get("step")); //정수로 바꿔줌
  const [fileData, setFileData] = useState(null); //링크
  const [pictureCard, setPictureCard] = useState(null);
  const [numberCard, setNumberCard] = useState(null);
  const [usedPictureCards, setUsedPictureCards] = useState([]); //사용된 그림 카드 배열
  const [usedNumberCards, setUsedNumberCards] = useState([]); //사용된 숫자 카드 배열
  const cnt = useRef(0);

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
  ]; //사용하지 않은 그림카드 배열
  const numberCards = Array.from({ length: 10 }, (_, i) => (i + 1).toString()); //사용하지 않은 숫자카드 배열

  useEffect(() => {
    const fetchPictureCard = async () => {
      //그림카드 비동기로 가져오기
      try {
        let randomPictureCard;
        do {
          //do-while 실행 뒤 조건 검사
          randomPictureCard =
            pictureCards[Math.floor(Math.random() * pictureCards.length)];
        } while (usedPictureCards.includes(randomPictureCard));
        //랜덤그림카드 구하기
        setUsedPictureCards((prevUsedPictureCards) => [
          ...prevUsedPictureCards,
          randomPictureCard,
        ]);
        //사용한 그림카드에 넣기, 불변성을 위해
        const imageUrl = await getOne(`${randomPictureCard}.png`);
        console.log(imageUrl, "그림카드");
        setPictureCard(imageUrl);
      } catch (error) {
        console.error("Error fetching picture card data:", error);
      }
    };

    const fetchNumberCard = async () => {
      //숫자카드 가져오기
      try {
        let randomNumberCard;
        do {
          randomNumberCard =
            numberCards[Math.floor(Math.random() * numberCards.length)];
        } while (usedNumberCards.includes(randomNumberCard));

        setUsedNumberCards((prevUsedNumberCards) => [
          ...prevUsedNumberCards,
          randomNumberCard,
        ]);

        const imageUrl = await getOne(`${randomNumberCard}.png`);
        console.log(imageUrl, "숫자카드");
        setNumberCard(imageUrl);
      } catch (error) {
        console.error("Error fetching number card data:", error);
      }
    };
    if (cnt.current < 3) {
      const intervalId = setInterval(() => {
        fetchPictureCard();
        fetchNumberCard();
        cnt.current++;
        console.log("씨이발", cnt.current);
      }, 3000);
      return () => clearInterval(intervalId);
    }
  }, [usedPictureCards, usedNumberCards]);

  return (
    <div>
      <p className="step-info">{step}단계 게임</p>

      <div className="card-container">
        {pictureCard && (
          <img className="match-card" src={pictureCard} alt="그림카드" />
        )}
        {numberCard && (
          <img className="match-card" src={numberCard} alt="숫자카드" />
        )}
      </div>
    </div>
  );
};

export default GameNumber;
