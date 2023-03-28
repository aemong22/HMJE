import {useGetWordRemainQuery} from "../../Store/api"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Main.module.css";
import { toast } from "react-toastify";
import { Toast } from "../Common/Toast";

function StudyStartModal({setOpenModal}:any):JSX.Element {
    const userId = localStorage.getItem("userId")
    const {data,error,isLoading} = useGetWordRemainQuery(userId);
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


    return(
        <>
            <Toast />
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none">
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
                                if(data?.data.remainLowWordCnt > 0 ){
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
                                if(data?.data.remainMiddleWordCnt > 0){
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
                                if(data?.data.remainHighWordCnt > 0){
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
                                if((data?.data.highWordCnt + data?.data.lowWordCnt + data?.data.middleWordCnt) > 0){
                                    localStorage.setItem("difficulty" , "")
                                    navigate('/wordStudy')
                                }
                                else {
                                    toast.error("모든 문제를 푸셨습니다.")
                                }
                        }}>
                                <img className="object-contain w-[4rem] h-[4rem] my-[0.5rem] mx-[0.5rem] hover:scale-125" style={{transition: 'all .4s'}} src={`/Assets/Icon/전체.png`} alt="뱃지"/>
                                <div>전체</div>
                                <div className="text-[1rem] text-[#B8B0B0]">{data?.data.highWordCnt + data?.data.lowWordCnt + data?.data.middleWordCnt}</div>
                            </div>
                        </div>
                        <div className="text-center text-[#B8B0B0] p-2">각 난이도 아래 숫자는 난이도별 남은 단어 갯수를 의미합니다.</div>

                        
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

export default StudyStartModal;