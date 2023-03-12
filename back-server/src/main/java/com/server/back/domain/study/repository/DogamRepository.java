package com.server.back.domain.study.repository;

import com.server.back.domain.study.entity.Dogam;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DogamRepository extends JpaRepository<Dogam, Long> {
    Dogam findDogamByDogamId(Long dogamId);
}
