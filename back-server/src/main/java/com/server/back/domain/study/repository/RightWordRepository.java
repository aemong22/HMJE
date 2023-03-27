package com.server.back.domain.study.repository;

import com.server.back.domain.study.entity.RightWord;
import com.server.back.domain.study.entity.Word;
import com.server.back.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

public interface RightWordRepository extends JpaRepository<RightWord, Long> {
    RightWord findByWordAndUser(Word word, User user);
    List<RightWord> findAllByUser(User user);
    List<RightWord> findByUserAndCreatedAtAfterOrderByCreatedAtDesc(User user, LocalDateTime today);

    @Query("select distinct r.user from RightWord r where r.createdAt > :date")
    List<User> findByDate(@Param("date") LocalDateTime date);

    @Query("select rw from RightWord rw JOIN FETCH rw.word w WHERE w.wordRating = :filter and rw.user = :user")
    List<RightWord> findAllByFilterAndUser(@Param("user") User user, @Param("filter") String filter);
}
