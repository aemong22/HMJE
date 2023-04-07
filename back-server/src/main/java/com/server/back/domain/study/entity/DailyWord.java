package com.server.back.domain.study.entity;


import com.server.back.common.entity.CommonEntity;
import lombok.*;

import javax.persistence.*;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class DailyWord extends CommonEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "daily_word_id")
	private Long dailyWordId;

	private String category;
	private Integer score;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "word_id")
	private Word word;

}
