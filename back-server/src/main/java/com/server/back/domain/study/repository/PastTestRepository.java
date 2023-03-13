package com.server.back.domain.study.repository;

import com.server.back.domain.study.entity.PastTest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PastTestRepository extends JpaRepository<PastTest, Long> {
}
