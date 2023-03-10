package com.server.back.domain.user.service;

import com.server.back.domain.message.dto.MessageDto;
import com.server.back.domain.user.dto.BadgeResponseDto;
import com.server.back.domain.user.dto.UserRequestDto;
import com.server.back.domain.user.dto.UserResponseDto;
import com.server.back.domain.user.entity.BadgeResult;
import com.server.back.domain.user.entity.User;
import com.server.back.domain.user.repository.BadgeResultRepository;
import com.server.back.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.server.back.domain.user.dto.BadgeResponseDto.MyBadgeResultList;

@RequiredArgsConstructor
@Transactional
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
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
                .semo(0)
                .totalTime(0)
                .totalRight(0)
                .totalWorng(0)
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
    public List<BadgeResponseDto> userBadge(Long userId) {
        User user = userRepository.findByUserId(userId);
        List<BadgeResult> badgeresult = badgeresultRepository.findByUser(user);
        return MyBadgeResultList(badgeresult);
    }
}