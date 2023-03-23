package com.server.back.common.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

import com.server.back.common.dto.TokenRequestDto;
import com.server.back.common.entity.JwtProperties;
import com.server.back.common.entity.RefreshToken;
import com.server.back.domain.user.entity.User;
import com.server.back.domain.user.repository.UserRepository;
import com.server.back.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * 실제 JWT 토큰과 관련된 서비스
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class JwtService {

    private final JwtProviderService jwtProviderService;
    private final UserRepository userRepository;
    private final UserService userService;

    /**
     * access, refresh 토큰 생성
     */
    @Transactional
    public TokenRequestDto joinJwtToken(String username) {

        User user = userRepository.findByUsername(username);
        RefreshToken userRefreshToken = user.getJwtRefreshToken();

        //처음 서비스를 이용하는 사용자(refresh 토큰이 없는 사용자)
        if(userRefreshToken == null) {

            //access, refresh 토큰 생성
            TokenRequestDto tokenRequestDto = jwtProviderService.createJwtToken(user.getUserId(), user.getUsername());

            //refreshToken 생성
            RefreshToken refreshToken = new RefreshToken(tokenRequestDto.getRefreshToken());

            //DB에 저장(refresh 토큰 저장)
            user.createRefreshToken(refreshToken);

            return tokenRequestDto;
        }
        //refresh 토큰이 있는 사용자(기존 사용자)
        else {

            String accessToken = jwtProviderService.validRefreshToken(userRefreshToken);

            //refresh 토큰 기간이 유효
            if(accessToken !=null) {
                return new TokenRequestDto(accessToken, userRefreshToken.getRefreshToken());
            }
            else { //refresh 토큰 기간만료
                //새로운 access, refresh 토큰 생성
                TokenRequestDto newTokenRequestDto = jwtProviderService.createJwtToken(user.getUserId(), user.getUsername());

                user.SetRefreshToken(newTokenRequestDto.getRefreshToken());
                return newTokenRequestDto;
            }

        }

    }

    /**
     * access 토큰 validate
     */
    public String validAccessToken(String accessToken) {

        try {
            DecodedJWT verify = JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build().verify(accessToken);

            if(!verify.getExpiresAt().before(new Date())) {
                return verify.getClaim("username").asString();
            }

        }catch (Exception e) {
            /**
             * 여기도 accesstoken이 기간 만료인지 , 정상적이지 않은 accesstoken 인지 구분해야하나??!???????????????????????????????????
             */
            return null;
        }
        return null;
    }

    /**
     * refresh 토큰 validate
     */
    @Transactional
    public TokenRequestDto validRefreshToken(String username, String refreshToken) {

        User findUser = userRepository.findByUsername(username);

        //전달받은 refresh 토큰과 DB의 refresh 토큰이 일치하는지 확인
        RefreshToken findRefreshToken = sameCheckRefreshToken(findUser, refreshToken);

        //refresh 토큰이 만료되지 않았으면 access 토큰이 null 이 아이다.
        String accessToken = jwtProviderService.validRefreshToken(findRefreshToken);

        //refresh 토큰의 유효기간이 남아 access 토큰만 생성
        if(accessToken!=null) {
            return new TokenRequestDto(accessToken, refreshToken);
        }
        //refresh 토큰이 만료됨 -> access, refresh 토큰 모두 재발급
        else {
            TokenRequestDto newTokenRequestDto = jwtProviderService.createJwtToken(findUser.getUserId(), findUser.getUsername());
            findUser.SetRefreshToken(newTokenRequestDto.getRefreshToken());
            return newTokenRequestDto;
        }

    }
    public RefreshToken sameCheckRefreshToken(User findUser, String refreshToken) {

        //DB 에서 찾기
        RefreshToken jwtRefreshToken = findUser.getJwtRefreshToken();

        if(jwtRefreshToken.getRefreshToken().equals(refreshToken)){
            return jwtRefreshToken;
        }
        return null;
    }



    /**
     * json response 부분 따로 분리
     */
    //로그인시 응답 json response
    @Transactional(readOnly = false)
    public Map<String, String> successLoginResponse(TokenRequestDto tokenRequestDto, Long userId) {
        Map<String, String> map = new LinkedHashMap<>();
        userService.loginHistory(userId);
        User user = userRepository.findByUserId(userId);
        map.put("status", "200");
        map.put("message", "accessToken, refreshToken이 생성되었습니다.");
        map.put("userId", userId.toString());
        map.put("isAdmin", user.getIsAdmin().toString());
        map.put("isSecession", user.getIsSecession().toString());
        map.put("accessToken", tokenRequestDto.getAccessToken());
        map.put("refreshToken", tokenRequestDto.getRefreshToken());
        return map;
    }

//    인증 요구 json response (jwt 토큰이 필요한 요구)
    public Map<String, String> requiredJwtTokenResponse() {
        Map<String ,String> map = new LinkedHashMap<>();
        map.put("status", "401");
        map.put("message", "인증이 필요한 페이지 입니다. 로그인을 해주세요");
        return map;
    }

    //accessToken이 만료된 경우의 reponse
    public Map<String, String> requiredRefreshTokenResponse() {
        Map<String, String> map = new LinkedHashMap<>();
        map.put("status", "401");
        map.put("message", "accessToken이 만료되었거나 잘못된 값입니다.");
        return map;
    }

    //refresh 토큰 재발급 response
    public Map<String, String> recreateTokenResponse(TokenRequestDto tokenRequestDto) {
        Map<String ,String > map = new LinkedHashMap<>();
        map.put("status", "200");
        map.put("message", "refresh, access 토큰이 재발급되었습니다.");
        map.put("accessToken", tokenRequestDto.getAccessToken());
        map.put("refreshToken", tokenRequestDto.getRefreshToken());
        return map;
    }




}

