import Footer from "../Common/Footer"
import Navbar from "../Common/Navbar"
import Pangguin from "../Threejs/Pangguin"
import { useGetUserMyinfoQuery, useGetUserMystudyQuery } from "../../Store/api"
import React, { useState } from "react"
import styled from './MyPage.module.css'
import { Doughnut } from "react-chartjs-2"

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
  level: string
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

  if (isLoading1 || isLoading2) {
    return <div>Loading...</div>;
  }

  if (isError1 || isError2) {
    return <>Error: {isError1 || isError2}</>;
  }

  // 레벨 경험치
  const levelInfo: LevelType[] = [
  {
    levelName: "정일품",
    levelName2: "正一品",
    totalExp: 100
  },
  {
    levelName: "정이품",
    levelName2: "正二品",
    totalExp: 200
  },
  {
    levelName: "정삼품",
    levelName2: "正三品",
    totalExp: 400
  },
  {
    levelName: "정사품",
    levelName2: "正四品",
    totalExp: 800
  },
  {
    levelName: "정오품",
    levelName2: "正五品",
    totalExp: 1600
  },
  {
    levelName: "정육품",
    levelName2: "正六品",
    totalExp: 3200
  },
  {
    levelName: "정칠품",
    levelName2: "正七品",
    totalExp: 6400
  },
  {
    levelName: "정팔품",
    levelName2: "正八品",
    totalExp: 12800
  },
  {
    levelName: "정구품",
    levelName2: "正九品",
    totalExp: 25600
  },
  ]
  // 경험치 비율 width
  const expWidth = (userMyInfo?.data.exp / levelInfo[userMyInfo?.data.level].totalExp) * 100 + "%"
  
  const totalExp = levelInfo[userMyInfo?.data.level].totalExp

  // 학습 데이터에 따른 캐릭터 문구
  
  const sentenceList: {
    [key: number]: React.ReactNode
  } = {
    0: <div>오늘 학습한 데이터가 없어서 울고있어요.😥 <br/>서둘러 학습을 해주세요</div>,
    1: <div>현재 맞춘 개수가 더 많아서 행복해 하고 있어요.😊 <br/>더 화이팅 해주세요</div>,
    2: <div>현재 틀린 개수가 더 많아서 슬퍼하고 있어요.😓 <br/> 더 힘내주세요</div>,
  }
  let sentence:React.ReactNode

  console.log('studyData: ', studyData?.data);
  const {todayWord, totalWord, todayContext, totalContext, todayTime, totalTime}:StudyType = studyData?.data
  const todayTotal = studyData?.data.todayContext + studyData?.data.todayTime + studyData?.data.todayWord
  const statsDate:number = studyData?.data.statsRight - studyData?.data.statsWrong
  const  {statsRight, statsSemo, statsWrong} = studyData?.data
  const level = levelInfo[userMyInfo?.data.level].levelName2

  // console.log('level: ', level);
  

  if (todayTotal === 0) {
    sentence = sentenceList[0]
  } else if (statsDate > 0) {
    sentence = sentenceList[1]
  } else if (statsDate < 0) {
    sentence = sentenceList[2]
  }

  return (
    <>
    
      <Navbar/>
      {/* 필요 데이터
        nickname, nowbadgeName, expWidth, exp, totalExp, 학습 시간에 따른 문구 
      */}
      <MyPageSection1V1 nickname={userMyInfo?.data.nickname} nowbadgeName={userMyInfo?.data.nowbadgeName} expWidth={expWidth} exp={userMyInfo?.data.exp} totalExp={totalExp} sentence={sentence} level={level} />
      <MyPageSection2V1 todayWord={todayWord} totalWord={totalWord} todayContext={todayContext} totalContext={totalContext} todayTime={todayTime} totalTime={totalTime} statsRight={statsRight} statsSemo={statsSemo} statsWrong={statsWrong}/>
      <MyPageSection1V2 nickname={userMyInfo?.data.nickname} nowbadgeName={userMyInfo?.data.nowbadgeName} expWidth={expWidth} exp={userMyInfo?.data.exp} totalExp={totalExp} sentence={sentence} level={level} />
      <MyPageSection2V2 todayWord={todayWord} totalWord={totalWord} todayContext={todayContext} totalContext={totalContext} todayTime={todayTime} totalTime={totalTime} statsRight={statsRight} statsSemo={statsSemo} statsWrong={statsWrong}/>
      <MyPageSection3/>
      <Footer/>
    </>
  )
}
export default MyPage

