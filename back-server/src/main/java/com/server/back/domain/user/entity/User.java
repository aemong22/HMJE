package com.server.back.domain.user.entity;

import com.server.back.common.entity.RefreshToken;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;//pk
    @Column(length = 32, nullable = false)
    private String username; //네이버 id pk
    @Column(length = 32, nullable = false)
    private String password;
    @Column(length = 12, nullable = false)
    private String nickname;
    @Column(length = 25, nullable = false)
    private String phoneNumber;

    private Integer level;

    private Integer exp;
    //    @Column(nullable = false)
    private Integer semo;
    //    @Column(nullable = false)
    private Integer totalTime;
    //    @Column(nullable = false)
    private Integer totalRight;
    //    @Column(nullable = false)
    private Integer totalWorng;
    //    @Column(nullable = false)

    private Boolean isAdmin;
    private Boolean isSecession;


    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "refreshTokenId")
    private RefreshToken jwtRefreshToken;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "Badge", nullable = false)
//    private Badge Badge;

    @Builder
    public User(Long userId,
    String username,
    String password,
    String nickname,
    String phoneNumber,
    Integer level,
    Integer exp,
    Integer semo,
    Integer totalTime,
    Integer totalRight,
    Integer totalWorng,
    Boolean isAdmin,
    Boolean isSecession) {
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.nickname = nickname;
        this.phoneNumber = phoneNumber;
        this.level = level;
        this.exp = exp;
        this.semo = semo;
        this.totalTime = totalTime;
        this.totalRight = totalRight;
        this.totalWorng = totalWorng;
        this.isAdmin = isAdmin;
        this.isSecession = isSecession;
    }

    /**
     *  refresh 생성자, setter
     */
    public void createRefreshToken(RefreshToken refreshToken) {
        this.jwtRefreshToken = refreshToken;
    }
    public void SetRefreshToken(String refreshToken) {
        this.jwtRefreshToken.setRefreshToken(refreshToken);
    }

}
