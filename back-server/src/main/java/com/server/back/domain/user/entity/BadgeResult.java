package com.server.back.domain.user.entity;


import com.server.back.common.entity.CommonEntity;
import lombok.*;

import javax.persistence.*;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class BadgeResult extends CommonEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "badge_result_id")
	private Long badgeResultId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "badge_id")
	private Badge badge;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;
}
