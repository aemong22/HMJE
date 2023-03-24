import { useGetUserMyinfoQuery, useGetUserMystudyQuery,useGetWordDailyQuery } from "../../Store/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Common/Footer";
import Navbar from "../Common/Navbar";
import Pangguin from "../Threejs/Pangguin";
import style from "./Main.module.css";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import PastTestIntroModal from "../Study/PastTest/PastTestIntroModal";
import { showPastTestIntro } from "../../Store/store";




function Main(): JSX.Element {
  const navigate = useNavigate();
  
  // 로그인 안했을 시 intro페이지로 이동
  useEffect(() => {
    if(localStorage.getItem("accessToken") === "undefined"){
      navigate('/')
    }
  }, [])

  const userId = localStorage.getItem("userId");
  const {data:userMyInfo, error:error1, isLoading:isLoading1 } = useGetUserMyinfoQuery(userId);
  const {data:userMyStudy, error:error2, isLoading:isLoading2 } = useGetUserMystudyQuery(userId);
  const {data:newsKeyword, error:error3, isLoading:isLoading3} = useGetWordDailyQuery('');
  

  // 장원급제 user List
  const users: object = [{
    이름:"오리",
    칭호:"오리꽥꽥",
    레벨:"정이품",
    뱃지이미지:"carrot"
  },{
    이름:"세종대왕",
    칭호:"이리오너라",
    레벨:"정일품",
    뱃지이미지:"carrot"
  },{
    이름:"춘식이",
    칭호:"노랑노랑노랑색",
    레벨:"정이품",
    뱃지이미지:"carrot"
  }]

  if (isLoading1 || isLoading2 || isLoading3 ) {
    return <div>Loading...</div>;
  }

  if (error1 || error2 || error3) {
    return <>Error: {error1} {error2}</>;
  }

  return (
    <>
      <Navbar />
      {/* <Example /> */}
      <MyInfo userMyInfo={userMyInfo?.data} userMyStudy={userMyStudy?.data}/>
      <StudyContent />
      <News newsKeyword={newsKeyword?.data} />
      <PassUsers users={users}/>
      <Footer />
    </>
  );
}
export default Main;

// main 페이지는 container, max-w-screen-lg, lg:w-[70%] 설정


