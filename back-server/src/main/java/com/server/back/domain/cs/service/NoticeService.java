package com.server.back.domain.cs.service;

import com.server.back.domain.cs.dto.NoticeRequestDto;
import com.server.back.domain.cs.dto.NoticeResponseDto;

import java.util.List;

public interface NoticeService {
    List<NoticeResponseDto> noticeAllList();

    NoticeResponseDto noticeDetailSelect(Long noticeId);

    boolean noticeInsert(NoticeRequestDto requestDto);

    boolean noticeUpdate(Long noticeId, NoticeRequestDto requestDto);

    void noticeDelete(Long noticeId);
}
