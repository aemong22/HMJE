package com.server.back.domain.user.repository;

import com.server.back.domain.user.entity.MyCharacter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MyCharacterRepository extends JpaRepository<MyCharacter, Long> {
}