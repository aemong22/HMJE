package com.server.back.domain.user.entity;


import com.server.back.common.entity.CommonEntity;
import com.server.back.domain.user.dto.BadgeRequestDto;
import lombok.*;

import javax.persistence.*;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Badge extends CommonEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "badge_id")
	private Long badgeId;
	private String badgeImage;
	private String badgeName;
	private String badgeDetail;

	public void update(BadgeRequestDto requestDto) {
		this.badgeImage= requestDto.getBadgeImage();
		this.badgeName= requestDto.getBadgeName();
		this.badgeDetail= requestDto.getBadgeDetail();
	}
}
