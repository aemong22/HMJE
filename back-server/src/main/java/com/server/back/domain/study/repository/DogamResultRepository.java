package com.server.back.domain.study.repository;

import com.server.back.domain.study.entity.Dogam;
import com.server.back.domain.study.entity.DogamResult;
import com.server.back.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DogamResultRepository extends JpaRepository<DogamResult, Long> {
    DogamResult findByDogamIdAndUserId(Dogam dogam, User user);
}
