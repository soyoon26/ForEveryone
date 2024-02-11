package org.zerock.bgapi.repository;

import static org.mockito.ArgumentMatchers.isNull;

import java.time.LocalDate;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.zerock.bgapi.domain.GuestBook;

import lombok.extern.log4j.Log4j2;
import java.util.Optional;

@SpringBootTest
@Log4j2
public class GuestBookRepositoryTests {
    @Autowired
    private GuestBookRepository guestbookRepository;

    @Test
    public void testInsert() {
        for (int i = 1; i <=12; i++){
            GuestBook guestbook = GuestBook.builder()
            .content("안녕하세요" + i)
            .dueDate(LocalDate.of(2024,02,10))
            .writer("사용자")
            .build();

            guestbookRepository.save(guestbook);
        }
    }
    
    @Test
    public void testRead() {
        Long no = 10L;

        java.util.Optional<GuestBook> result = guestbookRepository.findById(no);
        GuestBook guestbook = result.orElseThrow();
        log.info(guestbook);
    }
    @Test
    public void testModify() {
        Long no = 10L;

        Optional<GuestBook> result = guestbookRepository.findById(no); //java.util패키지의 Optional
        GuestBook guestbook = result.orElseThrow();
        guestbook.changeContent("수정되었습니다.");

        guestbookRepository.save(guestbook);
    } 
    @Test
    public void testDelete(){
        Long no = 1L;
        guestbookRepository.deleteById(no);
    } 
}
