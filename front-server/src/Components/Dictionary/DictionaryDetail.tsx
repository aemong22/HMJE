import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";

import { showDictionaryDetail } from "../../Store/store";

const DictionaryDetail = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  //백그라운드 div
  const bgDiv = useRef<any>();
  const DictionaryDetailInfo = useAppSelector((state: any) => {
    return state.DictionaryDetailInfo;
  });

  function CloseDictionaryDetail(event: React.MouseEvent<HTMLDivElement>) {
    console.log("클릭인것같음", event.target);
    console.log("뭔가용", bgDiv.current);
    if (event.target === bgDiv.current) {
      console.log("인트로창꺼짐!");
      dispatch(showDictionaryDetail());
    }
  }

  return (
    <div
      ref={bgDiv}
      onMouseDown={CloseDictionaryDetail}
      className={
        "z-10 bg-slate-800 bg-opacity-5 fixed top-0 right-0 bottom-0 left-0"
      }
    >
      <div className="max-w-screen-lg mt-[5%] mx-auto max-h-[80%] overflow-auto border-2 bg-white rounded-lg px-[5%] py-[5%]">
        <div className="flex flex-col md:flex-row py-2 items-baseline justify-between">
          <div className="flex flex-col md:flex-row ">
            {/* 큰제목 */}
            <div className="text-black font-extrabold text-[3rem] lg:text-[3rem] py-2 ">
              {DictionaryDetailInfo.wordName}
            </div>
            {DictionaryDetailInfo.wordOrigin !== "" ? (
              <div className="py-2 mx-2 text-[#767676]">
                [ {DictionaryDetailInfo.wordOrigin} ]
              </div>
            ) : (
              <div className="py-2 mx-2 text-[#767676]"></div>
            )}
            <div className="text-[#767676] py-2">
              [ {DictionaryDetailInfo.wordType} ]
            </div>
            <div className="py-2 px-3">soundicon</div>
          </div>
          <div className="text-black flex flex-col items-baseline py-2">
            <div className="">{DictionaryDetailInfo.wordRating}</div>
          </div>
        </div>
        {DictionaryDetailInfo.wordDetailResponseList.map((it: any) => {
          return (
            <div className="flex flex-col justify-start">
              <div className="flex flex-col justify-start  pt-3 lg:py-3 px-5 bg-[#F4EFEC] rounded-2xl my-3 lg:my-6">
                <div className="flex text-black text-[1rem] lg:text- text-start">
                  {it.details}{" "}
                </div>
                <div className="flex flex-row py-3 items-center">
                  <div className=" min-w-[3rem] mr-2 rounded-lg lg:px-7 py-2 bg-[#F7CCB7] text-[#FFFFFF] lg:rounded-3xl text-[1rem]">
                    예제
                  </div>
                  <div className="text-[#5F5F5F] text-[1rem] lg:text-">
                    {it.details}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DictionaryDetail;
