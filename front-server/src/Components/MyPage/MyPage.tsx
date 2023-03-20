import Footer from "../Common/Footer"
import Navbar from "../Common/Navbar"
import Pangguin from "../Threejs/Pangguin"
import { useGetUserMyinfoQuery, useGetUserMystudyQuery, usePostUserMonthstudyMutation, usePutUserdataMutation } from "../../Store/api"
// import { usePostUserchecknicknameMutation } from "../../Store/NonAuthApi";
import React, { KeyboardEvent, KeyboardEventHandler, MouseEventHandler, useEffect, useRef, useState } from "react"
// import styled from './MyPage.module.css'
import { Doughnut, Line } from "react-chartjs-2"
import { toast } from "react-toastify";
import { Toast } from "../Common/Toast";
// import { useAppDispatch } from "../../Store/hooks";
// import { changeUserNickname } from "../../Store/store";
import Chart from 'chart.js/auto';

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
  userId: (string | null)
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
  
  // console.log('userMyInfo: ', userMyInfo);
  

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
  },
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
    3: <div>현재 정답과 오답이 같아요😮 <br/> 조금만 더 해볼까요?</div>,
  }
  let sentence

  const {todayWord, totalWord, todayContext, totalContext, todayTime, totalTime}:StudyType = studyData?.data
  const todayTotal = studyData?.data.todayContext + studyData?.data.todayTime + studyData?.data.todayWord
  const statsDate:number = studyData?.data.statsRight - studyData?.data.statsWrong
  const  {statsRight, statsSemo, statsWrong} = studyData?.data
  const level = levelInfo[userMyInfo?.data.level].levelName2  

  if (todayTotal === 0) {
    sentence = sentenceList[0]
  } else if (statsDate > 0) {
    sentence = sentenceList[1]
  } else if (statsDate < 0) {
    sentence = sentenceList[2]
  } else {
    sentence = sentenceList[3]
  }

  return (
    <>
      <Navbar/>
      <MyPageSection1V1 nickname={userMyInfo?.data.nickname} nowbadgeName={userMyInfo?.data.nowbadgeName} expWidth={expWidth} exp={userMyInfo?.data.exp} totalExp={totalExp} sentence={sentence} level={level} nowbadgeImage={userMyInfo?.data.nowbadgeImage} userId={userId}/>
      <MyPageSection2V1 todayWord={todayWord} totalWord={totalWord} todayContext={todayContext} totalContext={totalContext} todayTime={todayTime} totalTime={totalTime} statsRight={statsRight} statsSemo={statsSemo} statsWrong={statsWrong}/>
      <MyPageSection1V2 nickname={userMyInfo?.data.nickname} nowbadgeName={userMyInfo?.data.nowbadgeName} expWidth={expWidth} exp={userMyInfo?.data.exp} totalExp={totalExp} sentence={sentence} level={level} nowbadgeImage={userMyInfo?.data.nowbadgeImage} userId={userId}/>
      <MyPageSection2V2 todayWord={todayWord} totalWord={totalWord} todayContext={todayContext} totalContext={totalContext} todayTime={todayTime} totalTime={totalTime} statsRight={statsRight} statsSemo={statsSemo} statsWrong={statsWrong}/>
      <MyPageSection3 userId={userId}/>
      <Footer/>
    </>
  )
}
export default MyPage


