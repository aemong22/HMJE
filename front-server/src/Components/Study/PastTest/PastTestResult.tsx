import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "../../Common/Footer";
import Navbar from "../../Common/Navbar";
import { Toast } from "../../Common/Toast";
import { toast } from "react-toastify";
import { useGetStudyPastQuery } from "../../../Store/api";
import styled from './PastTestResult.module.css'

const PastTestResult = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();
  const [TestScore, setTestScore] = useState("");

  useEffect(() => {
    if (localStorage.getItem("accessToken") === "undefined") {
      // console.log("저리가! '/' 로!");
      navigate("/");
    } else {
      if (location.state !== null) {
        // console.log(location.state);
        if (location.state.newBadgeNum > 0) {
          // console.log("newBadgeNum나와야함");

          setTimeout(() => {
            toast.info(`칭호 ${location.state.newBadgeNum}개를 얻으셨습니다.`);
          }, 2000);
        }
        if (location.state.result >= 0) {
          // console.log("점수 저장됨", location.state.result);
          setTestScore(location.state.result);
        }
        if (location.state.level > 0) {
          // console.log("계급 상승됨");
          setTimeout(() => {
            toast.info("계급 상승!");
          }, 2000);
        }
        const stateData = {
          ...window.history.state,
          usr: {
            ...window.history.state.usr,
            newBadgeNum: 0,
            result: -10,
            level: 0,
          },
        };
        const pageTitle = "Title";
        const pageUrl = "/pasttestresult";
        window.history.replaceState(stateData, pageTitle, pageUrl);
      }
    }
  }, []);

  return (
    <>
      <Toast />
      <div className="flex flex-col justify-between h-[120vh] md:h-[100vh]">
        <Navbar />
        <ResultPage TestScore={TestScore} />
        <Footer />
      </div>
    </>
  );
};
function ResultPage({ TestScore }: any) {
  const navigate = useNavigate();
  const {
    data: pastInfo,
    error: error5,
    isLoading: isLoading5,
  } = useGetStudyPastQuery("");

  const gomain = () => {
    navigate("/main");
  };
  if (isLoading5) {
    return <>loading</>;
  } else if (error5) {
    return <>error</>;
  } else {
    return (
      <div className="flex flex-col items-center justify-center px-5 md:px-10">
        <div className="flex w-full justify-center items-center">
          <div className="flex flex-col max-w-3xl w-full md:w-[50rem] relative">
            <div className={`hidden md:flex justify-center w-full h-full absolute -top-56 ${styled.star}`}>
              <img className="object-contain scale-[95%] pb-[17.5rem]" src="/Assets/Icon/resultStar.png" alt="star" />
            </div>
            <div className={`flex md:hidden justify-center w-full h-full absolute -top-24 ${styled.smallStar}`}>
              <img className="object-contain scale-[60%] pb-36" src="/Assets/Icon/resultStar.png" alt="star" />
            </div>
            <div className="flex justify-center font-extrabold text-center text-[2rem] md:text-[3rem] pt-3 leading-7 pb-8">
              제&nbsp;
              <span className="text-black">{pastInfo.data.pastTestId}</span>
              회&nbsp;
              <span className="text-[#A87E6E]">과거시험</span>
              <span>&nbsp;결과</span>
            </div>
            <div className="flex justify-center items-center text-[#D30000] font-extrabold text-center md:py-[2rem] text-[4rem] md:text-[5.5rem] pt-6 pb-3 rounded-xl bg-[#F4EFEC] ">
              <span>60{TestScore}</span>
              <span className="text-black text-[3rem] md:text-[4rem] mx-2">점</span>
            </div>
            <div className="flex justify-between items-center w-full pt-5">
              <span className="text-[#be9584] text-[1.1rem] md:text-[1.3rem] font-semibold">경험치&nbsp;+{TestScore>=80?1000:300}</span>
              <span className="px-3 py-3 md:px-6 border-2 rounded-lg font-extrabold text-[0.9rem] md:text-[1rem] bg-[#F7CCB7] hover:bg-[#edb498] transition-all duration-300 text-white" onClick={gomain}>돌아가기</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PastTestResult;
