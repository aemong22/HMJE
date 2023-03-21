package com.server.back.domain.study.repository;


import com.server.back.domain.study.entity.PastTestResult;
import org.springframework.data.jpa.repository.JpaRepository;


public interface PastTestResultRepository extends JpaRepository<PastTestResult, Long> {
}
