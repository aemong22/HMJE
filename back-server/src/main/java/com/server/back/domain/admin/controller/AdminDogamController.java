package com.server.back.domain.admin.controller;

import com.server.back.domain.admin.service.AdminDogamService;
import com.server.back.domain.study.dto.DogamRequestDto;
import com.server.back.domain.study.dto.DogamResponseDto;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RequestMapping("/admin/dogam")
@RestController
public class AdminDogamController {
    private final AdminDogamService adminDogamService;


    @ApiOperation(value="전체 도감 목록 조회")
    @GetMapping
    public ResponseEntity<Map<String, Object>> adminAllDogamList(){
        Map<String, Object> response = new HashMap<>();

        List<DogamResponseDto> dogamList = adminDogamService.adminAllDogamList();

        response.put("message", "success");
        response.put("data", dogamList);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @ApiOperation(value="도감 추가")
    @PostMapping
    public ResponseEntity<Map<String, Object>> adminDogamInsert(@RequestBody DogamRequestDto requestDto){
        Map<String, Object> response = new HashMap<>();

        if(adminDogamService.adminDogamInsert(requestDto)){
            response.put("message", "success");
            response.put("data", true);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }else{
            response.put("message", "fail");
            response.put("data", false);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value="도감 수정")
    @PutMapping("/{dogam_id}")
    public ResponseEntity<Map<String, Object>> adminDogamUpdate(@PathVariable(name = "dogam_id")Long dogamId, @RequestBody DogamRequestDto requestDto){
        Map<String, Object> response = new HashMap<>();

        if(adminDogamService.adminDogamUpdate(dogamId, requestDto)){
            response.put("message", "success");
            response.put("data", true);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }else{
            response.put("message", "fail");
            response.put("data", false);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value="도감 삭제")
    @DeleteMapping("/{dogam_id}")
    public ResponseEntity<Map<String, Object>> adminDogamDelete(@PathVariable(name = "dogam_id")Long dogamId){
        Map<String, Object> response = new HashMap<>();

        adminDogamService.adminDogamDelete(dogamId);

        response.put("message", "success");
        response.put("data", true);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
