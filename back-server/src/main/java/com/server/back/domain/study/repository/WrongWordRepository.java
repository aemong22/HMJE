package com.server.back.domain.study.repository;

import com.server.back.domain.study.entity.WrongWord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WrongWordRepository extends JpaRepository<WrongWord, Long> {
}