function Example():JSX.Element {
  return(
    <>
      <div className="w-full bg-[#F0ECE9]">
        <div className="container max-w-screen-xl mx-auto flex justify-between">
          <div className="w-[47%] h-[30rem]">

          </div>
          <div className="w-[30%] h-[30rem] pt-[5%]">
            <div className="bg-[#fff] rounded-t-full w-full h-full">
            <Pangguin position={-2} />
            </div>

          </div>
          <div className="w-[23%] h-[30rem] ">

          </div>
        </div>
      </div>
      {/* <div className="w-full bg-[#F0ECE9]">
        <div className="container max-w-screen-xl mx-auto flex justify-between">
          <div className={`${style.bottomRight} w-[47%] h-[10rem]`}>

          </div>
          <div className="w-[30%] h-[10rem]">
            <div className="bg-[#fff] w-full h-full">
            </div>

          </div>
          <div className={`${style.bottomLeft} w-[23%] h-[10rem]`}>

          </div>
        </div>
      </div> */}
    </>
  )
}
// 맨위 : 유저 정보 , 오늘의 정보
function MyInfo({userMyInfo, userMyStudy}:any): JSX.Element {
  localStorage.setItem("nickname", userMyInfo.nickname);
  const navigate = useNavigate()
  
  // 레벨 경험치
  const levelInfo: any = [
    {
      levelName: "0",
      levelName2: "0",
      totalExp: -100
    },{
    levelName: "정구품",
    levelName2: "正九品",
    totalExp: 100
  },
  {
    levelName: "정팔품",
    levelName2: "正八品",
    totalExp: 200
  },
  {
    levelName: "정칠품",
    levelName2: "正七品",
    totalExp: 400
  },
  {
    levelName: "정육품",
    levelName2: "正六品",
    totalExp: 800
  },
  {
    levelName: "정오품",
    levelName2: "正五品",
    totalExp: 1600
  },
  {
    levelName: "정사품",
    levelName2: "正四品",
    totalExp: 3200
  },
  {
    levelName: "정삼품",
    levelName2: "正三品",
    totalExp: 6400
  },
  {
    levelName: "정이품",
    levelName2: "正二品",
    totalExp: 12800
  },
  {
    levelName: "정일품",
    levelName2: "正一品",
    totalExp: 25600
  },
  {
    levelName: "정일품",
    levelName2: "正一品",
    totalExp: 25600
  }

]
  // 경험치 비율 width
  const expWidth = (userMyInfo.exp / levelInfo[userMyInfo.level].totalExp) * 100 + "%"

  // 학습 시간 h , m , s
  let time:number = userMyStudy.todayTime
  const h =  Math.floor(time / 3600);
  time = time % 3600
  const m:number = Math.floor(time / 60);
  time = time % 60
  const s = time



  return (
    // <div className="w-full bg-[#F0ECE9]">
    //   <div className="container max-w-screen-xl mx-auto flex lg: justify-between">
    //     <div className="w-[47%] pt-16 lg:px-10 md:px-5 px-2">
    //       <div className="text-[3rem] font-bold">
    //         오늘
    //       </div>

    //       {/* 오늘의 학습 */}
    //       <div className="flex justify-between text-[#A87C6E]">
    //         <div className=" text-center">
    //           <div className="text-[2.2rem] md:text-[3rem] font-bold"> 
    //             {h > 0 && <>{h} <span className="md:text-[1.5rem] text-[1rem]">시간 </span></>}
    //             {m} <span className="md:text-[1.5rem] text-[1rem]">분 </span>
    //             {s} <span className="md:text-[1.5rem] text-[1rem]">초 </span>
    //           </div>
    //           <div className="p-2 lg:text-[1.4rem] md:text-[1.2rem] text-[1rem]  text-zinc-500">학습 시간</div>
    //         </div>
    //         <div className=" text-center">
    //           <div className="text-[2.2rem] md:text-[3rem] font-bold"> 
    //             {userMyStudy.todayWord}<span className="md:text-[1.5rem] text-[1rem]">개</span>
    //           </div>
    //           <div className="p-2 lg:text-[1.4rem] md:text-[1.2rem] text-[1rem]  text-zinc-500">단어 학습</div>
    //         </div>
    //         <div className=" text-center">
    //           <div className="text-[2.2rem] md:text-[3rem] font-bold"> 
    //             {userMyStudy.todayContext}<span className="md:text-[1.5rem] text-[1rem]">개</span>
    //           </div>
    //           <div className="p-2 lg:text-[1.4rem] md:text-[1.2rem] text-[1rem]  text-zinc-500">문맥 학습</div>
    //         </div>
    //       </div>

    //     {/* 유저 데이터 */}

    //     <div className="my-2 bg-[#ffffff] rounded-md p-2 px-4">
    //       <div className="flex justify-start md:text-[1.2rem] sm:text-[1.1rem] text-[1rem] py-1">
    //         <div className={`${style.badgeImg}`} style={{backgroundImage:`url('/Assets/Badge/${userMyInfo?.nowbadgeImage}.png')`}}></div>
    //         {userMyInfo?.nowbadgeName}
    //       </div>
    //       <div className="flex items-end">
    //         <div className="md:text-[2rem] sm:text-[1.8rem] text-[1.5rem] font-bold">{userMyInfo?.nickname}{" "}</div>
    //         <div className="md:text-[1.2rem] text[1rem] py-1 font-bold text-[#8E8E8E] mr-1">{levelInfo[userMyInfo.level].levelName}</div>
    //         <div className="md:text-[0.9rem] sm:text-[0.7rem] my-1 text-[0.5rem] px-2 border-2 border-[#A87E6E] w-fit h-fit rounded-full bg-[#F0ECE9] font-bold text-[#A87E6E]">
    //           {levelInfo[userMyInfo?.level].levelName2}
    //         </div>
    //       </div>
    //           <div className="bg-[#F0ECE9] rounded-lg my-2 overflow-hidden">
    //             <div className="bg-[#F7CCB7] rounded-lg py-[0.5rem]" style={{width:`${expWidth}` , maxWidth:"100%"}}></div>
    //           </div>
    //           <div className="text-[1rem] text-zinc-400"> {userMyInfo.exp} / {userMyInfo.level > 9 ? <> ∞ </> : <>{levelInfo[userMyInfo.level].totalExp} </> }</div>
    //         </div>
    //       </div>
    //       <div>

    //     </div>


    //     <div className="w-[30%] pt-[5%]">
    //       <div className="bg-[#fff] rounded-t-full w-full h-full">
    //         <Pangguin position={-2} />
    //       </div>

    //     </div>
    //     <div className="w-[23%] ">

    //     </div>
    //   </div>
    // </div>

    <div className="bg-[#F0ECE9]">
      <div className="container max-w-screen-xl mx-auto">
      <div className="lg:w-[80%] w-full  mx-auto flex flex-col md:flex-row md:justify-between items-center text-center py-[2rem]">
        <div className="md:w-[40%] w-[90%] bg-[#ffffff] py-[1.5rem] md:px-[2.5rem] rounded-md px-[1rem]">
          <Pangguin position={-2} />
          <div className="flex justify-center md:text-[1.2rem] sm:text-[1.1rem] text-[1rem] py-1">
            <div className={`${style.badgeImg}`} style={{backgroundImage:`url('/Assets/Badge/${userMyInfo?.nowbadgeImage}.png')`}}></div>{userMyInfo?.nowbadgeName}</div>
            <div className="md:text-[2.4rem] sm:text-[2.2rem] text-[2rem] font-bold">{userMyInfo?.nickname}</div>
            <div className="md:text-[1.2rem] text[1rem] py-1 font-bold text-[#8E8E8E]">{levelInfo[userMyInfo.level].levelName}</div>
            <div className="md:text-[0.9rem] sm:text-[0.7rem] text-[0.5rem] px-2 border-2 border-[#A87E6E] w-fit mx-auto rounded-full bg-[#F0ECE9] font-bold text-[#A87E6E]">
              {levelInfo[userMyInfo?.level].levelName2}
            </div>
            <div className="bg-[#F0ECE9] rounded-lg my-2 overflow-hidden">
              <div className="bg-[#F7CCB7] rounded-lg py-[0.5rem]" style={{width:`${expWidth}` , maxWidth:"100%"}}></div>
            </div>
            <div className="text-[1rem] text-zinc-400"> {userMyInfo.exp} / {userMyInfo.level > 9 ? <> ∞ </> : <>{levelInfo[userMyInfo.level].totalExp} </> }</div>
          </div>
          <div className="md:w-[43%] w-[90%] pt-[2rem] pb-[0.5rem]">
            <div className="md:text-[3rem] sm:text-[2.5rem] text-[2rem] font-bold">오늘</div>
            <div className="w-full flex flex-wrap justify-center items-end">
                <div className="md:text-[3rem] sm:text-[2.5rem] text-[2rem] font-bold text-[#BE8D65]">
                  {h > 0 && <>{h} <span className="md:text-[1.5rem] text-[1rem]">시간 </span></>}
                  {m} <span className="md:text-[1.5rem] text-[1rem]">분 </span>
                  {" "}{s} <span className="md:text-[1.5rem] text-[1rem]">초 </span>
                </div>
                <div className="md:text-[1.5rem] sm:text-[1rem] text-[0.8rem] pt-1 pb-2 text-zinc-500"> &nbsp; 학습 시간</div>
            </div>
            <div className="flex justify-around md:my-3 my-1">
              <div className="w-[40%]">
                <div className="md:text-[3rem] sm:text-[2.5rem] text-[2rem] font-bold text-[#BE8D65]">
                  {userMyStudy.todayWord}<span className="md:text-[1.5rem] text-[1rem]">개</span>
                </div>
                <div className="md:text-[1.5rem] sm:text-[1rem] pt-1 text-[0.8rem] text-zinc-500">단어 학습</div>
              </div>
              <div className="w-[40%]">
                <div className="md:text-[3rem] sm:text-[2.5rem] text-[2rem] font-bold text-[#BE8D65]">
                  {userMyStudy.todayContext}<span className="md:text-[1.5rem] text-[1rem]">개</span>
                </div>
                <div className="md:text-[1.5rem] sm:text-[1rem] pt-1 text-[0.8rem] text-zinc-500">문맥 학습</div>
              </div>
            </div>
            <div className="cursor-pointer flex justify-center rounded-full bg-[#A87E6E] p-[0.7rem] mt-3z md:text-[2.5rem] sm:text-[2rem] text-[1.5rem] font-bold text-[#ffffff] hover:text-[#F0ECE9]"  onClick={()=> navigate('/wordStudy')}>
              <div className={`${style.iconBook}`}></div>
              <div>학습 시작하기</div>
            </div>
          </div>
        </div>
        </div>
      </div>
  );
}



