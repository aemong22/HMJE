package com.server.back.domain.user.service;


import com.server.back.domain.user.dto.UserRequestDto;

public interface UserService {
    void join(UserRequestDto requestDto);
}
