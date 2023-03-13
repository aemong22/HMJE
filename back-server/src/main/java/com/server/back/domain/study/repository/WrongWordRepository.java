package com.server.back.domain.study.repository;

import com.server.back.domain.study.entity.Word;
import com.server.back.domain.study.entity.WrongWord;
import com.server.back.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WrongWordRepository extends JpaRepository<WrongWord, Long> {
    WrongWord findByWordAndUser(Word word, User user);
    List<WrongWord> findAllByUser(User user);
}
