import Footer from "../Common/Footer"
import Navbar from "../Common/Navbar"
import Pangguin from "../Threejs/Pangguin"
import { useGetUserMyinfoQuery, useGetUserMystudyQuery, useLazyGetUserBadgeQuery, useLazyGetUserStatsCompareQuery, usePostUserMonthstudyMutation, usePutUserBadgeMalrangMutation, usePutUserBadgeMutation, usePutUserdataMutation } from "../../Store/api"
// import { usePostUserchecknicknameMutation } from "../../Store/NonAuthApi";
import React, { KeyboardEvent, KeyboardEventHandler, MouseEventHandler, useEffect, useRef, useState } from "react"
// import styled from './MyPage.module.css'
import { Bar, Doughnut, Line } from "react-chartjs-2"
import { toast } from "react-toastify";
import { Toast } from "../Common/Toast";
// import { useAppDispatch } from "../../Store/hooks";
// import { changeUserNickname } from "../../Store/store";
import Chart from 'chart.js/auto';
import GreyCat from "../Threejs/GreyCat"
import OrangeCat from "../Threejs/OrangeCat"
import MixCat from "../Threejs/MixCat"

interface UserDataType {
  exp: number,
  isAdmin: boolean,
  isSecession: boolean,
  level: number,
  nickname: string,
  nowbadgeId: number,
  nowbadgeImage: string,
  nowbadgeName: string,
  phoneNumber: string,
  username: string
}


interface Type {
  nickname: string, 
  nowbadgeName: string, 
  expWidth: string, 
  exp: number, 
  totalExp: number,
  sentence: React.ReactNode,
  level: string,
  nowbadgeImage: string,
  userId: (string | null),
  dataLevel : number,
  checkEmoState: number
}

interface LevelType {
  levelName: string,
  levelName2: string,
  totalExp: number
}

interface StudyType {
  todayWord: number, 
  totalWord: number, 
  todayContext: number, 
  totalContext: number, 
  todayTime: number, 
  totalTime: number,
  statsRight: number,
  statsSemo: number,
  statsWrong: number,
}


