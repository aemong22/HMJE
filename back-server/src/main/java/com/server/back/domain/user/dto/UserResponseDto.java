package com.server.back.domain.user.dto;

import com.server.back.common.entity.RefreshToken;
import com.server.back.domain.user.entity.Badge;
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


    private String username; //id
    private String nickname;
    private String phoneNumber;
    private Integer level;
    private Integer exp;
    private Boolean isAdmin;
    private Boolean isSecession;
    private Long nowbagdeId;
    private String nowbagdeName;
    private String nowbagdeImage;


    public UserResponseDto(User e) {
        this.username = e.getUsername();
        this.nickname = e.getNickname();
        this.phoneNumber = e.getPhoneNumber();
        this.level = e.getLevel();
        this.exp = e.getExp();
        this.nowbagdeId = e.getNowBadge().getBadgeId();
        this.nowbagdeName = e.getNowBadge().getBadgeName();
        this.nowbagdeImage = e.getNowBadge().getBadgeImage();
        this.isAdmin = e.getIsAdmin();
        this.isSecession = e.getIsSecession();
    }
}
