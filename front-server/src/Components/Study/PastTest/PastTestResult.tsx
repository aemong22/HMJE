import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "../../Common/Footer";
import Navbar from "../../Common/Navbar";
import { Toast } from "../../Common/Toast";
import { toast } from "react-toastify";

const PastTestResult = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();
  const [TestScore, setTestScore] = useState("");

  useEffect(() => {
    if (localStorage.getItem("accessToken") === "undefined") {
      console.log("저리가! '/' 로!");
      navigate("/");
    } else {
      if (location.state !== null) {
        console.log(location.state);
        if (location.state.newBadgeNum > 0) {
          console.log("newBadgeNum나와야함");

          setTimeout(() => {
            toast.info(`칭호 ${location.state.newBadgeNum}개를 얻으셨습니다.`);
          }, 2000);
        }
        if (location.state.result >= 0) {
          console.log("점수 저장됨", location.state.result);
          setTestScore(location.state.result);
        }
        if (location.state.level > 0) {
          console.log("계급 상승됨");
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
    <div className="flex flex-col justify-between h-[100vh]">
      <Navbar />
      <Toast />
      <ResultPage TestScore={TestScore} />
      <Footer />
    </div>
  );
};
function ResultPage({ TestScore }: any) {
  const navigate = useNavigate();
  const gomain = () => {
    navigate("/main");
  };
  return (
    <div className="flex flex-col items-center justify-center px-10">
      {/* <!-- Login box --> */}
      <div className="flex flex-col justify-center">
        <div className="flex flex-col items-center space-y-2 text-center mb-[1rem]">
          <div className="text-3xl font-extrabold text-[#A87E6E] md:text-6xl">
            홍민정음
          </div>
          <div className="text-[#BD9789] font-extrabold text-[15px] leading-7 md:text-[24px] md:leading-8  w-[20rem] ">
            즐거운 단어 학습
          </div>
        </div>
        <div className="flex flex-col max-w-xl w-[100%] lg:w-[50rem] space-y-5 ">
          <div className="text-[#A87C6E] font-extrabold text-center text-3xl pt-3 leading-7">
            과거시험
          </div>
          <div className="flex flex-row  justify-center">
            <div className=" text-[#f35050]  font-extrabold text-center text-5xl pt-3 leading-7">
              {TestScore}점
            </div>
            <div className="text-[#A87C6E]  font-extrabold text-center text-[1rem] pt-3 leading-7">
              입니다
            </div>
          </div>

          <button
            className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-extrabold bg-[#BF9F91] text-white"
            onClick={gomain}
          >
            메인으로
          </button>
        </div>
      </div>
    </div>
  );
}

export default PastTestResult;
