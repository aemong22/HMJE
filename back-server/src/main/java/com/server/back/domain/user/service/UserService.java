package com.server.back.domain.user.service;


import com.server.back.domain.study.dto.StudyRequestDto;
import com.server.back.domain.study.dto.StudyTimeRequestDto;
import com.server.back.domain.user.dto.*;

import java.util.List;

public interface UserService {
    void join(UserRequestDto requestDto);
    void loginHistory(Long userId);
    boolean userNicknameCheck(UserRequestDto requestDto);
    boolean userUsernameCheck(UserRequestDto requestDto);
    UserResponseDto userInfo(Long userId);

    void userNicknameUpdate(Long userId, UserRequestDto requestDto);
    boolean changeInfo(Long userId, UserRequestDto requestDto);
    boolean changePassword(Long userId, ChangeRequestDto requestDto);
    boolean changePhonenumber(Long userId, ChangeRequestDto requestDto);
    List<BadgeResultResponseDto> myBadgeAll(Long userId);
    void uesrLogout(Long userId);
    void userDelete(Long userId);
    void updateBadge(Long userId, Long badgeId);
    void updateStudyResult(StudyRequestDto requestDto);
    void updateStudyExp(Long userId,Integer rightexp);
    void studyTime(StudyTimeRequestDto requestDto);
    StudyResponseDto mystudy(Long userId);
    List<MonthStudyResponseDto> monthstudy(Long userId, MonthStudyRequestDto requestDto);
    Integer levelup(Long userId);
    CompareResponseDto compare(Long userId);
}
