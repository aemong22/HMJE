package com.server.back.domain.study.entity;


import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


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
	private String wordOrigin;

	@OneToMany(mappedBy = "word", fetch = FetchType.LAZY)
	private List<WordDetail> wordDetailList = new ArrayList<>();


}
