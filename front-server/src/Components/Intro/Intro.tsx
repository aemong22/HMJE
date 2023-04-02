import styled, { css } from "styled-components";
import Footer from "../Common/Footer";
import IntroNavbar from "./IntroNavbar";
import sModule from "./Intro.module.css";
import "./Intro.css";
import { useLocation, useNavigate } from "react-router-dom";
import { MouseEventHandler, useEffect, useRef } from "react";
import { Toast } from "../Common/Toast";
import { toast } from "react-toastify";

function Intro(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const accessToken=localStorage.getItem("accessToken");
  useEffect(() => {
    //  if(accessToken&&accessToken!==undefined){
    //   navigate("/main");
    // }
    if (location.state !== null) {
      if (location.state.SecessionResult === true) {
        toast.info(`탈퇴되었습니다`);
      }
      const stateData = {
        ...window.history.state,
        usr: {
          ...window.history.state.usr,
          SecessionResult: 0,
        },
      };
      const pageTitle = "Title";
      const pageUrl = "/";
      window.history.replaceState(stateData, pageTitle, pageUrl);
    }
  }, []);

  return (
    <>
      <Toast />
      <IntroNavbar />
      <IntroSection1 />
      <IntroSection2 />
      <IntroSection3V1 />
      <IntroSection3V2 />
      <IntroSection4V1 />
      <IntroSection4V2 />
      <Footer />
    </>
  );
}
export default Intro;

function IntroSection1(): JSX.Element {
  const navigate = useNavigate();
  const div1 = useRef<HTMLDivElement>(null);
  const div2 = useRef<HTMLDivElement>(null);

  const nav: MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLElement;
    if (target.ariaLabel === "login") {
      navigate("/login");
    } else if (target.ariaLabel === "join") navigate("/join");
  };

  const hover: MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLElement;
    if (target.ariaLabel === "login") {
      div1.current?.classList.add("routeHover");
      div2.current?.classList.remove("routeHover");
    } else {
      div2.current?.classList.add("routeHover");
      div1.current?.classList.remove("routeHover");
    }

    // target.classList.add('routeHover')
  };

  const hoverOut: MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLElement;
    target.classList.remove("routeHover");
  };

  return (
    <div className="flex justify-center items-center h-[13rem] sm:h-[18rem] md:h-[20rem] lg:h-[29rem] md:px-4 bg-[#D6B17A]">
      <div
        id="introSection1"
        className="flex justify-between items-center text-white sm:px-2 w-full max-w-screen-xl"
      >
        {/* 왼쪽 */}
        <div className="flex justify-start items-center w-1/2 sm:w-1/2 md:w-3/5 xl:w-2/5 px-2">
          <div>
            <div className="text-[1.2rem] sm:text-[1.4rem] md:text-[1.7rem] font-semibold pl-1 mb-1">
              즐거운 단어 학습
            </div>
            <div className="leading-none text-[1.8rem] sm:text-[3rem] md:text-[4rem] font-bold my-1">
              홍민정음
            </div>
            <div className="hidden sm:flex text-[1.2rem] sm:text-[1.4rem] md:text-[1.7rem] font-medium mb-4">
              문해력을 향상시키기 위한 한 걸음
            </div>
            <div className="flex sm:hidden text-[0.8em] sm:text-[1rem] md:text-[1.1rem] font-medium pl-1 mb-2">
              문해력을 <br />향상시키기 위한 한 걸음
            </div>
            <div className="flex justify-start w-full text-[0.8rem] sm:text-[1rem] md:text-[1rem] lg:text-[1.2rem]">
              <div
                ref={div1}
                aria-label="login"
                className="w-full my-1 py-1 flex justify-center items-center border-2 sm:rounded-lg  rounded-md px-1 mr-1 sm:mr-2 cursor-pointer"
                onClick={nav}
                onMouseLeave={hoverOut}
                onMouseEnter={hover}
              >
                입장하기
              </div>
              <div
                ref={div2}
                aria-label="join"
                className="w-full my-1 py-1 flex justify-center items-center border-2 sm:rounded-lg  rounded-md px-1 cursor-pointer"
                onClick={nav}
                onMouseLeave={hoverOut}
                onMouseEnter={hover}
              >
                가입하기
              </div>
            </div>
          </div>
        </div>
        {/* 오른쪽 */}
        <div className="flex justify-center items-center w-1/2 sm:w-1/2 lg:w-2/5 xl:w-2/5 ">
          <img
            className="h-[10rem] sm:h-[17rem] md:h-[18rem] lg:h-[21rem]  xl:h-96"
            src="/Assets/Intro/sejong.png"
            alt="sejong"
          />
        </div>
      </div>
    </div>
  );
}

