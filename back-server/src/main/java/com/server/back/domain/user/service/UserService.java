package com.server.back.domain.user.service;


import com.server.back.domain.user.dto.UserRequestDto;

public interface UserService {
    void join(UserRequestDto requestDto);
    boolean userNicknameCheck(UserRequestDto requestDto);
    boolean userUsernameCheck(UserRequestDto requestDto);
    boolean userPhonenumberCheck(UserRequestDto requestDto);
}
