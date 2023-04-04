package com.server.back.domain.study.service;

import com.server.back.domain.study.dto.*;
import com.server.back.domain.study.entity.*;
import com.server.back.domain.study.repository.*;
import com.server.back.domain.user.entity.User;
import com.server.back.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;

@RequiredArgsConstructor
@Transactional
@Service
public class StudyServiceImpl implements StudyService{
    private final UserRepository userRepository;
    private final WordRepository wordRepository;
    private final DogamRepository dogamRepository;
    private final RightWordRepository rightWordRepository;
    private final WrongWordRepository wrongWordRepository;
    private final DogamResultRepository dogamResultRepository;
    private final PastTestRepository pastTestRepository;
    private final PastQuestionRepository pastQuestionRepository;
    private final PastTestResultRepository pastTestResultRepository;


    @Override
    public Integer wordResult(StudyRequestDto requestDto) {
        int rightCount = 0;
        User user = userRepository.findByUserId(requestDto.getUserId());
        for (Long i : requestDto.getRightIdList()) {
            Word word = wordRepository.findByWordId(i);
            WrongWord wrong = wrongWordRepository.findByWordAndUser(word, user);
            RightWord right = rightWordRepository.findByWordAndUser(word, user);
            //틀렸던 문제인지 확인
            if (wrong != null){
                //틀렸던 문제이면 틀린문제에서는 삭제
                wrongWordRepository.delete(wrong);
            }
            if (right == null){
                RightWord rightWord = RightWord.builder()
                        .user(user)
                        .word(word)
                        .build();
                rightWordRepository.save(rightWord);
                //경험치
                rightCount += 1;
            }
        }
        for (Long j : requestDto.getWrongIdList()) {
            Word word = wordRepository.findByWordId(j);
            WrongWord wrong = wrongWordRepository.findByWordAndUser(word, user);
            //틀린 문제 리스트에 없으면 추가해주기
            if (wrong == null){
                WrongWord wrongWord = WrongWord.builder()
                        .user(user)
                        .word(word)
                        .build();
                wrongWordRepository.save(wrongWord);
            }
        }
        return rightCount;
    }

    @Override
    public List<Long> contextResult(StudyRequestDto requestDto) {
        User user = userRepository.findByUserId(requestDto.getUserId());
        List<Long> newDogamli = new ArrayList<>();
        for (Long i : requestDto.getRightIdList()) {
            Dogam dogam = dogamRepository.findByDogamId(i);
            DogamResult d = dogamResultRepository.findByDogamAndUser(dogam,user);
            //획득한 도감에 없으면
            if (d == null){
                //도감 생성
                DogamResult dogamresult = DogamResult.builder()
                        .user(user)
                        .dogam(dogam)
                        .build();
                dogamResultRepository.save(dogamresult);
                //획득한 뱃지로 결과 보내주기
                newDogamli.add(dogam.getDogamId());
            }
        }
        //경험치
        return newDogamli;
    }

