package com.server.back.domain.study.repository;

import com.server.back.domain.study.entity.RightWord;
import com.server.back.domain.study.entity.Word;
import com.server.back.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RightWordRepository extends JpaRepository<RightWord, Long> {
    RightWord findByWordAndUser(Word word, User user);
}
