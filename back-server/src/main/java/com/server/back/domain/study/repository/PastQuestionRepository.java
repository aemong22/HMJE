package com.server.back.domain.study.repository;

import com.server.back.domain.study.entity.PastQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PastQuestionRepository extends JpaRepository<PastQuestion, Long> {
}
