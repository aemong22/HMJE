package com.server.back.domain.cs.dto;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@ApiModel(value = "NoticeRequestDto")
public class NoticeRequestDto {
    Long userId;
    String title;
    String content;
}
