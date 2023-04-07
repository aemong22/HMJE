import {useGetWordRemainQuery} from "../../Store/api"
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Main.module.css";
import { toast } from "react-toastify";
import { Toast } from "../Common/Toast";
import Loading from "../Common/Loading";
import ErrorPage from "../Common/ErrorPage";

function StudyStartModal({setOpenModal}:any):JSX.Element {
    const ref = useRef<HTMLDivElement>(null)
    const userId = localStorage.getItem("userId")
    const {data,isLoading, error} = useGetWordRemainQuery(userId);
    const navigate = useNavigate();


    useEffect(() => {
        document.body.style.cssText = `
          position: fixed; 
          top: -${window.scrollY}px;
          overflow-y: scroll;
          width: 100%;`;
        return () => {
          const scrollY = document.body.style.top;
          document.body.style.cssText = "";
          window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
        };
      }, []);

    if(isLoading) {
        // console.log("잠시만 기다려주세요.")
        return(
            <></>
        )
    }
    else if(error) {
        return(
        <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
          <div className="relative my-6 mx-auto overflow-hidden items-center">
            <div className="border-0 rounded-lg relative flex flex-col w-full py-3 md:px-1 px-0 bg-white">
              <ErrorPage />
            </div>
          </div>
        </div>
        <div className="fixed inset-0 z-40 bg-black/20"></div>
        </>
        )
    }

    else {
    return(
        <>
            <Toast />
            <div ref={ref} className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none" onClick={(e)=> {
                if (e.target === ref.current) {
                    setOpenModal(false)
                }
            }}>
                <div className="relative mx-auto w-[35rem] max-w-lg">
                    <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-white p-5 ">
                        <div className="text-center border-b-2 border-neutral-100 py-2">
                            <div className="text-[2rem] font-bold text-[#B4846C]">
                                단어 학습
                            </div>
                            <div className="text-[#D7C0AE]">
                                난이도를 선택해주세요.
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-around">
                            <div className="text-[1.2rem] font-bold text-center p-2 text-[#F90716] " onClick={() => {
                                if(data!.data!.remainLowWordCnt > 0 ){
                                    localStorage.setItem("difficulty" , "초급")
                                    navigate('/wordStudy')
                                }
                                else{
                                    toast.error("모든 문제를 푸셨습니다.")
                                }

                                }
                            }>
                                <img className="object-contain w-[4rem] h-[4rem] my-[0.5rem] mx-[0.5rem] hover:scale-125" style={{transition: 'all .2s'}} src={`/Assets/Icon/초급.png`} alt="뱃지"/>
                                <div>초급</div>
                                <div className="text-[1rem] text-[#B8B0B0]">{data?.data.remainLowWordCnt}</div>
                            </div>
                            <div className="text-[1.2rem] font-bold text-center p-2 text-[#FFCA03]" onClick={() => {
                                if(data!.data!.remainMiddleWordCnt > 0){
                                    localStorage.setItem("difficulty" , "중급")
                                    navigate('/wordStudy')
                                }
                                else {
                                    toast.error("모든 문제를 푸셨습니다.")
                                }
                            }
                        }>
                                <img className="object-contain w-[4rem] h-[4rem] my-[0.5rem] mx-[0.5rem] hover:scale-125" style={{transition: 'all .4s'}} src={`/Assets/Icon/중급.png`} alt="뱃지"/>
                                <div>중급</div>
                                <div className="text-[1rem] text-[#B8B0B0]">{data?.data.remainMiddleWordCnt}</div>
                            </div>
                            <div className="text-[1.2rem] font-bold text-center p-2 text-[#3F72AF]" onClick={() => {
                                if(data!.data!.remainHighWordCnt > 0){
                                    localStorage.setItem("difficulty" , "고급")
                                    navigate('/wordStudy')
                                }
                                else {
                                    toast.error("모든 문제를 푸셨습니다.")
                                }
                        }}>
                                <img className="object-contain w-[4rem] h-[4rem] my-[0.5rem] mx-[0.5rem] hover:scale-125" style={{transition: 'all .4s'}} src={`/Assets/Icon/고급.png`} alt="뱃지"/>
                                <div>고급</div>
                                <div className="text-[1rem] text-[#B8B0B0]">{data?.data.remainHighWordCnt}</div>
                            </div>
                            <div className="text-[1.2rem] font-bold text-center p-2 text-[#798777]" onClick={() => {
                                localStorage.setItem("difficulty" , "")
                                navigate('/wordStudy')  
                        }}>
                                <img className="object-contain w-[4rem] h-[4rem] my-[0.5rem] mx-[0.5rem] hover:scale-125" style={{transition: 'all .4s'}} src={`/Assets/Icon/전체.png`} alt="뱃지"/>
                                <div>전체</div>
                            </div>
                        </div>
                        <div className="text-center text-[#B8B0B0] text-[0.9rem] p-1">각 난이도 아래 숫자는 난이도별 남은 단어 갯수를 의미합니다.</div>
                        <div className="text-center text-[#B8B0B0] text-[0.9rem] px-1 flex justify-center items-center">난이도에 따라 획득 경험치가 다르게 적용됩니다.
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                            </svg>
                        </div>

                        <div className="text-center text-[#B8B0B0] p-1 hidden">경험치는 맞힌 단어 당 초급은 10, 중급은 15, 고급은 20 얻을 수 있습니다. 귀뜸으로 도움을 받은 경우는 난이도에 상관없이 경험치 5를 획득할 수 있습니다.</div>

                        
                        <div className="flex flex-row justify-between pt-2 text-[1.2rem]">
                            <button
                                id="OUT"
                                className="w-full py-2 bg-[#DFD3C3] rounded-lg text-white font-extrabold hover:bg-[#CDBBA7]" style={{transition: 'all .2s'}}
                                onClick={()=> setOpenModal(false)}
                            >
                                취소
                            </button>
                            </div>

                    </div>
                </div>
            </div>
            <div className="fixed inset-0 z-40 bg-black/30"></div>
        </>
    )
                    }
}

export default StudyStartModal;