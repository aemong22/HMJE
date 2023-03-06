import Footer from "../Common/Footer"
import Navbar from "../Common/Navbar"
import styled from './Intro.module.css'
function Intro():JSX.Element {
  return (
    <div>
      <Navbar/>
      <IntroSection1/>
      <IntroSection2/>
      <IntroSection3V1/>
      <IntroSection3V2/>
      <IntroSection4/>
      <Footer/>
    </div>
  )
}
export default Intro


function IntroSection1():JSX.Element {
  return (
    <div id="introSection1" className="flex justify-between items-center bg-[#D6B17A] text-white h-[30rem] px-4 sm:px-2">
      {/* 왼쪽 */}
      <div className="flex justify-between sm:justify-center items-center w-1-2 sm:w-1/2 md:w-2/5 ">
        <div>
          <div className="text-[1rem] sm:text-[1rem] md:text-[1.5rem] font-semibold pl-2 mb-1">
            즐거운 단어 학습
          </div>
          <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2">
            홍민정음
          </div>
          <div className="text-[0.7rem] sm:text-[1rem] md:text-[1.1rem] font-medium mb-2 pl-2">
            문해력실력을 향상시킬 수 있는 곳
          </div>
          <div className="flex justify-start mb-3 ">
            <div className="w-[5.5rem] sm:w-[7rem] md:w-[8rem] h-[2.5rem] flex justify-center items-center border-2 rounded-xl text-base sm:text-lg md:text-xl mr-2 cursor-pointer">입장하기</div>
            <div className="w-[5.5rem] sm:w-[7rem] md:w-[8rem] h-[2.5rem] flex justify-center items-center border-2 rounded-xl text-base sm:text-lg md:text-xl cursor-pointer">가입하기</div>
          </div>
        </div>
      </div>
      {/* 여백 */}
      <div className="hidden sm:text-red-500 lg:block xl:w-2/5 "></div>
      {/* 오른쪽 */}
      <div className="flex justify-between sm:justify-center items-center w-1/2 sm:w-1/2 lg:w-2/5 xl:w-2/5 ">
        <img className="h-[18rem] sm:h-[21rem] md:h-[23rem] xl:h-96" src="/Assets/Intro/sejong.png" alt="sejong" />
      </div>
    </div>
  )
}


function IntroSection2():JSX.Element {
  return(
    <div className="h-[45rem] flex justify-center items-center">
      <div className="w-full sm:w-[60%] lg:w-[45%] xl:w-[35%] h-[90%] ">
        {/* 텍스트 */}
        <div className="flex justify-center items-end h-[30%] w-full pb-6 mx-auto ">
          <div>
            <div className="flex justify-center items-center mb-5 text-[1.1rem] sm:text-[1.2rem] md:text-[1.4rem] lg:text-[1.5rem]">
              {/* main text */}
              <span className="font-bold ">신나고 즐거운</span>&nbsp;
              <span className="font-bold text-[#A87E6E]">단어 학습</span>
            </div>
            <div className="flex justify-center items-center">
              {/* sub text */}
              <div className="text-center text-[#9B9B9B] text-[0.9rem] sm:text-[0.8rem] md:text-[0.9rem] lg:text-[1rem]">
                <div>단어학습으로 정확한 뜻을 배워보세요!</div>
                <div>문백학습으로 다의어를 알아보고 도감을 채워보세요!</div>
              </div>
            </div>
          </div>
        </div>
        {/* 카드 */}
        <div className="flex-col justify-center items-center h-[70%] mx-auto w-full ">
          {/* 상단 */}
          <div className="flex justify-between items-center h-[48%]">
            <div className="flex justify-center items-center h-full w-full rounded-[0.9rem] bg-[#F0ECE9] mr-4 sm:mr-10">
              <div>
                1
              </div>
            </div>
            <div className="flex justify-center items-center h-full w-full rounded-[0.9rem] bg-[#F0ECE9]">2</div>
          </div>
          <div className="h-[4%]"></div>
          {/* 하단 */}
          <div className="h-[48%] w-full rounded-[0.9rem] bg-[#F0ECE9]">

          </div>
        </div>
      </div>
    </div>
  )
}

// 데스크탑 & 태블릿
function IntroSection3V1():JSX.Element {
  return(
    <div className="hidden sm:flex h-[30rem] justify-center items-center">
      <div className="w-[95%] h-[90%] ">
        {/* 텍스트 */}
        <div className="flex justify-center items-end h-[35%] w-full pb-6 mx-auto sm:w-[70%] md:w-[70%] lg:w-[70%]">
          <div>
            <div className="flex justify-center items-center mb-5 text-[1.1rem] sm:text-[1.2rem] md:text-[1.4rem] lg:text-[1.5rem]">
              <span className="font-bold ">훈민정음</span>
              <span className="font-bold text-[#A87E6E]">으로 한글을 배워야 하는 이유</span>
            </div>
          </div>
        </div>
        {/*데스크탑 & 태블릿 카드 */}
        <div className="flex-col justify-center items-center h-[65%] mx-auto w-full md:w-[90%] lg:w-[80%] xl:w-[60%] ">
          <div className="flex justify-center items-center h-full">
            <div className="flex justify-center items-center h-full w-full rounded-[0.9rem] bg-[#F0ECE9] mr-2 sm:mr-3 md:mr-5 lg:mr-10">
              <div>
                1
              </div>
            </div>
            <div className="flex justify-center items-center h-full w-full rounded-[0.9rem] bg-[#F0ECE9] mr-2 sm:mr-3 md:mr-5 lg:mr-10">2</div>
            <div className="flex justify-center items-center h-full w-full rounded-[0.9rem] bg-[#F0ECE9]">2</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// 모바일
function IntroSection3V2():JSX.Element {
  return(
    <div className="flex sm:hidden h-[55rem] justify-center items-center">
      <div className="w-[90%] h-[90%] ">
        {/* 텍스트 */}
        <div className="flex justify-center items-center h-[10%] w-full mx-auto">
          <div className="flex justify-center items-center text-[1.1rem] mb-5">
            <span className="font-bold ">훈민정음</span>
            <span className="font-bold text-[#A87E6E]">으로 한글을 배워야 하는 이유</span>
          </div>
        </div>
        {/*데스크탑 & 태블릿 카드 */}
        <div className="flex flex-col justify-center items-center h-[90%] mx-auto w-full ">
          <div className="flex justify-center items-center h-full w-full rounded-[0.9rem] bg-[#F0ECE9] mb-4">1</div>
          <div className="flex justify-center items-center h-full w-full rounded-[0.9rem] bg-[#F0ECE9] mb-4">2</div>
          <div className="flex justify-center items-center h-full w-full rounded-[0.9rem] bg-[#F0ECE9]">2</div>
        </div>
      </div>
    </div>
  )
}

// 서비스 분야
function IntroSection4():JSX.Element {
  return(
    <div className="flex h-[25rem] justify-center items-center">
    </div>
  )
}
