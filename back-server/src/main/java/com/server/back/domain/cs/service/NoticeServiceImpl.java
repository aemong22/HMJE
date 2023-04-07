package com.server.back.domain.cs.service;

import com.server.back.domain.cs.dto.NoticeRequestDto;
import com.server.back.domain.cs.dto.NoticeResponseDto;
import com.server.back.domain.cs.entity.Notice;
import com.server.back.domain.cs.repository.NoticeRepository;
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
public class NoticeServiceImpl implements NoticeService {
    private final NoticeRepository noticeRepository;
    private final UserRepository userRepository;
    @Override
    public List<NoticeResponseDto> noticeAllList() {
        // 전체 공지사항 리스트 반환
        return noticeRepository.findAll().stream().map(o -> NoticeResponseDto.
                builder().
                noticeId(o.getNoticeId()).
                userId(o.getUser().getUserId()).
                title(o.getTitle()).
                content(o.getContent()).
                createdAt(o.getCreatedAt()).
                updatedAt(o.getUpdatedAt()).
                build()).
                collect(Collectors.toList());
    }

    @Override
    public NoticeResponseDto noticeDetailSelect(Long noticeId) {
        Optional<Notice> notice = noticeRepository.findById(noticeId);
        // 공지사항이 존재한다면 반환
        if(notice.isPresent()){
            Notice o = notice.get();
            return NoticeResponseDto.
                    builder().
                    noticeId(o.getNoticeId()).
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
    public boolean noticeInsert(NoticeRequestDto requestDto) {
        // 새로운 공지사항 추가
        Notice notice = Notice.builder().
                user(userRepository.findByUserId(requestDto.getUserId())).
                title(requestDto.getTitle()).
                content(requestDto.getContent()).
                build();
        
        if(noticeRepository.save(notice) != null){
            return true;
        }else {
            return false;
        }
    }

    @Override
    public boolean noticeUpdate(Long noticeId, NoticeRequestDto requestDto) {
        Notice notice = null;
        Optional<Notice> entity = noticeRepository.findById(noticeId);
        if(entity.isPresent()){
            notice = entity.get();
            notice.update(requestDto);

            return true;
        }else{
            return false;
        }
    }

    @Override
    public void noticeDelete(Long noticeId) {
        noticeRepository.deleteById(noticeId);
    }
}
