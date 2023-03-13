package com.server.back.domain.study.entity;


import lombok.*;

import javax.persistence.*;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class WordExample {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "word_example_id")
	private Long wordExampleId;
	private String exampleType;
	private String exampleDetail;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "word_detail_id")
	private WordDetail wordDetail;


}
