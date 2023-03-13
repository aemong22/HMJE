package com.server.back.domain.cs.service;

import com.server.back.domain.cs.dto.NoticeRequestDto;
import com.server.back.domain.cs.dto.NoticeResponseDto;
import com.server.back.domain.cs.entity.Faq;
import com.server.back.domain.cs.repository.FaqRepository;
import com.server.back.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Transactional
@Service
public class FaqServiceImpl implements FaqService {
    private final FaqRepository faqRepository;
    private final UserRepository userRepository;
    @Override
    public List<NoticeResponseDto> faqAllList() {
        // 전체 faq 리스트 반환
        return faqRepository.findAll().stream().map(o -> NoticeResponseDto.
                        builder().
                        noticeId(o.getFaqId()).
                        userId(o.getUser().getUserId()).
                        title(o.getTitle()).
                        content(o.getContent()).
                        createdAt(o.getCreatedAt()).
                        updatedAt(o.getUpdatedAt()).
                        build()).
                collect(Collectors.toList());
    }

    @Override
    public NoticeResponseDto faqDetailSelect(Long faqId) {
        Optional<Faq> faq = faqRepository.findById(faqId);
        // 공지사항이 존재한다면 반환
        if(faq.isPresent()){
            Faq o = faq.get();
            return NoticeResponseDto.
                    builder().
                    noticeId(o.getFaqId()).
                    userId(o.getUser().getUserId()).
                    title(o.getTitle()).
                    content(o.getContent()).
                    createdAt(o.getCreatedAt()).
                    updatedAt(o.getUpdatedAt()).
                    build();
            // 없다면 null 반환
        }else{
            return null;
        }
    }

    @Override
    public boolean faqInsert(NoticeRequestDto requestDto) {
        // 새로운 공지사항 추가
        Faq faq = Faq.builder().
                user(userRepository.findByUserId(requestDto.getUserId())).
                title(requestDto.getTitle()).
                content(requestDto.getContent()).
                build();

        if(faqRepository.save(faq) != null){
            return true;
        }else {
            return false;
        }
    }

    @Override
    public boolean faqUpdate(Long faqId, NoticeRequestDto requestDto) {
        Faq faq = null;
        Optional<Faq> entity = faqRepository.findById(faqId);
        if(entity.isPresent()){
            faq = entity.get();
            faq.update(requestDto);

            return true;
        }else{
            return false;
        }
    }

    @Override
    public void faqDelete(Long faqId) {
        faqRepository.deleteById(faqId);
    }
}
