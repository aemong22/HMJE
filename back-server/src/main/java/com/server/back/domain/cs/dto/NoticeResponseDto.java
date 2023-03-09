package com.server.back.domain.cs.dto;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@ApiModel(value = "NoticeResponseDto")
public class NoticeResponseDto {
    Long noticeId;
    Long userId;
    String title;
    String content;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
}
