import React from "react";
import Footer from "../Common/Footer";
import IntroNavbar from "../Intro/IntroNavbar";

const ForgetId = () => {
  return (
    <div className="flex flex-col justify-between h-[100vh] ">
      <IntroNavbar />
      <div className="container max-w-screen-xl w-full mx-auto flex flex-col ">
        <div className="flex flex-col mx-5 sm:mx-5 md:mx-7 lg:mx-[20%]">
          <div className="my-4 font-extrabold text-[#A87E6E] text-4xl  sm:text-4xl md:text-4xl lg:text-6xl">
            홍민정음
          </div>
          <div className="text-[#BD9789] font-extrabold text-xl sm:text-xl md:text-2xl lg:text-4xl ">
            계정찾기
          </div>
        </div>
        <div className=" flex flex-col max-w-[100%] justify-center items-center ">
          <div>이름</div>
          <input type="text" className="" placeholder="이름 입력" />
          <div>전화번호</div>
          <input type="text" placeholder="전화번호 입력" />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ForgetId;
