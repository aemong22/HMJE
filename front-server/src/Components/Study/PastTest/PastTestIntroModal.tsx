import { log } from "console";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetStudyPastQuery } from "../../../Store/api";
import { useAppDispatch } from "../../../Store/hooks";
import { showPastTestIntro } from "../../../Store/store";
import style from "./PastTestIntroModal.module.css";

const PastTestIntroModal = ({
  userScore,
}: {
  userScore: number;
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  //백그라운드 div
  const bgDiv = useRef<any>();

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // 0부터 시작하므로 +1을 해줍니다.
  var date = today.getDate();
  var today_temp;
  if (date < 10) {
    today_temp = year + "-" + "0" + month + "-0" + date;
  }
  else{
    today_temp = year + "-" + "0" + month + "-" + date;
  }
  

  const {
    data: test,
    isLoading: isLoading2,
    error: error2,
  } = useGetStudyPastQuery("");

  // 프로필선택 모달 끄는 함수
  function ClosePastTestIntro(event: React.MouseEvent<HTMLDivElement>) {
    //console.log("클릭인것같음", event.target);
    //console.log("뭔가용", bgDiv.current);

    if (event.target === bgDiv.current) {
      //console.log("인트로창꺼짐!");
      dispatch(showPastTestIntro());
    }
  }

  const Nav = (e: any) => {
    if (e.target.id === "OUT") {
      dispatch(showPastTestIntro());
    } else if (e.target.id === "START") {
      dispatch(showPastTestIntro());
      navigate("/pasttest");
    }
  };

  useEffect(() => {
    // console.log(test);

    return () => {};
  }, [test]);

  if (isLoading2) {
    return <></>;
  } else if (error2) {
    return <></>;
  } else {
    // console.log("test.data.startTime : ", test.data.startTime);
    // console.log("test.data.endTime : ", test.data.endTime);
    // console.log("시작시간 만족?", test.data.startTime <= today_temp);
    // console.log("끝시간 만족?", test.data.endTime >= today_temp);
    // console.log("오늘은?", today_temp);

    // console.log(
    //   test.data.startTime <= today_temp && test.data.endTime >= today_temp,
    // );

    return (
      <>
        {test.data.startTime <= today_temp &&
        test.data.endTime >= today_temp ? (
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div
              ref={bgDiv}
              onMouseDown={ClosePastTestIntro}
              className={
                "z-10 bg-slate-800 bg-opacity-80 fixed top-0 right-0 bottom-0 left-0"
              }
            >
              <div className="relative top-[10rem] m-6 mx-auto max-w-lg p-2">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white px-4">
                  {/*header*/}
                  <div className="mx-4 my-1 border-b border-solid border-slate-200 md:pt-2 pt-1">
                    <>
                      <div
                        className={`${style.oicon} md:h-[3rem] h-[2rem]`}
                      ></div>
                      <div className="text-[1.5rem] font-bold mx-auto text-center ">
                        <>과거시험은 한번만 응시 가능합니다.</>
                      </div>
                    </>
                  </div>
                  <div className="relative px-4 pt-3 flex justify-center items-end sm:min-w-[25rem] min-w-[19rem]">
                    <div className="flex flex-col items-center text-[#c70505]">
                      <div className="md:text-[1.0rem] text-[1.2rem] font-bold mr-1 ">
                        주의
                      </div>
                      <div className="flex flex-col items-center justify-center max-w-[100%]">
                        <span>과거시험장을 나가게 되면 응시가 불가합니다.</span>
                        <span>시작하기 버튼을 누르면 바로 시작합니다.</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between px-5 py-6 ">
                    <button
                      id="OUT"
                      className="w-[40%] h-[40%] py-2 bg-[#B7B7B7] rounded-[10px] text-white font-extrabold transform duration-300 translate-x-1 hover:scale-110"
                      onClick={Nav}
                    >
                      그만두기
                    </button>
                    {userScore == null ? (
                      <button
                        id="START"
                        className="w-[40%] h-[40%] py-2 bg-[#F5BEA4] rounded-[10px] text-white font-extrabold transform duration-300 translate-x-1 hover:scale-110"
                        onClick={Nav}
                      >
                        시작하기
                      </button>
                    ) : (
                      <button
                        id="OUT"
                        className="w-[40%] h-[40%] py-2 bg-[#000000] rounded-[10px] text-white font-extrabold transform duration-300 translate-x-1 hover:scale-110"
                        onClick={Nav}
                      >
                        응시완료
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div
              ref={bgDiv}
              onMouseDown={ClosePastTestIntro}
              className={
                "z-10 bg-slate-800 bg-opacity-20 fixed top-0 right-0 bottom-0 left-0"
              }
            >
              <div className="relative top-[10rem] m-6 mx-auto max-w-lg p-2">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white px-4">
                  {/*header*/}
                  <div className="mx-4 my-1 border-b border-solid border-slate-200 md:pt-2 pt-1">
                    <>
                      <div
                        className={`${style.oicon} md:h-[3rem] h-[2rem]`}
                      ></div>
                      <div className="text-[1.5rem] font-bold mx-auto text-center ">
                        <>과거시험 기간이 아닙니다</>
                      </div>
                    </>
                  </div>
                  <div className="relative px-4 pt-3 flex justify-center items-end sm:min-w-[25rem] min-w-[19rem]">
                    <div className="flex flex-col items-center text-[#bf6528]">
                      <div className="md:text-[1.0rem] text-[1.2rem] font-bold mr-1 "></div>
                      <div className="flex flex-col items-center justify-center max-w-[100%]">
                        <span>과거시험 기간에 접속 가능한 서비스입니다.</span>
                        <span>과거시험 일정을 확인해주세요</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between px-5 py-6 ">
                    <button
                      id="OUT"
                      className="w-[100%] h-[40%] py-2 bg-[#B7B7B7] rounded-[10px] text-white font-extrabold transform duration-300 translate-x-1 hover:scale-110"
                      onClick={Nav}
                    >
                      돌아가기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
};

export default PastTestIntroModal;
