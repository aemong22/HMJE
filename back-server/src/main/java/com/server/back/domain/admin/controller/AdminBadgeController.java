package com.server.back.domain.admin.controller;

import com.server.back.domain.admin.service.AdminBadgeService;
import com.server.back.domain.user.dto.BadgeRequestDto;
import com.server.back.domain.user.dto.BadgeResponseDto;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RequestMapping("/admin/badge")
@RestController
public class AdminBadgeController {
    private final AdminBadgeService adminBadgeService;


    @ApiOperation(value="전체 뱃지 목록 조회")
    @GetMapping
    public ResponseEntity<Map<String, Object>> adminAllBadgeList(){
        Map<String, Object> response = new HashMap<>();

        List<BadgeResponseDto> badgeList = adminBadgeService.adminAllBadgeList();

        response.put("message", "success");
        response.put("data", badgeList);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @ApiOperation(value="뱃지 추가")
    @PostMapping
    public ResponseEntity<Map<String, Object>> adminBadgeInsert(@RequestBody BadgeRequestDto requestDto){
        Map<String, Object> response = new HashMap<>();

        if(adminBadgeService.adminBadgeInsert(requestDto)){
            response.put("message", "success");
            response.put("data", true);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }else{
            response.put("message", "fail");
            response.put("data", false);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value="뱃지 수정")
    @PutMapping("/{badge_id}")
    public ResponseEntity<Map<String, Object>> adminBadgeUpdate(@PathVariable(name = "badge_id")Long badgeId, @RequestBody BadgeRequestDto requestDto){
        Map<String, Object> response = new HashMap<>();

        if(adminBadgeService.adminBadgeUpdate(badgeId, requestDto)){
            response.put("message", "success");
            response.put("data", true);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }else{
            response.put("message", "fail");
            response.put("data", false);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value="뱃지 삭제")
    @DeleteMapping("/{badge_id}")
    public ResponseEntity<Map<String, Object>> adminBadgeDelete(@PathVariable(name = "badge_id")Long badgeId){
        Map<String, Object> response = new HashMap<>();

        adminBadgeService.adminBadgeDelete(badgeId);

        response.put("message", "success");
        response.put("data", true);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
