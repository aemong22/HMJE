package com.server.back.domain.study.repository;

import com.server.back.domain.study.entity.PastQuestion;
import com.server.back.domain.study.entity.PastTest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface PastQuestionRepository extends JpaRepository<PastQuestion, Long> {
	List<PastQuestion> findAllByPastTest(PastTest pastTest);
}
