import {usePostStudyWordResultMutation,usePostStudyStudyTimeMutation, usePostStudyContextResultMutation} from "../../Store/api";
import { useNavigate } from "react-router-dom";
import style from "./Study.module.css";
import { useEffect } from "react";

function ResultModal({studyType,setResultModal, correct, semo, wrong,startTime}:any):JSX.Element {
  const userId = localStorage.getItem("userId");  
  const navigate = useNavigate()
  console.log("맞힌거", correct);
  console.log("틀린거", wrong);

    //RTK
    const [postStudyWordResult, {isLoading : resultLoading, error:resultError}]= usePostStudyWordResultMutation();
    const [postStudyStudyTime, {isLoading : timeLoading, error:timeError}] = usePostStudyStudyTimeMutation();
    const [postStudyContextResult, {isLoading : resultLoading2, error:resultError2}] = usePostStudyContextResultMutation();

    useEffect(() => {
      if(studyType === "wordStudy") {
        postStudyWordResult({correct,semo, userId,wrong}).then((result) =>  {
        })
        const type = 0
        postStudyStudyTime({korEnd,korStart,studyTime,type,userId}).then((result) => {
        })

      }
      else if (studyType === "contextStudy") {
        postStudyContextResult({correct,semo, userId,wrong}).then((result) =>  {
        })
        const type = 1
        postStudyStudyTime({korEnd,korStart,studyTime,type,userId}).then((result) => {
        })

      }

    },[])

    let getExp = 0;

    // 학습 시작 시간
    const endTime = Date.now()
    let studyTime = Math.round((endTime - startTime) / 1000)
    
    // 시작시간 커스텀
    const korStart = new Date(startTime).toISOString();
    // 끝 시간 커스텀
    const korEnd = new Date(endTime).toISOString();

    // 끝 시간 커스텀



    // 단어 학습
    if(studyType === "wordStudy") {
        getExp = Object.keys(correct).length * 10
    }

    if(resultLoading || timeLoading || resultLoading2) {
      return <>Loading...</>
    }

    if(resultError|| timeError || resultError2) {
      return <>error...</>
    }

    return(
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none">
                
                {/*header*/}
                <div className="mx-4 my-1 border-b border-solid border-slate-200 rounded-t md:pt-2 pt-1">
                    <div className={`${style.resulticon} md:h-[4rem] h-[2rem]`}></div>
                    <div className="md:text-[1.8rem] text-[1.2rem] font-bold mx-auto text-center">학습 결과</div>
                </div>
                {/* body content */}
                <div className="relative md:px-4 py-2 px-4">
                    <div className="bg-[#F4EFEC] rounded-lg p-4 md:text-[1.1rem] text-[1rem] font-medium flex justify-between items-center">
                    <div className="md:px-10 px-5">
                            <div className={`${style.oicon} md:h-[5rem] md:w-[5rem] w-[2.5rem] h-[2.5rem]`}></div>
                            <div className="text-center font-bold md:text-[2rem] text-[1.3rem] text-[#0082E0]">{correct.length}</div>
                        </div>
                        {studyType !== "contextStudy" && 
                        <div className="md:px-10 px-5">
                          <div className={`${style.semoicon} md:h-[5rem] md:w-[5rem] w-[2.5rem] h-[2.5rem]`}></div>
                          <div className="text-center font-bold md:text-[2rem] text-[1.3rem] text-[#FFA800]">{semo}</div>
                        </div>
                        }
                        <div className="md:px-10 px-5">
                            <div className={`${style.xicon} md:h-[5rem] md:w-[5rem] w-[2.5rem] h-[2.5rem]`}></div>
                            <div className="text-center font-bold md:text-[2rem] text-[1.3rem] text-[#E40000]">{wrong.length}</div>
                        </div>
                    </div>

                </div>

                {/*footer*/}
                <div className="flex md:justify-between py-2 px-4 flex-wrap md:flex-row flex-col items-center md:w-auto">
                  <div className="text-sm text-[#5F5F5F]">학습시간 : <span className="text-[#A87E6E] font-bold pr-2">{studyTime}초 </span>{" "}
                  {studyType !== "contextStudy" &&
                    <>획득 경험치 : <span className="text-[#A87E6E] font-bold">{10 * correct.length}</span></>
                  }
                
                  </div> 
                  <button
                    className="block text-white bg-[#F7CCB7] font-bold uppercase md:w-auto w-full md:text-base text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mt-1 mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                        setResultModal(false)
                        navigate('/main')
                        }
                    }
                  >
                    확인
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}

export default ResultModal