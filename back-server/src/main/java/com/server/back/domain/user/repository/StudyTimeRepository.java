package com.server.back.domain.user.repository;

import com.server.back.domain.user.entity.StudyTime;
import com.server.back.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudyTimeRepository extends JpaRepository<StudyTime, Long> {
    List<StudyTime> findAllByUser(User user);
}
