import {
  useGetUserMyinfoQuery,
  useGetUserRankLevelQuery,
  useGetUserRankWordQuery,
  useGetUserMystudyQuery,
  useGetWordDailyQuery,
  useGetStudyPastListQuery,
  useGetStudyPastQuery,
} from "../../Store/api";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "../Common/Footer";
import Navbar from "../Common/Navbar";
import style from "./Main.module.css";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import PastTestIntroModal from "../Study/PastTest/PastTestIntroModal";
import { showPastTestIntro } from "../../Store/store";
import ReactWordCloud from "react-wordcloud";
import StudyStartModal from "./StudyStartModal";
import OrangeCat from "../Threejs/OrangeCat";
import { toast } from "react-toastify";
import { Toast } from "../Common/Toast";
import Loading from "../Common/Loading";
import StrangeCat from "../Threejs/StrangeCat";
import MixCat from "../Threejs/MixCat";
import GrayCat from "../Threejs/GrayCat";

function Main(): JSX.Element {
  const navigate = useNavigate();
  localStorage.removeItem("difficulty");

  const location = useLocation();
  // 로그인 안했을 시 intro페이지로 이동
  var loactionuse = 0;
  useEffect(() => {
    if (localStorage.getItem("accessToken") === "undefined") {
      navigate("/");
    } else {
            
      if (location.state !== null) {
        if (location.state.newBadgeNum > 0) {          
          setTimeout(() => {
            toast.info(`칭호 ${location.state.newBadgeNum}개를 얻으셨습니다.`);  
          }, 2000);
        }
        if (location.state.result >= 0) {
          setTimeout(() => {
            toast.info(`과거시험 결과는 [${location.state.result} 점] 입니다`);
          }, 2000);
        }
        if (location.state.level > 0) {
          setTimeout(() => {
            toast.info("계급 상승!");
        }, 2000);
        }

        const stateData = {
          ...window.history.state,
          usr: { ...window.history.state.usr, newBadgeNum: 0, result: -10,level:0 },
        };
        const pageTitle = "Title";
        const pageUrl = "/main";
        window.history.replaceState(stateData, pageTitle, pageUrl);
      }
    }
  }, []);

  // RTK
  const userId = localStorage.getItem("userId");
  const {
    data: userMyInfo,
    error: error1,
    isLoading: isLoading1,
  } = useGetUserMyinfoQuery(userId);
  const {
    data: userMyStudy,
    error: error2,
    isLoading: isLoading2,
  } = useGetUserMystudyQuery(userId);
  const {
    data: newsKeyword,
    error: error3,
    isLoading: isLoading3,
  } = useGetWordDailyQuery("");
  const {
    data: pastList,
    error: error4,
    isLoading: isLoading4,
  } = useGetStudyPastListQuery(userId);
  const {
    data: pastInfo,
    error: error5,
    isLoading: isLoading5,
  } = useGetStudyPastQuery("");
  const {
    data: levelRank,
    error: error6,
    isLoading: isLoading6,
  } = useGetUserRankLevelQuery("");
  const {
    data: wordRank,
    error: error7,
    isLoading: isLoading7,
  } = useGetUserRankWordQuery("");

  // 레벨 경험치
  const levelInfo: any = [
    {
      levelName: "0",
      levelName2: "0",
      totalExp: -100,
    },
    {
      levelName: "정구품",
      levelName2: "正九品",
      totalExp: 100,
    },
    {
      levelName: "정팔품",
      levelName2: "正八品",
      totalExp: 200,
    },
    {
      levelName: "정칠품",
      levelName2: "正七品",
      totalExp: 400,
    },
    {
      levelName: "정육품",
      levelName2: "正六品",
      totalExp: 800,
    },
    {
      levelName: "정오품",
      levelName2: "正五品",
      totalExp: 1600,
    },
    {
      levelName: "정사품",
      levelName2: "正四品",
      totalExp: 3200,
    },
    {
      levelName: "정삼품",
      levelName2: "正三品",
      totalExp: 6400,
    },
    {
      levelName: "정이품",
      levelName2: "正二品",
      totalExp: 12800,
    },
    {
      levelName: "정일품",
      levelName2: "正一品",
      totalExp: 25600,
    },
    {
      levelName: "정일품",
      levelName2: "正一品",
      totalExp: 25600,
    },
  ];

  if (
    isLoading1 ||
    isLoading2 ||
    isLoading3 ||
    isLoading4 ||
    isLoading5 ||
    isLoading6 ||
    isLoading7
  ) {
    return(
      <>
        <Loading />
      </>
    )
  }

  if (error1 || error2 || error3 || error4 || error5 || error6 || error7) {
    return (
      <>
        Error: {error1} {error2}
      </>
    );
  }


  const todayTotal = userMyStudy?.data.todayContext + userMyStudy?.data.todayTime + userMyStudy?.data.todayWord
  const statsDate:number = userMyStudy?.data.statsRight - userMyStudy?.data.statsWrong
  let checkEmoState:number

  if (todayTotal === 0) {
    checkEmoState = 0
  } else if (statsDate > 0) {
    checkEmoState = 1
  } else if (statsDate < 0) {
    checkEmoState = 2
  } else {
    checkEmoState = 3
  }
  return (
    <>
      <Navbar />
      <Toast />
      {/* <Example /> */}
      <MyInfo
        levelInfo={levelInfo}
        userMyInfo={userMyInfo?.data}
        userMyStudy={userMyStudy?.data}
        checkEmoState={checkEmoState}
      />
      <StudyContent userScore={pastList?.user_score} />
      <News newsKeyword={newsKeyword?.data} />
      <PassUsers
        levelInfo={levelInfo}
        pastList={pastList?.data}
        pastInfo={pastInfo?.data}
        userMyInfo={userMyInfo?.data}
        userScore={pastList?.user_score}
      />
      <Ranking
        levelInfo={levelInfo}
        levelRank={levelRank?.data}
        wordRank={wordRank?.data}
        userMyInfo={userMyInfo?.data}
        userMyStudy={userMyStudy?.data}
      />
      <Footer />
    </>
  );
}
export default Main;