    @Override
    public List<DogamResponseDto> contextQuestion(){
        List<Long> rarebadge15 = Arrays.asList(27L, 37L, 53L, 73L, 83L, 97L); // 레어카드
        //랜덤 5문제 (숫자) 뽑기
        Set<Long> set = new HashSet<>();
        while (set.size() < 5) {
            Long d = (long) (Math.random() * 500 + 1); // 문맥학습 문제 갯수~!~!~!
            Long d2 = d % 100;

            if(d2 == 0L){ // 나머지가 0이 되는 경우 수정
                d2 = 100L;
            }

            if (rarebadge15.contains(d2)){
                if (d.equals(d2)){
                    set.add(d2);
                }
            }else{
                set.add(d2);
            }
        }
        List<Long> list = new ArrayList<>(set);
        //도감 리스트로 변신
        List<Dogam> dogamQuestion = new ArrayList<>();
        for (Long i : list){
            Dogam dogam = dogamRepository.findByDogamId(i);
            dogamQuestion.add(dogam);
        }
        List<DogamResponseDto> result = DogamResponseDto.MakeDogamResponseListToEncode(dogamQuestion);
        return result;
    }
    @Override
    public List<WordResponseDto> wordQuestion(Long userId){
        User user = userRepository.findByUserId(userId);

        List<WordResponseDto> wordResponseDtoList = new ArrayList<>(); // 반환할 Dto List
        List<Long> wordIdList = new ArrayList<>(); // 10문제 ID 뽑아넣는 List
        List<WrongWord> myWrong = wrongWordRepository.findAllByUser(user);
        if (myWrong.size() < 3){
            for (WrongWord m : myWrong){
                wordIdList.add(m.getWord().getWordId());
                wordResponseDtoList.add(WordResponseDto.fromEntityToEncodeAndFailed(m.getWord()));
            }
        }else{
            while (wordIdList.size() < 2) {
                Double d = Math.random() * myWrong.size();
                int index = d.intValue();
                Word word = myWrong.get(index).getWord();
                if(!wordIdList.contains(word.getWordId())){
                    wordIdList.add(word.getWordId());
                    wordResponseDtoList.add(WordResponseDto.fromEntityToEncodeAndFailed(word));
                }
            }
        }
        while (wordIdList.size() < 10) {
            Double d = Math.random() * wordRepository.count() + 1;
            Word word = wordRepository.findByWordId(d.longValue());
            WrongWord wrong = wrongWordRepository.findByWordAndUser(word, user);
            RightWord right = rightWordRepository.findByWordAndUser(word, user);
            if (wrong == null && right == null && !wordIdList.contains(word.getWordId())){
                wordIdList.add(d.longValue());
                wordResponseDtoList.add(WordResponseDto.fromEntityToEncode(word));
            }
        }

        return wordResponseDtoList;
    }

    @Override
    public List<WordResponseDto> wordQuestionWithFilter(Long userId, String filter){
        User user = userRepository.findByUserId(userId);
        List<WordResponseDto> wordResponseDtoList = new ArrayList<>();
        List<Long> wordIdList = new ArrayList<>(); // 10문제 뽑아올 List
        List<WrongWord> wrongWordList = wrongWordRepository.findAllByFilterAndUser(user, filter); // 해당 필터의 틀린 단어 리스트
        List<Word> wordList = wordRepository.findAllByWordRating(filter); // 해당 필터의 전체 단어 리스트
        List<Word> rightList = new ArrayList<>(); // 맞춘 단어 리스트
        List<RightWord> rightWordList = rightWordRepository.findAllByFilterAndUser(user, filter);
        for (RightWord rightWord : rightWordList) {
            Word rw = rightWord.getWord();
            rightList.add(rw);
        }
        System.out.println("rightList = " + rightList);
        wordList.removeAll(rightList);
        if(wordList.size() > 9){
            if (wrongWordList.size() < 3){
                for (WrongWord m : wrongWordList){
                    wordIdList.add(m.getWord().getWordId());
                    wordResponseDtoList.add(WordResponseDto.fromEntityToEncodeAndFailed(m.getWord()));
                }
            }else{
                while (wordIdList.size() < 2) {
                    Double d = Math.random() * wrongWordList.size();
                    int index = d.intValue();
                    Word word = wrongWordList.get(index).getWord();
                    if(!wordIdList.contains(word.getWordId())){
                        wordIdList.add(word.getWordId());
                        wordResponseDtoList.add(WordResponseDto.fromEntityToEncodeAndFailed(word));
                    }

                }
            }

            while (wordIdList.size() < 10) {
                Double d = Math.random() * wordList.size();
                int index = d.intValue();
                Word word = wordList.get(index);
                WrongWord wrong = wrongWordRepository.findByWordAndUser(word, user);
                if (wrong == null && !wordIdList.contains(word.getWordId())){
                    wordIdList.add(word.getWordId());
                    wordResponseDtoList.add(WordResponseDto.fromEntityToEncode(word));
                }
            }

            return wordResponseDtoList;
            }
        else{
            // 이 경우, 그냥 가진 문제를 다 주는 게 맞음. 틀린 문제를 합해도 10개가 안되는 경우이기 때문
            // 틀린 문제 찾는 로직 추가
            List<Long> wrongWordIdList = new ArrayList<>();
            for (WrongWord wrongWord : wrongWordList) {
                wrongWordIdList.add(wrongWord.getWord().getWordId());
            }
            List<WordResponseDto> result = new ArrayList<>();
            for (Word word : wordList) {
                if(wrongWordIdList.contains(word.getWordId())){
                    result.add(WordResponseDto.fromEntityToEncodeAndFailed(word));
                }
                else{
                    result.add(WordResponseDto.fromEntityToEncode(word));
                }
            }

            return result;
        }


    }


