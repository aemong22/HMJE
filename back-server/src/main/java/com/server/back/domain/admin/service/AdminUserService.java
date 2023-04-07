package com.server.back.domain.admin.service;

import com.server.back.domain.admin.dto.AdminUserResponseDto;
import com.server.back.domain.user.dto.UserRequestDto;
import com.server.back.domain.user.dto.UserResponseDto;

import java.util.List;

public interface AdminUserService {
    List<AdminUserResponseDto> adminAllUser();
    List<AdminUserResponseDto> adminUserList(String nickname);

    boolean adminUserUpdate(Long userId, UserRequestDto requestDto);

    boolean adminUserDelete(Long deleteId);
}