function IntroSection2(): JSX.Element {
  return (
    <div className="flex justify-center items-center py-10 sm:px-4 px-2 mt-16">
      <div className=" max-w-screen-xl w-full h-[90%] ">
        {/* 텍스트 */}
        <div className="flex justify-center items-end h-[25%]  w-[85%] sm:w-[60%] lg:w-[38.4%] pb-6 mx-auto ">
          <div>
            <div className="flex justify-center items-center mb-5 text-[1.1rem] md:text-[1.4rem] lg:text-[1.5rem]">
              {/* main text */}
              <span className="font-bold ">신나고 즐거운</span>&nbsp;
              <span className="font-bold text-[#A87E6E]">단어 학습</span>
            </div>
            <div className="flex justify-center items-center">
              {/* sub text */}
              <div className="text-center text-[#9B9B9B] text-[0.8rem] md:text-[0.9rem] lg:text-[1rem]">
                <div>단어학습으로 정확한 뜻을 배워보세요!</div>
                <div>문백학습으로 다의어를 알아보고 도감을 채워보세요!</div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${sModule.introStudy} md:w-[60%] mx-auto w-full md:pb-[50%] pb-[80%]`}
        ></div>
      </div>
    </div>
  );
}

// 데스크탑 & 태블릿
function IntroSection3V1(): JSX.Element {
  return (
    <div className="hidden sm:flex h-[30rem] xl:h-[35rem] justify-center items-center">
      <div className="max-w-screen-xl w-full h-[90%] ">
        {/* 텍스트 */}
        <div className="flex justify-center items-end h-[25%] w-full pb-6 mx-auto sm:w-[70%] md:w-[70%] lg:w-[70%]">
          <div>
            <div className="flex justify-center items-center mb-5 sm:text-[1.2rem] md:text-[1.4rem] lg:text-[1.5rem]">
              <span className="font-bold text-[#A87E6E]">홍민정음</span>
              <span className="font-bold">으로 한글을 배워야 하는 이유</span>
            </div>
          </div>
        </div>
        {/*데스크탑 & 태블릿 카드 */}
        <div className="flex-col justify-center items-center h-[75%] mx-auto max-w-screen-xl w-[90%] lg:w-[77%] ">
          <div className="flex justify-center items-center h-full">
            <div className="flex justify-center items-center h-full w-full rounded-[0.9rem] bg-[#F0ECE9] sm:mr-5 lg:mr-10">
              <div className="flex flex-col items-center h-full py-10">
                <div className="rounded-full xl:mb-5">
                  <img
                    className="w-[7rem] object-contain"
                    src="/Assets/Intro/introFirst.png"
                    alt=""
                  />
                </div>
                <div className="my-3 md:text-[1.3rem] lg:text-[1.5rem] font-bold">
                  정확한 의미 학습
                </div>
                <div className="flex flex-col items-center text-[#868686] text-[0.9rem] lg:text-[1rem]">
                  <span>학습을 통해</span>
                  <span>단어의 정확한 뜻을 학습하고</span>
                  <span>예제와 유의어로</span>
                  <span>이해를 돕습니다</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center h-full w-full rounded-[0.9rem] bg-[#F0ECE9] sm:mr-5 lg:mr-10">
              <div className="flex flex-col items-center h-full py-10">
                <div className="rounded-full xl:mb-5">
                  <img
                    className="w-[7rem] object-contain"
                    src="/Assets/Intro/introSecond.png"
                    alt=""
                  />
                </div>
                <div className="my-3 md:text-[1.3rem] lg:text-[1.5rem] font-bold">
                  학습 관리
                </div>
                <div className="flex flex-col items-center text-[#868686] text-[0.9rem] lg:text-[1rem]">
                  <span>날짜별 학습시간과</span>
                  <span>학습한 단어의 수를</span>
                  <span>시각적으로 보여줍니다</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center h-full w-full rounded-[0.9rem] bg-[#F0ECE9]">
              <div className="flex flex-col items-center h-full py-10">
                <div className="rounded-full xl:mb-5">
                  <img
                    className="w-[7rem] object-contain"
                    src="/Assets/Intro/introThird.png"
                    alt=""
                  />
                </div>
                <div className="my-3 md:text-[1.3rem] lg:text-[1.5rem] font-bold">
                  재미있는 학습 환경
                </div>
                <div className="flex flex-col items-center text-[#868686] text-[0.9rem] lg:text-[1rem]">
                  <span>문맥도감과 칭호기능으로</span>
                  <span>수집하는 재미를 줍니다</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 모바일
function IntroSection3V2(): JSX.Element {
  return (
    <div className="flex sm:hidden h-[50rem] justify-center items-center">
      <div className="w-[90%] h-[90%] ">
        {/* 텍스트 */}
        <div className="flex justify-center items-center h-[10%] w-full mx-auto">
          <div className="flex justify-center items-center text-[1.1rem] mb-5">
            <span className="font-bold text-[#A87E6E]">홍민정음</span>
            <span className="font-bold">으로 한글을 배워야 하는 이유</span>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center w-[95%] h-[90%] mx-auto">
          <div className="flex justify-center items-center h-full w-full rounded-[0.9rem] bg-[#F0ECE9] mb-4">
            <div className="flex flex-col items-center">
              <div className="rounded-full">
                <img
                  className="w-[4.7rem] object-contain"
                  src="/Assets/Intro/introFirst.png"
                  alt=""
                />
              </div>
              <div className="my-2 text-[0.95rem] font-bold">
                정확한 의미 학습
              </div>
              <div className="flex flex-col items-center text-[#868686] text-[0.9rem]">
                <span>학습을 통해</span>
                <span>단어의 정확한 뜻을 학습하고</span>
                <span>예제와 유의어로 이해를 돕습니다</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center h-full w-full rounded-[0.9rem] bg-[#F0ECE9] mb-4">
            <div className="flex flex-col items-center">
              <div className="rounded-full">
                <img
                  className="w-[4.7rem] object-contain"
                  src="/Assets/Intro/introSecond.png"
                  alt=""
                />
              </div>
              <div className="my-2 text-[0.95rem] font-bold">학습 관리</div>
              <div className="flex flex-col items-center text-[#868686] text-[0.9rem]">
                <span>날짜별 학습시간과</span>
                <span>학습한 단어의 수를</span>
                <span>시각적으로 보여줍니다</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center h-full w-full rounded-[0.9rem] bg-[#F0ECE9]">
            <div className="flex flex-col items-center">
              <div className="rounded-full">
                <img
                  className="w-[4.7rem] object-contain"
                  src="/Assets/Intro/introThird.png"
                  alt=""
                />
              </div>
              <div className="my-2 text-[0.95rem] font-bold">
                재미있는 학습 환경
              </div>
              <div className="flex flex-col items-center text-[#868686] text-[0.9rem] pb-3">
                <span>문맥도감과 칭호기능으로</span>
                <span>수집하는 재미를 줍니다</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface CardProps {
  width?: string;
  height?: string;
  color?: string;
  img: any;
}

const StyledCard = styled.div<CardProps>`
  width: ${(props) => props.width || '8.3rem'};
  height: ${(props) => props.height || '8.3rem'};
  margin-right: 1.2rem;
  margin-left: 1.2rem;
  border-radius: 2rem;
  background-color: ${(props) => props.color || "#ebc7be"};
  flex-shrink: 0; // added to prevent shrinking
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: center;
  background-size: contain;
  background-image:  url(${(props) => props.img || '/Assets/Intro/21.png'});
`;


// 서비스 분야
function IntroSection4V1(): JSX.Element {
  const navigate = useNavigate()
  return (
    <div className="container max-w-screen-xl w-full mx-auto mt-10 md:mt-24 md:mb-6 overflow-hidden" onClick={()=> {navigate('/login')}}>
      <div className="flex justify-center items-center w-full">
        <div className="mb-6 font-black text-[1.2rem] md:text-[1.3rem] lg:text-[1.4rem] text-[#A87E6E] w-[85%] md:w-[90%] lg:w-[77%]">
          서비스 분야
        </div>
      </div>
      <div
        className={`hidden md:flex flex-nowrap h-[10rem] w-[80rem] -translate-x-4 justify-start items-start ${sModule.moveCard1}`}
      >
        <StyledCard width="10rem" height="10rem" color="#f4eeec" img='/Assets/Intro/1.png' />
        <StyledCard width="10rem" height="10rem" color="#f4eeec" img='/Assets/Intro/9.png' />
        <StyledCard width="10rem" height="10rem" color="#f7cdb7" img='/Assets/Intro/17.png' />
        <StyledCard width="10rem" height="10rem" color="#ac8679" img='/Assets/Intro/25.png' />
        <StyledCard width="10rem" height="10rem" color="#ebc7be" img='/Assets/Intro/2.png' />
        <StyledCard width="10rem" height="10rem" color="#ebc7be" img='/Assets/Intro/10.png' />
        <StyledCard width="10rem" height="10rem" color="#f9f9f9" img='/Assets/Intro/18.png' />
        <StyledCard width="10rem" height="10rem" img='/Assets/Intro/26.png' />
        <StyledCard width="10rem" height="10rem" color="#ac8679" img='/Assets/Intro/3.png' />
        <StyledCard width="10rem" height="10rem" color="#f7cdb7" img='/Assets/Intro/11.png' />
        <StyledCard width="10rem" height="10rem" color="#ebc7be" img='/Assets/Intro/19.png' />
        <StyledCard width="10rem" height="10rem" color="#f4eeec" img='/Assets/Intro/27.png' />
        <StyledCard width="10rem" height="10rem" color="#ebc7be" img='/Assets/Intro/4.png' />
        <StyledCard width="10rem" height="10rem" color="#a77e6e" img='/Assets/Intro/12.png' />
        <StyledCard width="10rem" height="10rem" color="#f9f9f9" img='/Assets/Intro/20.png' />
        <StyledCard width="10rem" height="10rem" color="#ac8679" img='/Assets/Intro/28.png' />
        <StyledCard width="10rem" height="10rem" img='/Assets/Intro/5.png' />
        <StyledCard width="10rem" height="10rem" color="#ebc7be" img='/Assets/Intro/13.png' />
        <StyledCard width="10rem" height="10rem" color="#ac8679" img='/Assets/Intro/21.png' />

      </div>
      <div
        className={`flex md:hidden flex-nowrap h-[10rem] w-[80rem] -translate-x-4 justify-start items-start ${sModule.moveCard1}`}
      >
        <StyledCard color="#f4eeec" img='/Assets/Intro/1.png' />
        <StyledCard color="#f4eeec" img='/Assets/Intro/9.png' />
        <StyledCard color="#f7cdb7" img='/Assets/Intro/17.png' />
        <StyledCard color="#ac8679" img='/Assets/Intro/25.png' />
        <StyledCard color="#ebc7be" img='/Assets/Intro/2.png' />
        <StyledCard color="#ebc7be" img='/Assets/Intro/10.png' />
        <StyledCard color="#f9f9f9" img='/Assets/Intro/18.png' />
        <StyledCard img='/Assets/Intro/26.png' />
        <StyledCard color="#ac8679" img='/Assets/Intro/3.png' />
        <StyledCard color="#f7cdb7" img='/Assets/Intro/11.png' />
        <StyledCard color="#ebc7be" img='/Assets/Intro/19.png' />
        <StyledCard color="#f4eeec" img='/Assets/Intro/27.png' />
        <StyledCard color="#ebc7be" img='/Assets/Intro/4.png' />
        <StyledCard color="#a77e6e" img='/Assets/Intro/12.png' />
        <StyledCard color="#f9f9f9" img='/Assets/Intro/20.png' />
        <StyledCard color="#ac8679" img='/Assets/Intro/28.png' />
        <StyledCard img='/Assets/Intro/5.png' />
        <StyledCard color="#ebc7be" img='/Assets/Intro/13.png' />
        <StyledCard color="#ac8679" img='/Assets/Intro/21.png' />
        
      </div>
    </div>
  );
}

function IntroSection4V2(): JSX.Element {
  const navigate = useNavigate()
  return (
    <div className="container max-w-screen-xl w-full mx-auto mb-16 md:mb-24 md:mt-6 overflow-hidden" onClick={()=> {navigate('/login')}}>
      <div
        className={`hidden md:flex flex-nowrap h-[10rem] w-[80rem] justify-start items-start ${sModule.moveCard2}`}
      >
        <StyledCard width="10rem" height="10rem" color="#f7cdb7" img="/Assets/Intro/6.png" />
        <StyledCard width="10rem" height="10rem" color="#f4eeec" img="/Assets/Intro/14.png" />
        <StyledCard width="10rem" height="10rem" color="#a77e6e" img="/Assets/Intro/22.png" />
        <StyledCard width="10rem" height="10rem" color="#ebc7be" img="/Assets/Intro/30.png" />
        <StyledCard width="10rem" height="10rem" color="#f9f9f9" img="/Assets/Intro/7.png" />
        <StyledCard width="10rem" height="10rem" color="#ebc7be" img="/Assets/Intro/15.png" />
        <StyledCard width="10rem" height="10rem" color="#ac8679" img="/Assets/Intro/23.png" />
        <StyledCard width="10rem" height="10rem" img="/Assets/Intro/31.png" />
        <StyledCard width="10rem" height="10rem" color="#f7cdb7" img="/Assets/Intro/8.png" />
        <StyledCard width="10rem" height="10rem" color="#a77e6e" img="/Assets/Intro/16.png" />
        <StyledCard width="10rem" height="10rem" color="#f4eeec" img="/Assets/Intro/24.png" />
        <StyledCard width="10rem" height="10rem" color="#ebc7be" img="/Assets/Intro/1.png" />
        <StyledCard width="10rem" height="10rem" color="#f9f9f9" img="/Assets/Intro/9.png" />
        <StyledCard width="10rem" height="10rem" color="#ac8679" img="/Assets/Intro/25.png" />
        <StyledCard width="10rem" height="10rem" img="/Assets/Intro/27.png" />
        <StyledCard width="10rem" height="10rem" color="#f9f9f9" img='/Assets/Intro/29.png' />
        <StyledCard width="10rem" height="10rem" color="#ebc7be" img='/Assets/Intro/6.png' />
        <StyledCard width="10rem" height="10rem" img='/Assets/Intro/14.png' />
        <StyledCard width="10rem" height="10rem" color="#ebc7be" img="/Assets/Intro/17.png" />
      </div>
      <div
        className={`flex md:hidden flex-nowrap h-[10rem] w-[80rem] justify-start items-start ${sModule.moveCard2}`}
      >
        <StyledCard color="#f7cdb7" img="/Assets/Intro/6.png" />
        <StyledCard color="#f4eeec" img="/Assets/Intro/14.png" />
        <StyledCard color="#a77e6e" img="/Assets/Intro/22.png" />
        <StyledCard color="#ebc7be" img="/Assets/Intro/30.png" />
        <StyledCard color="#f9f9f9" img="/Assets/Intro/7.png" />
        <StyledCard color="#ebc7be" img="/Assets/Intro/15.png" />
        <StyledCard color="#ac8679" img="/Assets/Intro/23.png" />
        <StyledCard img="/Assets/Intro/31.png" />
        <StyledCard color="#f7cdb7" img="/Assets/Intro/8.png" />
        <StyledCard color="#a77e6e" img="/Assets/Intro/16.png" />
        <StyledCard color="#f4eeec" img="/Assets/Intro/24.png" />
        <StyledCard color="#ebc7be" img="/Assets/Intro/1.png" />
        <StyledCard color="#f9f9f9" img="/Assets/Intro/9.png" />
        <StyledCard color="#ac8679" img="/Assets/Intro/25.png" />
        <StyledCard img="/Assets/Intro/27.png" />
        <StyledCard color="#f9f9f9" img='/Assets/Intro/29.png' />
        <StyledCard color="#ebc7be" img='/Assets/Intro/6.png' />
        <StyledCard img='/Assets/Intro/14.png' />
        <StyledCard color="#ebc7be" img="/Assets/Intro/17.png" />
      </div>
    </div>
  );
}
