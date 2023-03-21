package com.server.back.domain.admin.service;

import com.server.back.common.entity.RefreshToken;
import com.server.back.common.repository.RefreshTokenRepository;
import com.server.back.domain.admin.dto.AdminUserResponseDto;
import com.server.back.domain.user.dto.UserRequestDto;
import com.server.back.domain.user.dto.UserResponseDto;
import com.server.back.domain.user.entity.User;
import com.server.back.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Transactional
@Service
public class AdminUserServiceImpl implements AdminUserService {
    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    @Override
    public List<AdminUserResponseDto> adminAllUser() {
        return userRepository.findAll().stream().map(o -> new AdminUserResponseDto(o)).collect(Collectors.toList());
    }

    @Override
    public List<AdminUserResponseDto> adminUserList(String nickname) {
        List<AdminUserResponseDto> responseList = new ArrayList<>();
        for(User user : userRepository.findAll()){
            if(user.getNickname().contains(nickname)) responseList.add(new AdminUserResponseDto(user));
        }
        return responseList;
    }

    @Override
    public boolean adminUserUpdate(Long userId, UserRequestDto requestDto) {
        User entity = userRepository.findByUserId(userId);
        if(entity == null) return false;

        entity.adminUpdate(requestDto);

        return true;
    }

    @Override
    public boolean adminUserDelete(Long deleteId) {
        User entity = userRepository.findByUserId(deleteId);

        if(entity == null) return false;

        // 탈퇴 로직
        RefreshToken token = refreshTokenRepository.findRefreshTokenById(entity.getJwtRefreshToken().getId());
        refreshTokenRepository.delete(token);
        entity.logout();
        entity.userdelete();

        return true;
    }
}
