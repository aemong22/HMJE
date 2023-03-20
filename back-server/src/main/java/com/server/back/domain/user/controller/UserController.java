package com.server.back.domain.user.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.server.back.common.dto.TokenRequestDto;
import com.server.back.common.service.JwtService;
import com.server.back.domain.message.dto.FindRequestDto;
import com.server.back.domain.message.service.SmsService;
import com.server.back.domain.user.dto.*;

import com.server.back.domain.user.repository.BadgeRepository;
import com.server.back.domain.user.service.BadgeService;
import com.server.back.domain.user.service.UserService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RequestMapping("/user")
@RestController
public class UserController {
    private final JwtService jwtService;
    private final UserService userService;
    private final SmsService smsService;
    private final BadgeService badgeService;

    @ApiOperation(value = "회원 가입")
    @PostMapping("/join")
    public ResponseEntity<Map<String, Object>> join(@RequestBody UserRequestDto requestDto){
        Map<String, Object> response = new HashMap<>();
        System.out.println(requestDto);
        userService.join(requestDto);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "토큰 갱신", notes = "accessToken, refreshToken을 갱신하여 전달.")
    @GetMapping("/auth/refresh/{username}")
    public Map<String,String> refreshToken(@PathVariable("username") String username, @RequestHeader("refreshToken") String refreshToken,
                                           HttpServletResponse response) throws JsonProcessingException {
        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");
        TokenRequestDto tokenRequestDto = jwtService.validRefreshToken(username, refreshToken);
        Map<String, String> jsonResponse = jwtService.recreateTokenResponse(tokenRequestDto);
        return jsonResponse;
    }
    @ApiOperation(value = "닉네임 중복 체크", notes="닉네임 사용 가능하면 true")
    @PostMapping ("/check/nickname")
    public ResponseEntity<Map<String, Object>> userNicknameCheck(@RequestBody UserRequestDto requestDto){
        Map<String, Object> response = new HashMap<>();
        Boolean nicknamecheck = userService.userNicknameCheck(requestDto);
        response.put("data", nicknamecheck);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "아이디 중복 체크", notes="아이디 사용 가능하면 true")
    @PostMapping ("/check/username")
    public ResponseEntity<Map<String, Object>> userUsernameCheck(@RequestBody UserRequestDto requestDto){
        Map<String, Object> response = new HashMap<>();
        Boolean usernamecheck = userService.userUsernameCheck(requestDto);
        response.put("data", usernamecheck);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "아이디 찾기")
    @PostMapping("/find/id")
    public ResponseEntity<Map<String, Object>> findUsername(@RequestBody FindRequestDto requestDto){
        Map<String, Object> response = new HashMap<>();
        String username = smsService.findUsername(requestDto);
        response.put("data", username);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "비밀번호 찾기")
    @PostMapping("/find/password")
    public ResponseEntity<Map<String, Object>> findPassword(@RequestBody FindRequestDto requestDto){
        Map<String, Object> response = new HashMap<>();
        Boolean password = smsService.findPassword(requestDto);
        response.put("data", password);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "내 정보 조회")
    @GetMapping("/myinfo/{userId}")
    public ResponseEntity<Map<String, Object>> userMyInfo(@PathVariable(value = "userId") Long userId){
        Map<String, Object> response = new HashMap<>();
        UserResponseDto responseDto = userService.userInfo(userId);
        response.put("data", responseDto);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "로그아웃")
    @PutMapping("/logout/{userId}")
    public ResponseEntity<Map<String, Object>> uesrLogout(@PathVariable(value = "userId") Long userId) {
        Map<String, Object> response = new HashMap<>();
        userService.uesrLogout(userId);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "회원정보(닉네임) 수정")
    @PutMapping("/{userId}")
    public ResponseEntity<Map<String, Object>> userUpdate(@PathVariable(value = "userId") Long userId , @RequestBody UserRequestDto requestDto){
        Map<String, Object> response = new HashMap<>();
        userService.userUpdate(userId, requestDto);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @ApiOperation(value = "회원 탈퇴")
    @DeleteMapping("/{userId}")
    public ResponseEntity<Map<String, Object>> userDelete(@PathVariable(value = "userId") Long userId){
        Map<String, Object> response = new HashMap<>();
        userService.userDelete(userId);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "내 뱃지 조회")
    @GetMapping("/badge/{userId}")
    public ResponseEntity<Map<String, Object>> myBadgeAll(@PathVariable(value = "userId") Long userId){
        Map<String, Object> response = new HashMap<>();
        List<BadgeResultResponseDto> responseDtoList = userService.myBadgeAll(userId);
        response.put("data", responseDtoList);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "뱃지 수정")
    @PutMapping("/badge/{userId}/{bagdeId}")
    public ResponseEntity<Map<String, Object>> updateBadge(@PathVariable(value = "userId") Long userId, @PathVariable(value = "bagdeId") Long bagdeId){
        Map<String, Object> response = new HashMap<>();
        userService.updateBadge(userId, bagdeId);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "학습시간,단어,문맥,통계")
    @GetMapping("/stats/mystudy/{userId}")
    public ResponseEntity<Map<String, Object>> mystudy(@PathVariable(value = "userId") Long userId){
        Map<String, Object> response = new HashMap<>();
        StudyResponseDto responseDto = userService.mystudy(userId);
        response.put("data", responseDto);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "학습시간,단어,문맥,통계 한달치")
    @PostMapping("/stats/monthstudy/{userId}")
    public ResponseEntity<Map<String, Object>> monthstudy(@PathVariable(value = "userId") Long userId, @RequestBody MonthStudyRequestDto requestDto){
        Map<String, Object> response = new HashMap<>();
        List<MonthStudyResponseDto> responseDto = userService.monthstudy(userId,requestDto);
        response.put("data", responseDto);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "다른 유저와 통계 비교")
    @GetMapping("/stats/compare/{userId}")
    public ResponseEntity<Map<String, Object>> compare(@PathVariable(value = "userId") Long userId){
        Map<String, Object> response = new HashMap<>();
        CompareResponseDto responseDto = userService.compare(userId);
        response.put("data", responseDto);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "뱃지 획득 확인")
    @GetMapping("/sms/check/{userId}")
    public ResponseEntity<Map<String, Object>> badgeCheck(@PathVariable(value = "userId") Long userId){
        Map<String, Object> response = new HashMap<>();
        List<Long> responseDto = badgeService.badgecheck(userId);
        response.put("data", responseDto);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
