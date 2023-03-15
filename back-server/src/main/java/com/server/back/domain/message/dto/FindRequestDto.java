package com.server.back.domain.message.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class FindRequestDto {
    private String username;
    private String phoneNum;
    private String modifyNum;
    private String newPassword;
}