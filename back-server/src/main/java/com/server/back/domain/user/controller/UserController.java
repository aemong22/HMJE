package com.server.back.domain.user.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.server.back.common.dto.TokenRequestDto;
import com.server.back.common.service.JwtService;
import com.server.back.domain.user.dto.BadgeResponseDto;
import com.server.back.domain.user.dto.UserRequestDto;

import com.server.back.domain.user.dto.UserResponseDto;
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
//    @ApiOperation(value = "아이디 찾기")
//    @GetMapping("/user/find/id")
//    public ResponseEntity<Map<String, Object>> findId(@PathVariable(value = "userId") Long userId){
//        Map<String, Object> response = new HashMap<>();
//        List<BadgeResponseDto> responseDtoList = userService.userBadge(userId);
//        response.put("data", responseDtoList);
//        response.put("message", "success");
//        return new ResponseEntity<>(response, HttpStatus.OK);
//    }
    @ApiOperation(value = "내 정보 조회")
    @GetMapping("/myinfo/{userId}")
    public ResponseEntity<Map<String, Object>> userMyInfo(@PathVariable(value = "userId") Long userId){
        Map<String, Object> response = new HashMap<>();
        UserResponseDto responseDto = userService.userInfo(userId);
        response.put("data", responseDto);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ApiOperation(value = "정보 수정")
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
    public ResponseEntity<Map<String, Object>> userBadge(@PathVariable(value = "userId") Long userId){
        Map<String, Object> response = new HashMap<>();
        List<BadgeResponseDto> responseDtoList = userService.userBadge(userId);
        response.put("data", responseDtoList);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