// main 페이지는 container, max-w-screen-lg, lg:w-[70%] 설정

// 맨위 : 유저 정보 , 오늘의 정보
function MyInfo({ userMyInfo, userMyStudy, levelInfo, checkEmoState}: any): JSX.Element {
  

  const [openModal, setOpenModal] = useState<Boolean>(false);
  localStorage.setItem("nickname", userMyInfo.nickname);
  const navigate = useNavigate();

  
  // 경험치 비율 width
  const expWidth =
    (userMyInfo.exp / levelInfo[userMyInfo.level].totalExp) * 100 + "%";

  // 학습 시간 h , m , s
  let time: number = userMyStudy.todayTime;
  const h = Math.floor(time / 3600);
  time = time % 3600;
  const m: number = Math.floor(time / 60);
  time = time % 60;
  const s = time;
  

  const [character, setCharacter] = useState<any>()
  

  useEffect(()=> {
    
    setCharacter(<OrangeCat sendEmo={checkEmoState} dataLevel={userMyInfo.level}/>)
  },[])





  return (
    <>
    {openModal && <StudyStartModal setOpenModal={setOpenModal} />}
    <div className="bg-[#F0ECE9] w-full">
    <div className="container max-w-screen-xl w-full mx-auto lg:flex flex-col md:flex-row md:justify-around items-center text-center lg:px-5 px-0 lg:py-[2.7rem] py-4 bg-[#F0ECE9]">
        <div className="flex flex-col lg:w-[45%] w-[100%]">
          <div className="flex justify-center items-center lg:w-[90%] w-[95%] mx-auto">
            <div className="flex flex-col justify-center items-center w-full bg-white py-4 px-4 rounded-md">
              <div className="h-[19rem] w-full">
                {character}
              </div>
              <div className="rounded-br-xl rounded-bl-xl font-semibold md:text-[1rem] w-full p-1 pt-3">

                <div className="flex justify-start md:text-[1.2rem] sm:text-[1.1rem] text-[1rem] font-medium">
                  <div className={`${style.badgeImg}`} style={{backgroundImage:`url('/Assets/Badge/${userMyInfo?.nowbadgeImage}.png')`}}></div>{userMyInfo?.nowbadgeName}
                </div>
                <div className="sm:text-[2.2rem] text-[2rem] font-bold items-end">
                  <div className="text-start">
                    {userMyInfo?.nickname}
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="flex items-end flex-wrap">
                      <div className="md:text-[1.2rem] text-[1rem] font-bold text-[#8E8E8E] px-1">{levelInfo[userMyInfo.level].levelName}</div>
                      <div className="md:text-[0.8rem] sm:text-[0.7rem] text-[0.5rem] px-2 border-2 border-[#A87E6E] w-fit rounded-full bg-[#F0ECE9] font-bold text-[#A87E6E]">
                        {levelInfo[userMyInfo?.level].levelName2}
                      </div>
                    </div>
                    <div className="text-[0.9rem] text-zinc-400 text-end font-medium"> {userMyInfo.exp} / {userMyInfo.level > 9 ? <> ∞ </> : <>{levelInfo[userMyInfo.level].totalExp} </> }</div>
                  </div>
                </div>
                <div className="bg-[#F0ECE9] rounded-lg mt-2 overflow-hidden">
                  <div className="bg-[#F7CCB7] rounded-lg py-[0.5rem]" style={{width:`${expWidth}` , maxWidth:"100%"}}></div>
                </div>

              </div>

            </div>
          </div>
        </div>
        <div className="flex justify-center items-center lg:w-[50%] pt-[1rem] pb-[0.5rem] h-[90%] px-4">
          <div className="flex justify-center items-center w-full">
            {/* 메인 데이터 */}
            <div className="flex flex-col justify-start items-start w-full">
            <div className="md:text-[2.5rem] sm:text-[2rem] text-[1.7rem] font-bold w-full border-b-2 border-gray-100 py-1">오늘의 학습</div>
            <div className="w-full flex flex-wrap justify-center items-center">
                <div className="md:text-[1.1rem] sm:text-[1rem] text-[0.8rem] px-4 text-zinc-500">학습 시간</div>
                <div className="md:text-[3.2rem] sm:text-[2.5rem] text-[2rem] font-bold text-[#B18978]">
                  {h > 0 && <>{h}<span className="md:text-[1.3rem] text-[1rem] px-2">시간 </span><span className="px-2"></span></>}
                  {m}<span className="md:text-[1.3rem] text-[1rem] px-2">분</span>
                  <span className="px-2"></span>
                  {s}<span className="md:text-[1.3rem] text-[1rem] px-2">초 </span>
                </div>
            </div>

            <div className="flex justify-around w-full">
              <div className="w-[55%] ">
                <div className="sm:text-[2.5rem] text-[2rem] font-bold text-[#FFA800] flex flex-wrap items-end justify-center">
                  {userMyStudy.todayWord}<span className="md:text-[1.2rem] text-[1rem] px-1 pb-2">개</span><div className="md:text-[1.2rem] text-[1rem] px-2 pb-2">/ {userMyStudy.totalWord} 개</div>  
                </div>
                <div className="md:text-[1.1rem] sm:text-[1rem] text-[0.8rem] text-zinc-500">단어 학습</div>
              </div>
              <div className="w-[45%]">
                <div className="sm:text-[2.5rem] text-[2rem] font-bold text-[#FFA800] flex flex-wrap items-end justify-center">
                  {userMyStudy.todayContext}<span className="md:text-[1.2rem] text-[1rem] px-1 pb-2">개</span> <div className="md:text-[1.2rem] text-[1rem] px-2 pb-2">/ {userMyStudy.totalContext} 개</div>
                </div>
                <div className="md:text-[1.1rem] sm:text-[1rem] text-[0.8rem] text-zinc-500">문맥 학습</div>
              </div>
            </div>



              {/* 이동 버튼 */}
              <div className="flex justify-center items-center bg-[#C6A89A] mt-5 w-full text-white text-[1.2rem] font-semibold rounded-lg">
                <div className="flex justify-around items-center w-full py-2">
                  <div className="flex flex-col justify-center items-center w-full">
                    <div className="flex justify-around items-center w-full py-2">
                      <div className="flex justify-center w-full border-r-2 border-r-white"><img className="object-contain md:w-[3.7rem] w-[3rem] hover:scale-125 transition-all duration-300 cursor-pointer" src="/Assets/Icon/단어학습.png" alt="icon" onClick={() => setOpenModal(true)}/></div>
                      <div className="flex justify-center w-full border-r-2 border-r-white"><img className="object-contain md:w-[3.7rem] w-[3rem] hover:scale-125 transition-all duration-300 cursor-pointer" src="/Assets/Icon/학습관리.png" alt="icon" onClick={() => navigate('/mypage')}/></div>
                      <div className="flex justify-center w-full border-r-2 border-r-white"><img className="object-contain md:w-[3.7rem] w-[3rem] hover:scale-125 transition-all duration-300 cursor-pointer" src="/Assets/Icon/오답공책.png" alt="icon" onClick={() => navigate('/note')}/></div>
                      <div className="flex justify-center w-full "><img className="object-contain md:w-[3.7rem] w-[3rem] scale-125 hover:scale-150 transition-all duration-300 cursor-pointer" src="/Assets/Icon/문맥도감.png" alt="icon" onClick={() => navigate('/dogam')}/></div>
                    </div>
                    <div className="flex justify-around w-full md:text-[1rem] text-[0.9rem]">
                      <div><div className="pt-1 cursor-pointer" onClick={() => setOpenModal(true)} >단어학습</div></div>
                      <div><div className="pt-1 cursor-pointer" onClick={() => navigate('/mypage')}>학습관리</div></div>
                      <div><div className="pt-1 cursor-pointer" onClick={() => navigate('/note')}>오답공책</div></div>
                      <div><div className="pt-1 cursor-pointer" onClick={() => navigate('/dogam')}>문맥도감</div></div>
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
  );
}


