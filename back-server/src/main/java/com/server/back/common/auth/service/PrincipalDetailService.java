package com.server.back.common.auth.service;


import com.server.back.common.auth.entity.PrincipalDetails;
import com.server.back.domain.user.entity.User;
import com.server.back.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
//http://localhost:8080/login 호출시 (스프링 시큐리티 자동 uri) -> 동직을 하지 않는다. formLogin사용 안하니 => SpringSecuriyFilter를 extends해서 해결
@Service
@RequiredArgsConstructor
public class PrincipalDetailService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("PrincipalDetailService loadUserByUsername 실행중   " + username);
        User findUser = userRepository.findByUsername(username);
        System.out.println("PrincipalDetailService loadUserByUsername에서 찾은 USER : " + findUser);

        return new PrincipalDetails(findUser);
    }
}
