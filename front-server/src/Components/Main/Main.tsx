import { useGetUserMyinfoQuery, useGetUserMystudyQuery } from "../../Store/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Common/Footer";
import Navbar from "../Common/Navbar";
import Pangguin from "../Threejs/Pangguin";
import style from "./Main.module.css";



function Main(): JSX.Element {
  const userId = localStorage.getItem("userId");
  const {data:userMyInfo, error:error1, isLoading:isLoading1 } = useGetUserMyinfoQuery(userId);
  const {data:userMyStudy, error:error2, isLoading:isLoading2 } = useGetUserMystudyQuery(userId);
  console.log("유저데이터" , userMyInfo)
  console.log("유저학습시간", userMyStudy)


  const [selectKeyWord, setSelectKeyWord] = useState<number>(0);

  // 뉴스 핵심 단어 List
  const example: object = [{
      name: "경제",
      mean: "인간의 생활에 필요한 재화나 용역을 생산ㆍ분배ㆍ소비하는 모든 활동. 또는 그것을 통하여 이루어지는 사회적 관계",
  }, {
      name: "시정명령",
      mean: "시정명령~"
  }, {
      name: "둔화",
      mean:"둔화~" 
  
  }]

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

  if (isLoading1 || isLoading2) {
    return <div>Loading...</div>;
  }

  if (error1 || error2) {
    return <>Error: {error1} {error2}</>;
  }

  return (
    <>
      <Navbar />
      <MyInfo userMyInfo={userMyInfo?.data} userMyStudy={userMyStudy?.data}/>
      <StudyContent />
      <News example={example} setSelectKeyWord={setSelectKeyWord} selectKeyWord={selectKeyWord}/>
      <PassUsers users={users}/>
      <Footer />
    </>
  );
}
export default Main;

// main 페이지는 container, max-w-screen-lg, lg:w-[70%] 설정