// 학습 (3가지)
function StudyContent({ userScore }: any): JSX.Element {
  const [openModal, setOpenModal] = useState<Boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // 과거시험-인트로 외부클릭 state
  const PastTestIntroClickCheck: any = useAppSelector((state: any) => {
    return state.PastTestIntroClickCheck;
  });

  const nav = (e: any) => {
    if (e.target.id === "word") {
      navigate("/wordStudy");
    } else if (e.target.id === "context") {
      navigate("/contextStudy");
    }
  };
  return (
    <>
      {openModal && <StudyStartModal setOpenModal={setOpenModal} />}

      <div className="container max-w-screen-lg w-full  mx-auto text-center md:pt-[7rem] pt-[5rem]">
        <div className="md:text-[1.5rem] text-[1rem]">홍민정음</div>
        <div className="md:text-[2.2rem] text-[1.9rem] font-bold ">
          신나고 즐거운 <span className="text-[#A87E6E]">학습</span>
        </div>
        <div className="flex md:justify-around flex-col md:flex-row items-center my-5">
          <div
            className={`${style.studyContents} md:relative static md:h-0 md:p-[3%] p-[4%] md:pb-[27%]  md:w-[30%] w-[90%] rounded-md`}
          >
            <div className="md:text-[1.2rem] sm:text-[1rem] text-[0.9rem] text-[#666666]">
              오늘의 공부{" "}
            </div>
            <div className="text-[#A87E6E] font-bold md:text-[1.8rem] sm:text-[1.4rem] text-[1.1rem] py-0.5">
              단어 학습
            </div>
            <div className="lg:text-[1rem] text-[0.9rem] text-[#666666]">
              뜻을 읽고 해당 단어를 찾고, 정확한 뜻을 학습해보세요!
            </div>
            <br />
            <div
              id="word"
              className={`${style.studyBtn} md:text-[1.3rem] md:absolute static md:bottom-[5%]  md:w-[80%] text-center border-2 border-[#A87E6E] rounded-lg py-1 mt-1`}
              onClick={() => setOpenModal(true)}
            >
              시작하기
            </div>
          </div>

          <div
            className={`${style.studyContents} md:relative static md:m-0 m-3 md:h-0 md:p-[3%] p-[4%] md:pb-[27%]  md:w-[30%] w-[90%] rounded-md`}
          >
            <div className="md:text-[1.2rem] sm:text-[1rem] text-[0.9rem] text-[#666666]">
              다의어 공부{" "}
            </div>
            <div className="text-[#A87E6E] font-bold md:text-[1.8rem] sm:text-[1.4rem] text-[1.1rem] py-0.5">
              문맥 학습
            </div>
            <div className="lg:text-[1rem] text-[0.9rem] text-[#666666]">
              빈칸에 공통적으로 들어갈 단어를 찾고, 단어의 다양한 의미를
              공부해보세요!
            </div>
            <br />
            <div
              id="context"
              onClick={nav}
              className={`${style.studyBtn} md:text-[1.3rem] md:absolute static md:bottom-[5%]  md:w-[80%] text-center border-2 border-[#A87E6E] rounded-lg py-1 mt-1`}
            >
              시작하기
            </div>
          </div>

          <div
            className={`${style.studyContents} md:relative static md:h-0 md:p-[3%] p-[4%] md:pb-[27%]  md:w-[30%] w-[90%] rounded-md`}
          >
            {PastTestIntroClickCheck ? (
              <PastTestIntroModal userScore={userScore} />
            ) : null}
            <div className="md:text-[1.2rem] sm:text-[1rem] text-[0.9rem] text-[#666666]">
              실력 확인{" "}
            </div>
            <div className="text-[#A87E6E] font-bold md:text-[1.8rem] sm:text-[1.4rem] text-[1.1rem] py-0.5">
              과거시험
            </div>
            <div className="lg:text-[1rem] text-[0.9rem] text-[#666666]">
              매달 마지막 주 주말에 열리는 과거시험을 통해 향상된 실력을
              확인해보세요!{" "}
            </div>
            <br />
            <div
              className={`${style.studyBtn} md:text-[1.3rem] md:absolute static md:bottom-[5%]  md:w-[80%] text-center border-2 border-[#A87E6E] rounded-lg py-1 mt-1`}
              onClick={() => {
                dispatch(showPastTestIntro());
              }}
            >
              시작하기
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// 뉴스 ( 신문 핵심 단어 )
function News({ newsKeyword }: any): JSX.Element {
  const [select, setSelect] = useState<number>(0);
  const [selectWord, setSelectWord] = useState<any>([]);

  // 주제바꿨을 때 첫번째 키워드 선택하도록
  const firstSelect = (subject: number) => {
    setSelectWord(words[subject]?.words[0]);
  };

  const [words, setWords] = useState<any>([]);

  // 뉴스 키워드 카테코리별 묶기 및 변환
  useEffect(() => {
    const categoryMap: any = {};
    newsKeyword.forEach((word: any) => {
      if (!categoryMap[word.category]) {
        categoryMap[word.category] = [];
      }
      categoryMap[word.category].push({
        text: word.wordResponseDto.wordName,
        value: word.score === null ? 0 : word.score,
        detail: word.wordResponseDto,
      });
    });
    // 카테고리별로 분리된 데이터를 wordCloud 데이터 형식에 맞게 변환
    const wordCloudData: any = [];
    Object.keys(categoryMap).forEach((category) => {
      wordCloudData.push({
        category,
        words: categoryMap[category],
      });
    });
    setWords(wordCloudData);
  }, []);

  useEffect(() => {
    firstSelect(0);
  }, [words]);

  function handleClick(word: any, event: any) {
    setSelectWord(word);
  }

  return (
    <>
      <div className="container max-w-screen-xl xl:w-[80%] w-full mx-auto px-[5%] md:my-[7rem] my-[5rem] md:px-10">
        <div className="md:text-[1.2rem] text-[1rem] text-[#5F5F5F]">
          신문으로 단어 공부하기
        </div>

        <div className="">
          <div className="md:text-[2.5rem] text-[2.1rem] font-bold">
            <span className="md:text-[2rem] text-[1.5rem]">오늘의 </span>
            <span className="text-[#BE8D65]">신문</span> 핵심단어
          </div>
          <div className="flex mt-4">
            <div
              className={classNames(
                "text-[1.4rem] px-4 py-1 font-bold",
                select === 0 ? "border-b-4 border-[#F7CCB7]" : null,
              )}
              onClick={() => {
                firstSelect(0);
                setSelect(0);
              }}
            >
              <div
                className={`${style.menu}`}
                style={{
                  backgroundImage: `url('/Assets/Icon/${words[0]?.category}.png')`,
                }}
              ></div>
              {words[0]?.category}
            </div>

            <div
              className={classNames(
                "text-[1.4rem] px-4 py-1 font-bold",
                select === 1 ? "border-b-4 border-[#F7CCB7]" : null,
              )}
              onClick={() => {
                firstSelect(1);
                setSelect(1);
              }}
            >
              <div
                className={`${style.menu}`}
                style={{
                  backgroundImage: `url('/Assets/Icon/${words[1]?.category}.png')`,
                }}
              ></div>
              {words[1]?.category}
            </div>

            <div
              className={classNames(
                "text-[1.4rem] px-4 py-1 font-bold",
                select === 2 ? "border-b-4 border-[#F7CCB7]" : null,
              )}
              onClick={() => {
                firstSelect(2);
                setSelect(2);
              }}
            >
              <div
                className={`${style.menu}`}
                style={{
                  backgroundImage: `url('/Assets/Icon/${words[2]?.category}.png')`,
                }}
              ></div>
              {words[2]?.category}
            </div>

            <div
              className={classNames(
                "text-[1.4rem] px-4 py-1 font-bold",
                select === 3 ? "border-b-4 border-[#F7CCB7]" : null,
              )}
              onClick={() => {
                firstSelect(3);
                setSelect(3);
              }}
            >
              <div
                className={`${style.menu}`}
                style={{
                  backgroundImage: `url('/Assets/Icon/${words[3]?.category}.png')`,
                }}
              ></div>
              {words[3]?.category}
            </div>
          </div>
        </div>

        <div className="border-2 border-gray-100 bg-[#F9F9F9] p-4 mb-4">
          <ReactWordCloud
            words={words[select]?.words}
            callbacks={{
              onWordClick: handleClick,

              getWordTooltip: (word: any) => {
                return null;
              },
            }}
            options={{
              fontSizes: [20, 50],
              rotations: 1,
              rotationAngles: [0, 0],
              padding: 10,
              fontWeight: "bold",
              colors: ["#967E76", "#815B5B", "#DBA39A", "#7895B2"],
            }}
          />
        </div>

        <div className="md:text-[1.8rem] sm:text-[1.4rem] text-[1.2rem] font-bold">
          {selectWord?.detail?.wordName}
          <span className="md:text-[1rem] sm:text-[0.9rem] text-[0.8rem] font-medium text-[#A2A2A2]">
            {selectWord?.detail?.Iso > 0 && selectWord?.detail?.Iso}{" "}
            {selectWord?.detail?.wordOrigin && (
              <>[{selectWord?.detail?.wordOrigin}]</>
            )}{" "}
            {selectWord?.detail?.wordType}
          </span>
        </div>

        <div className="h-[11rem] rounded-lg bg-[#F4EFEC] p-2 mt-2 md:text-[1.2rem] sm:text-[1.1rem] text-[1rem] overflow-y-auto ">
          <div className="relative border-3">
            {selectWord?.detail?.wordDetailResponseList.map(
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
        </div>
      </div>
    </>
  );
}

// 장원급제 리스트
function PassUsers({
  pastList,
  pastInfo,
  levelInfo,
  userMyInfo,
  userScore,
}: any): JSX.Element {
  return (
    <>
      <div className="bg-[#F4EFEC] w-full">
        <div className="container max-w-screen-xl mx-auto text-center py-16">
          <div className={`${style.passFont} md:text-[2.1rem] text-[1.5rem] `}>
            제 {pastInfo.pastTestId}회 과거시험 결과
          </div>
          <div
            className={`${style.passFont} md:text-[3.2rem] text-[2.2rem] font-bold text-[#A87E6E]`}
          >
            장원급제
          </div>
          <div
            className={`${style.passFont} md:text-[2.1rem] text-[1.5rem] text-[#525252] mb-[2rem]`}
          >
            축하드립니다!
          </div>

          <div
            className="overflow-hidden lg:w-[70%] md:w-[80%] sm:w-[90%] w-full mx-auto"
            style={{ height: pastList.length <= 3 ? "auto" : "17rem" }}
          >
            <div
              className={`${pastList.length >= 4 ? style.move : ""} px-1`}
              style={{ animationDuration: `${pastList.length * 2}s` }}
            >
              {pastList.map((user: any, index: number) => (
                <div
                  key={index}
                  className={`flex justify-between rounded-lg bg-[#ffffff] my-3 md:px-5 sm:px-4 px-3 py-3 md:text-[1.5rem] sm:text-[1.2rem] text-[0.9rem] text-start`}
                >
                  <div className="flex">
                    <div
                      className={`${style.badgeImg2}`}
                      style={{
                        backgroundImage: `url('/Assets/Badge/${user.nowBadge.badgeImage}.png')`,
                      }}
                    ></div>
                    <div className="px-1">
                      <div className="md:text-[1.1rem] sm:text-[1rem] text-[0.8rem]">
                        {user.nowBadge.badgeName}
                      </div>
                      <div className="md:text-[1.5rem] sm:text-[1.2rem] text-[1rem] font-bold text-start">
                        {user.nickname}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-end text-[#525252] md:text-[1.3rem] sm:text-[1rem] text-[0.8rem] ">
                    <div className="text-[1rem] text-end">{user.score}점</div>
                    {levelInfo[user.level].levelName}
                  </div>
                </div>
              ))}
            </div>

            <div
              className={`${pastList.length >= 4 ? style.move : ""} px-1`}
              style={{
                animationDuration: `${pastList.length * 2}s`,
                display: pastList.length <= 3 ? "none" : "block",
              }}
            >
              {pastList.map((user: any, index: number) => (
                <div
                  key={index}
                  className={`flex justify-between rounded-lg bg-[#ffffff] my-3 md:px-5 sm:px-4 px-3 py-3 md:text-[1.5rem] sm:text-[1.2rem] text-[0.9rem] text-start`}
                >
                  <div className="flex">
                    <div
                      className={`${style.badgeImg2}`}
                      style={{
                        backgroundImage: `url('/Assets/Badge/${user.nowBadge.badgeImage}.png')`,
                      }}
                    ></div>
                    <div className="px-1">
                      <div className="md:text-[1.1rem] sm:text-[1rem] text-[0.8rem]">
                        {user.nowBadge.badgeName}
                      </div>
                      <div className="md:text-[1.5rem] sm:text-[1.2rem] text-[1rem] font-bold text-start">
                        {user.nickname}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-end text-[#525252] md:text-[1.3rem] sm:text-[1rem] text-[0.8rem] ">
                    <div className="text-[1rem] text-end">{user.score}점</div>
                    {levelInfo[user.level].levelName}
                  </div>
                </div>
              ))}
            </div>
          </div>
        

          <div className="lg:w-[70%] md:w-[80%] sm:w-[90%] w-full mx-auto">
            <div className="border-b-2 mt-7 border-neutral-200 p-2 text-[#7F8487] text-[0.92rem]">과거시험 점수가 <strong>80</strong>점 이상인 경우 장원급제 칭호를 얻을 수 있습니다.</div>
            <div className="flex md:justify-end items-end pt-2 px-2 justify-center flex-wrap">
              <div className="py-3 px-3">나의 과거시험 점수</div>
              <div className="text-[3rem] font-bold">
                {userScore == null ? (
                  <>
                    <span className="md:text-[2rem] text-[1.5rem]">
                      아직 시험을 치지 않았습니다.{" "}
                    </span>{" "}
                  </>
                ) : (
                  <>
                    <span className="text-[#A87E6E]">{userScore}점</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



// 랭킹

function Ranking({levelInfo, levelRank, wordRank, userMyInfo, userMyStudy}:any):JSX.Element {
  const userId = localStorage.getItem('userId')
  const [menu, setMenu] = useState<boolean>(true);

  let myRankLevel = levelRank.findIndex((user:any) => user.userId == userId);
  let myRankWord = wordRank.findIndex((user:any) => user.userId == userId);
  
  return(
    <>
      <div className="bg-[#F4EFEC] w-full">
        <div className="container max-w-screen-xl mx-auto py-16">
          
            <div className="sm:w-fit w-full text-center">
              <div className="text-[1.2rem] font-bold">
                { menu ? <>오늘의 단어왕</>: <>홍민정음</>}
              </div>
              <div className="text-center w-full justify-between flex items-center text-[#A87E6E]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mx-1" onClick={()=>{
                  setMenu(!menu)
                }}>
                    <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
                </svg>
                <div className="text-[3rem] font-bold px-2">
                  { menu ? <>단어 학습</>: <>등급 순위</>}
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mx-1" onClick={()=>{
                  setMenu(!menu)
                }}>
                  <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
                </svg>
              </div>
            </div>


          <div className="flex flex-wrap">
            <div className="md:w-[70%] w-full min-h-[52rem]">
                {menu ? <>
                  {wordRank.length > 0 ? <>
                      {wordRank.map((user:any,idx:number) => (
                      <div key={idx} className={`flex justify-between rounded-xl bg-[#ffffff] m-2 md:px-5 sm:px-4 px-2 py-3  sm:text-[1.1rem] text-[0.9rem] text-start`}>
                        <div className="flex">
                          <div className={`font-bold flex items-center sm:px-6 px-2 ${idx===0? "text-yellow-500": (idx===1?"text-gray-400":(idx===2?"text-yellow-600":""))}`}>{idx+1}등</div>
                          <div className={`${style.badgeImg2}`} style={{backgroundImage:`url('/Assets/Badge/${user.badgeImage}.png')`}}></div>
                          <div className="px-1">
                            <div className="text-[0.8rem]">{user.badgeName}</div>
                            <div className="sm:text-[1.1rem] text-[1rem] font-bold text-start" >{user.nickname}</div>
                          </div>
                        </div>
                        <div className="flex flex-col justify-center text-[#525252] sm:text-[1.2rem] text-[1rem] text-center sm:px-6 px-2 pt-1">
                          <div>{user.count}개</div>
                        </div>
                      </div>
                    ))}
                  </>:<>
                    <div className="font-bold text-[1.5rem] text-[#CF0A0A] w-full text-center p-3">순위가 아직 없습니다.</div>
                  </>}

                </>:<>
                {levelRank.map((user:any,idx:number) => (
                    <div key={idx} className={`flex justify-between rounded-xl bg-[#ffffff] m-2 md:px-5 sm:px-4 px-2 py-3  sm:text-[1.1rem] text-[0.9rem] text-start`}>
                      <div className="flex">
                        <div className={`font-bold flex items-center sm:px-6 px-2 ${idx===0? "text-yellow-500": (idx===1?"text-gray-400":(idx===2?"text-yellow-600":""))}`}>{idx+1}등</div>
                        <div className={`${style.badgeImg2}`} style={{backgroundImage:`url('/Assets/Badge/${user.badgeImage}.png')`}}></div>
                        <div className="px-1">
                          <div className="text-[0.8rem]">{user.badgeName}</div>
                          <div className="sm:text-[1.1rem] text-[1rem] font-bold text-start" >{user.nickname}</div>
                        </div>
                      </div>
                      <div className="flex flex-col justify-end text-[#525252] sm:text-[1rem] text-[0.8rem] text-end sm:px-6 px-2">
                        <div>{user.exp}</div>
                        <div>{levelInfo[user.level].levelName}</div>
                      </div>
                    </div>
                  ))}
                </>}
            </div>

            <div className="md:w-[30%] w-full text-center p-2">
                <div className="bg-[#ffffff] rounded-xl p-2">
                  <div className="text-[1.5rem] font-bold">나의 순위는?!</div>
                  {menu ? <>
                    {myRankWord >= 0 ? <>
                    <div className="font-bold text-[3rem] text-[#F99417]">{myRankWord+1}<span className="text-[1.5rem]">등</span></div>
                    <div className="text-[0.9rem] py-1">축하드려요!</div>
                    <div className="bg-[#F5F5F5] rounded-lg text-[1.1rem] p-2 font-bold">
                      <div className="py-1">
                        <span className="text-[0.9rem] text-[#434242]">단어 학습 / </span>{userMyStudy.todayWord}개
                      </div>
                    </div>
                  </>:
                  <>
                    <div className="font-bold text-[3rem] text-[#F99417]">순위권 밖</div>
                    <div className="text-[0.9rem] py-1">조금만 더 노력해봐요!</div>
                    <div className="bg-[#F5F5F5] rounded-lg text-[1.1rem] p-2 font-bold">
                      <div className="py-1">
                        <span className="text-[0.9rem] text-[#434242]">단어 학습 / </span>{userMyStudy.todayWord}개
                      </div>
                    </div>
                  </>}
                  
                  </>:<>
                  {myRankLevel >= 0 ? <>
                    <div className="font-bold text-[3rem] text-[#F99417]">{myRankLevel+1}<span className="text-[1.5rem]">등</span></div>
                    <div className="text-[0.9rem] py-1">축하드려요!</div>
                    <div className="bg-[#F5F5F5] rounded-lg text-[1.1rem] p-2 font-bold">
                      <div className="py-1">
                        <span className="text-[0.9rem] text-[#434242]">등급 / </span>{levelInfo[userMyInfo.level].levelName}
                      </div>
                      <div className="py-1">
                        <span className="text-[0.9rem] text-[#434242]">경험치 / </span>{userMyInfo.exp}
                      </div>
                    </div>
                  </>:
                  <>
                    <div className="font-bold text-[3rem] text-[#F99417]">순위권 밖</div>
                    <div className="text-[0.9rem] py-1">조금만 더 노력해봐요!</div>
                    <div className="bg-[#F5F5F5] rounded-lg text-[1.1rem] p-2 font-bold">
                      <div className="py-1">
                        <span className="text-[0.9rem] text-[#434242]">등급 / </span>{levelInfo[userMyInfo.level].levelName}
                      </div>
                      <div className="py-1">
                        <span className="text-[0.9rem] text-[#434242]">경험치 / </span>{userMyInfo.exp}
                      </div>
                    </div>
                  </>}
                  </>
                  }
                </div>
                <div className="py-2 font-bold text-[0.9rem] text-[#CF0A0A]">
                  1등부터 10등까지 표시됩니다.
                </div>
            </div>
          </div>
        
        </div>
      </div>
    </>
  )
}

