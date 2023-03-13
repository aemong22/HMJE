package com.server.back.domain.study.repository;

import com.server.back.domain.study.entity.Word;
import com.server.back.domain.study.entity.WrongWord;
import com.server.back.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WrongWordRepository extends JpaRepository<WrongWord, Long> {
    WrongWord findByWordAndUser(Word word, User user);
}
