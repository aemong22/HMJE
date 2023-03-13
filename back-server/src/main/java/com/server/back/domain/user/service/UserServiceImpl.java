package com.server.back.domain.user.service;

import com.server.back.common.entity.RefreshToken;
import com.server.back.common.repository.RefreshTokenRepository;

import com.server.back.domain.study.dto.StudyRequestDto;
import com.server.back.domain.user.dto.BadgeResultResponseDto;
import com.server.back.domain.user.dto.UserRequestDto;
import com.server.back.domain.user.dto.UserResponseDto;
import com.server.back.domain.user.entity.Badge;
import com.server.back.domain.user.entity.BadgeResult;
import com.server.back.domain.user.entity.User;
import com.server.back.domain.user.repository.BadgeRepository;
import com.server.back.domain.user.repository.BadgeResultRepository;
import com.server.back.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.server.back.domain.user.dto.BadgeResultResponseDto.MyBadgeResultList;

@RequiredArgsConstructor
@Transactional
@Service
public class UserServiceImpl implements UserService {
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;
    private final BadgeRepository badgeRepository;
    private final BadgeResultRepository badgeresultRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public void join(UserRequestDto requestDto) {
        User user = User.builder()
                .username(requestDto.getUsername())
                .password(bCryptPasswordEncoder.encode(requestDto.getPassword()))
                .nickname(requestDto.getNickname())
                .phoneNumber(requestDto.getPhoneNumber())
                .level(0)
                .exp(0)
                .todaysemo(0)
                .todayRight(0)
                .todayWrong(0)
                .isAdmin(requestDto.getIsAdmin())
                .isSecession(requestDto.getIsSecession())
                .build();

        userRepository.save(user);
    }

    @Override
    public boolean userNicknameCheck(UserRequestDto requestDto) {
        System.out.println("requestDto-nickname///////////////"+requestDto);
        int count = 0;
        for (User r : userRepository.findAll()) {
            if (r.getNickname().equals(requestDto.getNickname())){
                count += 1;
            }
        }
        if (count == 0) {
            return true;
        }
        return false;
    }
    @Override
    public boolean userUsernameCheck(UserRequestDto requestDto) {
        System.out.println("requestDto-username///////////////"+requestDto);
        int count = 0;
        for (User r : userRepository.findAll()) {
            if (r.getUsername().equals(requestDto.getUsername())){
                count += 1;
            }
        }
        if (count == 0) {
            return true;
        }
        return false;
    }

    @Override
    public UserResponseDto userInfo(Long userId) {
        User entity = userRepository.findByUserId(userId);
        UserResponseDto responseDto = new UserResponseDto(entity);
        return responseDto;
    }
    @Override
    public void userUpdate(Long userId, UserRequestDto requestDto){
        User entity = userRepository.findByUserId(userId);
        entity.update(requestDto);
    }
    @Override
    public List<BadgeResultResponseDto> userBadge(Long userId) {
        User user = userRepository.findByUserId(userId);
        List<BadgeResult> badgeresult = badgeresultRepository.findByUser(user);
        return MyBadgeResultList(badgeresult);
    }
    @Override
    public void userDelete(Long userId){
        User user = userRepository.findByUserId(userId);
        RefreshToken token = refreshTokenRepository.findRefreshTokenById(user.getJwtRefreshToken().getId());
//        refreshTokenRepository.delete(token);
//        user.logout();
        user.userdelete();
    }
    @Override
    public void updateBadge(Long userId, Long badgeId){
        User user = userRepository.findByUserId(userId);
        Badge badge = badgeRepository.findByBadgeId(badgeId);
        user.updateBadge(badge);
    }
    @Override
    public void updateStudyResult(StudyRequestDto requestDto){
        Integer wrongCount = requestDto.getWrongIdList().size();
        Integer rightCount = requestDto.getRightIdList().size();
        User user = userRepository.findByUserId(requestDto.getUserId());
        user.updateResult(requestDto.getSemo(), wrongCount, rightCount);
    }
    @Override
    public void updateStudyExp(Long userId,Integer rightExp){
        User user = userRepository.findByUserId(userId);
        user.updateExp(rightExp);
    }
}