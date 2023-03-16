package com.server.back.domain.study.repository;

import com.server.back.domain.study.entity.Dogam;
import com.server.back.domain.study.entity.DogamResult;
import com.server.back.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DogamResultRepository extends JpaRepository<DogamResult, Long> {
    DogamResult findByDogamAndUser(Dogam dogam, User user);
    List<DogamResult> findAllByUserOrderByDogamDesc(User user);
}
