package com.server.back.domain.study.repository;

import com.server.back.domain.study.entity.Word;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WordRepository extends JpaRepository<Word, Long> {
    Word findByWordId(Long wordId);
}
