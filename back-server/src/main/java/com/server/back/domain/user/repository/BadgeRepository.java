package com.server.back.domain.user.repository;

import com.server.back.domain.user.entity.Badge;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BadgeRepository extends JpaRepository<Badge, Long> {
}
