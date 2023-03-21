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
@ApiModel(value = "ChangeRequestDto")
public class ChangeRequestDto {
    private String password;
    private String newPassword;
    private String newPhonenumber;
}