// 맨위 : 유저 정보 , 오늘의 정보
function MyInfo({userMyInfo, userMyStudy}:any): JSX.Element {
  const navigate = useNavigate()
  
  // 레벨 경험치
  const levelInfo: any = [{
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
  const expWidth = (userMyInfo.exp / levelInfo[userMyInfo.level].totalExp) * 100 + "%"

  // 학습 시간 h , m , s
  let time:number = userMyStudy.todayTime
  const h =  Math.floor(time / 3600);
  time = time % 3600
  const m:number = Math.floor(time / 60);
  time = time % 60
  const s = time



  return (
    <div className="bg-[#F0ECE9]">
      <div className="container max-w-screen-xl w-full mx-auto flex flex-col md:flex-row md:justify-around items-center text-center py-[2rem]">
        <div className="md:w-[40%] w-[90%] bg-[#ffffff] py-[1.5rem] md:px-[2.5rem] rounded-md px-[1rem]">
          <Pangguin position={-2} />
          <div className="flex justify-center md:text-[1.2rem] sm:text-[1.1rem] text-[1rem] py-1">
            <div className={`${style.badgeImg}`} style={{backgroundImage:`url('/Assets/Badge/${userMyInfo?.nowbadgeImage}.png')`}}></div>{userMyInfo?.nowbadgeName}</div>
            <div className="md:text-[2.4rem] sm:text-[2.2rem] text-[2rem] font-bold">{userMyInfo?.nickname}</div>
            <div className="md:text-[1.2rem] text[1rem] py-1 font-bold text-[#8E8E8E]">{levelInfo[userMyInfo.level].levelName}</div>
            <div className="md:text-[0.9rem] sm:text-[0.7rem] text-[0.5rem] px-2 border-2 border-[#A87E6E] w-fit mx-auto rounded-full bg-[#F0ECE9] font-bold text-[#A87E6E]">
              {levelInfo[userMyInfo?.level].levelName2}
            </div>
            <div className="bg-[#F0ECE9] rounded-lg my-2">
              <div className="bg-[#F7CCB7] rounded-lg py-[0.5rem]" style={{width:`${expWidth}` , maxWidth:"100%"}}></div>
            </div>
            <div className="text-[1rem] text-zinc-400"> {userMyInfo.exp} / {levelInfo[userMyInfo.level].totalExp}</div>
          </div>
          <div className="md:w-[43%] w-[90%] pt-[2rem] pb-[0.5rem]">
            <div className="md:text-[3rem] sm:text-[2.5rem] text-[2rem] font-bold">오늘</div>
            <div className="w-full flex flex-wrap justify-center items-end">
                <div className="md:text-[3rem] sm:text-[2.5rem] text-[2rem] font-bold text-[#BE8D65]">
                  {h}<span className="md:text-[1.5rem] text-[1rem]">시간 </span>{m}<span className="md:text-[1.5rem] text-[1rem]">분 </span>{s}<span className="md:text-[1.5rem] text-[1rem]">초 </span>
                </div>
                <div className="md:text-[1.5rem] sm:text-[1rem] text-[0.8rem] pt-1 pb-2 text-zinc-500"> &nbsp; 학습 시간</div>
            </div>
            <div className="flex justify-around md:my-3 my-1">
              <div className="w-[40%]">
                <div className="md:text-[3rem] sm:text-[2.5rem] text-[2rem] font-bold text-[#BE8D65]">
                  {userMyStudy.todayWord}<span className="md:text-[1.5rem] text-[1rem]">개</span>
                </div>
                <div className="md:text-[1.5rem] sm:text-[1rem] pt-1 text-[0.8rem] text-zinc-500">학습 단어</div>
              </div>
              <div className="w-[40%]">
                <div className="md:text-[3rem] sm:text-[2.5rem] text-[2rem] font-bold text-[#BE8D65]">
                  {userMyStudy.todayContext}<span className="md:text-[1.5rem] text-[1rem]">개</span>
                </div>
                <div className="md:text-[1.5rem] sm:text-[1rem] pt-1 text-[0.8rem] text-zinc-500">학습 문맥</div>
              </div>
            </div>
            <div className="cursor-pointer flex justify-center rounded-full bg-[#A87E6E] p-[0.7rem] mt-3z md:text-[2.5rem] sm:text-[2rem] text-[1.5rem] font-bold text-[#ffffff] hover:text-[#F0ECE9]"  onClick={()=> navigate('/wordStudy')}>
              <div className={`${style.iconBook}`}></div>
              <div>오늘의 단어</div>
            </div>
          </div>
        </div>
      </div>
  );
}

// 학습 (3가지)
function StudyContent(): JSX.Element {
  const navigate = useNavigate()
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
            <div className="md:text-[1.2rem] sm:text-[1rem] text-[0.9rem] text-[#666666]">실력 확인 </div>
            <div className="text-[#A87E6E] font-bold md:text-[1.8rem] sm:text-[1.4rem] text-[1.1rem] py-0.5">과거시험</div>
            <div className="lg:text-[1rem] text-[0.9rem] text-[#666666]">
              매달 마지막 주 주말에 열리는
              과거시험을 통해 향상된 실력을 확인해보세요!{" "}
            </div>
            <br/>
            <div className={`${style.studyBtn} md:text-[1.3rem] md:absolute static md:bottom-[5%]  md:w-[80%] text-center border-2 border-[#A87E6E] rounded-lg py-1 mt-1`}>
              시작하기
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// 뉴스 ( 신문 핵심 단어 )
function News({example,setSelectKeyWord,selectKeyWord}:any): JSX.Element {
  return (
    <>
      <div className="container max-w-screen-lg w-full mx-auto px-[5%] md:my-[7rem] my-[5rem] md:px-10 lg:border-l-4 lg:border-[#F7CCB7]">
        <div className="md:text-[1.2rem] text-[1rem] text-[#5F5F5F]">
            신문으로 단어 공부하기
        </div>

        <div className="md:text-[2.2rem] text-[1.9rem] font-bold ">
            <span className="md:text-[1.9rem] text-[1.5rem]">오늘의 </span><span className="text-[#BE8D65]">신문</span> 핵심단어
        </div>

        <div className="flex py-5 flex-wrap">
            {
                example.map((ex:any, index:any)=>(
                    <>
                      {selectKeyWord == index ?(
                        <>
                          <div className="cursor-pointer rounded-full py-1 px-4 mr-3 mt-1 md:text-[1.4rem] sm:text-[1.2rem] text-[1.1rem] text-[#ffffff] border-2 border-[#BF9F91] bg-[#BF9F91] font-bold" onClick={() => {
                            setSelectKeyWord(index);
                          }}>
                            {ex.name}
                          </div>
                        </>
                      ) : (
                        <>
                        <div className="cursor-pointer rounded-full py-1 px-4 mr-3 mt-1 md:text-[1.4rem] sm:text-[1.2rem] text-[1.1rem] border-2 border-[#BF9F91] text-[#BF9F91] font-bold" onClick={() => {
                          setSelectKeyWord(index);
                        }}>
                          {ex.name}
                        </div>
                      </>

                      )}
                    </>
                )
                )
            }
        </div>

        <div className="md:text-[1.8rem] sm:text-[1.4rem] text-[1.2rem] font-bold">
          {example[selectKeyWord]?.name}<span className="md:text-[1rem] sm:text-[0.9rem] text-[0.8rem] font-medium text-[#A2A2A2]"> [한자] 명사</span>
        </div>

        <div className="h-[11rem] rounded-lg bg-[#F4EFEC] p-5 mt-2 md:text-[1.2rem] sm:text-[1.1rem] text-[1rem] overflow-auto">
          <div>{example[selectKeyWord]?.mean}</div>

          <div className="flex w-full md:text-[1.2rem] sm:text-[1.1rem] text-[1rem] mt-2 text-[#606060]">
            <div className="bg-[#F7CCB7] rounded-full px-4 py-1 text-[#ffffff] font-bold md:text-[1rem] sm:text-[0.9rem] text-[0.8rem] mr-2">예제</div> 경제가 안좋다.
          </div>
        </div>
      </div>
    </>
  );
}

// 장원급제 리스트
function PassUsers({users}:any): JSX.Element {
  return (
    <>
      <div className="bg-[#F4EFEC]">
        <div className="container max-w-screen-xl mx-auto text-center py-24">
          
          <div className="md:text-[1.7rem] text-[1.2rem]">제 32회 과거시험 결과</div>
          <div className="md:text-[2.7rem] text-[2rem] font-bold text-[#A87E6E]">장원급제</div>
          <div className="md:text-[1.5rem] text-[1rem] text-[#525252] mb-[2rem]">축하드립니다!</div>

          <div className="overflow-hidden h-[15rem] lg:w-[70%] md:w-[80%] sm:w-[90%] w-full mx-auto">
            <div className={`${style.move} px-1`} style={{animationDuration:`${Object.keys(users).length*2}s`}}>
              {
                users.map((user:any)=> (
                  <div className={`flex justify-between rounded-lg bg-[#ffffff] my-3 md:px-5 sm:px-4 px-3 py-3 md:text-[1.5rem] sm:text-[1.2rem] text-[0.9rem] text-start}`}>
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
                users.map((user:any)=> (
                  <div className={`flex justify-between rounded-lg bg-[#ffffff] my-3 md:px-5 sm:px-4 px-3  py-3 md:text-[1.5rem] sm:text-[1.2rem] text-[0.9rem] text-start}`}>
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