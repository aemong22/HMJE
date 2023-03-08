package com.server.back.domain.user.dto;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@ApiModel(value = "UserRequestDto")
public class UserRequestDto {
    private String username;
    private String nickname;
    private String password;
    private String phoneNumber;
    private Boolean isAdmin;
    private Boolean isSecession;
}
