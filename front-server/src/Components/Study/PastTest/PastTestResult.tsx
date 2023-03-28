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
    <>
      <div className="flex flex-col justify-between h-[100vh]">
        <Navbar />
        <Toast />
        <ResultPage TestScore={TestScore} />
        <Footer />
      </div>
    </>
  );
};
function ResultPage({ TestScore }: any) {
  return (
    <div className="flex flex-col max-w-screen-lg w-[80%] mx-auto">
      <div className="w-[50%]">{TestScore}점 입니다</div>
      <div className="m-2">메인으로 돌아가기</div>
    </div>
  );
}

export default PastTestResult;
