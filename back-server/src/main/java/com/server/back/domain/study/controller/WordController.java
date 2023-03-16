package com.server.back.domain.study.controller;


import com.server.back.domain.study.dto.DailyWordResponseDto;
import com.server.back.domain.study.dto.DictRequestDto;
import com.server.back.domain.study.dto.WordResponseDto;


import com.server.back.domain.study.repository.DailyWordRepository;
import com.server.back.domain.study.service.WordService;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;



import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RequiredArgsConstructor
@RequestMapping("/word")
@RestController
public class WordController {

	private final WordService wordService;


	/**
	 * page, keyword, filter를 받아 페이지 결과를 출력
	 * page는 필수. keyword, filter는 없어도 됨.
	 * filter의 경우 초성필터이기 때문에 따로 쿼리문을 작성하여 repo를 따로 둠
	 * @param dictRequestDto
	 * @return
	 */
	@ApiOperation(value = "사전 조회하기")
	@PostMapping("/dict")
	public ResponseEntity<Map<String, Object>> getDictList(@RequestBody DictRequestDto dictRequestDto){

		Map<String, Object> response = new HashMap<>();

		if(dictRequestDto.getFilter().isBlank()){ // 만약 필터정보(가,나,다...)가 없으면
			List<WordResponseDto> wordList = wordService.getDictList(dictRequestDto);
			Integer wordCount = wordService.getWordCount(dictRequestDto);
			response.put("data", wordList);
			response.put("count", wordCount);
			response.put("message", "success");
		}
		else{ // 필터정보가 있으면
			List<WordResponseDto> wordList = wordService.getDictListWithFilter(dictRequestDto);
			Integer wordCount = wordService.getWordCountWithFilter(dictRequestDto);
			response.put("data", wordList);
			response.put("count", wordCount);
			response.put("message", "success");
		}

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

//	@ApiOperation(value = "사전 조회하기 QueryString 버전 테스트")
//	@GetMapping("/")
//	public ResponseEntity<Map<String, Object>> getDictList2(@RequestParam(name="p", defaultValue = "0") Integer page,
//	                                                        @RequestParam(name="keyword", defaultValue = "") String keyword,
//	                                                        @RequestParam(name="filter", defaultValue = "") String filter
//	                                                        ){
//
//		Map<String, Object> response = new HashMap<>();
//
//
//
//		return new ResponseEntity<>(response, HttpStatus.OK);
//	}


	/**
	 * wordId로 사전 정보를 찾아 Dto 반환
	 * @param wordId
	 * @return
	 */
	@ApiOperation(value = "사전 개별 조회")
	@GetMapping("/dict/{wordId}")
	public ResponseEntity<Map<String, Object>> getDict(@PathVariable(value = "wordId") Long wordId){
		Map<String, Object> response = new HashMap<>();

		WordResponseDto word = wordService.getDict(wordId);
		response.put("data", word);
		response.put("message", "success");

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@ApiOperation(value = "오답노트 전체 조회")
	@GetMapping("/wrong/{userId}")
	public ResponseEntity<Map<String, Object>> getDictList2(@PathVariable(value = "userId") Long userId){
		Map<String, Object> response = new HashMap<>();

		List<WordResponseDto> wordList = wordService.getWrongWordList(userId);

		response.put("data", wordList);
		response.put("message", "success");

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

//	// 필요할지 의문이긴 함. 이야기해서 그냥 사전 조회랑 똑같은데, 없앨지?
//	@ApiOperation(value = "오답노트 개별 조회")
//	@GetMapping("/wrong/{userId}/{wordId}")
//	public ResponseEntity<Map<String, Object>> getWrongWord(@PathVariable(value = "wordId") Long wordId,
//	                                                        @PathVariable(value = "userId") Long userId){
//		Map<String, Object> response = new HashMap<>();
//
//		WordResponseDto word = wordService.getDict(wordId);
//		response.put("data", word);
//		response.put("message", "success");
//
//		return new ResponseEntity<>(response, HttpStatus.OK);
//	}


	@ApiOperation(value = "오늘의 단어 전체 조회")
	@GetMapping("/daily")
	public ResponseEntity<Map<String, Object>> getDailyWordList(){
		Map<String, Object> response = new HashMap<>();
		List<DailyWordResponseDto> dailyWord = wordService.getDailyWordList();

		response.put("data", dailyWord);
		response.put("message", "success");

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

}
