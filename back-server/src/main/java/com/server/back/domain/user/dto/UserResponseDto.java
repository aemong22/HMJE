package com.server.back.domain.user.dto;

import com.server.back.common.entity.RefreshToken;
import com.server.back.domain.user.entity.User;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@ApiModel(value = "UserResponseDto", description = "User 정보 조회")
public class UserResponseDto {


    private String username; //네이버 id pk
    private String nickname;
    private String phoneNumber;
    private Integer level;
    private Integer exp;
    private Boolean isAdmin;
    private Boolean isSecession;


    public UserResponseDto(User e) {
        this.username = e.getUsername();
        this.nickname = e.getNickname();
        this.phoneNumber = e.getPhoneNumber();
        this.level = e.getLevel();
        this.exp = e.getExp();
        this.isAdmin = e.getIsAdmin();
        this.isSecession = e.getIsSecession();
    }
}