function MyPage():JSX.Element {
  const [userData,setUserData] = useState()
  const userId = localStorage.getItem('userId')
  const {data:userMyInfo, isError:isError1, isLoading:isLoading1} = useGetUserMyinfoQuery(userId)
  const {data:studyData, isError:isError2, isLoading:isLoading2} = useGetUserMystudyQuery(userId)
  
  // console.log('studyData: ', studyData);
  

  if (isLoading1 || isLoading2 ) {
    return <div>Loading...</div>;
  }

  if (isError1 || isError2) {
    return <>Error: {isError1 || isError2}</>;
  }

  // 레벨 경험치
  const levelInfo: LevelType[] = [
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
  const expWidth = (userMyInfo?.data.exp / levelInfo[userMyInfo?.data.level].totalExp) * 100 + "%"
  
  const totalExp = levelInfo[userMyInfo?.data.level].totalExp

  // 학습 데이터에 따른 캐릭터 문구
  
  const sentenceList: {
    [key: number]: React.ReactNode
  } = {
    0: <div>오늘도 신나는 마음으로 <br/>함께 학습을 해요🤗</div>,
    1: <div>현재 맞춘 개수가 더 많아서 행복해 하고 있어요.😊 <br/>조금 더 알아볼까요?</div>,
    2: <div>현재 틀린 개수가 더 많아서 슬퍼하고 있어요.😓 <br/> 더 힘내볼까요?</div>,
    3: <div>현재 정답과 오답이 같아요😮 <br/> 조금만 더 해볼까요?</div>,
  }
  let sentence

  const {todayWord, totalWord, todayContext, totalContext, todayTime, totalTime}:StudyType = studyData?.data
  const todayTotal = studyData?.data.todayContext + studyData?.data.todayTime + studyData?.data.todayWord
  const statsDate:number = studyData?.data.statsRight - studyData?.data.statsWrong
  const  {statsRight, statsSemo, statsWrong} = studyData?.data
  const level = levelInfo[userMyInfo?.data.level].levelName2
  const dataLevel = userMyInfo?.data.level
  let checkEmoState:number

  
  if (todayTotal === 0) {
    sentence = sentenceList[0]
    checkEmoState = 0
  } else if (statsDate > 0) {
    sentence = sentenceList[1]
    checkEmoState = 1
  } else if (statsDate < 0) {
    sentence = sentenceList[2]
    checkEmoState = 2
  } else {
    sentence = sentenceList[3]
    checkEmoState = 3
  }

  return (
    <>
      <Toast />
      <Navbar/>
      <MyPageSection1V1 nickname={userMyInfo?.data.nickname} nowbadgeName={userMyInfo?.data.nowbadgeName} expWidth={expWidth} exp={userMyInfo?.data.exp} totalExp={totalExp} dataLevel={dataLevel} sentence={sentence} level={level} nowbadgeImage={userMyInfo?.data.nowbadgeImage} userId={userId} checkEmoState={checkEmoState}/>
      <MyPageSection2V1 todayWord={todayWord} totalWord={totalWord} todayContext={todayContext} totalContext={totalContext} todayTime={todayTime} totalTime={totalTime} statsRight={statsRight} statsSemo={statsSemo} statsWrong={statsWrong}/>
      <MyPageSection1V2 nickname={userMyInfo?.data.nickname} nowbadgeName={userMyInfo?.data.nowbadgeName} expWidth={expWidth} exp={userMyInfo?.data.exp} totalExp={totalExp} dataLevel={dataLevel} sentence={sentence} level={level} nowbadgeImage={userMyInfo?.data.nowbadgeImage} userId={userId} checkEmoState={checkEmoState}/>
      <MyPageSection2V2 todayWord={todayWord} totalWord={totalWord} todayContext={todayContext} totalContext={totalContext} todayTime={todayTime} totalTime={totalTime} statsRight={statsRight} statsSemo={statsSemo} statsWrong={statsWrong}/>
      <MyPageSection3 userId={userId}/>
      <Footer/>
    </>
  )
}
export default MyPage


// 데스크탑 & 태블릿
function MyPageSection1V1({nickname, nowbadgeName, expWidth, exp, totalExp, sentence, level, nowbadgeImage, userId, dataLevel, checkEmoState}:Type):JSX.Element {  
  const [putUserBadgeMalrang, {isLoading}] = usePutUserBadgeMalrangMutation()
  const [character, setCharacter] = useState(<GreyCat sendEmo={checkEmoState}/>)
  const [clickCnt, setClickCnt] = useState<number>(0)
  useEffect(()=> {
    if (dataLevel === 9) {
      setCharacter(<OrangeCat sendEmo={checkEmoState}/>)
    } else if ((3 <= dataLevel)&&(dataLevel <= 8)) {
      setCharacter(<MixCat sendEmo={checkEmoState}/>)
    }
  },[])

  useEffect(()=> {
    if (clickCnt !== 0 && clickCnt === 100) {
      putUserBadgeMalrang(userId).unwrap().then((r)=> {
        console.log(r);
        if (r.newbadge.length) {
          toast.success('숨겨진 뱃지를 획득했습니다!')
        } else {
          toast.error('뱃지를 소유하고 있습니다!')
        }
      })
    }
  },[clickCnt])

  const clickCat = () => {
    setClickCnt(clickCnt+1)
  }

  const loading = <div>로딩중</div>

  return (
    <>
      {
        isLoading&&loading
      }
      <div className="container max-w-screen-xl h-[30rem] md:w-[90%] mx-auto hidden md:flex flex-col md:flex-row md:justify-around items-center text-center mb-2">
        <div className="flex flex-col md:w-[55%] h-full bg-[#ffffff] rounded-tr-xl rounded-tl-xl " onClick={clickCat}>
          {/* <Pangguin position={-2} /> */}
          {character}
          <div className="bg-[#D9D9D9] rounded-br-xl rounded-bl-xl font-semibold md:text-[1rem] w-full py-1">{sentence}</div>
        </div>
        <div className="md:w-[45%] pt-[1rem] pb-[0.5rem] px-4">
          <div className="flex justify-center items-center h-full w-full">
            {/* 메인 데이터 */}
            <div className="flex flex-col justify-center items-center h-4/5 w-full">
              <div className="flex justify-between items-center w-full pb-1">
                {/* 칭호 & 수정 */}
                <div className="flex justify-start items-center md:text-[1.2rem]"><img className="w-[1.5rem]" src={`/Assets/Badge/${nowbadgeImage}.png`} alt="뱃지" />&nbsp; {nowbadgeName}</div>
                <div aria-label="정보수정" className="text-[#8E8E8E] md:text-[1rem] cursor-pointer">정보 수정⚙</div>
              </div>
              <div className="flex flex-col justify-center items-center w-full">
                <div className="flex justify-between items-end w-full">
                  {/* 닉네임 & 등급 & 경험치 */}
                  <div className="pb-1">
                    {/* 닉네임 & 등급 */}
                    <span className="mr-1 md:text-[2.4rem] text-[2rem] font-bold">{nickname}</span><span className="md:text-[1.1rem] px-1 border-2 border-[#A87E6E] w-fit mx-auto rounded-full bg-[#F0ECE9] font-bold text-[#A87E6E]">{level}</span>
                  </div>
                  <div className="text-[1rem] pb-2 text-[#8E8E8E]">
                    {/* 등급 */}
                    {exp} / {dataLevel > 9 ? <>∞</> : <>{totalExp}</>}
                  </div>
                </div>
                <div className="w-full rounded-xl h-4 bg-[#F0ECE9] overflow-hidden">
                  {/* 경험치 바: 위에서 퍼센트 계산해서 넣으면 될듯?*/}
                  <div className="rounded-xl h-full bg-[#F7CCB7]" style={{width: `${expWidth}`, maxWidth: '100%'}}>
                    &nbsp;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// 데스크탑 & 태블릿
function MyPageSection2V1({todayWord, totalWord, todayContext, totalContext, todayTime, totalTime, statsRight, statsSemo, statsWrong}:StudyType):JSX.Element {
  // 학습 시간 h , m , s
  let time1:number = todayTime
  const m1:number = Math.floor(time1 / 60);

  let time2:number = totalTime
  const h2 =  Math.floor(time2 / 3600);
  time2 = time2 % 3600
  const m2:number = Math.floor(time2 / 60);

  const data = {
    datasets: [
      {
        data: [statsRight, statsSemo, statsWrong], 
        backgroundColor: [
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(255, 99, 132)',
      ], 
        hoverBorderColor: ['#d5cdcf'],
        hoverOffset: 4,
      }
    ],
    
    labels: ['정답', '세모', '오답' ]
  };
  
  const showDataChart = (
    statsRight+statsSemo+statsWrong !== 0 ? (
      <div className="flex justify-center items-center w-[45%] h-[110%] -translate-y-11 relative">
        <div className="absolute -bottom-[2.3rem] font-semibold text-[1.2rem] text-[#FFA800]">오늘의 학습</div>
        <Doughnut typeof='doughnut' data={data}/>
      </div>
      ): <div className="flex justify-center items-center w-[45%] h-full"><span className="font-semibold text-[1.2rem] text-[#FFA800]">아직 오늘의 학습 데이터가 없어요...</span></div> 
  )
  return (
    <div className="container max-w-screen-xl h-[15rem] md:w-[90%] mx-auto hidden md:flex md:justify-around items-center text-center my-12 py-[0.5rem] overflow-hidden">
      <div className="flex flex-col w-1/2">
        <div className="flex justify-center items-center w-full mx-auto">
          {/* Text */}
          <div className="flex flex-col md:w-full lg:w-[80%] mx-auto">
            <div className="flex justify-center items-center w-full text-[#A2A2A2]">
              <span className="text-right w-[40%]">&nbsp;</span><span className="w-full">오늘</span><span className="w-full">총</span>
            </div>
            <div className="flex justify-center items-center w-full text-[#B18978]">
              <span className="text-right w-[40%] text-[#A2A2A2]">단어</span><span className="w-full font-bold md:text-[2.7rem]">{todayWord}<span className="md:text-[1rem]">개</span></span><span className="w-full font-bold md:text-[2.7rem] text-[#FFA800]">{totalWord}<span className="md:text-[1rem]">개</span></span>
            </div>
            <div className="flex justify-center items-center w-full text-[#B18978]">
              <span className="text-right w-[40%] text-[#A2A2A2]">문맥학습</span><span className="w-full font-bold md:text-[2.7rem]">{todayContext}<span className="md:text-[1rem]">개</span></span><span className="w-full font-bold md:text-[2.7rem] text-[#FFA800]">{totalContext}<span className="md:text-[1rem]">개</span></span>
            </div>
            <div className="flex justify-center items-center w-full text-[#B18978]">
              <span className="text-right w-[40%] text-[#A2A2A2]">학습시간</span><span className="w-full font-bold md:text-[2.7rem]">{m1}<span className="md:text-[1rem]">분</span></span><span className="w-full font-bold md:text-[2.7rem]"><span className="text-[#FFA800]">{h2}<span  className="md:text-[1rem]">시간</span></span><span className="text-[#FFA800]"> {m2}<span className="md:text-[1rem]">분</span></span></span>
            </div>
          </div>  
        </div>
      </div>
      {showDataChart}
    </div>
  )
}




// 모바일
function MyPageSection1V2({nickname, nowbadgeName, expWidth, exp, totalExp, sentence, level, nowbadgeImage, userId, dataLevel, checkEmoState}:Type):JSX.Element {
  const [putUserBadgeMalrang, {isLoading}] = usePutUserBadgeMalrangMutation()
  const [character, setCharacter] = useState(<GreyCat sendEmo={checkEmoState}/>)
  const [clickCnt, setClickCnt] = useState<number>(0)
  useEffect(()=> {
    if (dataLevel === 9) {
      setCharacter(<OrangeCat sendEmo={checkEmoState}/>)
    } else if ((3 <= dataLevel)&&(dataLevel <= 8)) {
      setCharacter(<MixCat sendEmo={checkEmoState}/>)
    }
  },[])

  useEffect(()=> {
    if (clickCnt !== 0 && clickCnt === 100) {
      putUserBadgeMalrang(userId).unwrap().then((r)=> {
        console.log(r);
        if (r.newbadge.length) {
          toast.success('숨겨진 뱃지를 획득했습니다!')
        } else {
          toast.error('뱃지를 소유하고 있습니다!')
        }
      })
    }
  },[clickCnt])

  const clickCat = () => {
    setClickCnt(clickCnt+1)
  }
  return (
    <>
      {/* <Toast /> */}
      <div className="flex flex-col md:hidden justify-center items-center h-[35rem] mt-7">
        <div className="flex justify-center items-center w-[90%] h-[67%]">
          <div className="flex justify-center items-center h-full w-full">
            {/* 렙업에 따른 3D 캐릭터 */}
            <div className="flex flex-col justify-end items-center w-full h-full">
              <div className="flex justify-between items-center w-full pb-1 text-[1rem]">
                {/* 칭호 & 수정 */}
                <div className="flex justify-start items-center"><img className="w-[1.5rem]" src={`/Assets/Badge/${nowbadgeImage}.png`} alt="뱃지" />&nbsp;{nowbadgeName}</div>
                <div aria-label="정보수정" className="text-[#8E8E8E] cursor-pointer">정보 수정⚙</div>
              </div>
              <span className="text-left w-full mr-1 text-[1.5rem] font-semibold">{nickname}</span>
              <div className="h-full w-full" onClick={clickCat}>
                {character}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center w-[90%] h-[25%] mt-[2%]">
          {/* 메인 데이터 */}
          <div className="flex flex-col justify-center items-center h-3/5 w-full">
            <div className="flex flex-col justify-center items-center w-full">
              <div className="flex justify-between items-center w-full">
                {/* 닉네임 & 등급 & 경험치 */}
                <div className="pb-1">
                  {/* 닉네임 & 등급 */}
                  <span className="text-[0.7rem] px-1 border-2 border-[#A87E6E] w-fit mx-auto rounded-full bg-[#F0ECE9] font-bold text-[#A87E6E]">{level}</span>
                </div>
                <div className="text-[0.9rem] text-[#525252]">
                  {/* 등급 */}
                  {exp} / {dataLevel > 9 ? <>∞</> : <>{totalExp}</>}
                </div>
              </div>
              <div className="flex justify-start items-center w-full rounded-xl h-4 bg-[#F0ECE9]">
                {/* 경험치 바: 위에서 퍼센트 계산해서 넣으면 될듯?*/}
                <div className="rounded-xl h-full bg-[#F7CCB7]" style={{width: `${expWidth}`, maxWidth: '100%'}}>
                  &nbsp;
                </div>
              </div>
              <div className="bg-[#D9D9D9] rounded-lg w-full text-center font-semibold text-[1rem] my-2 py-2">{sentence}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// 모바일
function MyPageSection2V2({todayWord, totalWord, todayContext, totalContext, todayTime, totalTime, statsRight, statsSemo, statsWrong}:StudyType):JSX.Element {
    // 학습 시간 h , m , s
    let time1:number = todayTime
    const m1:number = Math.floor(time1 / 60);
  
    let time2:number = totalTime
    const h2 =  Math.floor(time2 / 3600);
    time2 = time2 % 3600
    const m2:number = Math.floor(time2 / 60);
    
    const data = {
      datasets: [
        {
          data: [statsRight, statsSemo, statsWrong], 
          backgroundColor: [
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(255, 99, 132)',
        ], 
          hoverBorderColor: ['#d5cdcf'],
          hoverOffset: 4,
        }
      ],
      
      labels: ['정답', '세모', '오답' ]
    };
  
    const showDataChart = (
      statsRight+statsSemo+statsWrong !== 0 ? (
        <div className="flex justify-center items-center w-full h-full -translate-y-8 relative">
          <div className="absolute -bottom-[2.3rem] font-semibold text-[1.2rem] text-[#FFA800]">오늘의 학습</div>
          <Doughnut typeof='doughnut' data={data}/>
        </div>
        ): <div className="flex justify-center items-center w-[45%] h-full"><span className="font-semibold text-[1.2rem] text-[#FFA800]">아직 오늘의 학습 데이터가 없어요...</span></div> 
    )
  return (
    <div className="flex flex-col md:hidden justify-center items-center h-[28rem] mt-16">
      <div className="flex justify-center items-center h-[60%] w-full mb-[2%] overflow-hidden">
        {showDataChart}
      </div>
      <div className="flex justify-center items-center h-[40%] w-[90%]">
        {/* 메인 데이터 */}
        <div className="flex flex-col w-full">
          <div className="flex justify-evenly items-center">
            <div className="flex flex-col justify-center items-center w-1/4">
              {/* 오늘의 단어 */}
              <div className="text-[#B18978]"><span className="font-bold text-[2rem]">{todayWord}</span><span className="text-[1rem]">개</span></div>
              <div className="text-[#A2A2A2] text-[0.7rem]"><span>오늘의 단어</span></div>
            </div>
            <div className="flex flex-col justify-center items-center w-[21%]">
              {/* 총 단어 */}
              <div className="text-[#FFA800]"><span className="font-bold text-[2rem]">{totalWord}</span><span className="text-[1rem]">개</span></div>
              <div className="text-[#A2A2A2] text-[0.7rem]"><span>총 단어</span></div>
            </div>
            <div className="flex flex-col justify-center items-center w-[29%]">
              {/* 오늘의 학습시간 */}
              <div className="text-[#B18978]"><span className="font-bold text-[2rem]">{todayContext}</span><span className="text-[1rem]">개</span></div>
              <div className="text-[#A2A2A2] text-[0.7rem]"><span>오늘의 문맥도감</span></div>
            </div>
            <div className="flex flex-col justify-center items-center w-1/4">
              {/* 총 학습시간 */}
              <div className="text-[#FFA800]"><span className="font-bold text-[2rem]">{totalContext}</span><span className="text-[1rem]">개</span></div>
              <div className="text-[#A2A2A2] text-[0.7rem]"><span>총 문맥도감</span></div>
            </div>
          </div>
          <div className="flex justify-evenly items-center mt-1 ">
            <div className="flex flex-col justify-center items-center w-[40%]">
              {/* 오늘의 학습시간 */}
              <div className="text-[#B18978]"><span className="font-bold text-[2rem]">{m1}</span><span className="text-[1rem]">분</span></div>
              <div className="text-[#A2A2A2] text-[0.7rem]"><span>오늘의 학습시간</span></div>
            </div>
            <div className="flex flex-col justify-center items-center w-[40%]">
              {/* 총 학습시간 */}
              <div className="text-[#FFA800]"><span className="font-bold text-[2rem]">{h2}</span><span className="text-[1rem]">시간</span><span className="font-bold text-[2rem]"> {m2}</span><span className="text-[1rem]">분</span></div>
              <div className="text-[#A2A2A2] text-[0.7rem]"><span>총 학습시간</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface MyPageSection3Type {
  userId: (string|null)
} 

interface check3 {
  wrongTime: number,
  wordCount: number,
  contextCount: number,
  wordTime: number,
  contextTime: number
}

interface GetBadge {
  badgeDetail: string,
  badgeId: number,
  badgeImage: string,
  badgeName: string,
  createdAt: string
}

function MyPageSection3({userId}:MyPageSection3Type):JSX.Element {
  const [monthStuty, {isLoading : monthStudyLoading, error:monthStudyError}] = usePostUserMonthstudyMutation()
  const [getUserStatsCompare, {isLoading: isLoading2}] = useLazyGetUserStatsCompareQuery()
  const [getUserBadge, {isLoading: isLoading3}]  = useLazyGetUserBadgeQuery()
  const [putUserBadge, {isLoading: isLoading4}]  = usePutUserBadgeMutation()

  // console.log('다른 유저와 통계 비교: ', getUserStatsCompare?.data);
  
  const [studyTimeChart, setStudyTimeChart] = useState<any>()
  const [studyCntChart, setStudyCntChart] = useState<any>()
  const [studyCompareChart, setStudyCompareChart] = useState<any>()
  const [studyCompareChart2, setStudyCompareChart2] = useState<any>()
  const [userBadge, setUserBadge] = useState<GetBadge[]>([])
  const [badgeList, setBadgeList] = useState<any>([])
  const [isShowBadgeDetail, setIsshowBadgeDetail] = useState<boolean>(false)
  const [badgeDetail, setBadgeDetail] = useState<GetBadge>()
  
  const monthRef = useRef<HTMLSelectElement>(null)
  const yearRef = useRef<HTMLSelectElement>(null)
  const badgeDetailRef = useRef<HTMLDivElement>(null)
  
  const nowDate = new Date()
  const nowYear = nowDate.getFullYear()
  const nowMonth = nowDate.getMonth()+1
  const startService:number = 2023
  const createYearCnt = nowYear - startService +1  
  const yearList:number[] = Array.from({length: createYearCnt}, (v,i) => startService+i)
  const monthList:number[] = Array.from({length: 12}, (v,i)=> i+1)

  const postData:(string|number|null)[] = [userId, nowYear, nowMonth]
  
  const showBadgeDetail = (badge:GetBadge) => {
    
    setIsshowBadgeDetail(!isShowBadgeDetail)
    setBadgeDetail(badge)
  }

  useEffect(()=> {
    monthStuty(postData).then((r:any)=> {
      const wordCnt = r.data.data.map((data:any)=> {
        return data.wordCount
      })
      const conTextCnt = r.data.data.map((data:any) => {
        return data.contextCount
      })
      const conTextTm = r.data.data.map((data:any) => {
        return Math.floor(data.contextTime/60)
      })
      const wordTm = r.data.data.map((data:any) => {
        return Math.floor(data.wordTime/60)
      })
      const wrongTm = r.data.data.map((data:any) => {
        return Math.floor(data.wrongTime/60)
      })

      
      const labels:number[] = Array.from({length: conTextTm.length}, (v,i)=> i+1)

      const options = {
        // 옵션 (1)
        responsive: true,
        // 옵션 (2)
        interaction: {
          mode: "index" as const,
          intersect: false,
        },
        // 옵션 (3)
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              color: "#E3E3E3",
            },
          },
        },
        maintainAspectRatio: false,
      };

      // 학습 시간
      const studyTimeData = {
        datasets: [
          {
            label: '단어학습 시간',
            data: wordTm, 
            borderColor: 'rgba(75, 192, 192, 0.7)',
            backgroundColor: 'rgb(75, 192, 192)',
            tension: 0.1,
            hoverBorderColor: ['#d5cdcf'],
            hoverOffset: 4,
          },
          {
            label: '문맥학습 시간',
            data: conTextTm, 
            borderColor: 'rgba(255, 205, 86, 0.7)',
            backgroundColor: 'rgba(255, 205, 86)',
            hoverBorderColor: ['#d5cdcf'],
            hoverOffset: 4,
          },
          {
            label: '복습시간',
            data: wrongTm, 
            borderColor: 'rgba(255, 99, 132, 0.7)',
            backgroundColor: 'rgb(255, 99, 132)',
            hoverBorderColor: ['#d5cdcf'],
            hoverOffset: 4,
          },
        ],
        labels: labels
      };

      const Chart = 
        (
          <div className="h-full w-full bg-white">
            <Line options={options} typeof='line' data={studyTimeData} />
          </div>
        )
      setStudyTimeChart(Chart)

      // 학습 단어 개수
      const studyCntData = {
        datasets: [
          {
            label: '단어학습 개수',
            data: wordCnt, 
            borderColor: 'rgba(75, 192, 192, 0.7)',
            backgroundColor: 'rgb(75, 192, 192)',
            tension: 0.1,
            hoverBorderColor: ['#d5cdcf'],
            hoverOffset: 4,
          },
          {
            label: '문맥학습 개수',
            data: conTextCnt, 
            borderColor: 'rgba(255, 205, 86, 0.7)',
            backgroundColor: 'rgba(255, 205, 86)',
            hoverBorderColor: ['#d5cdcf'],
            hoverOffset: 4,
          },
        ],
        labels: labels,
      };

      const Chart2 = 
        (
          <div className="h-full w-full bg-white">
            <Line options={options} typeof='line' data={studyCntData}/>
          </div>
        )
        setStudyCntChart(Chart2)
    })

    getUserStatsCompare(userId).unwrap().then((r)=> {
      // console.log('통계 데이터: ',r.data);
      const options = {
        // 옵션 (1)
        responsive: true,
        // 옵션 (2)
        interaction: {
          mode: "index" as const,
          intersect: false,
        },
        // 옵션 (3)
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              color: "#E3E3E3",
            },
          },
        },
        maintainAspectRatio: false,
      };
      // 학습 비교 통계
      const studyCompareData = {
        datasets: [
          {
            label: '전체 평균 학습 시간(분) ',
            data: [Math.floor(r.data.monthUsersStatsTime/60), Math.floor(r.data.monthMyStatsTime/60)], 
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
            ],
            tension: 0.1,
            hoverBorderColor: ['#d5cdcf'],
            hoverOffset: 4,
          },
        ],
        borderWidth: 4,
        labels: ["전체 사용자 평균", "나의 평균"],
      };
  
      const Chart3 = 
        (
          <div className="h-full w-full bg-white">
            <Bar options={options} typeof='bar' data={studyCompareData}/>
          </div>
        )
        setStudyCompareChart(Chart3)
      // 학습 비교 통계
      const studyCompareData2 = {
        datasets: [
          {
            label: "나의 평균 학습 시간(분) ",
            data: [Math.floor(r.data.monthMyStatsTime/60), Math.floor(r.data.todayMyTime/60)], 
            backgroundColor: [
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
            ],
            fill: false,
            tension: 0.1,
            hoverBorderColor: ['#d5cdcf'],
            hoverOffset: 4,
          },
        ],
        borderWidth: 4,
        labels: ["나의 한달", "나의 오늘"],
      };
  
      const Chart4 = 
        (
          <div className="h-full w-full bg-white">
            <Bar options={options} typeof='bar' data={studyCompareData2}/>
          </div>
        )
        setStudyCompareChart2(Chart4)
    })

    getUserBadge(userId).unwrap().then((r)=> {
      setUserBadge(r.data)
    }).then(()=> {
      setBadgeList(userBadge.map((badge:GetBadge, idx:number)=> {        
        return (
            <img key={idx} className="object-contain w-[8rem] h-[8rem] py-[0.5rem] px-[0.5rem] hover:w-[9rem] hover:h-[9rem] hover:py-0 hover:px-0" style={{transition: 'all .4s'}} src={`/Assets/Badge/${badge.badgeImage}.png`} alt="뱃지" onClick={()=> {
              showBadgeDetail(badge)
            }}/>
        )
      }))
    })
    
    Chart.register();
  },[userBadge])
  

  const selectDateChart:MouseEventHandler<HTMLSelectElement> = (e) => {
    monthStuty([userId, yearRef.current?.value, monthRef.current?.value]).then((r:any)=> {
      const wordCnt = r.data.data.map((data:any)=> {
        return data.wordCount
      })
      const conTextCnt = r.data.data.map((data:any) => {
        return data.contextCount
      })
      const conTextTm = r.data.data.map((data:any) => {
        return Math.floor(data.contextTime/60)
      })
      const wordTm = r.data.data.map((data:any) => {
        return Math.floor(data.wordTime/60)
      })
      const wrongTm = r.data.data.map((data:any) => {
        return Math.floor(data.wrongTime/60)
      })
      const labels:number[] = Array.from({length: conTextTm.length}, (v,i)=> i+1)

      const options = {
        // 옵션 (1)
        responsive: true,
        // 옵션 (2)
        interaction: {
          mode: "index" as const,
          intersect: false,
        },
        // 옵션 (3)
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              color: "#E3E3E3",
            },
          },
        },
        maintainAspectRatio: false
      };

      // 학습 시간

      const studyTimeData = {
        datasets: [
          {
            label: '단어학습 시간',
            data: wordTm, 
            borderColor: 'rgba(75, 192, 192, 0.7)',
            backgroundColor: 'rgb(75, 192, 192)',
            tension: 0.1,
            hoverBorderColor: ['#d5cdcf'],
            hoverOffset: 4,
          },
          {
            label: '문맥학습 시간',
            data: conTextTm, 
            borderColor: 'rgba(255, 205, 86, 0.7)',
            backgroundColor: 'rgba(255, 205, 86)',
            hoverBorderColor: ['#d5cdcf'],
            hoverOffset: 4,
          },
          {
            label: '복습시간',
            data: wrongTm, 
            borderColor: 'rgba(255, 99, 132, 0.7)',
            backgroundColor: 'rgb(255, 99, 132)',
            hoverBorderColor: ['#d5cdcf'],
            hoverOffset: 4,
          },
        ],
        labels: labels
      };

      const Chart = 
        (
          <div className="h-full w-full bg-white">
            <Line options={options} typeof='line' data={studyTimeData} />
          </div>
        )
      setStudyTimeChart(Chart)

      // 학습 단어 개수   
      const studyCntData = {
        datasets: [
          {
            label: '단어학습 개수',
            data: wordCnt, 
            borderColor: 'rgba(75, 192, 192, 0.7)',
            backgroundColor: 'rgb(75, 192, 192)',
            tension: 0.1,
            hoverBorderColor: ['#d5cdcf'],
            hoverOffset: 4,
          },
          {
            label: '문맥학습 개수',
            data: conTextCnt, 
            borderColor: 'rgba(255, 205, 86, 0.7)',
            backgroundColor: 'rgba(255, 205, 86)',
            hoverBorderColor: ['#d5cdcf'],
            hoverOffset: 4,
          },
        ],
        labels: labels,
      };

      const Chart2 = 
        (
          <div className="h-full w-full bg-white">
            <Line options={options} typeof='line' data={studyCntData}/>
          </div>
        )
        setStudyCntChart(Chart2)
    })
    
  }

  
  const updateBadge = () => {
    putUserBadge([badgeDetail?.badgeId, userId]).then((r:any)=> {
      if (r.data.message === 'success') {
        toast.success('변경되었습니다.')
      } else  {
        toast.error('요청에 문제가 생겼습니다.')
      }
      setIsshowBadgeDetail(false)
    })
  }

  const yearSelectElement = (
    <select ref={yearRef} className="w-full h-full text-center font-semibold text-[0.8rem] md:text-[0.9rem] lg:text-[1rem] text-[#A2A2A2] border-2 border-[#F7CCB7] rounded-md" onClick={selectDateChart}>
      {
        yearList.map((year:number,key:number)=> {         
          const isSelected = key === nowYear          
          return <option key={key} className="text-center w-full" value={year} selected={isSelected}>{year}년</option>
        })
      }
    </select>
  )

  const monthSelectElement = (
    <select ref={monthRef} className='w-full text-center font-semibold text-[0.8rem] md:text-[0.9rem] lg:text-[1rem] text-[#A2A2A2] border-2 border-[#F7CCB7] rounded-md' onClick={selectDateChart}>
      {
        monthList.map((month:number, key:number)=> {
          const isSelected = key === nowMonth-1
          console.log(nowMonth);
          
          return <option key={key} className="text-center w-full" value={month} selected={isSelected}>{month}월</option>
        })
      }
    </select>
  )
  
  const badgeDetailModal = (
    <div ref={badgeDetailRef} className="flex justify-center items-center w-full h-full absolute z-10 bg-gray-500/60 rounded-xl" onClick={(e)=> {
      if (e.target === badgeDetailRef.current ) {
        setIsshowBadgeDetail(false)
      }
    }}>
      <div className="flex justify-center w-[90%] md:w-[60%] h-[90%] relative bg-white rounded-2xl">
        <div className="flex flex-col justify-center lg:justify-start items-center w-full h-full ">
          <div className="flex justify-center items-start w-full">
            <img className="object-contain w-[9rem] h-[9rem]" src={`/Assets/Badge/${badgeDetail?.badgeImage}.png`} alt="뱃지"/>
          </div>
          <div className="flex flex-col justify-between items-center py-2">
            <div className="font-bold text-[1.8rem] text-[#A87E6E]">{badgeDetail?.badgeName}</div>
            <div className="font-semibold text-[1.1rem]">{badgeDetail?.badgeDetail}</div>
            <div className="text-[#8E8E8E]">{badgeDetail?.createdAt.slice(0,10)}&nbsp;획득</div>
          </div>
          <div className="flex justify-around text-center w-[90%] md:w-[80%] text-[1.4rem]  lg:text-[1.8rem] font-bold text-white py-3 ">
            <div className="w-[45%] lg:w-1/3 bg-[#B7B7B7] rounded-xl hover:bg-[#898989] cursor-pointer" onClick={()=> {setIsshowBadgeDetail(false)}}><span>그만두기</span></div>
            <div className="w-[45%] lg:w-1/3 bg-[#F5BEA4] rounded-xl hover:bg-[#f1a581] cursor-pointer" onClick={updateBadge}><span>장착하기</span></div>
          </div>
        </div>
      </div>
    </div>
  )

  const loading = <div>로딩중</div>

  return (
    <>
      {
        (monthStudyLoading||isLoading2||isLoading3||isLoading4)&&loading
      }
      
      <div className="flex flex-col justify-center items-center w-full px-[5%] h-[130rem] lg:h-[110rem] mb-6 md:mb-0 md:my-12">
        <div className="flex justify-center items-center h-[80%] max-w-screen-xl w-full">
          {/* 학습 관리 */}
          <div className="flex flex-col justify-center items-start w-full h-[90%]">
            <div className="flex justify-between items-end w-full h-[6%] lg:h-[8%] my-[2%]">
              <div className="flex flex-col w-1/2">
                <div className="block text-[1.1rem] md:text-[1.35rem] lg:text-[1.4rem] font-semibold pb-2">학습 관리</div>
                <div className="block font-semibold text-[0.8rem] md:text-[0.9rem] lg:text-[1rem] text-[#A2A2A2]">나의 학습 정보를 확인해보세요!</div>
              </div>
              <div className="flex justify-between items-end  w-1/2 lg:w-1/3 h-full ">
                {/* <div className="w-full"><span className="flex justify-center items-center border-2 ">2023</span></div> */}
                <div className=" w-full">
                  {yearSelectElement}
                </div>
                <div className=" w-full">
                  {monthSelectElement}
                </div>
              </div>
            </div>
            <div className="h-[21%] lg:h-[28%] w-full my-[2%]">
              {/* 학습 시간 문구 */}
              <div className="flex justify-between items-center w-full h-[16%] lg:h-[20%]">
                <div className="flex justify-center items-center w-[35%] md:w-[19%] h-[80%] sm:h-[60%] lg:h-[70%] rounded-lg sm:rounded-xl bg-[#F7CCB7] text-white font-semibold text-[0.9rem] md:text-[1rem] lg:text-[1.1rem]"><span>학습 시간</span></div>
              </div>
              {/* 학습 시간 데이터 */}
              <div className="flex justify-center items-center w-full h-[80%]">
                <div className="h-[90%] w-full bg-[#D9D9D9] rounded-md">
                  {/* 한달 간격으로 학습시간 & 학습 단어 갯수를 꺽은선 or 막대 그래프로 보여주기 */}
                  {/* {monthStudyLoading && loading} */}
                  {studyTimeChart? studyTimeChart: null}
                  
                </div>
              </div>
            </div>
            <div className="h-[21%] lg:h-[28%] w-full my-[2%]">
              {/* 학습 단어 개수 */}
              <div className="flex justify-between items-center w-full h-[16%] lg:h-[20%]">
                <div className="flex justify-center items-center w-[35%] md:w-[19%] h-[80%] sm:h-[60%] lg:h-[70%] rounded-lg sm:rounded-xl bg-[#F7CCB7] text-white font-semibold text-[0.9rem] sm:text-[1rem] lg:text-[1.1rem]"><span>학습 단어 개수</span></div>
              </div>
              {/* 학습 단어 개수 데이터 */}
              <div className="flex justify-center items-center w-full h-[80%]">
                <div className="h-[90%] w-full bg-[#D9D9D9] rounded-md">
                  {/* 한달 간격으로 날짜별 맞힌 개수, 틀린 개수를 꺽은선 or 막대 그래프로 보여주기 */}
                  {/* {monthStudyLoading && loading} */}
                  {
                    studyCntChart? studyCntChart:null
                  }
                </div>
              </div>
            </div>
            {/* 데스크탑 */}
            <div className="hidden lg:flex justify-evenly items-center h-[28%] w-full my-[2%]">
              {/* 다른 유저와 통계 비교 */}
              <div className="flex flex-col items-start w-[48%] h-full mr-[4%]">
                <div className="flex justify-center items-center w-[70%] lg:w-[38%] h-[16%] lg:h-[20%] ">
                  <div className="flex justify-center items-center text-center w-full h-full lg:h-[84%] bg-[#F7CCB7] rounded-lg sm:rounded-xl text-white font-semibold lg:text-[1.1rem]">
                    <span>전체 학습 시간</span>
                  </div>
                </div>
                <div className="w-full h-full">
                    {isLoading2&&loading }
                    {
                      studyCompareChart? studyCompareChart:null
                    }
                </div>
              </div>
              {/* 나의 학습 비교 */}
              <div className="flex flex-col items-start w-[48%] h-full">
                <div className="flex justify-center items-center w-[70%] lg:w-[38%] h-[16%] lg:h-[20%] ">
                  <div className="flex justify-center items-center text-center w-full h-full lg:h-[84%] bg-[#F7CCB7] rounded-lg sm:rounded-xl text-white font-semibold lg:text-[1.1rem]">
                    <span>나의 학습 시간</span>
                  </div>
                </div>
                <div className="w-full h-full">
                    {isLoading2&&loading }
                    {
                      studyCompareChart2? studyCompareChart2:null
                    }
                </div>
              </div>
            </div>
            {/* 태블릿 & 모바일 */}
            <div className="flex flex-col lg:hidden justify-center items-center h-[46%] w-full my-[2%]">
              {/* 다른 유저와 통계 비교 */}
              <div className="w-full h-[48%] my-[2%]">
                <div className="flex justify-between items-center w-full h-[17%]">
                  <div className="flex justify-center items-center h-[70%] w-[35%] rounded-lg sm:rounded-xl bg-[#F7CCB7] text-white font-semibold text-[0.9rem] md:text-[1rem] lg:text-[1.1rem]"><span>전체 학습 시간</span></div>
                </div>
                {/* 학습 시간 데이터 */}
                <div className="flex justify-center items-center w-full h-[83%]">
                  <div className="h-[90%] w-full bg-[#D9D9D9] rounded-md">
                    {/* 한달 간격으로 학습시간 & 학습 단어 갯수를 꺽은선 or 막대 그래프로 보여주기 */}
                    {isLoading2&&loading }
                    {
                      studyCompareChart? studyCompareChart:null
                    }
                  </div>
                </div>
              </div>
              {/* 다른 유저와 통계 비교 */}
              <div className="w-full h-[48%] my-[2%]">
                <div className="flex justify-between items-center w-full h-[17%]">
                  <div className="flex justify-center items-center h-[70%] w-[35%] rounded-lg sm:rounded-xl bg-[#F7CCB7] text-white font-semibold text-[0.9rem] md:text-[1rem] lg:text-[1.1rem]"><span>나의 학습 시간</span></div>
                </div>
                {/* 학습 시간 데이터 */}
                <div className="flex justify-center items-center w-full h-[83%]">
                  <div className="h-[90%] w-full bg-[#D9D9D9] rounded-md">
                    {/* 한달 간격으로 학습시간 & 학습 단어 갯수를 꺽은선 or 막대 그래프로 보여주기 */}
                    {isLoading2&&loading }
                    {
                      studyCompareChart2? studyCompareChart2:null
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-start h-[20%] max-w-screen-xl w-full relative">
        {
          isShowBadgeDetail? badgeDetailModal: null
        }
          <div className="flex flex-col justify-center items-start w-full h-full">
            <div className="flex items-center h-[15%]">
              <div className="block text-[1.1rem] md:text-[1.35rem] lg:text-[1.4rem] font-semibold">칭호</div>
            </div>
            <div className="h-[85%] w-full">
              {/* 학습 단어 개수 */}
              <div className="flex justify-between items-end w-full h-[14%] mb-2">
                {/* 데스크탑 & 태블릿 */}
                <div className="hidden sm:flex flex-col justify-center items-start h-full w-[80%] text-[#A2A2A2] font-semibold text-[0.8rem] md:text-[0.9rem] lg:text-[1rem]">
                  <div>
                    <div><span className="pb-2">홍민정음에서 특정 목표를 달성하면 얻을 수 있습니다!</span></div>
                  </div>
                  <div>
                    <div><span>칭호를 착용해 보세요</span></div>
                  </div>
                </div>
                {/* 모바일 */}
                <div className="flex sm:hidden flex-col justify-center items-start h-full w-[85%] text-[#A2A2A2] font-semibold text-[0.8rem]">
                  <div>
                    <div><span className="pb-2">홍민정음에서 특정 목표를 달성하면 </span></div>
                  </div>
                  <div>
                    <div><span>얻을 수 있습니다! 칭호를 착용해 보세요</span></div>
                  </div>
                </div>
                <div className="flex justify-center items-center w-[15%] font-semibold text-[1.3rem] h-full text-[#BF9F91]">
                  <div className="w-full"><span className="flex justify-end items-center ">{userBadge.length}개</span></div>
                </div>
              </div>
              {/* 학습 단어 개수 데이터 */}
              <div className="flex justify-center items-start w-full h-[86%] mt-1 relative">
                <div className="flex justify-start items-center flex-nowrap overflow-x-auto h-[85%] w-full bg-[#F0ECE9] rounded-md px-2">
                  {badgeList}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}