package com.server.back.domain.user.repository;

import com.server.back.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUserId(Long userId); //유저의 pk
    User findByUsername(String username); //유저의 아이디
    User findByNickname(String nickname);
    User findByPhoneNumber(String phoneNumber);
}
