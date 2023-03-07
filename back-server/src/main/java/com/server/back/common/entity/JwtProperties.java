package com.server.back.common.entity;

public interface JwtProperties {
    String SECRET = "Hong Min Jeong Eum";
    int AccessToken_TIME =  1000*60*10; // (1/1000초)
    int RefreshToken_TIME = 1000 * 60 * 60 * 24 * 7 ;// 1 week
    String HEADER_STRING = "accessToken";
}