// 데스크탑 & 태블릿
function MyPageSection1V1({nickname, nowbadgeName, expWidth, exp, totalExp, sentence, level}:Type):JSX.Element {
  
  return (
    <div className="container max-w-screen-xl h-[26rem] md:w-[90%] mx-auto hidden md:flex flex-col md:flex-row md:justify-around items-center text-center py-[2rem]">
      <div className="flex flex-col md:w-[55%] h-full bg-[#ffffff] rounded-md ">
        <Pangguin position={-2} />
        <div className="bg-[#D9D9D9] rounded-xl font-semibold md:text-[1rem] w-full py-1">{sentence}</div>
      </div>
      <div className="md:w-[45%] pt-[1rem] pb-[0.5rem] px-4">
        <div className="flex justify-center items-center h-full w-full">
          {/* 메인 데이터 */}
          <div className="flex flex-col justify-center items-center h-4/5 w-full">
            <div className="flex justify-between items-center w-full pb-1">
              {/* 칭호 & 수정 */}
              <div className="md:text-[1.2rem]">🥕&nbsp; {nowbadgeName}</div>
              <div className="text-[#8E8E8E] md:text-[1rem]">정보 수정⚙</div>
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
                  {exp} / {totalExp}
                </div>
              </div>
              <div className="w-full rounded-xl h-4 bg-[#F0ECE9]">
                {/* 경험치 바: 위에서 퍼센트 계산해서 넣으면 될듯?*/}
                <div className="rounded-xl h-full bg-[#F7CCB7]" style={{width: `${expWidth}`, maxWidth: '100%'}}>
                  &nbsp;
                </div>
              </div>
            </div>
            <div className="flex justify-start items-center w-full pt-4">
              <div className="md:w-[1.5rem] lg:w-[2rem] md:h-[1.5rem] lg:h-[2rem] rounded-full border-2 border-[#c2bfbf] mx-2"><img src="/Assets/Icon/catSit.png" alt="" /></div>
              <div className="md:w-[1.5rem] lg:w-[2rem] md:h-[1.5rem] lg:h-[2rem] rounded-full border-2 border-[#c2bfbf] mx-2"><img src="/Assets/Icon/catSit.png" alt="" /></div>
              <div className="md:w-[1.5rem] lg:w-[2rem] md:h-[1.5rem] lg:h-[2rem] rounded-full border-2 border-[#c2bfbf] mx-2"><img src="/Assets/Icon/catSit.png" alt="" /></div>
              <div className="md:w-[1.5rem] lg:w-[2rem] md:h-[1.5rem] lg:h-[2rem] rounded-full border-2 border-[#c2bfbf] mx-2"><img src="/Assets/Icon/catSit.png" alt="" /></div>
              <div className="md:w-[1.5rem] lg:w-[2rem] md:h-[1.5rem] lg:h-[2rem] rounded-full border-2 border-[#c2bfbf] mx-2"><img src="/Assets/Icon/catSit.png" alt="" /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
// 데스크탑 & 태블릿
function MyPageSection2V1({todayWord, totalWord, todayContext, totalContext, todayTime, totalTime, statsRight, statsSemo, statsWrong}:StudyType):JSX.Element {
  console.log('216줄: ',todayWord, totalWord, todayContext, totalContext, todayTime, totalTime);
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
  return (
    <div className="container max-w-screen-xl h-[15rem] md:w-[90%] mx-auto hidden md:flex md:justify-around items-center text-center py-[0.5rem] overflow-hidden">
      <div className="flex flex-col w-1/2">
        <div className="flex justify-evenly items-center">
          {/* 통계 */}
          <div className="flex flex-col justify-center items-center w-1/4">
            {/* 오늘의 단어 */}
            <div className="text-[#B18978]"><span className="font-bold md:text-[2.7rem]">{todayWord}</span><span className=" md:text-[1rem]">개</span></div>
            <div className="text-[#A2A2A2] text-[0.8rem]"><span>오늘의 단어</span></div>
          </div>
          <div className="flex flex-col justify-center items-center md:w-[21%] lg:w-1/4">
            {/* 총 단어 */}
            <div className="text-[#FFA800]"><span className="font-bold md:text-[2.7rem]">{totalWord}</span><span className=" md:text-[1rem]">개</span></div>
            <div className="text-[#A2A2A2] text-[0.8rem]"><span>총 단어</span></div>
          </div>
          <div className="flex flex-col justify-center items-center md:w-[29%] lg:w-1/4">
            {/* 오늘의 학습시간 */}
            <div className="text-[#B18978]"><span className="font-bold md:text-[2.7rem]">{todayContext}</span><span className=" md:text-[1rem]">개</span></div>
            <div className="text-[#A2A2A2] text-[0.8rem]"><span>오늘의 문맥도감</span></div>
          </div>
          <div className="flex flex-col justify-center items-center w-1/4">
            {/* 총 학습시간 */}
            <div className="text-[#FFA800]"><span className="font-bold md:text-[2.7rem]">{totalContext}</span><span className=" md:text-[1rem]">개</span></div>
            <div className="text-[#A2A2A2] text-[0.8rem]"><span>총 문맥도감</span></div>
          </div>
        </div>
        <div className="flex justify-evenly items-center mt-2">
          <div className="flex flex-col justify-center items-center md:w-full ">
            {/* 오늘의 학습시간 */}
            <div className="text-[#B18978]"><span className="font-bold md:text-[2.7rem]">{m1}</span><span className=" md:text-[1rem]">분</span></div>
            <div className="text-[#A2A2A2] text-[0.8rem]"><span>오늘의 학습시간</span></div>
          </div>
          <div className="flex flex-col justify-center items-center md:w-full ">
            {/* 총 학습시간 */}
            <div className="text-[#FFA800]"><span className="font-bold md:text-[2.7rem]">{h2}</span><span className=" md:text-[1rem]">시간</span><span className="font-bold md:text-[2.7rem]">{m2}</span><span className=" md:text-[1rem]">분</span></div>
            <div className="text-[#A2A2A2] text-[0.8rem]"><span>총 학습시간</span></div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center w-[45%] h-[110%] -translate-y-11 relative">
        <div className="absolute -bottom-[2.3rem] font-semibold text-[1.2rem] text-[#FFA800]">오늘의 학습</div>
        <Doughnut typeof='doughnut' data={data}/>
      </div>
    </div>
  )
}


// 모바일
function MyPageSection1V2({nickname, nowbadgeName, expWidth, exp, totalExp, sentence, level}:Type):JSX.Element {
  return (
    <div className="flex flex-col md:hidden justify-center items-center h-[26rem] mt-7">
      <div className="flex justify-center items-center w-[90%] h-[70%]">
        <div className="flex justify-center items-center h-full w-full">
          {/* 렙업에 따른 3D 캐릭터 */}
          <div className="flex flex-col justify-end items-center w-full h-full">
            <div className="flex justify-between items-center w-full pb-1 text-[0.6rem]">
              {/* 칭호 & 수정 */}
              <div>🥕&nbsp;{nowbadgeName}</div>
              <div className="text-[#8E8E8E]">정보 수정⚙</div>
            </div>
            <span className="text-left w-full mr-1 text-[1.2rem] font-semibold">{nickname}</span>
            {/* <Gaming/> */}
            <Pangguin position={-2}/>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center w-[90%] h-[5%]">
        {/* 캐릭터 행동 버튼 */}
        <div className="w-[1.5rem] h-[1.5rem] rounded-full border-2 border-[#c2bfbf] mx-2"><img src="/Assets/Icon/catSit.png" alt="" /></div>
        <div className="w-[1.5rem] h-[1.5rem] rounded-full border-2 border-[#c2bfbf] mx-2"><img src="/Assets/Icon/catSit.png" alt="" /></div>
        <div className="w-[1.5rem] h-[1.5rem] rounded-full border-2 border-[#c2bfbf] mx-2"><img src="/Assets/Icon/catSit.png" alt="" /></div>
        <div className="w-[1.5rem] h-[1.5rem] rounded-full border-2 border-[#c2bfbf] mx-2"><img src="/Assets/Icon/catSit.png" alt="" /></div>
        <div className="w-[1.5rem] h-[1.5rem] rounded-full border-2 border-[#c2bfbf] mx-2"><img src="/Assets/Icon/catSit.png" alt="" /></div>
      </div>
      <div className="flex justify-center items-center w-[90%] h-[25%]">
        {/* 메인 데이터 */}
        <div className="flex flex-col justify-center items-center h-3/5 w-full">
          <div className="flex flex-col justify-center items-center w-full">
            <div className="flex justify-between items-center w-full">
              {/* 닉네임 & 등급 & 경험치 */}
              <div className="pb-1">
                {/* 닉네임 & 등급 */}
                <span className="text-[0.5rem] px-1 border-2 border-[#A87E6E] w-fit mx-auto rounded-full bg-[#F0ECE9] font-bold text-[#A87E6E]">{level}</span>
              </div>
              <div className="text-[0.7rem] text-[#525252]">
                {/* 등급 */}
                {exp}/{totalExp}
              </div>
            </div>
            <div className="flex justify-start items-center w-full rounded-xl h-4 bg-[#F0ECE9]">
              {/* 경험치 바: 위에서 퍼센트 계산해서 넣으면 될듯?*/}
              <div className="rounded-xl h-full bg-[#F7CCB7]" style={{width: `${expWidth}`, maxWidth: '100%'}}>
                &nbsp;
              </div>
            </div>
            <div className="bg-[#D9D9D9] rounded-lg w-full text-center font-semibold text-[0.6rem] md:text-[0.7rem] lg:text-[0.8rem] my-2 py-2">{sentence}</div>
          </div>
        </div>
      </div>
    </div>
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
  return (
    <div className="flex flex-col md:hidden justify-center items-center h-[23rem] my-6">
      <div className="flex justify-center items-center h-[73%] w-[90%] mb-[2%]">
        <div className="flex justify-center items-center h-full w-full border-4">
          통계
        </div>
      </div>
      <div className="flex justify-center items-center h-[25%] w-[90%]">
        {/* 메인 데이터 */}
        <div className="flex flex-col w-full">
          <div className="flex justify-evenly items-center">
            <div className="flex flex-col justify-center items-center w-1/4">
              {/* 오늘의 단어 */}
              <div className="text-[#B18978]"><span className="font-bold text-[1.3rem]">{todayWord}</span><span className="text-[0.7rem]">개</span></div>
              <div className="text-[#A2A2A2] text-[0.6rem]"><span>오늘의 단어</span></div>
            </div>
            <div className="flex flex-col justify-center items-center w-[21%]">
              {/* 총 단어 */}
              <div className="text-[#FFA800]"><span className="font-bold text-[1.3rem]">{totalWord}</span><span className="text-[0.7rem]">개</span></div>
              <div className="text-[#A2A2A2] text-[0.6rem]"><span>총 단어</span></div>
            </div>
            <div className="flex flex-col justify-center items-center w-[29%]">
              {/* 오늘의 학습시간 */}
              <div className="text-[#B18978]"><span className="font-bold text-[1.3rem]">{todayContext}</span><span className="text-[0.7rem]">개</span></div>
              <div className="text-[#A2A2A2] text-[0.6rem]"><span>오늘의 문맥도감</span></div>
            </div>
            <div className="flex flex-col justify-center items-center w-1/4">
              {/* 총 학습시간 */}
              <div className="text-[#FFA800]"><span className="font-bold text-[1.3rem]">{totalContext}</span><span className="text-[0.7rem]">개</span></div>
              <div className="text-[#A2A2A2] text-[0.6rem]"><span>총 문맥도감</span></div>
            </div>
          </div>
          <div className="flex justify-evenly items-center mt-1 ">
            <div className="flex flex-col justify-center items-center w-[28%]">
              {/* 오늘의 학습시간 */}
              <div className="text-[#B18978]"><span className="font-bold text-[1.3rem]">{m1}</span><span className="text-[0.7rem]">분</span></div>
              <div className="text-[#A2A2A2] text-[0.6rem]"><span>오늘의 학습시간</span></div>
            </div>
            <div className="flex flex-col justify-center items-center w-[28%]">
              {/* 총 학습시간 */}
              <div className="text-[#FFA800]"><span className="font-bold text-[1.3rem]">{h2}</span><span className="text-[0.7rem]">시간</span><span className="font-bold text-[1.3rem]">{m2}</span><span className="text-[0.7rem]">분</span></div>
              <div className="text-[#A2A2A2] text-[0.6rem]"><span>총 학습시간</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MyPageSection3():JSX.Element {
  const nowDate = new Date()
  const startService:number = 2023
  
  const createYearCnt = nowDate.getFullYear() - startService +1  
  const yearList:number[] = Array.from({length: createYearCnt}, (v,i) => startService+i)
  const monthList:number[] = Array.from({length: 12}, (v,i)=> i+1)

  const yearSelectElement = (
    <select className="w-full h-full text-center font-semibold text-[0.7rem] md:text-[0.8rem] lg:text-[0.9rem] text-[#A2A2A2]">
      {
        yearList.map((year:number)=> {
          return <option className="text-center w-full" value={year}>{year}년</option>
        })
      }
    </select>
  )

  const monthSelectElement = (
    <select className='w-full text-center font-semibold text-[0.8rem] md:text-[0.9rem] lg:text-[1rem] text-[#A2A2A2]'>
      {
        monthList.map((month:number)=> {
          return <option className="text-center w-full" value={month}>{month}월</option>
        })
      }
    </select>
  )

  console.log('yearSelectElement: ',yearSelectElement);
  
  

  return (
    <div className="flex flex-col justify-center items-center w-full px-[5%] h-[53rem] sm:h-[57rem] md:h-[58rem] lg:h-[70rem] mt-20 mb-24">
      <div className="flex justify-center items-center h-[67%] max-w-screen-xl w-full">
        {/* 학습 관리 */}
        <div className="flex flex-col justify-center items-start w-full h-[90%]">
          <div className="flex justify-between items-center w-full h-[16%] sm:h-[8%]">
            <div className="flex flex-col w-1/2">
              <div className="block text-[1.1rem] md:text-[1.35rem] lg:text-[1.4rem] font-semibold pb-2">학습 관리</div>
              <div className="block font-semibold text-[0.8rem] md:text-[0.9rem] lg:text-[1rem] text-[#A2A2A2]">나의 학습 정보를 확인해보세요!</div>
            </div>
            <div className="flex justify-between items-end w-[45%] md:w-[30%] h-full ">
              {/* <div className="w-full"><span className="flex justify-center items-center border-2 ">2023</span></div> */}
              <div className="w-full">
                {yearSelectElement}
              </div>
              <div className="w-full">
                {monthSelectElement}
              </div>
            </div>
          </div>
          <div className="h-[42%] sm:h-[46%] w-full mt-4">
            {/* 학습 시간 문구 */}
            <div className="flex justify-between items-center w-full h-[16%] sm:h-[20%]">
              <div className="flex justify-center items-center w-[35%] md:w-[19%] h-[80%] sm:h-[60%] lg:h-[70%] rounded-lg sm:rounded-xl bg-[#F7CCB7] text-white font-semibold text-[0.9rem] md:text-[1rem] lg:text-[1.1rem]"><span>학습 시간</span></div>
              <div className="flex justify-between items-center w-[28%] md:w-[20%] sm:h-[60%] lg:h-[70%] font-semibold text-[0.8rem] sm:text-[0.8rem] lg:text-[0.9rem] text-[#868686]">
              </div>
            </div>
            {/* 학습 시간 데이터 */}
            <div className="flex justify-center items-center w-full h-[80%]">
              <div className="h-[90%] w-full bg-[#D9D9D9] rounded-md">
                {/* 한달 간격으로 학습시간 & 학습 단어 갯수를 꺽은선 or 막대 그래프로 보여주기 */}
              </div>
            </div>
          </div>
          <div className="h-[42%] sm:h-[46%] w-full mt-4">
            {/* 학습 단어 개수 */}
            <div className="flex justify-between items-center w-full h-[16%] sm:h-[20%]">
              <div className="flex justify-center items-center w-[35%] md:w-[19%] h-[80%] sm:h-[60%] lg:h-[70%] rounded-lg sm:rounded-xl bg-[#F7CCB7] text-white font-semibold text-[0.9rem] sm:text-[1rem] lg:text-[1.1rem]"><span>학습 단어 개수</span></div>
            </div>
            {/* 학습 단어 개수 데이터 */}
            <div className="flex justify-center items-center w-full h-[80%]">
              <div className="h-[90%] w-full bg-[#D9D9D9] rounded-md">
                {/* 한달 간격으로 날짜별 맞힌 개수, 틀린 개수를 꺽은선 or 막대 그래프로 보여주기 */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center h-[33%] max-w-screen-xl w-full">
        <div className="flex flex-col justify-center items-start w-full h-[90%]">
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
                <div className="w-full"><span className="flex justify-end items-center ">3개</span></div>
              </div>
            </div>
            {/* 학습 단어 개수 데이터 */}
            <div className="flex justify-center items-start w-full h-[86%] mt-1">
              <div className="h-[85%] w-full bg-[#F0ECE9] rounded-md">
                {/* 한달 간격으로 날짜별 맞힌 개수, 틀린 개수를 꺽은선 or 막대 그래프로 보여주기 */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}