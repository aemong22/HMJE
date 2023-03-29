import {usePostStudyWordResultMutation,usePostStudyStudyTimeMutation, usePostStudyContextResultMutation} from "../../Store/api";
import { useNavigate } from "react-router-dom";
import style from "./Study.module.css";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Toast } from "../Common/Toast";

function ResultModal({studyType,setResultModal, correct, semo, wrong,startTime}:any):JSX.Element {
  const userId = localStorage.getItem("userId");  
  const navigate = useNavigate()

    //RTK
    const [postStudyWordResult, {isLoading : resultLoading, error:resultError}]= usePostStudyWordResultMutation();
    const [postStudyStudyTime, {isLoading : timeLoading, error:timeError}] = usePostStudyStudyTimeMutation();
    const [postStudyContextResult, {isLoading : resultLoading2, error:resultError2}] = usePostStudyContextResultMutation();

    useEffect(() => {
      if(studyType === "wordStudy") {
        postStudyWordResult({correct,semo, userId,wrong}).then((result:any) =>  {;
          // 레벨 상승
          if(result?.data.level > 0){
            toast.info("등급 상승!")
          }

        })
        const type = 0
        postStudyStudyTime({korEnd,korStart,studyTime,type,userId}).then((result:any) => {
          // 스터디 뱃지 얻었냐 
          if(result?.data.newBadge.length > 0){
            toast.info(`칭호 ${result?.data.newBadge.length}개를 얻으셨습니다.`)
          }

        })

      }
      else if (studyType === "contextStudy") {
        postStudyContextResult({correct,semo, userId,wrong}).then((result:any) =>  {


          // 뱃지, 레벨
          if(result?.data.level > 0){
            toast.info("등급 상승!")
          }

          if(result?.data.newBadge.length > 0) {
            toast.info(`칭호 ${result?.data.newBadge.length}개를 얻으셨습니다.`)
          }
          
          // 뉴 도감 리스트
          if(result?.data.data.length > 0) {
            toast.info(`새로운 도감 ${result?.data.data.length}개를 얻으셨습니다.`)
          }

        })
        const type = 1
        postStudyStudyTime({korEnd,korStart,studyTime,type,userId}).then((result:any) => {

          // 스터디 뱃지 얻었냐 
            if(result?.data.newBadge.length > 0) {
              toast.info(`칭호 ${result?.data.newBadge.length}개를 얻으셨습니다.`)
            }
        })

      }
      else if(studyType === "wrongStudy") {
        const type = 3
        postStudyStudyTime({korEnd,korStart,studyTime,type,userId}).then((result:any) => {
          // 스터디 뱃지 얻었냐 
          if(result?.data.newBadge.length > 0) {
            toast.info(`칭호 ${result?.data.newBadge.length}개를 얻으셨습니다.`)
          }
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
        getExp = (correct.length * 10) + (semo * 5)
    }

    if(resultLoading || timeLoading || resultLoading2) {
      console.log("로딩중")
    }

    else if(resultError|| timeError || resultError2) {
      console.log("에러")
    }
    
    return(
        <>
          <Toast />
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                
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

                <div className="py-2 px-4 text-sm text-[#5F5F5F]">학습시간 : <span className="text-[#A87E6E] font-bold pr-2">{studyTime}초 </span>{" "}
                  {studyType === "wrongStudy" &&
                    <>획득 경험치 : <span className="text-[#A87E6E] font-bold">{getExp}</span></>
                  }
                
                  </div>
                {/*footer*/}
                <div className="flex md:justify-between flex-wrap px-4 md:w-auto w-full pb-2">
                {studyType !== "contextStudy" ? 
                  <div className="text-[0.7rem] text-[#B2B2B2] flex flex-col justify-center flex-wrap">틀린 단어는 오답공책에서 확인할 수 있습니다.</div>
                : 
                  <div className="text-[0.7rem] text-[#B2B2B2] flex flex-col justify-center flex-wrap">획득한 도감은 문맥도감에서 확인할 수 있습니다.</div>
                }
                  <div className="flex flex-wrap md:pt-0 pt-1 justify-end md:w-fit w-full">
                    {studyType !== "contextStudy" ?
                      <>
                        <button
                          className="block text-white bg-[#AEE1E1] font-bold md:w-auto w-fit md:text-base text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mt-1 mr-2 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => {
                            setResultModal(false)
                            localStorage.removeItem("difficulty")
                            navigate('/note')
                            }}
                        >오답 확인
                        </button>
                      </>
                    :
                    <button
                      className="block text-white bg-[#AEE1E1] font-bold w-fit md:text-base text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mt-1 mr-2 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        setResultModal(false)
                        navigate('/dogam')
                        }}
                    >도감 확인
                    </button>
                    }
                    <button
                      className="block text-white bg-[#FFB4B4] font-bold md:w-auto w-fit md:text-base text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mt-1 mr-1 mb-1 ease-linear transition-all duration-150"
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
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
  
}

export default ResultModal