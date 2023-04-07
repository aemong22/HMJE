package com.server.back.domain.study.controller;

import com.server.back.domain.study.dto.DogamResponseDto;
import com.server.back.domain.study.service.DogamService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RequestMapping("/dogam")
@RestController
public class DogamController {
    private final DogamService dogamService;

    @ApiOperation(value = "전체도감 목록")
    @GetMapping("/")
    public ResponseEntity<Map<String, Object>> dogamAll(){
        Map<String, Object> response = new HashMap<>();
        List<DogamResponseDto> dagamAllList = dogamService.dogamAll();
        response.put("data", dagamAllList);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @ApiOperation(value = "획득한 도감번호 조회")
    @GetMapping("/{userId}")
    public ResponseEntity<Map<String, Object>> myDogamAll(@PathVariable(value = "userId") Long userId){
        Map<String, Object> response = new HashMap<>();
        List<Long> myDogamList = dogamService.myDogamList(userId);
        response.put("data", myDogamList);
        response.put("message", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
