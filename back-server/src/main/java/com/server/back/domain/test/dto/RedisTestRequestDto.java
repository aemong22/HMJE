package com.server.back.domain.test.dto;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@ApiModel(value = "RedisTestReqeustDto")
public class RedisTestRequestDto {
    String key;
    String value;
}
