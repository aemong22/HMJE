package com.server.back.domain.message.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class ModifyNumberDto {
    private String phoneNumber;
    private String modifyNumber;
    private String purpose;
}