    @Override
    public PastTestResponseDto getPastInfo() {
        PastTest pastTest = pastTestRepository.findFirstByOrderByCreatedAtDesc();
        PastTestResponseDto result = PastTestResponseDto.fromEntity(pastTest);
        return result;
    }


    @Override
    public List<PastQuestionResponseDto> getPastTest(Long userId) {
        PastTest pastTest = pastTestRepository.findFirstByOrderByCreatedAtDesc();
        LocalDate today = LocalDate.now(); // 오늘 날짜 확인
        if(today.isBefore(pastTest.getStartTime()) || today.isAfter(pastTest.getEndTime())){ // 시작날짜보다 빠르거나 종료날짜보다 늦으면
            return null;
        }
        User user = userRepository.findByUserId(userId);
        List<PastQuestion> pastQuestionList = pastQuestionRepository.findAllByPastTest(pastTest);
        List<PastQuestionResponseDto> result = PastQuestionResponseDto.fromEntityList(pastQuestionList);

        // 테스트 문제 주면서 0점짜리 데이터 만들기
        PastTestResult pastTestResult = PastTestResult.builder()
                                        .pastTest(pastTest)
                                        .user(user)
                                        .score(0)
                                        .build();

        pastTestResultRepository.save(pastTestResult);

        return result;

    }


    @Override
    public Boolean createPastTestResult(PastTestResultRequestDto pastTestResultRequestDto) {

        User user = userRepository.findByUserId(pastTestResultRequestDto.getUserId());
        PastTest pastTest = pastTestRepository.findByPastTestId(pastTestResultRequestDto.getPastTestId());

        PastTestResult pastTestResult = pastTestResultRepository.findFirstByUserAndPastTest(user, pastTest);
        pastTestResult.updateScore(pastTestResultRequestDto.getScore());

        pastTestResultRepository.save(pastTestResult);

        return true;
    }

    @Override
    public List<PastTestResultResponseDto> getJangwonList(Long pastTestId) {
        System.out.println("pastTestId = " + pastTestId);
        PastTest pastTest = pastTestRepository.findByPastTestId(pastTestId);
        List<PastTestResult> pastTestResultList = pastTestResultRepository.findAllByPastTestAndScoreGreaterThanEqual(pastTest, 80);
        System.out.println("pastTestResultList = " + pastTestResultList);
        List<PastTestResultResponseDto> result = PastTestResultResponseDto.fromEntityList(pastTestResultList);
        System.out.println("result = " + result);
        return result;
    }


    @Override
    public Integer getPastScore(Long userId, Long pastTestId) {
        User user = userRepository.findByUserId(userId);
        PastTest pastTest = pastTestRepository.findByPastTestId(pastTestId);
        PastTestResult pastTestResult = pastTestResultRepository.findFirstByUserAndPastTest(user, pastTest);
        if(null == pastTestResult){
            return null;
        }
        return pastTestResult.getScore();
    }

}
