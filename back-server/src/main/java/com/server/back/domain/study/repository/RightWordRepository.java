package com.server.back.domain.study.repository;

import com.server.back.domain.study.entity.RightWord;
import com.server.back.domain.study.entity.Word;
import com.server.back.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RightWordRepository extends JpaRepository<RightWord, Long> {
    RightWord findByWordAndUser(Word word, User user);
    List<RightWord> findAllByUser(User user);

    @Query("select rw from RightWord rw JOIN FETCH rw.word w WHERE w.wordRating = :filter and rw.user = :user")
    List<RightWord> findAllByFilterAndUser(@Param("user") User user, @Param("filter") String filter);

}
