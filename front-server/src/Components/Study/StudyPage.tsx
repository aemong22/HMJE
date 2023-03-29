import { useLazyGetStudyWordQuery, useLazyGetStudyContextQuery,useLazyGetWordWrongQuery } from "../../Store/api";
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Navbar from "../Common/Navbar"
import AnswerModal from "./AnswerModal"
import ResultModal from "./ResultModal"
import Study from "./Study"
import Loading from "../Common/Loading";

function WordStudy(): JSX.Element {
  const userId = localStorage.getItem("userId");
  const difficulty = localStorage.getItem("difficulty")

 
  // 학습 종류
  const location = useLocation();
  const [studyType, setStudyType] = useState<String>();
  
  useEffect(()=> {
    setStudyType((location.pathname).replace("/",""));
  },[])


  const [question, setQuestion] = useState<any>([]);

  // 현재 문제 번호 
  const [num, setNum] = useState<number>(0)
  
  // RTK QUERY 불러오기
  const [ getStudyWord,{ isLoading:LoadingWords, error:ErrorWords } ] = useLazyGetStudyWordQuery();
  const [ getStudyContext, { isLoading:LoadingContexts, error:ErrorContext } ] = useLazyGetStudyContextQuery();
  const [ getWordWrong, { isLoading:LoadingWrong, error:ErrorWrong } ] = useLazyGetWordWrongQuery();



  useEffect(() => {

    if(studyType === "wordStudy") {
      const tempData = {
        userId : userId,
        difficulty : difficulty,
      }
      getStudyWord(tempData).then((r) => { 
        const myArray = [...r.data.data];
        myArray.sort(() => Math.random() - 0.5);
        setQuestion(myArray)
      })
    }
    else if(studyType === "contextStudy"){
      getStudyContext(userId).then((r) => { 
        return(r)
      }).then((r) => { 
        setQuestion(r.data.data)
      })
    }
    else if(studyType === "wrongStudy"){
      getWordWrong(userId).then((r) => {
        const myArray = [...r.data.data];
        myArray.sort(() => Math.random() - 0.5);
        setQuestion(myArray)
      })
    }

  
  },[studyType])
  
  // 학습 시작 시간
  const [startTime, setstartTime] = useState<any>();

  useEffect(()=>{
    setstartTime(Date.now())
  },[])

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

  // 경험치
  const [exp, setExp] = useState<number>(0);

  if(LoadingContexts || LoadingWords || LoadingWrong) {
    return(
      <>
        <Loading />
      </>
    )
  }

  if(ErrorWords){
    console.log(ErrorWords)
  }
  return (
    <>

       {question?.length > 0 &&
        <div className="bg-[#F9F9F9] w-full h-screen">
          <Navbar />
          {resultModal && 
              <ResultModal 
                studyType={studyType} 
                setResultModal={setResultModal}
                correct={correct}
                semo={semo}
                wrong={wrong}
                startTime={startTime}
                />}
                

          { modalOpen && 
            <AnswerModal 
              closeModal={closeModal} 
              studyType={studyType} 
              setRight={setRight}
              right={right} 
              num={num}
              modalOpen={modalOpen}
              setNum={setNum}
              setResultModal={setResultModal} 
              question={question
            }/> }
            
  
          <Study 
            question={question}
            studyType={studyType} 
            num={num}
            exp={exp} setExp={setExp}
            correct={correct} setCorrect={setCorrect} 
            wrong={wrong} setWrong={setWrong}
            semo={semo}
            setSemo={setSemo}
            right={right} setRight={setRight}
            resultModal={resultModal}
            setResultModal={setResultModal}
            openModal={openModal}
            closeModal={closeModal}
            modalOpen={modalOpen}/>
    
    
          </div>
      
      }
    </>
   
  )
}


export default WordStudy