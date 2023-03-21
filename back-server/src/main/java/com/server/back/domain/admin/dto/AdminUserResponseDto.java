package com.server.back.domain.admin.dto;


import com.server.back.domain.user.entity.User;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@ApiModel(value = "AdminUserResponseDto", description = "Admin User 정보 조회")
public class AdminUserResponseDto {

    private Long userId;
    private String username; //id
    private String nickname;
    private String phoneNumber;
    private Integer level;
    private Integer exp;
    private Boolean isAdmin;
    private Boolean isSecession;
    private Long nowbadgeId;
    private Long characterId;

    private Integer todayRight;
    private Integer todayWrong;
    private Integer todaySemo;


    public AdminUserResponseDto(User e) {
        this.userId = e.getUserId();
        this.username = e.getUsername();
        this.nickname = e.getNickname();
        this.phoneNumber = e.getPhoneNumber();
        this.level = e.getLevel();
        this.exp = e.getExp();
        this.isAdmin = e.getIsAdmin();
        this.isSecession = e.getIsSecession();
        this.nowbadgeId = e.getNowBadge().getBadgeId();
        this.characterId = e.getCharacterId().getCharacterId();

        this.todayRight = e.getTodayRight();
        this.todayWrong = e.getTodayWrong();
        this.todaySemo = e.getTodaysemo();
    }
}
