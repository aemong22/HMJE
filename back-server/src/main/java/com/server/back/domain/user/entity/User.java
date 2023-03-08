package com.server.back.domain.user.entity;

import com.server.back.common.entity.RefreshToken;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
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
