package com.server.back.domain.cs.entity;


import com.server.back.common.entity.CommonEntity;
import com.server.back.domain.cs.dto.NoticeRequestDto;
import com.server.back.domain.user.entity.User;
import lombok.*;

import javax.persistence.*;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Notice extends CommonEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "notice_id")
	private Long noticeId;
	private String title;
	private String content;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	public void update(NoticeRequestDto requestDto) {
		title = requestDto.getTitle();
		content = requestDto.getContent();
	}
}
