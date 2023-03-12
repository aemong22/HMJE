import { useState } from "react"
import Navbar from "../Common/Navbar"
import Study from "./Study"

function WordStudy(): JSX.Element {
  const question: object = [{
    word_id: 123,
    word_name: "무지개",
    word_type: 3,
    word_rating: "초급",
    word_detail: "공중에 떠 있는 물방울이 햇빛을 받아 나타나는, 반원 모양의 일곱 빛깔의 줄",
    word_example: "비가 그치고 구름 사이로 무지개가 나타났다.",
  },{
    word_id: 124,
    word_name: "강아지",
    word_type: 3,
    word_rating: "초급",
    word_detail: "개의 새끼.",
    word_example: "우리 집 개가 어제 강아지 다섯 마리를 낳았다.",
  },{
    word_id: 125,
    word_name: "강아지",
    word_type: 3,
    word_rating: "초급",
    word_detail: "개의 새끼.",
    word_example: "우리 집 개가 어제 강아지 다섯 마리를 낳았다.",
  },{
    word_id: 126,
    word_name: "강아지",
    word_type: 3,
    word_rating: "초급",
    word_detail: "개의 새끼.",
    word_example: "우리 집 개가 어제 강아지 다섯 마리를 낳았다.",
  },{
    word_id: 127,
    word_name: "강아지",
    word_type: 3,
    word_rating: "초급",
    word_detail: "개의 새끼.",
    word_example: "우리 집 개가 어제 강아지 다섯 마리를 낳았다.",
  }] 
  
  // 학습 시작 시간
  const startTime = Date.now()

  // 학습 마무리 시간

  // 현재 문제 번호
  const [num, setNum] = useState<number>(0)

  // 세모 개수
  const [semo, setSemo] = useState<number>(0)

  // 맞힌 word_id
  const [correct, setCorrect] = useState([])

  // 틀린 word_id
  const [wrong, setWrong] = useState([])

  return (
    <>
      <Navbar/>
      <Study 
        question={question}
        studyType="word" 
        num={num} setNum={setNum}
        correct={correct} setCorrect={setCorrect} 
        wrong={wrong} setWrong={setWrong} 
        setSemo={setSemo}/>
    </>
  )
}

export default WordStudy