package com.server.back.domain.user.repository;

import com.server.back.domain.user.entity.LoginHistory;
import com.server.back.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;


public interface LoginHistoryRepository extends JpaRepository<LoginHistory, Long> {
    List<LoginHistory> findByUserOrderByCreatedAtAsc(User user);
}