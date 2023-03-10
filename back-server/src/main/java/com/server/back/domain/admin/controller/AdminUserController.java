package com.server.back.domain.admin.controller;

import com.server.back.domain.admin.service.AdminUserService;
import com.server.back.domain.user.dto.UserRequestDto;
import com.server.back.domain.user.dto.UserResponseDto;
import com.server.back.domain.user.repository.UserRepository;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RequestMapping("/admin/user")
@RestController
public class AdminUserController {
    private final AdminUserService adminUserService;
    @ApiOperation(value = "전체 회원 목록")
    @GetMapping
    public ResponseEntity<Map<String, Object>> adminAllUserList(){
        Map<String, Object> response = new HashMap<>();

        List<UserResponseDto> userList = adminUserService.adminAllUser();

        response.put("message", "success");
        response.put("data", userList);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @ApiOperation(value = "회원 목록")
    @GetMapping("/{nickname}")
    public ResponseEntity<Map<String, Object>> adminUserList(@PathVariable(name="nickname") String nickname){
        Map<String, Object> response = new HashMap<>();

        List<UserResponseDto> userList = adminUserService.adminUserList(nickname);

        response.put("message", "success");
        response.put("data", userList);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @ApiOperation(value = "회원 수정")
    @PutMapping("/{user_id}")
    public ResponseEntity<Map<String, Object>> adminUserUpdate(@PathVariable(name="user_id") Long userId, @RequestBody UserRequestDto requestDto){
        Map<String, Object> response = new HashMap<>();

        if(adminUserService.adminUserUpdate(userId, requestDto)){
            response.put("message", "success");
            return new ResponseEntity<>(response, HttpStatus.OK);
        }else{
            response.put("message", "fail");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "회원 삭제")
    @PutMapping("/{my_id}/{delete_id}")
    public ResponseEntity<Map<String, Object>> adminUserDelete(@PathVariable(name="my_id") Long myId, @PathVariable(name="delete_id") Long deleteId){
        Map<String, Object> response = new HashMap<>();

        if(myId != deleteId && adminUserService.adminUserDelete(deleteId)){
                response.put("message", "success");
                response.put("data", true);
                return new ResponseEntity<>(response, HttpStatus.OK);
        }

        response.put("message", "fail");
        response.put("data", false);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
