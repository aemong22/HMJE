package com.server.back.domain.user.repository;

import com.server.back.domain.user.entity.BadgeResult;
import com.server.back.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BadgeResultRepository extends JpaRepository<BadgeResult, Long> {

    List<BadgeResult> findByUser(User user); //유저의 pk
    @Query("select b.badge.badgeId from BadgeResult b where b.user=:user")
    List<Long> badgelistfindByUserId(@Param("user") User user);
}
