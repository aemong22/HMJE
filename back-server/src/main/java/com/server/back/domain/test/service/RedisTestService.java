package com.server.back.domain.test.service;

import com.server.back.domain.test.dto.RedisTestRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class RedisTestService {
    private final StringRedisTemplate stringRedisTemplate;

    public void dataInsert(RedisTestRequestDto requestDto) {
        ValueOperations<String, String> valueOperations = stringRedisTemplate.opsForValue();
        valueOperations.set(requestDto.getKey(), requestDto.getValue());
    }
}
