package com.server.back.domain.study.entity;


import lombok.*;

import javax.persistence.*;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Word {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "word_id")
	private Long wordId;

	private String wordName;
	private Integer wordIso;
	private String wordType;
	private String wordRating;
	private String wordClass;
	private String wordOrigin;
	private String wordDetail; // 이후에 리스트로 분기할수도
	private String wordExample; // 이후에 리스트로 분기할수도
	private String wordRelation; // 이후에 리스트로 분기할수도

}
