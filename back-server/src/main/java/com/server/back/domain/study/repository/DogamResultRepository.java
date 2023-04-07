package com.server.back.domain.study.repository;

import com.server.back.domain.study.entity.Dogam;
import com.server.back.domain.study.entity.DogamResult;
import com.server.back.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DogamResultRepository extends JpaRepository<DogamResult, Long> {
    DogamResult findByDogamAndUser(Dogam dogam, User user);
    List<DogamResult> findAllByUserOrderByDogamDesc(User user);
    @Query("select d.dogam.dogamId from DogamResult d where d.user=:user")
    List<Long> dogamlistfindByUserId(@Param("user") User user);
}
