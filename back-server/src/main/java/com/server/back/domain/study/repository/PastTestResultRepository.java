package com.server.back.domain.study.repository;


import com.server.back.domain.study.entity.PastTest;
import com.server.back.domain.study.entity.PastTestResult;
import com.server.back.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface PastTestResultRepository extends JpaRepository<PastTestResult, Long> {
	List<PastTestResult> findAllByPastTestAndScoreGreaterThanEqual(PastTest pastTest, Integer score);
	PastTestResult findFirstByUserAndPastTest(User user, PastTest pastTest);

}
