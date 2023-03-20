import { useLazyGetStudyWordQuery, useLazyGetStudyContextQuery } from "../../Store/api";
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Navbar from "../Common/Navbar"
import AnswerModal from "./AnswerModal"
import ResultModal from "./ResultModal"
import Study from "./Study"

function WordStudy(): JSX.Element {
  const userId = localStorage.getItem("userId");

 
  // 학습 종류
  const location = useLocation();
  const [studyType, setStudyType] = useState<String>();
  useEffect(()=> {
    setStudyType((location.pathname).replace("/",""));
  },[])


  const [question, setQuestion] = useState<any>([]);
  
  // RTK QUERY 불러오기
  const [ getStudyWord,{ isLoading:LoadingWords, error:ErrorWords } ] = useLazyGetStudyWordQuery();
  const [ getStudyContext, { isLoading:LoadingContexts, error:ErrorContext } ] = useLazyGetStudyContextQuery();

  useEffect(() => {
    if(studyType === "wordStudy") {
      getStudyWord(userId).then((r) => { 
        return(r)
      }).then((r) => { 
        console.log(r.data.data) 
        setQuestion(r.data.data)
      })
    }
    else if(studyType === "contextStudy"){
      getStudyContext(userId).then((r) => { 
        return(r)
      }).then((r) => { 
        console.log(r.data.data) 
        setQuestion(r.data.data)
      })
    }

  
  },[studyType])
  
  // 학습 시작 시간
  const [startTime, setstartTime] = useState<any>();

  useEffect(()=>{
    setstartTime(Date.now())
  },[])

  // 현재 문제 번호
  const [num, setNum] = useState<number>(0)

  // 세모 개수
  const [semo, setSemo] = useState<number>(0)

  // 맞힌 word_id
  const [correct, setCorrect] = useState([])

  // 틀린 word_id
  const [wrong, setWrong] = useState([])

  // 정답, 오답 모달
  const [modalOpen, setModalOpen ] = useState<Boolean>(false);

  const openModal = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  // 결과 모달
  const [resultModal, setResultModal] = useState<Boolean>(false);

  // 맞힘 틀림
  const [right, setRight] = useState<Boolean>(false);

  if(LoadingContexts || LoadingWords) {
    return <div>Loading...</div>
  }
  if(ErrorWords || ErrorContext) {
    return <div>error</div>
  }

  return (
    <>

       {question.length > 0 && 
       <>
       <Navbar/>
       <Study 
         question={question}
         studyType={studyType} 
         num={num}
         correct={correct} setCorrect={setCorrect} 
         wrong={wrong} setWrong={setWrong}
         semo={semo}
         setSemo={setSemo}
         right={right} setRight={setRight}
         setResultModal={setResultModal}
         openModal={openModal}/>
 
       { modalOpen ? 
         <AnswerModal 
           closeModal={closeModal} 
           studyType={studyType} 
           setRight={setRight}
           right={right} 
           num={num} 
           setNum={setNum}
           setResultModal={setResultModal} 
           question={question
         }/> : null }
 
         {resultModal ? 
           <ResultModal 
             studyType={studyType} 
             setResultModal={setResultModal}
             correct={correct}
             semo={semo}
             wrong={wrong}
             startTime={startTime}
             /> : null}
     </>
      }
    </>
   
  )
}

export default WordStudy