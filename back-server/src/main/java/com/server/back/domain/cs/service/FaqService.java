package com.server.back.domain.cs.service;

import com.server.back.domain.cs.dto.NoticeRequestDto;
import com.server.back.domain.cs.dto.NoticeResponseDto;

import java.util.List;

public interface FaqService {
    List<NoticeResponseDto> faqAllList();

    NoticeResponseDto faqDetailSelect(Long faqId);

    boolean faqInsert(NoticeRequestDto requestDto);

    boolean faqUpdate(Long faqId, NoticeRequestDto requestDto);

    void faqDelete(Long faqId);
}
