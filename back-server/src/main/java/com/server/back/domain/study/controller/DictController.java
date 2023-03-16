package com.server.back.domain.study.controller;


import com.server.back.domain.study.dto.DictRequestDto;
import com.server.back.domain.study.entity.Word;

import com.server.back.domain.study.service.DictService;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;



import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RequiredArgsConstructor
@RequestMapping("/dict")
@RestController
public class DictController {

	private final DictService dictService;


	@ApiOperation(value = "사전 조회하기")
	@PostMapping("/")
	public ResponseEntity<Map<String, Object>> getDictList(@RequestBody DictRequestDto dictRequestDto){

		Map<String, Object> response = new HashMap<>();

		if(dictRequestDto.getFilter().isBlank()){ // 만약 필터정보(가,나,다...)가 없으면
			List<Word> wordList = dictService.getDictList(dictRequestDto);
			Integer wordCount = dictService.getWordCount(dictRequestDto);
			response.put("data", wordList);
			response.put("count", wordCount);
			response.put("message", "success");
		}
		else{ // 필터정보가 있으면
			List<Word> wordList = dictService.getDictListWithFilter(dictRequestDto);
			Integer wordCount = dictService.getWordCountWithFilter(dictRequestDto);
			response.put("data", wordList);
			response.put("count", wordCount);
			response.put("message", "success");
		}

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@ApiOperation(value = "사전 개별 조회")
	@GetMapping("/{wordId}")
	public ResponseEntity<Map<String, Object>> getDict(@PathVariable(value = "wordId") Long wordId){
		Map<String, Object> response = new HashMap<>();

		Word word = dictService.getDict(wordId);
		response.put("data", word);
		response.put("message", "success");

		return new ResponseEntity<>(response, HttpStatus.OK);
	}


}
