package com.server.back.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {
    @Bean
    public CorsFilter corsFilter(){
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        // 서버가 응답할 때 json 자바스크립트에서 처리할 수 있게 할지 설정.
        //config.setAllowCredentials(true);
        // 모든 ip에 응답 허용
        config.addAllowedOrigin("*");
        // 모든 Header에 응답 허용
        config.addAllowedHeader("*");
        // 모든 Method(get, post, put, delete) 허용
        config.addAllowedMethod("*");
        config.addAllowedOriginPattern("*");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
