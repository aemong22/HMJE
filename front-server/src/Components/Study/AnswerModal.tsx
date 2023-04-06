import classNames from "classnames";
import { useEffect, useState } from "react";
import style from "./Study.module.css";

function AnswerModal({
  closeModal,
  right,
  question,
  num,
  setNum,
  setRight,
  studyType,
  setResultModal,
  modalOpen,
  dogam
}: any): JSX.Element {
  window.onkeyup = (e) => {
    if (e.key === "Shift" && modalOpen) {
      motion();
    }
  };

  const [decoding, setDecoding] = useState<string>();

  // 단어 디코딩
  useEffect(()=> {
    if(studyType === "wordStudy"){
      let temp = decodeURIComponent(escape(atob(question[num].wordName)))
      setDecoding(temp)
    }
    else if(studyType === "contextStudy"){
      let temp = decodeURIComponent(escape(atob(question[num].dogamName)))
      setDecoding(temp)
    }
    else {
      setDecoding(question[num].wordName)
    }

  },[])


  const motion = () => {
    setRight(false);
    closeModal();
    if (studyType !== "contextStudy") {
      if (num < (question.length-1)) {
        setNum(num + 1);
      } else {
        // 결과 모달창 뜨기
        setResultModal(true);
      }
    } else if (studyType === "contextStudy") {
      if (num < 4) {
        setNum(num + 1);
      } else {
        // 결과 모달창 뜨기
        setResultModal(true);
      }
    }
    else {
      console.log("에러");
    }
  };

  const handleSpeakClick = () => {
    const word = new SpeechSynthesisUtterance(decoding);
    speechSynthesis.speak(word);
    question[num].wordDetailResponseList.map((word:any, index:any) => {
      const mean = new SpeechSynthesisUtterance(word.details);
      speechSynthesis.speak(mean);
    })
  };
  

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="mx-4 my-1 border-b border-solid border-slate-200 md:pt-2 pt-1">
              {right ? (
                <>
                  {studyType !== "contextStudy" ? (
                    <div
                      className={`${style.checkicon} md:h-[3rem] h-[2rem]`}
                    ></div>
                  ) : (
                    <>
                    <div
                      className={`${style.geticon} md:h-[3rem] h-[2rem]`}
                    ></div>
                    
                    </>
                  )}
                  <div className="text-[1.5rem] font-bold mx-auto text-center">
                    {studyType !== "contextStudy" ? (
                      <>정답입니다.</>
                    ) : (
                      <>
                        {dogam.includes(question[num].dogamId) ? <>이미 획득한 도감입니다.</>:<>도감 획득 성공</>}
                      </>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="p-2"></div>
                  {studyType !== "contextStudy" ? (
                    <div
                      className={`${style.xicon} md:h-[2.5rem] h-[1.8rem]`}
                    ></div>
                  ) : (
                    <div
                      className={`${style.failicon} md:h-[3rem] h-[2rem]`}
                    ></div>
                  )}
                  <div className="text-[1.5rem] font-bold mx-auto text-center">
                    {studyType !== "contextStudy" ? (
                      <>오답입니다.</>
                    ) : (
                      <>
                      도감 획득 실패
                      </>
                    )}
                  </div>
                </>
              )}
            </div>

            {/*body header*/}
            <div className="relative px-4 pt-3 flex justify-between items-end sm:min-w-[25rem] min-w-[19rem]">
                <div className="flex">
                    <div className="md:text-[1.5rem] text-[1.2rem] font-bold mr-1 flex flex-wrap">
                        { studyType !== "contextStudy" ? 
                            <>{decoding}</> : right ? <>{decoding}</> : <><span className="px-3">?</span></>
                        }
                    </div>
                    {studyType !== "contextStudy" && question[num].wordIso > 0 && <div className="md:text-[1rem] text-[0.8rem] items-start text-[#A2A2A2] mr-1">{question[num].wordIso}</div>}
                    <div className="flex items-end">
                      {studyType !== "contextStudy" && question[num].wordOrigin && <div className="md:text-[1rem] text-[0.8rem] text-[#A2A2A2] mr-1 ">[{question[num].wordOrigin}]</div>}
                      {studyType === "contextStudy" && right && question[num].dogamOrigin && <div className="md:text-[1rem] text-[0.8rem] text-[#A2A2A2] mr-1">[{question[num].dogamOrigin}]</div>}
                      <div className="md:text-[1rem] text-[0.8rem] text-[#A2A2A2] mr-1">{studyType !== "contextStudy" ? <>{question[num].wordType}</>:<>{right && <>{question[num].dogamClass}</>}</>}</div>
                      {studyType !== "contextStudy" &&
                      <div className="flex items-center px-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer" onClick={handleSpeakClick}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                        </svg>
                      </div>
                      }
                    </div>
                </div>
                {studyType !== "contextStudy" && question[num].wordRating != "없음" && <div className="md:text-[1rem] text-[0.8rem] text-[#A2A2A2] mr-1">{question[num].wordRating}</div>}

                { studyType === "contextStudy" && <>
                  {[27,37,53,73,83,97].includes(question[num].dogamId) ? <div className={classNames("rounded-full px-3 text-[0.9rem] py-1 m-1 w-fit font-bold text-[#fff]", question[num].dogamId == 27 ? "bg-[#FED049] " : question[num].dogamId == 73 ? "bg-[#FC2947]" : question[num].dogamId == 37 ? "bg-[#FF8E9E]" : question[num].dogamId == 83 ? "bg-[#1C6DD0]" : question[num].dogamId == 97 ? "bg-[#B762C1]" : question[num].dogamId == 53 ? "bg-[#95CD41]" : "bg-[#AEAEAE]") }>
                      특별도감
                  </div> : null}
                </>}
                
            </div>
            {/* body content */}
            {studyType !== "contextStudy" && (
              <div className="relative px-4 py-3 max-h-[50vh] overflow-y-auto">
                {question[num].wordDetailResponseList.map(
                  (detail: any, idx: any) => {
                    let temp = detail.wordExampleResponseList.filter(
                      (ex: any) => ex.exampleType === "문장",
                    )[0]?.exampleDetail;
                    let example = temp
                      ? temp
                      : detail.wordExampleResponseList[0]?.exampleDetail;
                    return (
                      <div
                        key={idx}
                        className="bg-[#F4EFEC] rounded-lg p-4 md:text-[1.1rem] text-[1rem] font-medium my-2"
                      >
                        {detail.details}{" "}
                        <div className="mt-2 md:text-[1rem] text-[0.9rem] text-[#666666] leading-7">
                          <span className="mr-1 font-bold text-[#ffffff] rounded-full px-3 py-1 bg-[#F7CCB7] md:text-[0.9rem] text-[0.8rem]">
                            예제
                          </span>
                          {example}
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            )}
            {studyType === "contextStudy" && (
              <div className="relative px-4 py-3 max-h-[50vh] overflow-y-auto">
                <div className="bg-[#F4EFEC] rounded-lg p-4 md:text-[1.1rem] text-[1rem] font-medium my-2">
                  {question[num].dogamMean1}
                  {right && 
                  <>
                    <div className="mt-2 md:text-[1rem] text-[0.9rem] text-[#666666] leading-7">
                      <span className="mr-1 font-bold text-[#ffffff] rounded-full px-3 py-1 bg-[#F7CCB7] md:text-[0.9rem] text-[0.8rem]">
                      예제
                      </span>
                      {question[num].dogamExam1}
                    </div>
                  </>}
                </div>
                <div className="bg-[#F4EFEC] rounded-lg p-4 md:text-[1.1rem] text-[1rem] font-medium my-2">
                  {question[num].dogamMean2}
                  {right && 
                  <>
                    <div className="mt-2 md:text-[1rem] text-[0.9rem] text-[#666666] leading-7">
                      <span className="mr-1 font-bold text-[#ffffff] rounded-full px-3 py-1 bg-[#F7CCB7] md:text-[0.9rem] text-[0.8rem]">
                      예제
                      </span>
                      {question[num].dogamExam2}
                    </div>
                  </>}
                </div>
                <div className="bg-[#F4EFEC] rounded-lg p-4 md:text-[1.1rem] text-[1rem] font-medium my-2">
                  {question[num].dogamMean3}
                  {right && 
                  <>
                    <div className="mt-2 md:text-[1rem] text-[0.9rem] text-[#666666] leading-7">
                      <span className="mr-1 font-bold text-[#ffffff] rounded-full px-3 py-1 bg-[#F7CCB7] md:text-[0.9rem] text-[0.8rem]">
                      예제
                      </span>
                      {question[num].dogamExam3}
                    </div>
                  </>}
                </div>
              </div>
            )}

            {/*footer*/}
            <div className="flex items-center justify-end p-4 rounded-b">
              <button
                className="text-white bg-[#FFB4B4] font-bold uppercase md:text-base text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  motion();
                  speechSynthesis.cancel();
                }}
              >
                { num < question.length-1 ? (
                  <>다음 문제</>
                ) : (
                  <>결과 보기</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black/20"></div>
    </>
  );
}

export default AnswerModal;
