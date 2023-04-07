package com.server.back.domain.study.repository;

import com.server.back.domain.study.entity.Word;
import com.server.back.domain.study.entity.WrongWord;
import com.server.back.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface WrongWordRepository extends JpaRepository<WrongWord, Long> {
    WrongWord findByWordAndUser(Word word, User user);
    List<WrongWord> findAllByUser(User user);

    @Query("select ww from WrongWord ww JOIN FETCH ww.word w WHERE w.wordRating = :filter and ww.user = :user")
    List<WrongWord> findAllByFilterAndUser(@Param("user") User user, @Param("filter") String filter);

}
