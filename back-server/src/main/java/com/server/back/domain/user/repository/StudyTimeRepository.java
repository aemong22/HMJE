package com.server.back.domain.user.repository;

import com.server.back.domain.user.entity.StudyTime;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudyTimeRepository extends JpaRepository<StudyTime, Long> {

}
