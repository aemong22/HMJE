import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";

import { showDictionaryDetail } from "../../Store/store";
import { useGetTtsQuery, useLazyGetTtsQuery } from "../../Store/ttsApi";

const DictionaryDetail = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [url, seturl] = useState("");

  const [audio, setaudio] = useState(new Audio());

  const [getTts, { error: error1, isLoading: isLoading1 }] =
    useLazyGetTtsQuery();

  //백그라운드 div
  const bgDiv = useRef<any>();
  const DictionaryDetailInfo = useAppSelector((state: any) => {
    return state.DictionaryDetailInfo;
  });

  // const { data: urlDate, isLoading } = useGetTtsQuery(DictionaryDetailInfo.wordName);

  function handlePlay() {
    audio.play();
  }

  function CloseDictionaryDetail(event: React.MouseEvent<HTMLDivElement>) {    
    if (event.target === bgDiv.current) {
      dispatch(showDictionaryDetail());
    }
  }
  // console.log(DictionaryDetailInfo);
  const tts = (text: any) => {
    // console.log(`${text} tts`);
    getTts(text)
      .unwrap()
      .then((r) => {
        // console.log(r);
        
        const urltemp: string = r.date;
        const a = new Audio(`${urltemp}`);
        a.play();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  // useEffect(() => {
  //   const a = new Audio(`${url}`);
  //   setaudio(a);
  //   return () => {};
  // }, [url]);

  return (
    <div
      ref={bgDiv}
      onMouseDown={CloseDictionaryDetail}
      className={
        "z-10 bg-slate-800 bg-opacity-30 fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center overflow-x-hidden overflow-y-auto"
      }
    >
      <div className="relative my-6 mx-auto w-[30rem]">
        <div className="border-0 rounded-lg relative flex flex-col w-full py-3 md:px-1 px-0 bg-white ">
          <div className="flex md:px-4 px-3 pt-3">
            <div className="md:text-[2rem] text-[1.5rem] font-bold mr-1 text-[#000000]">
              {DictionaryDetailInfo.wordName}
            </div>
            {DictionaryDetailInfo.wordIso > 0 && (
              <div className="flex md:text-[1.2rem] text-[1rem] text-[#A2A2A2] ml-1">
                {DictionaryDetailInfo.wordIso}
              </div>
            )}
            <div className="flex items-center px-1" onClick={()=>{tts(DictionaryDetailInfo.wordName)}}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 cursor-pointer"
                onClick={() => {
                  audio.play();
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                />
              </svg>
            </div>
          </div>
          <div className="relative md:px-4 px-3 flex pt-1 justify-between items-end sm:min-w-[25rem] min-w-[19rem] flex-wrap">
            <div className="flex items-end md:text-[1.2rem] text-[1rem] text-[#A2A2A2] mr-1">
              {DictionaryDetailInfo.wordOrigin && (
                <div>[{DictionaryDetailInfo.wordOrigin}]</div>
              )}
              <div>{DictionaryDetailInfo.wordType}</div>
            </div>
            <div className="">
              {DictionaryDetailInfo.wordRating != "없음" && (
                <div className="md:text-[1.2rem] text-[1rem] text-[#A2A2A2] mr-1">
                  {DictionaryDetailInfo.wordRating}
                </div>
              )}
            </div>
          </div>

          <div className="relative md:px-4 px-3 py-3 h-[45vh] max-h-[20rem] overflow-y-auto">
            {DictionaryDetailInfo.wordDetailResponseList.map((it: any) => {              
              return (
                <div className="bg-[#F4EFEC] rounded-lg p-4 md:text-[1.2rem] text-[1rem] font-semibold my-2 text-[#2F2F2F]">
                  {it.details}
                  {it.wordExampleResponseList.length !== 0 ? (
                    <div className="flex flex-row pt-3 items-center">
                      <div className="mt-2 md:text-[1.1rem] text-[0.9rem] text-[#666666] leading-8 font-medium">
                        <span className="mr-1 font-bold text-[#ffffff] rounded-full px-3 py-1 bg-[#F7CCB7] md:text-[0.9rem] text-[0.8rem]">
                          예제
                        </span>
                        {
                          it.wordExampleResponseList[
                            Math.floor(
                              Math.random() * it.wordExampleResponseList.length,
                            )
                          ].exampleDetail
                        }
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DictionaryDetail;
