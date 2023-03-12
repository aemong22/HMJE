package com.server.back.domain.test.controller;

import com.server.back.domain.test.dto.RedisTestRequestDto;
import com.server.back.domain.test.service.RedisTestService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@RequestMapping("/redis/test")
@RestController
public class RedisTestController {
    private final RedisTestService redisTestService;

    @ApiOperation(value = "redis 값 추가")
    @PostMapping
    public ResponseEntity<Map<String, Object>> redisTestInsert(@RequestBody RedisTestRequestDto requestDto){
        Map<String,Object> response = new HashMap<>();

        redisTestService.dataInsert(requestDto);

        response.put("message", "success");
        response.put("data", true );

        return new ResponseEntity<>(response, HttpStatus.OK);

    }
}
