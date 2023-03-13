package com.server.back.domain.user.repository;

import com.server.back.domain.user.entity.BadgeResult;
import com.server.back.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BadgeResultRepository extends JpaRepository<BadgeResult, Long> {
    List<BadgeResult> findByUser(User user); //유저의 pk
}
