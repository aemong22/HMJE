import Footer from "../Common/Footer"
import Navbar from "../Common/Navbar"
import { useGetUserMyinfoQuery, useGetUserMystudyQuery, useLazyGetUserBadgeQuery, useLazyGetUserStatsCompareQuery, usePostUserMonthstudyMutation, usePutUserBadgeMalrangMutation, usePutUserBadgeMutation, usePutUserdataMutation } from "../../Store/api"
// import { usePostUserchecknicknameMutation } from "../../Store/NonAuthApi";
import React, { KeyboardEvent, KeyboardEventHandler, MouseEventHandler, useEffect, useRef, useState } from "react"
// import styled from './MyPage.module.css'
import { Bar, Doughnut, Line } from "react-chartjs-2"
import { toast } from "react-toastify";
import { Toast } from "../Common/Toast";
import { useNavigate } from "react-router-dom";
// import { useAppDispatch } from "../../Store/hooks";
// import { changeUserNickname } from "../../Store/store";
import Chart from 'chart.js/auto';
import OrangeCat from "../Threejs/OrangeCat"
import Loading from "../Common/Loading";
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
  level2: string,
  nowbadgeImage: string,
  userId: (string | null),
  dataLevel : number,
  checkEmoState: number,
  moveClick: any
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
  nickname: string,
}


function MyPage():JSX.Element {
  const userId = localStorage.getItem('userId')

  const move1 = useRef<any>()
  const move2 = useRef<any>()
  const move3 = useRef<any>()
  const move4 = useRef<any>()
  const move5 = useRef<any>()

  const {data:userMyInfo, isError:isError1, isLoading:isLoading1} = useGetUserMyinfoQuery(userId)
  const {data:studyData, isError:isError2, isLoading:isLoading2} = useGetUserMystudyQuery(userId)


  if (isLoading1 || isLoading2 ) {
    return <Loading/>;
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
  const level1 = levelInfo[userMyInfo?.data.level].levelName
  const level2 = levelInfo[userMyInfo?.data.level].levelName2
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

  const moveClick = (e:any) => {
    if (e.target.ariaLabel === '시간') {
      move1.current.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})
    } else if (e.target.ariaLabel === '통계') {
      move2.current.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})
    } else if (e.target.ariaLabel === '비교') {
      move3.current.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})
      move5.current.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
    } else {
      move4.current.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})
    }
    
  }
  return (
    <>
      <Toast />
      <Navbar/>
      <MyPageSection1V1 nickname={userMyInfo?.data.nickname} nowbadgeName={userMyInfo?.data.nowbadgeName} expWidth={expWidth} exp={userMyInfo?.data.exp} totalExp={totalExp} dataLevel={dataLevel} sentence={sentence} level={level1} level2={level2} nowbadgeImage={userMyInfo?.data.nowbadgeImage} userId={userId} checkEmoState={checkEmoState} moveClick={moveClick}/>
      <MyPageSection2V1 todayWord={todayWord} totalWord={totalWord} todayContext={todayContext} totalContext={totalContext} todayTime={todayTime} totalTime={totalTime} statsRight={statsRight} statsSemo={statsSemo} statsWrong={statsWrong} nickname={userMyInfo?.data.nickname}/>
      <MyPageSection1V2 nickname={userMyInfo?.data.nickname} nowbadgeName={userMyInfo?.data.nowbadgeName} expWidth={expWidth} exp={userMyInfo?.data.exp} totalExp={totalExp} dataLevel={dataLevel} sentence={sentence} level={level1} level2={level2} nowbadgeImage={userMyInfo?.data.nowbadgeImage} userId={userId} checkEmoState={checkEmoState} moveClick={moveClick}/>
      <MyPageSection2V2 todayWord={todayWord} totalWord={totalWord} todayContext={todayContext} totalContext={totalContext} todayTime={todayTime} totalTime={totalTime} statsRight={statsRight} statsSemo={statsSemo} statsWrong={statsWrong} nickname={userMyInfo?.data.nickname}/>
      <MyPageSection3 userId={userId} move1={move1} move2={move2} move3={move3} move4={move4} move5={move5}/>
      <Footer/>
    </>
  )
}
export default MyPage



