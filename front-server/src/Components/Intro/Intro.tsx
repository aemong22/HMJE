import Footer from "../Common/Footer"
import IntroNavbar from "./IntroNavbar"

function Intro():JSX.Element {
  return (
    <>
      <IntroNavbar/>
      <IntroSection1/>
      <IntroSection2/>
      <IntroSection3V1/>
      <IntroSection3V2/>
      <IntroSection4/>
      <Footer/>
    </>
  )
}
export default Intro;

function IntroSection1(): JSX.Element {
  return (
    <div className="flex justify-center items-center h-[13rem] sm:h-[18rem] md:h-[20rem] lg:h-[29rem] px-4 bg-[#D6B17A]">
      <div id="introSection1" className="flex justify-between items-center text-white sm:px-2 w-full max-w-screen-xl">
        {/* 왼쪽 */}
        <div className="flex justify-center sm:justify-center items-center w-1/2 sm:w-1/2 md:w-2/5 xl:w-2/5">
          <div>
            <div className="text-[0.62rem] sm:text-[1rem] md:text-[1.25rem] font-semibold pl-1 sm:pl-2 mb-1">
              즐거운 단어 학습
            </div>
            <div className="leading-none text-[1.8rem] sm:text-[3rem] md:text-[3.7rem] font-bold mb-2">
              홍민정음
            </div>
            <div className="hidden sm:flex text-[0.6em] sm:text-[0.95rem] md:text-[1rem] font-medium mb-2 pl-2">
              문해력실력을 향상시킬 수 있는 곳
            </div>
            <div className="flex sm:hidden text-[0.6em] sm:text-[1rem] md:text-[1.1rem] font-medium mb-2 pl-1">
              문해력실력을 <br />향상시킬 수 있는 곳
            </div>
            <div className="flex justify-start mb-3 h-[1.5rem] sm:h-[2.4rem] md:h-[2.5rem] w-[6.7rem] sm:w-[15rem] md:w-[16rem] text-[0.5rem] sm:text-[1rem] md:text-[1rem] lg:text-[1.2rem]">
              <div className="w-full h-[90%] flex justify-center items-center border-2 rounded-xl px-1 mr-1 sm:mr-2 cursor-pointer">입장하기</div>
              <div className="w-full h-[90%] flex justify-center items-center border-2 rounded-xl px-1 cursor-pointer">가입하기</div>
            </div>
          </div>
        </div>
        {/* 여백 */}
        <div className="hidden sm:text-red-500 lg:flex xl:w-2/5 "></div>
        {/* 오른쪽 */}
        <div className="flex justify-center items-center w-1/2 sm:w-1/2 lg:w-2/5 xl:w-2/5 ">
          <img className="h-[10rem] sm:h-[17rem] md:h-[18rem] lg:h-[21rem]  xl:h-96" src="/Assets/Intro/sejong.png" alt="sejong" />
        </div>
      </div>
    </div>
  );
}


function IntroSection2():JSX.Element {
  return(
    <div className="h-[33rem] sm:h-[40rem] lg:h-[50rem] flex justify-center items-center">
      <div className=" max-w-screen-xl w-full h-[90%] ">
        {/* 텍스트 */}
        <div className="flex justify-center items-end h-[25%]  w-[85%] sm:w-[60%] lg:w-[38.4%] pb-6 mx-auto ">
          <div>
            <div className="flex justify-center items-center mb-5 text-[0.9rem] sm:text-[1.2rem] md:text-[1.4rem] lg:text-[1.5rem]">
              {/* main text */}
              <span className="font-bold ">신나고 즐거운</span>&nbsp;
              <span className="font-bold text-[#A87E6E]">단어 학습</span>
            </div>
            <div className="flex justify-center items-center">
              {/* sub text */}
              <div className="text-center text-[#9B9B9B] text-[0.6rem] sm:text-[0.8rem] md:text-[0.9rem] lg:text-[1rem]">
                <div>단어학습으로 정확한 뜻을 배워보세요!</div>
                <div>문백학습으로 다의어를 알아보고 도감을 채워보세요!</div>
              </div>
            </div>
          </div>
        </div>
        {/* 카드 */}
        <div className="flex-col justify-center items-center h-[75%] mx-auto w-[85%] sm:w-[60%] lg:w-[50%]">
          {/* 상단 */}
          <div className="flex justify-between items-center h-[43%]">
            <div className="flex justify-center items-center h-full w-full rounded-[0.9rem] bg-[#F0ECE9] mr-4 sm:mr-10">1</div>
            <div className="flex justify-center items-center h-full w-full rounded-[0.9rem] bg-[#F0ECE9]">2</div>
          </div>
          <div className="h-[4%]"></div>
          {/* 하단 */}
          <div className="h-[43%] w-full rounded-[0.9rem] bg-[#F0ECE9]"></div>
        </div>
      </div>
    </div>
  );
}

// 데스크탑 & 태블릿
function IntroSection3V1():JSX.Element {
  return(
    <div className="hidden sm:flex h-[30rem] justify-center items-center">
      <div className="max-w-screen-xl w-full h-[90%] ">
        {/* 텍스트 */}
        <div className="flex justify-center items-end h-[25%] w-full pb-6 mx-auto sm:w-[70%] md:w-[70%] lg:w-[70%]">
          <div>
            <div className="flex justify-center items-center mb-5 sm:text-[1.2rem] md:text-[1.4rem] lg:text-[1.5rem]">
              <span className="font-bold ">훈민정음</span>
              <span className="font-bold text-[#A87E6E]">
                으로 한글을 배워야 하는 이유
              </span>
            </div>
          </div>
        </div>
        {/*데스크탑 & 태블릿 카드 */}
        <div className="flex-col justify-center items-center h-[75%] mx-auto max-w-screen-xl w-[90%] lg:w-[77%] ">
          <div className="flex justify-center items-center h-full">
            <div className="flex justify-center items-center h-full w-full rounded-[0.9rem] bg-[#F0ECE9] sm:mr-5 lg:mr-10">1</div>
            <div className="flex justify-center items-center h-full w-full rounded-[0.9rem] bg-[#F0ECE9] sm:mr-5 lg:mr-10">2</div>
            <div className="flex justify-center items-center h-full w-full rounded-[0.9rem] bg-[#F0ECE9]">2</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 모바일
function IntroSection3V2():JSX.Element {
  return(
    <div className="flex sm:hidden h-[50rem] justify-center items-center">
      <div className="w-[90%] h-[90%] ">
        {/* 텍스트 */}
        <div className="flex justify-center items-center h-[10%] w-full mx-auto">
          <div className="flex justify-center items-center text-[0.9rem] mb-5">
            <span className="font-bold ">훈민정음</span>
            <span className="font-bold text-[#A87E6E]">
              으로 한글을 배워야 하는 이유
            </span>
          </div>
        </div>
        {/*데스크탑 & 태블릿 카드 */}
        <div className="flex flex-col justify-center items-center w-[95%] h-[90%] mx-auto">
          <div className="flex justify-center items-center h-full w-full rounded-[0.9rem] bg-[#F0ECE9] mb-4">1</div>
          <div className="flex justify-center items-center h-full w-full rounded-[0.9rem] bg-[#F0ECE9] mb-4">2</div>
          <div className="flex justify-center items-center h-full w-full rounded-[0.9rem] bg-[#F0ECE9]">2</div>
        </div>
      </div>
    </div>
  );
}

// 서비스 분야
function IntroSection4(): JSX.Element {
  return <div className="flex h-[25rem] justify-center items-center"></div>;
}