// 데스크탑 & 태블릿
function MyPageSection1V1({nickname, nowbadgeName, expWidth, exp, totalExp, sentence, level, nowbadgeImage, userId}:Type):JSX.Element {
  // const dispatch = useAppDispatch()
  // const [isClick,setIsClick] = useState<boolean>(false)
  // const [nameCheckMutation] = usePostUserchecknicknameMutation()
  // const [mutation] = usePutUserdataMutation()
  // const [changeNickname,setChangeNickname] = useState<string>()
  // const ref = useRef<HTMLDivElement>(null)

  // const change= (e:React.ChangeEvent<HTMLInputElement>) => {    
  //   setChangeNickname(e.target.value);
  // }

  // const click:MouseEventHandler<HTMLDivElement> = (e) => {
  //   // const target = e.target as HTMLElement
  //   if (e.currentTarget.ariaLabel === '정보수정') {
  //     setIsClick(!isClick)
  //   } else if (e.currentTarget.ariaLabel === '변경') {
  //     e.preventDefault()
  //     const data:any = {
  //       nickname: changeNickname,
  //       username: userId
  //     }
  //     nameCheckMutation(data).unwrap().then((r:any)=> {
  //       console.log(changeNickname);
  //       if (r.data === false) {
  //         toast.error("닉네임을 사용할 수 없습니다")
  //       } else {
  //         mutation([userId, changeNickname]).unwrap().then((r)=> {
  //           dispatch(changeUserNickname(changeNickname))
  //           toast.success('닉네임 변경!')
  //           setIsClick(false)
  //         })
  //       }
  //     })
  //   }
  //   else if (e.target === ref.current) {
  //     console.log('hi');
  //     setIsClick(false)
  //   }
  // }
  // const enter = (e:KeyboardEvent) => {
  //   // const target = e.target as HTMLElement
  //   if (e.key === 'Enter') {
  //     e.preventDefault()
  //     const data:any = {
  //       nickname: changeNickname,
  //       username: userId
  //     }
  //     nameCheckMutation(data).unwrap().then((r:any)=> {
  //       console.log(changeNickname);
  //       if (r.data === false) {
  //         toast.error("닉네임을 사용할 수 없습니다")
  //       } else {
  //         mutation([userId, changeNickname]).unwrap().then((r)=> {
  //           dispatch(changeUserNickname(changeNickname))
  //           toast.success('닉네임 변경!')
  //           setIsClick(false)
  //         })
  //       }
  //     })
  //   }
  // }

  // const updateModal = (
  //   <div ref={ref} className="w-full rounded-lg" onClick={click}>
  //     <div className="rounded-lg py-5 w-full">
  //       <div className="flex flex-col font-semibold text-[1.3rem] w-full">
  //         <div><span>변경할 닉네임을 작성해주세요</span></div>
  //         <div className="flex md:flex-col lg:flex-row lg:justify-center md:justify-end lg:items-end w-full ">
  //           <div className="mt-2 mx-2"><input className="border-[#F7CCB7] border-2 text-center rounded-lg w-full focus:outline-[#f0c78a]" type="text" maxLength={6} placeholder="닉네임" autoFocus onChange={change} onKeyPress={enter}/></div>
  //           <div aria-label="변경" className="bg-[#e7baa4] lg:px-3 md:mx-2 md:mt-2 lg:mx-0 border-2 rounded-lg text-white hover:bg-[#e7a585]" onClick={click}>변경</div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // )

  return (
    <>
    {/* <Toast /> */}
      <div className="container max-w-screen-xl h-[30rem] md:w-[90%] mx-auto hidden md:flex flex-col md:flex-row md:justify-around items-center text-center mb-2">
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
                <div className="md:w-[1.5rem] lg:w-[2rem] md:h-[1.5rem] lg:h-[2rem] rounded-full border-2 border-[#c2bfbf] mx-2"><img src="/Assets/Icon/catSit.png" alt="버튼1" /></div>
                <div className="md:w-[1.5rem] lg:w-[2rem] md:h-[1.5rem] lg:h-[2rem] rounded-full border-2 border-[#c2bfbf] mx-2"><img src="/Assets/Icon/catSit.png" alt="버튼2" /></div>
                <div className="md:w-[1.5rem] lg:w-[2rem] md:h-[1.5rem] lg:h-[2rem] rounded-full border-2 border-[#c2bfbf] mx-2"><img src="/Assets/Icon/catSit.png" alt="버튼3" /></div>
                <div className="md:w-[1.5rem] lg:w-[2rem] md:h-[1.5rem] lg:h-[2rem] rounded-full border-2 border-[#c2bfbf] mx-2"><img src="/Assets/Icon/catSit.png" alt="버튼4" /></div>
                <div className="md:w-[1.5rem] lg:w-[2rem] md:h-[1.5rem] lg:h-[2rem] rounded-full border-2 border-[#c2bfbf] mx-2"><img src="/Assets/Icon/catSit.png" alt="버튼5" /></div>
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
    statsRight+statsRight+statsRight !== 0 ? (
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
              <span className="text-right w-[40%] text-[#A2A2A2]">학습시간</span><span className="w-full font-bold md:text-[2.7rem]">{m1}<span className="md:text-[1rem]">분</span></span><span className="w-full font-bold md:text-[2.7rem]"><span className="text-[#FFA800]">{h2}<span  className="md:text-[1rem]">시간</span></span><span className="text-[#FFA800]">{m2}<span className="md:text-[1rem]">분</span></span></span>
            </div>
          </div>  
        </div>
      </div>
      {showDataChart}
    </div>
  )
}




// 모바일
function MyPageSection1V2({nickname, nowbadgeName, expWidth, exp, totalExp, sentence, level, nowbadgeImage, userId}:Type):JSX.Element {
  // const dispatch = useAppDispatch()
  // const [isClick,setIsClick] = useState<boolean>(false)
  // const [nameCheckMutation] = usePostUserchecknicknameMutation()
  // const [mutation] = usePutUserdataMutation()
  // const [changeNickname,setChangeNickname] = useState<string>()
  // const ref = useRef<HTMLDivElement>(null)

  // const change= (e:React.ChangeEvent<HTMLInputElement>) => {    
  //   setChangeNickname(e.target.value);
  // }
  // const click:MouseEventHandler<HTMLDivElement> = (e) => {
  //   // const target = e.target as HTMLElement
  //   if (e.currentTarget.ariaLabel === '정보수정') {
  //     setIsClick(!isClick)
  //   } else if (e.currentTarget.ariaLabel === '변경') {
  //     e.preventDefault()
  //     const data:any = {
  //       nickname: changeNickname,
  //       username: userId
  //     }
  //     nameCheckMutation(data).unwrap().then((r:any)=> {
  //       console.log(changeNickname);
  //       if (r.data === false) {
  //         toast.error("닉네임을 사용할 수 없습니다")
  //       } else {
  //         mutation([userId, changeNickname]).unwrap().then((r)=> {
  //           dispatch(changeUserNickname(changeNickname))
  //           toast.success('닉네임 변경!')
  //           setIsClick(false)
  //         })
  //       }
  //     })
  //   }
  //   else if (e.target === ref.current) {
  //     console.log('hi');
  //     setIsClick(false)
  //   }
  // }

  // const enter = (e:KeyboardEvent) => {
  //   // const target = e.target as HTMLElement
  //   if (e.key === 'Enter') {
  //     e.preventDefault()
  //     const data:any = {
  //       nickname: changeNickname,
  //       username: userId
  //     }
  //     nameCheckMutation(data).unwrap().then((r:any)=> {
  //       console.log(changeNickname);
  //       if (r.data === false) {
  //         toast.error("닉네임을 사용할 수 없습니다")
  //       } else {
  //         mutation([userId, changeNickname]).unwrap().then((r)=> {
  //           dispatch(changeUserNickname(changeNickname))
  //           toast.success('닉네임 변경!')
  //           setIsClick(false)
  //         })
  //       }
  //     })
  //   }
  // }

  // const updateModal = (
  //   <div ref={ref} className="w-full flex justify-center items-center rounded-lg" onClick={click}>
  //     <div className=" py-10 w-full">
  //       <div className="flex flex-col justify-center items-center font-semibold text-[1.3rem] w-full">
  //         <div><span>변경할 닉네임을 작성해주세요</span></div>
  //         <div className="flex flex-col justify-center w-full ">
  //           <div className="mt-2 mx-2 my-1"><input className="border-[#F7CCB7] border-2 text-center rounded-lg w-full focus:outline-[#f0c78a]" type="text" maxLength={6} placeholder="닉네임" autoFocus onChange={change} onKeyPress={enter}/></div>
  //           <div aria-label="변경" className="bg-[#e7baa4] text-center mx-auto w-[50%] border-[#B18978] border-2 rounded-lg text-white hover:bg-[#e7a585]" onClick={click}>변경</div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // )

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
              {/* <Gaming/> */}
              <Pangguin position={-2}/>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center w-[90%] h-[8%] ">
          {/* 캐릭터 행동 버튼 */}
          <div className="w-[2rem] h-[2rem] rounded-full border-2 border-[#c2bfbf] mx-2"><img src="/Assets/Icon/catSit.png" alt="버튼1" /></div>
          <div className="w-[2rem] h-[2rem] rounded-full border-2 border-[#c2bfbf] mx-2"><img src="/Assets/Icon/catSit.png" alt="버튼2" /></div>
          <div className="w-[2rem] h-[2rem] rounded-full border-2 border-[#c2bfbf] mx-2"><img src="/Assets/Icon/catSit.png" alt="버튼3" /></div>
          <div className="w-[2rem] h-[2rem] rounded-full border-2 border-[#c2bfbf] mx-2"><img src="/Assets/Icon/catSit.png" alt="버튼4" /></div>
          <div className="w-[2rem] h-[2rem] rounded-full border-2 border-[#c2bfbf] mx-2"><img src="/Assets/Icon/catSit.png" alt="버튼5" /></div>
        </div>
        <div className="flex justify-center items-center w-[90%] h-[25%]">
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
                  {exp} / {totalExp}
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
      statsRight+statsRight+statsRight !== 0 ? (
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
              <div className="text-[#FFA800]"><span className="font-bold text-[2rem]">{h2}</span><span className="text-[1rem]">시간</span><span className="font-bold text-[2rem]">{m2}</span><span className="text-[1rem]">분</span></div>
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

function MyPageSection3({userId}:MyPageSection3Type):JSX.Element {
  const [monthStuty, {isLoading : monthStudyLoading, error:monthStudyError}] = usePostUserMonthstudyMutation()

  const [studyTimeChart, setStudyTimeChart] = useState<any>()
  const [studyCntChart, setStudyCntChart] = useState<any>()

  const monthRef = useRef<HTMLSelectElement>(null)
  const yearRef = useRef<HTMLSelectElement>(null)

  const nowDate = new Date()
  const nowYear = nowDate.getFullYear()
  const nowMonth = nowDate.getMonth()+1
  const startService:number = 2023
  const createYearCnt = nowYear - startService +1  
  const yearList:number[] = Array.from({length: createYearCnt}, (v,i) => startService+i)
  const monthList:number[] = Array.from({length: 12}, (v,i)=> i+1)

  const postData:(string|number|null)[] = [userId, nowYear, nowMonth]
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
            borderColor: 'rgb(54, 162, 235)',
            // fill: false,
            tension: 0.1,
            hoverBorderColor: ['#d5cdcf'],
            hoverOffset: 4,
          },
          {
            label: '문맥학습 시간',
            data: conTextTm, 
            backgroundColor: [
              'rgb(255, 205, 86)',
          ], 
            hoverBorderColor: ['#d5cdcf'],
            hoverOffset: 4,
          },
          {
            label: '틀린단어 시간?',
            data: wrongTm, 
            backgroundColor: [
              'rgb(255, 99, 132)',
          ], 
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
            borderColor: 'rgb(54, 162, 235)',
            // fill: false,
            tension: 0.1,
            hoverBorderColor: ['#d5cdcf'],
            hoverOffset: 4,
          },
          {
            label: '문맥학습 개수',
            data: conTextCnt, 
            backgroundColor: [
              'rgb(255, 205, 86)',
          ], 
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
    Chart.register();
  },[])
  


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
            borderColor: 'rgb(54, 162, 235)',
            // fill: false,
            tension: 0.1,
            hoverBorderColor: ['#d5cdcf'],
            hoverOffset: 4,
          },
          {
            label: '문맥학습 시간',
            data: conTextTm, 
            backgroundColor: [
              'rgb(255, 205, 86)',
          ], 
            hoverBorderColor: ['#d5cdcf'],
            hoverOffset: 4,
          },
          {
            label: '틀린단어 시간?',
            data: wrongTm, 
            backgroundColor: [
              'rgb(255, 99, 132)',
          ], 
            hoverBorderColor: ['#d5cdcf'],
            hoverOffset: 4,
          },
        ],
        
        labels: labels
      };

      const Chart = 
        (
          <div className="h-full w-full ">
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
            borderColor: 'rgb(54, 162, 235)',
            // fill: false,
            tension: 0.1,
            hoverBorderColor: ['#d5cdcf'],
            hoverOffset: 4,
          },
          {
            label: '문맥학습 개수',
            data: conTextCnt, 
            backgroundColor: [
              'rgb(255, 205, 86)',
          ], 
            hoverBorderColor: ['#d5cdcf'],
            hoverOffset: 4,
          },
        ],
        labels: labels
      };

      const Chart2 = 
        (
          <div className="h-full w-full ">
            <Line options={options} typeof='line' data={studyCntData}/>
          </div>
        )
        setStudyCntChart(Chart2)
    })
    
  }


  const yearSelectElement = (
    <select ref={yearRef} className="w-full h-full text-center font-semibold text-[0.7rem] md:text-[0.8rem] lg:text-[0.9rem] text-[#A2A2A2]" onClick={selectDateChart}>
      {
        yearList.map((year:number,key:number)=> {         
          const isSelected = key === nowYear          
          return <option key={key} className="text-center w-full" value={year} selected={isSelected}>{year}년</option>
        })
      }
    </select>
  )

  const monthSelectElement = (
    <select ref={monthRef} className='w-full text-center font-semibold text-[0.8rem] md:text-[0.9rem] lg:text-[1rem] text-[#A2A2A2]' onClick={selectDateChart}>
      {
        monthList.map((month:number, key:number)=> {
          const isSelected = key === nowMonth-1
          console.log(nowMonth);
          
          return <option key={key} className="text-center w-full" value={month} selected={isSelected}>{month}월</option>
        })
      }
    </select>
  )
  
  const loading = <div>로딩중</div>
  

  return (
    <div className="flex flex-col justify-center items-center w-full px-[5%] h-[53rem] sm:h-[57rem] md:h-[58rem] lg:h-[70rem] mt-6 mb-12 md:my-12">
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
                {monthStudyLoading && loading}
                {studyTimeChart? studyTimeChart: null}
                
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
                {monthStudyLoading && loading}
                {
                  studyCntChart? studyCntChart:null
                }
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