// 데스크탑
function MyPageSection1V1({nickname, nowbadgeName, expWidth, exp, totalExp, sentence, level, level2, nowbadgeImage, userId, dataLevel, checkEmoState, moveClick}:Type):JSX.Element {  
  const [putUserBadgeMalrang, {isLoading}] = usePutUserBadgeMalrangMutation()
  const [character, setCharacter] = useState<any>()
  const [clickCnt, setClickCnt] = useState<number>(0)
  const navigate= useNavigate();
  useEffect(()=> {
    setCharacter(<OrangeCat sendEmo={checkEmoState} dataLevel={dataLevel}/>)
  },[])

  useEffect(()=> {
    if (clickCnt !== 0 && clickCnt === 100) {
      putUserBadgeMalrang([userId, 18]).unwrap().then((r)=> {
        if (r.newbadge.length) {
          toast.success('숨겨진 칭호를 획득했습니다!')
        } else {
          toast.error('칭호를 소유하고 있습니다!')
        }
      })
      // .then(()=> {
      //   window.location.replace('/mypage')
      // })
    }
  },[clickCnt])

  const clickCat = () => {
    setClickCnt(clickCnt+1)
  }

  const Nav=()=>{
    navigate("/myinfoselectcheck");
  }

  const loading = <Loading/>

  

  return (
    <>
      {/* {
        isLoading&&loading
      } */}
      <div className="bg-[#F0ECE9]">
        <div className="container max-w-screen-xl h-[30rem] lg:w-full mx-auto hidden lg:flex flex-col lg:flex-row lg:justify-around items-center text-center mb-2 py-5">
          <div className="flex flex-col lg:w-[45%] h-full rounded-tr-xl rounded-tl-xl " onClick={clickCat}>
            <div className="flex justify-center items-center w-full h-full">
              <div className="flex flex-col justify-center items-center w-[90%] h-[90%] bg-white py-4 px-4 rounded-md">
                {character}
                <div className="bg-[#f3f5e6] rounded-br-xl rounded-bl-xl font-semibold md:text-[1rem] w-full py-1 rounded-md">{sentence}</div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center lg:w-[50%] pt-[1rem] pb-[0.5rem] h-[90%] px-4 ">
            <div className="flex justify-center items-center h-full w-full">
              {/* 메인 데이터 */}
              <div className="flex flex-col justify-start items-start h-4/5 w-full ">
                <div className="flex justify-between items-start w-full">
                  {/* 칭호 & 수정 */}
                  <div className="flex justify-start items-center md:text-[1.2rem]"><img className="w-[1.5rem]" src={`/Assets/Badge/${nowbadgeImage}.png`} alt="뱃지" />&nbsp; {nowbadgeName}</div>
                  <div aria-label="정보수정" className="text-[#8E8E8E] md:text-[1rem] cursor-pointer" onClick={Nav}>정보 수정⚙</div>
                </div>
                <div className="flex flex-col justify-center items-center w-full">
                  <div className="w-full flex justify-start"><span className="lg:text-[2.5rem] font-bold">{nickname}</span></div>
                  <div className="flex justify-between items-end w-full">
                    {/* 닉네임 & 등급 & 경험치 */}
                    <div className="mb-2">
                      {/* 닉네임 & 등급 */}
                      <span className="md:text-[1.3rem] font-bold text-[#8E8E8E] mr-1">{level}</span>
                      <span className="md:text-[0.9rem] px-1 border-2 border-[#A87E6E] w-fit mx-auto rounded-full bg-[#F0ECE9] font-bold text-[#A87E6E]">{level2}</span>
                    </div>
                    <div className="text-[1rem] pb-2 text-[#8E8E8E]">
                      {/* 등급 */}
                      {exp} / {dataLevel > 9 ? <>∞</> : <>{totalExp}</>}
                    </div>
                  </div>
                  <div className="w-full rounded-xl h-6 bg-[#FFFFFF] overflow-hidden">
                    {/* 경험치 바: 위에서 퍼센트 계산해서 넣으면 될듯?*/}
                    <div className="rounded-xl h-full bg-[#F7CCB7]" style={{width: `${expWidth}`, maxWidth: '100%'}}>
                      &nbsp;
                    </div>
                  </div>
                </div>
                {/* 이동 버튼 */}
                <div className="flex justify-center items-center bg-[#C6A89A] mt-9 w-full text-white text-[1.2rem] font-semibold rounded-lg">
                  <div className="flex justify-around items-center w-full py-2">
                    <div className="flex flex-col justify-center items-center w-full">
                      <div className="flex justify-around items-center w-full pt-2">
                        <div className="flex justify-center w-full border-r-2 border-r-white"><img aria-label="시간"  className="object-contain w-[3.7rem] h-[3.7rem] hover:scale-110 transition-all duration-300 cursor-pointer" src="/Assets/Icon/mypageIcon1.png" alt="icon" onClick={moveClick}/></div>
                        <div className="flex justify-center w-full border-r-2 border-r-white"><img aria-label="통계"  className="object-contain w-[3.7rem] h-[3.7rem] hover:scale-110 transition-all duration-300 cursor-pointer" src="/Assets/Icon/mypageIcon2.png" alt="icon" onClick={moveClick}/></div>
                        <div className="flex justify-center w-full border-r-2 border-r-white"><img aria-label="비교"  className="object-contain w-[3.7rem] h-[3.7rem] hover:scale-110 transition-all duration-300 cursor-pointer" src="/Assets/Icon/mypageIcon3.png" alt="icon" onClick={moveClick}/></div>
                        <div className="flex justify-center w-full "><img aria-label="칭호" className="object-contain w-[3.7rem] h-[3.7rem]  hover:scale-110 transition-all duration-300 cursor-pointer" src="/Assets/Icon/mypageIcon4.png" alt="icon" onClick={moveClick}/></div>
                      </div>
                      <div className="flex justify-around w-full">
                        <div aria-label="시간" className="cursor-pointer" onClick={moveClick}>학습 시간</div>
                        <div aria-label="통계" className="cursor-pointer" onClick={moveClick}>학습 통계</div>
                        <div aria-label="비교" className="cursor-pointer" onClick={moveClick}>학습 비교</div>
                        <div aria-label="칭호" className="cursor-pointer" onClick={moveClick}>나의 칭호</div>
                      </div>
                    </div>
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

// 데스크탑
function MyPageSection2V1({todayWord, totalWord, todayContext, totalContext, todayTime, totalTime, statsRight, statsSemo, statsWrong, nickname}:StudyType):JSX.Element {
  // 학습 시간 h , m , s
  let time1:number = todayTime
  const m1:number = Math.floor(time1 / 60);

  let time2:number = totalTime
  const h2 =  Math.floor(time2 / 3600);
  time2 = time2 % 3600
  const m2:number = Math.floor(time2 / 60);

  const data = {
    labels: ['정답', '세모', '오답'],
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
  };
  
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const showDataChart = (
    statsRight+statsSemo+statsWrong !== 0 ? (
      <div className="flex justify-center items-center w-[45%] h-[130%] relative ">
        <div className="absolute -bottom-[0.5rem] font-semibold text-[0.8rem]">학습 현황 도표</div>
        <Doughnut typeof='doughnut' data={data} options={options} style={{top: '-1.2rem', position: 'absolute'}}/>
      </div>
      ): <div className="flex justify-center items-center w-[45%] h-full"><span className="font-semibold text-[1rem] text-[#FFA800]">아직 오늘의 학습 데이터가 없어요...</span></div> 
  )
  return (
    <div className="container max-w-screen-xl h-[19rem] md:w-[90%] mx-auto hidden lg:flex md:justify-between items-center text-center my-12 py-[1rem] overflow-hidden">
      <div className="flex flex-col items-center w-[47%]">
        <div className="flex flex-col items-center w-full">
          <div className="flex justify-start w-full text-[1.5rem] font-bold mb-1">나의 학습 현황</div>
          <div className="flex justify-start w-full text-[#A2A2A2] text-[0.9rem]">나의 학습 정보를 확인해보세요!</div>
        </div>
        <div className="flex flex-col items-center w-full mt-5">
          <div className="flex justify-around items-center w-full text-center text-[#A2A2A2] pb-2">
            <div className="w-1/2">&nbsp;</div>
            <div className="w-full">단어학습</div>
            <div className="w-full">문맥학습</div>
            <div className="w-full">학습시간</div>
          </div>
          <div className="flex justify-around items-center w-full border-t-2">
            <div className="text-center w-1/2 text-[#A2A2A2] lg:text-[1.1rem]">오늘</div>
            <div className="w-full text-[#B18978]"><span className="w-full font-bold md:text-[2.9rem]">{todayWord}<span className="md:text-[1rem]">개</span></span></div>
            <div className="w-full text-[#B18978]"><span className="w-full font-bold md:text-[2.9rem]">{todayContext}<span className="md:text-[1rem]">개</span></span></div>
            <div className="w-full text-[#B18978]"><span className="w-full font-bold md:text-[2.9rem]">{m1}<span className="md:text-[1rem]">분</span></span></div>
          </div>
          <div className="flex justify-around items-center w-full border-t-2">
            <div className="text-center w-1/2 text-[#A2A2A2] lg:text-[1.1rem]">전체</div>
            <div className="w-full text-[#FFA800]"><span className="text-start w-full font-bold md:text-[2.9rem]">{totalWord}<span className="md:text-[1rem]">개</span></span></div>
            <div className="w-full text-[#FFA800]"><span className="text-start w-full font-bold md:text-[2.9rem]">{totalContext}<span className="md:text-[1rem]">개</span></span></div>
            <div className="w-full text-[#FFA800]"><span className="text-start w-full font-bold md:text-[2.9rem]"><span className="">{h2}<span  className="md:text-[1rem]">시간</span></span><span className=""> {m2}<span className="md:text-[1rem]">분</span></span></span></div>
          </div>
        </div>        
      </div>
      <div className="flex flex-col justify-start h-full w-[47%]">
        <div className="flex flex-col justify-start items-start w-full py-4">
          <div className="text-[1.5rem] font-bold mb-1">학습 현황 도표</div>
          <div className="text-[0.9rem] text-start text-[#A2A2A2]">
            <span>오늘 내가 푼 모든 문제의 비율을 살펴보세요</span><br />
            <span>정답과 오답의 비율에 따라 <span className="font-bold text-[1.1rem]">{nickname}</span>님의 표정이 달라집니다</span><br />
            <span>매일 자정에 업데이트 됩니다</span>
          </div>
        </div>
        <div className="flex justify-between w-full">
          <div className="flex flex-col items-center w-[50%] bg-[#F7CCB7]/30 rounded-lg">
            <div className="flex flex-col items-start w-full py-4 px-2 text-[#A2A2A2] text-[0.9rem]">
              <div className="flex justify-around w-full">
                <div className="w-1/3 px-1" style={{backgroundColor: 'rgb(54, 162, 235)'}}></div>
                <div>정답 개수</div>
              </div>
              <div className="flex justify-around w-full my-2">
                <div className="w-1/3 px-1" style={{backgroundColor: 'rgb(255, 99, 132)'}}></div>
                <div>오답 개수</div>
              </div>
              <div className="flex justify-around w-full">
                <div className="w-1/3 px-1" style={{backgroundColor: 'rgb(255, 205, 86)'}}></div>
                <div>세모 개수</div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center w-full h-full">
            {showDataChart}
          </div>
        </div>
      </div>
    </div>
  )
}




// 태블릿,모바일
function MyPageSection1V2({nickname, nowbadgeName, expWidth, exp, totalExp, sentence, level, level2, nowbadgeImage, userId, dataLevel, checkEmoState, moveClick}:Type):JSX.Element {
  const [putUserBadgeMalrang, {isLoading}] = usePutUserBadgeMalrangMutation()
  const [character, setCharacter] = useState<any>()
  const [clickCnt, setClickCnt] = useState<number>(0)
  const navigate= useNavigate();
  useEffect(()=> {
    setCharacter(<OrangeCat sendEmo={checkEmoState} dataLevel={dataLevel}/>)
  },[])

  useEffect(()=> {
    if (clickCnt !== 0 && clickCnt === 100) {
      putUserBadgeMalrang(userId).unwrap().then((r)=> {
        if (r.newbadge.length) {
          toast.success('숨겨진 칭호를 획득했습니다!')
        } else {
          toast.error('칭호를 소유하고 있습니다!')
        }
      })
    }
  },[clickCnt])

  const clickCat = () => {
    setClickCnt(clickCnt+1)
  }
  const Nav=()=>{
    navigate("/myinfoselectcheck");
  }
  return (
    <>
      {/* <Toast /> */}
      <div className="flex flex-col w-full lg:hidden bg-[#F0ECE9] py-7">
        <div className="flex flex-col lg:hidden justify-center items-center h-[48rem]">
          <div className="w-[95%] h-full bg-white py-4 px-4 rounded-md">
            <div className="flex justify-center items-center w-full h-[68%]">
              <div className="flex justify-center items-center h-full w-full">
                {/* 렙업에 따른 3D 캐릭터 */}
                <div className="flex flex-col justify-center items-center w-full h-full">
                  <div className="flex justify-center h-[90%] w-full" onClick={clickCat}>
                    {character}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center w-full h-[31%] mt-[1%] pt-3">
              {/* 메인 데이터 */}
              <div className="flex flex-col justify-center items-center h-full w-full">
                <div className="flex flex-col justify-center items-center w-full">
                    {/* 칭호 & 수정 */}
                  <div className="flex justify-between items-center w-full pb-1 text-[1.2rem]">
                    <div className="flex justify-start items-center text-[1rem] md:text-[1.2rem]"><img className="w-[1.5rem]" src={`/Assets/Badge/${nowbadgeImage}.png`} alt="뱃지" />&nbsp;{nowbadgeName}</div>
                    <div aria-label="정보수정" className="text-[#8E8E8E] cursor-pointer text-[1rem]" onClick={Nav}>정보 수정⚙</div>
                  </div>
                  <div className="flex justify-start w-full"><span className="text-left w-full mr-1 text-[2rem] md:text-[2.2rem] font-semibold">{nickname}</span></div>
                  <div className="flex justify-between items-center w-full mb-1">
                    {/* 닉네임 & 등급 & 경험치 */}
                    <div className="pb-1">
                      {/* 닉네임 & 등급 */}
                      <span className="md:text-[1.1rem] font-bold text-[#8E8E8E] mr-1">{level}</span>
                      <span className="text-[0.7rem] px-1 border-2 border-[#A87E6E] w-fit mx-auto rounded-full bg-[#F0ECE9] font-bold text-[#A87E6E]">{level2}</span>
                      
                    </div>
                    <div className="text-[0.9rem] text-[#171111]">
                      {/* 등급 */}
                      {exp} / {dataLevel > 9 ? <>∞</> : <>{totalExp}</>}
                    </div>
                  </div>
                  <div className="flex justify-start items-center w-full rounded-xl h-5 bg-[#F0ECE9] overflow-hidden">
                    {/* 경험치 바: 위에서 퍼센트 계산해서 넣으면 될듯?*/}
                    <div className="rounded-xl h-full bg-[#F7CCB7]" style={{width: `${expWidth}`, maxWidth: '100%'}}>
                      &nbsp;
                    </div>
                  </div>
                  <div className="bg-[#f3f5e6] rounded-lg w-full text-center font-semibold text-[1rem] my-2 py-2">{sentence}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center mt-2 w-[95%] text-white text-[1rem] md:text-[1.2rem] font-semibold">
            <div className="flex justify-around items-center bg-[#C6A89A] w-[100%] rounded-lg py-2">
              <div className="flex flex-col justify-center items-center w-full">
                <div className="flex justify-around items-center w-full pt-2">
                  <div className="flex justify-center w-full border-r-2 border-r-white"><img aria-label="시간" className="object-contain w-[3rem] md:w-[3.3rem] hover:scale-110 transition-all duration-300 cursor-pointer" src="/Assets/Icon/mypageIcon1.png" alt="icon" onClick={moveClick}/></div>
                  <div className="flex justify-center w-full border-r-2 border-r-white"><img aria-label="통계" className="object-contain w-[3rem] md:w-[3.3rem] hover:scale-110 transition-all duration-300 cursor-pointer" src="/Assets/Icon/mypageIcon2.png" alt="icon" onClick={moveClick}/></div>
                  <div className="flex justify-center w-full border-r-2 border-r-white"><img aria-label="비교" className="object-contain w-[3rem] md:w-[3.3rem] hover:scale-110 transition-all duration-300 cursor-pointer" src="/Assets/Icon/mypageIcon3.png" alt="icon" onClick={moveClick}/></div>
                  <div className="flex justify-center w-full "><img aria-label="칭호" className="object-contain w-[3rem] md:w-[3.3rem] hover:scale-110 transition-all duration-300 cursor-pointer" src="/Assets/Icon/mypageIcon4.png" alt="icon" onClick={moveClick}/></div>
                </div>
                <div className="flex justify-around w-full">
                  <div aria-label="시간" className="cursor-pointer" onClick={moveClick}>학습 시간</div>
                  <div aria-label="통계" className="cursor-pointer" onClick={moveClick}>학습 통계</div>
                  <div aria-label="비교" className="cursor-pointer" onClick={moveClick}>학습 비교</div>
                  <div aria-label="칭호" className="cursor-pointer" onClick={moveClick}>나의 칭호</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// 모바일
function MyPageSection2V2({todayWord, totalWord, todayContext, totalContext, todayTime, totalTime, statsRight, statsSemo, statsWrong, nickname}:StudyType):JSX.Element {
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
  
    const options = {
      plugins: {
        legend: {
          display: false,
        },
      },
    };
    const showDataChart = (
      statsRight+statsSemo+statsWrong !== 0 ? (
        <div className="flex justify-center items-center w-full h-full relative">
          <div className="absolute -bottom-[2.3rem] font-semibold text-[1.2rem] text-[#FFA800]">오늘의 학습</div>
          <Doughnut typeof='doughnut' data={data} options={options}/>
        </div>
        ): <div className="flex justify-center items-center w-[45%] h-full"><span className="font-semibold text-[1.2rem] text-[#FFA800]">아직 오늘의 학습 데이터가 없어요...</span></div> 
    )
  return (
    <div className="flex flex-col lg:hidden justify-center items-center h-[35rem] mt-20">
      <div className="flex flex-col items-center h-[40%] sm:h-[49%] w-[95%]">
        <div className="flex flex-col items-center w-[95%]">
          <div className="flex justify-start w-full text-[1.5rem] font-bold mb-1">나의 학습 현황</div>
          <div className="flex justify-start w-full text-[#A2A2A2] text-[0.9rem]">나의 학습 정보를 확인해보세요!</div>
        </div>
        <div className="flex flex-col items-center w-[95%] mt-5">
          <div className="flex justify-around items-center w-full text-[0.9rem] text-center text-[#A2A2A2] pb-2">
            <div className="w-1/2">&nbsp;</div>
            <div className="w-full">단어학습</div>
            <div className="w-full">문맥학습</div>
            <div className="w-full">학습시간</div>
          </div>
          <div className="flex justify-around items-center text-center w-full border-t-2">
            <div className=" w-1/2 text-[#A2A2A2] text-[0.9rem]">오늘</div>
            <div className="w-full text-[#B18978]"><span className="w-full font-bold text-[1.25rem] sm:text-[2.9rem]">{todayWord}<span className="text-[0.8rem]">개</span></span></div>
            <div className="w-full text-[#B18978]"><span className="w-full font-bold text-[1.25rem] sm:text-[2.9rem]">{todayContext}<span className="text-[0.8rem]">개</span></span></div>
            <div className="w-full text-[#B18978]"><span className="w-full font-bold text-[1.25rem] sm:text-[2.9rem]">{m1}<span className="text-[0.8rem]">분</span></span></div>
          </div>
          <div className="flex justify-around items-center text-center w-full border-t-2">
            <div className="w-1/2 text-[#A2A2A2] text-[0.9rem]">전체</div>
            <div className="w-full text-[#FFA800]"><span className="text-start w-full font-bold text-[1.25rem] sm:text-[2.9rem]">{totalWord}<span className="text-[0.8rem]">개</span></span></div>
            <div className="w-full text-[#FFA800]"><span className="text-start w-full font-bold text-[1.25rem] sm:text-[2.9rem]">{totalContext}<span className="text-[0.8rem]">개</span></span></div>
            <div className="w-full text-[#FFA800]"><span className="text-start w-full font-bold text-[1.25rem] sm:text-[2.9rem]"><span className="">{h2}<span  className="text-[0.8rem]">시간</span></span><span className=""> {m2}<span className="text-[0.8rem]">분</span></span></span></div>
          </div>
        </div>        
      </div>
      <div className="flex flex-col justify-center h-[60%] sm:h-[49%] mt-[2%] w-[90%]">
        <div className="flex flex-col justify-start items-start w-[95%] py-4 h-1/2">
          <div className="text-[1.5rem] font-bold mb-1">학습 현황 도표</div>
          <div className="text-[0.9rem] text-start text-[#A2A2A2]">
            <span>오늘 내가 푼 모든 문제의 비율을 살펴보세요</span><br />
            <span>정답과 오답의 비율에 따라 <span className="font-bold text-[1rem]">{nickname}</span>의 표정이 달라집니다</span><br />
            <span>매일 자정에 업데이트 됩니다</span>
          </div>
        </div>
        <div className="flex justify-between items-end w-full h-1/2">
          <div className="flex flex-col justify-center items-center w-[35%] sm:w-[40%] h-[80%] bg-[#F7CCB7]/30 rounded-lg">
            <div className="flex flex-col items-start w-full py-4 px-2 text-[#A2A2A2] text-[0.8rem] sm:text-[0.9rem]">
              <div className="flex justify-around w-full">
                <div className="w-1/3 px-1" style={{backgroundColor: 'rgb(54, 162, 235)'}}></div>
                <div>정답 개수</div>
              </div>
              <div className="flex justify-around w-full my-2">
                <div className="w-1/3 px-1" style={{backgroundColor: 'rgb(255, 99, 132)'}}></div>
                <div>오답 개수</div>
              </div>
              <div className="flex justify-around w-full">
                <div className="w-1/3 px-1" style={{backgroundColor: 'rgb(255, 205, 86)'}}></div>
                <div>세모 개수</div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center w-[65%] sm:w-[60%] h-full sm:h-[110%]">
            {showDataChart}
          </div>
        </div>
      </div>
    </div>
  )
}

interface MyPageSection3Type {
  userId: (string|null),
  move1: any,
  move2: any,
  move3: any,
  move4: any,
  move5: any,
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

function MyPageSection3({userId, move1, move2, move3, move4, move5}:MyPageSection3Type):JSX.Element {
  const [monthStuty, {isLoading : monthStudyLoading, error:monthStudyError}] = usePostUserMonthstudyMutation()
  const [getUserStatsCompare, {isLoading: isLoading2}] = useLazyGetUserStatsCompareQuery()
  const [getUserBadge, {isLoading: isLoading3}]  = useLazyGetUserBadgeQuery()
  const [putUserBadge, {isLoading: isLoading4}]  = usePutUserBadgeMutation()
  
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
            <img key={idx} className="object-contain w-[8rem] h-[8rem] my-[0.5rem] mx-[0.5rem] hover:scale-125" style={{transition: 'all .4s'}} src={`/Assets/Badge/${badge.badgeImage}.png`} alt="뱃지" onClick={()=> {
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
            <div className="w-[45%] lg:w-1/3 bg-[#B7B7B7] rounded-xl hover:bg-[#898989] cursor-pointer" onClick={()=> {setIsshowBadgeDetail(false)}}><span>닫기</span></div>
            <div className="w-[45%] lg:w-1/3 bg-[#F5BEA4] rounded-xl hover:bg-[#f1a581] cursor-pointer" onClick={updateBadge}><span>장착하기</span></div>
          </div>
        </div>
      </div>
    </div>
  )

  const loading = <Loading/>

  return (
    <>
      {/* {
        (monthStudyLoading||isLoading2||isLoading3||isLoading4)&&loading
      } */}
      
      <div className="flex flex-col justify-start items-center w-full px-[5%] h-[130rem] lg:h-[130rem] mt-20">
        <div className="flex justify-center items-center h-[90%] max-w-screen-xl w-full">
          {/* 학습 관리 */}
          <div className="flex flex-col justify-center items-start w-full h-full">
            {/* <div className="flex justify-between items-end w-full h-[6%] lg:h-[8%] my-[2%]"> */}
            <div className="flex justify-between items-end w-full my-[2%]">
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
            <div ref={move1} className="h-[21%] lg:h-[28%] w-full my-[2%]">
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
            <div ref={move2} className="h-[21%] lg:h-[28%] w-full my-[2%]">
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
            <div ref={move3} className="hidden lg:flex justify-evenly items-center h-[28%] w-full my-[2%]">
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
            <div ref={move5} className="flex flex-col lg:hidden justify-center items-center h-[46%] w-full my-[2%]">
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
        <div ref={move4} className="flex justify-center items-start h-[20%] max-w-screen-xl w-full relative">
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