// 학습 (3가지)
function StudyContent(): JSX.Element {
  const [openModal , setOpenModal] = useState<Boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // 과거시험-인트로 외부클릭 state
  const PastTestIntroClickCheck:any=useAppSelector((state:any)=>{
    return state.PastTestIntroClickCheck;
  })
  
  const nav = (e:any) => {
    if(e.target.id === 'word'){
      navigate('/wordStudy')
    }
    else if(e.target.id === 'context') {
      navigate('/contextStudy')
    }
  }
  return (
    <>
      {/* {openModal && <PastTestIntroModal setOpenModal={setOpenModal} />} */}
      <div className="container max-w-screen-lg w-full  mx-auto text-center md:pt-[7rem] pt-[5rem]">
        <div className="md:text-[1.5rem] text-[1rem]">홍민정음</div>
        <div className="md:text-[2.2rem] text-[1.9rem] font-bold ">
          신나고 즐거운 <span className="text-[#A87E6E]">학습</span>
        </div>
        <div className="flex md:justify-around flex-col md:flex-row items-center my-5">
          <div className={`${style.studyContents} md:relative static md:h-0 md:p-[3%] p-[4%] md:pb-[27%]  md:w-[30%] w-[90%] rounded-md`}>
                <div className="md:text-[1.2rem] sm:text-[1rem] text-[0.9rem] text-[#666666]">오늘의 공부 </div>
                <div className="text-[#A87E6E] font-bold md:text-[1.8rem] sm:text-[1.4rem] text-[1.1rem] py-0.5">단어 학습</div>
                <div className="lg:text-[1rem] text-[0.9rem] text-[#666666]">
                    뜻을 읽고 해당 단어를 찾고,
                    정확한 뜻을 학습해보세요!
                </div>
                <br/>
            <div id="word" className={`${style.studyBtn} md:text-[1.3rem] md:absolute static md:bottom-[5%]  md:w-[80%] text-center border-2 border-[#A87E6E] rounded-lg py-1 mt-1`} onClick={nav}>
              시작하기
            </div>
          </div>

          <div className={`${style.studyContents} md:relative static md:m-0 m-3 md:h-0 md:p-[3%] p-[4%] md:pb-[27%]  md:w-[30%] w-[90%] rounded-md`}>
            <div className="md:text-[1.2rem] sm:text-[1rem] text-[0.9rem] text-[#666666]">다의어 공부 </div>
            <div className="text-[#A87E6E] font-bold md:text-[1.8rem] sm:text-[1.4rem] text-[1.1rem] py-0.5">문맥 학습</div>
            <div className="lg:text-[1rem] text-[0.9rem] text-[#666666]">
              빈칸에 공통적으로 들어갈
              단어를 찾고, 단어의 다양한 의미를 공부해보세요!
            </div>
            <br/>
            <div id="context" onClick={nav} className={`${style.studyBtn} md:text-[1.3rem] md:absolute static md:bottom-[5%]  md:w-[80%] text-center border-2 border-[#A87E6E] rounded-lg py-1 mt-1`}>
              시작하기
            </div>
          </div>

          <div className={`${style.studyContents} md:relative static md:h-0 md:p-[3%] p-[4%] md:pb-[27%]  md:w-[30%] w-[90%] rounded-md`}>
            {PastTestIntroClickCheck?<PastTestIntroModal /> : null}
            <div className="md:text-[1.2rem] sm:text-[1rem] text-[0.9rem] text-[#666666]">실력 확인 </div>
            <div className="text-[#A87E6E] font-bold md:text-[1.8rem] sm:text-[1.4rem] text-[1.1rem] py-0.5">과거시험</div>
            <div className="lg:text-[1rem] text-[0.9rem] text-[#666666]">
              매달 마지막 주 주말에 열리는
              과거시험을 통해 향상된 실력을 확인해보세요!{" "}
            </div>
            <br/>
            <div className={`${style.studyBtn} md:text-[1.3rem] md:absolute static md:bottom-[5%]  md:w-[80%] text-center border-2 border-[#A87E6E] rounded-lg py-1 mt-1`} onClick={()=>{dispatch(showPastTestIntro())}}>
              시작하기
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



// 뉴스 ( 신문 핵심 단어 )
function News({newsKeyword}:any): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const [select, setSelect] = useState<String>("경제");
  const [idx,setIdx] = useState<number>(0);

  // 주제바꿨을 때 첫번째 키워드 선택하도록
  const firstSelect = (subject : string) => {
    var index1 = newsKeyword?.findIndex((obj:any) => obj?.category === subject)
    setIdx(index1)
    setSelect(subject)
  }

  useEffect(() => {
    firstSelect("경제");
  },[])

  console.log(newsKeyword)
  return (
    <>
      <div className="container max-w-screen-lg w-full mx-auto px-[5%] md:my-[7rem] my-[5rem] md:px-10 lg:border-l-4 lg:border-[#F7CCB7]">
        <div className="md:text-[1.2rem] text-[1rem] text-[#5F5F5F]">
            신문으로 단어 공부하기
        </div>
        
        <div className="flex justify-between">
          <div className="md:text-[2.2rem] text-[1.9rem] font-bold ">
              <span className="md:text-[1.9rem] text-[1.5rem]">오늘의 </span><span className="text-[#BE8D65]">신문</span> 핵심단어
          </div>
          <div className="ml-2 pt-2">
          <button
              onClick={toggleMenu}
              className="flex items-center justify-between w-[8rem] px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 focus:border-[#666666] rounded-md shadow-sm ">
              {select}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3 ml-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>

          </button>
              {isOpen && (
                <div className="absolute z-10 w-[8rem] mt-1 bg-white rounded-md shadow-lg font-medium text-center">
                  <ul>
                    <li
                      key={0}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      onClick={() => {
                        firstSelect("경제")
                        toggleMenu()}}>
                      경제
                    </li>
                  <li
                      key={1}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      onClick={() => {
                        firstSelect("사회")
                        toggleMenu()}}>
                    사회
                  </li>
                  <li
                      key={2}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      onClick={() => {
                        firstSelect("문화")
                        toggleMenu()}}>
                    문화
                  </li>
                  <li
                      key={3}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      onClick={() => {
                        firstSelect("과학")
                        toggleMenu()}}>
                    과학
                  </li>
                  </ul>
                </div>
              )}
          </div>
        </div>

        <div className="flex py-5 flex-wrap">
            {
                newsKeyword.map((word:any, index:any)=>(
                    <>
                      {word?.category === select && 
                        <>
                          <div key={index} className={classNames("cursor-pointer rounded-full px-4 mr-3 mt-1 md:text-[1.3rem] sm:text-[1.2rem] text-[1.1rem] border-2 border-[#BF9F91]", index === idx ? "bg-[#BF9F91] text-[#ffffff] font-bold" : "text-[#BF9F91] font-bold")}
                            onClick={() => {
                              setIdx(index);
                            }}
                          >
                            {word?.wordResponseDto.wordName}
                          </div>
                        </>
                      }
                    </>
                )
                )
            }
        </div>

        <div className="md:text-[1.8rem] sm:text-[1.4rem] text-[1.2rem] font-bold">
          {newsKeyword[idx]?.wordResponseDto.wordName}
          <span className="md:text-[1rem] sm:text-[0.9rem] text-[0.8rem] font-medium text-[#A2A2A2]">
            {newsKeyword[idx]?.wordResponseDto.Iso > 0 && newsKeyword[idx]?.wordResponseDto.Iso} {" "}
            {newsKeyword[idx]?.wordResponseDto.wordOrigin && <>[{newsKeyword[idx]?.wordResponseDto.wordOrigin}]</>} {" "}
            {newsKeyword[idx]?.wordResponseDto.wordType}
          </span>
        </div>

        <div className="h-[11rem] rounded-lg bg-[#F4EFEC] p-2 mt-2 md:text-[1.2rem] sm:text-[1.1rem] text-[1rem] overflow-auto">

        <div className="relative max-h-[50vh] overflow-y-auto">
                {newsKeyword[idx].wordResponseDto.wordDetailResponseList.map(
                  (detail: any, DetailIdx: any) => {
                    let temp = detail.wordExampleResponseList.filter(
                      (ex: any) => ex.exampleType === "문장",
                    )[0]?.exampleDetail;
                    let example = temp
                      ? temp
                      : detail.wordExampleResponseList[0]?.exampleDetail;
                    return (
                      <div
                        key={DetailIdx}
                        className="bg-[#F4EFEC] rounded-lg p-2 md:text-[1.2rem] text-[1rem] font-medium my-2"
                      >
                        {detail.details}{" "}
                        <div className="mt-2 md:text-[1.2rem] text-[1rem] text-[#666666] leading-7">
                          <span className="mr-1 font-bold text-[#ffffff] rounded-full px-3 py-1 bg-[#F7CCB7] md:text-[1rem] text-[0.9rem]">
                            예제
                          </span>
                          {example}
                        </div>
                      </div>
                    );
                  },
                )}
              </div>


          {/* <div>{example[selectKeyWord]?.mean}</div>

          <div className="flex w-full md:text-[1.2rem] sm:text-[1.1rem] text-[1rem] mt-2 text-[#606060]">
            <div className="bg-[#F7CCB7] rounded-full px-4 py-1 text-[#ffffff] font-bold md:text-[1rem] sm:text-[0.9rem] text-[0.8rem] mr-2">예제</div> 경제가 안좋다.
          </div> */}
        </div>
        
      </div>
    </>
  );
}



// 장원급제 리스트
function PassUsers({users}:any): JSX.Element {
  
  return (
    <>
      <div className="bg-[#F4EFEC] w-full">
        <div className="container max-w-screen-xl mx-auto text-center py-16">
          
          <div className={`${style.passFont} md:text-[2.1rem] text-[1.5rem] `}>제 32회 과거시험 결과</div>
          <div className= {`${style.passFont} md:text-[3.2rem] text-[2.2rem] font-bold text-[#A87E6E]`}>장원급제</div>
          <div className={`${style.passFont} md:text-[2.1rem] text-[1.5rem] text-[#525252] mb-[2rem]`}>축하드립니다!</div>

          <div className="overflow-hidden h-[15rem] lg:w-[70%] md:w-[80%] sm:w-[90%] w-full mx-auto">
            <div className={`${style.move} px-1`} style={{animationDuration:`${Object.keys(users).length*2}s`}}>
              {
                users.map((user:any , index:number)=> (
                  <div key={index} className={`flex justify-between rounded-lg bg-[#ffffff] my-3 md:px-5 sm:px-4 px-3 py-3 md:text-[1.5rem] sm:text-[1.2rem] text-[0.9rem] text-start`}>
                    <div className="flex">
                    <div className={`${style.badgeImg2}`} style={{backgroundImage:`url('/Assets/Icon/${user.뱃지이미지}.png')`}}></div>
                      <div className="px-1">
                        <div className="md:text-[1.1rem] sm:text-[1rem] text-[0.8rem]">{user.칭호}</div>
                        <div className="md:text-[1.5rem] sm:text-[1.2rem] text-[1rem] font-bold text-start" >{user.이름}</div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-end text-[#525252] md:text-[1.3rem] sm:text-[1rem] text-[0.8rem] ">
                      {user.레벨}
                    </div>
                  </div>
                ))
              }
            </div>
            <div className={`${style.move} px-1`} style={{animationDuration:`${Object.keys(users).length*2}s`}}>
              {
                users.map((user:any , index : number)=> (
                  <div key={index} className={`flex justify-between rounded-lg bg-[#ffffff] my-3 md:px-5 sm:px-4 px-3  py-3 md:text-[1.5rem] sm:text-[1.2rem] text-[0.9rem] text-start}`}>
                    <div className="flex">
                    <div className={`${style.badgeImg2}`} style={{backgroundImage:`url('/Assets/Icon/${user.뱃지이미지}.png')`}}></div>
                      <div className="px-1">
                        <div className="md:text-[1.1rem] sm:text-[1rem] text-[0.8rem]">{user.칭호}</div>
                        <div className="md:text-[1.5rem] sm:text-[1.2rem] text-[1rem] font-bold text-start" >{user.이름}</div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-end text-[#525252] md:text-[1.3rem] sm:text-[1rem] text-[0.8rem] ">
                      {user.레벨}
                    </div>
                  </div>
                ))
              }
            </div>
          </div>


        </div>
        
      </div>
    </>
  )
}