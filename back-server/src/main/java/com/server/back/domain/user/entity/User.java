package com.server.back.domain.user.entity;

import com.server.back.common.entity.CommonEntity;
import com.server.back.common.entity.RefreshToken;
import com.server.back.domain.study.entity.WrongWord;
import com.server.back.domain.user.dto.UserRequestDto;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class User extends CommonEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;//pk
    @Column(length = 32, nullable = false)
    private String username; //네이버 id pk
//    @Column(length = 32, nullable = false)
    private String password;
    @Column(length = 12, nullable = false)
    private String nickname;
    @Column(length = 30, nullable = false)
    private String phoneNumber;

    private Integer level;

    private Integer exp;
    //    @Column(nullable = false)
    private Integer todaysemo;
    //    @Column(nullable = false)
    private Integer todayRight;
    //    @Column(nullable = false)
    private Integer todayWrong;
    //    @Column(nullable = false)

    private Boolean isAdmin;
    private Boolean isSecession;
    private Integer continAttendance;
    private Integer accumAttendance;


    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "refreshTokenId")
    private RefreshToken jwtRefreshToken;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "badge_id")
    private Badge nowBadge;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "character_id")
    private MyCharacter characterId;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<WrongWord> wrongWordList = new ArrayList<>();

    /**
     *  refresh 생성자, setter
     */
    public void createRefreshToken(RefreshToken refreshToken) {
        this.jwtRefreshToken = refreshToken;
    }
    public void SetRefreshToken(String refreshToken) {
        this.jwtRefreshToken.setRefreshToken(refreshToken);
    }

    public void adminUpdate(UserRequestDto requestDto) {
        this.nickname = requestDto.getNickname();
    }

    public void updateNickname(UserRequestDto requestDto){
        this.nickname = requestDto.getNickname();
    }
    public void changePhonenumber(String newPhonenumber){
        this.phoneNumber = newPhonenumber;
    }
    public void logout(){
        this.jwtRefreshToken = null;
    }
    public void userdelete(){
        this.nickname = "delete" + this.getUserId();
        this.isSecession = true;
    }
    public void updateBadge(Badge badge){
        this.nowBadge = badge;
    }
    public void updateResult(Integer semo, Integer wrongCount, Integer rightCount){
        this.todaysemo = this.todaysemo + semo;
        this.todayRight = this.todayRight + rightCount;
        this.todayWrong = this.todayWrong + wrongCount;
    }
    public void updateExp(Integer rightExp){
        this.exp = this.exp + rightExp;
    }
    public void changePassord(String newPassword){
        this.password = newPassword;
        this.jwtRefreshToken = null;
    }
    public void levelup(Integer newExp, Integer newlevel){
        this.exp = newExp;
        this.level = newlevel;
    }
    public void continAttendance(){
        this.continAttendance += 1;
    }
    public void accumAttendance(){
        this.accumAttendance += 1;
    }
}
