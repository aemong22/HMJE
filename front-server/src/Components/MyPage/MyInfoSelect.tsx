import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Common/Footer";
import Navbar from "../Common/Navbar";

const MyInfoSelect = (): JSX.Element => {
  return (
    <div className="flex flex-col justify-between h-[120vh] lg:h-[100vh]">
      <Navbar />
      <Select />
      <Footer />
    </div>
  );
};
const normalbutton =
  "border-2 rounded-xl border-[#A87E6E] hover:text-white font-extrabold text-[#A87E6E] text-[1.5rem] my-3 py-2 px-[3rem] md:px-[5rem] lg:px-[7rem] hover:bg-[#A87E6E]";
const secessionbutton =
  "border-2 rounded-xl border-red-400 hover:text-white font-extrabold text-[#F15850] text-[1.5rem] my-3 py-2 px-[3rem] md:px-[5rem] lg:px-[7rem] hover:bg-[#F15850] hover:border-[#A87E6E]";
const secessionbutton2 =
  "border-2 rounded-xl border-red-400  bg-red-400 font-extrabold text-[#fffff] lg:text-[1.5rem] md:text-[1.2rem] m-2 py-2 px-[3rem] md:px-[5rem] lg:px-[7rem]";
const Select = (): JSX.Element => {
  const navigate = useNavigate();
  const Nav = (e: any) => {
    if (e.target.id === "password") {
      navigate("/changepassword");
    } else if (e.target.id === "nickname") {
      navigate("/changenickname");
    } else if (e.target.id === "phonenum") {
      navigate("/changephonenum");
    } else if (e.target.id === "secession") {
      navigate("/checksecession");
    } else if (e.target.id === "back") {
      navigate("/mypage");
    }
  };
  return (
    // {/* border-2 lg:px-[10rem] md:px-[5rem] px-10 rounded-3xl */}
    <div className="flex flex-col max-w-screen-xl mx-auto ">
      <div className="font-extrabold text-[#A87E6E] text-4xl  sm:text-4xl md:text-4xl lg:text-6xl py-[1rem] text-center">
        정보수정
      </div>
      <button id="password" className={normalbutton} onClick={Nav}>
        비밀번호 수정
      </button>
      <button id="nickname" className={normalbutton} onClick={Nav}>
        별명 수정
      </button>
      <button id="phonenum" className={normalbutton} onClick={Nav}>
        전화번호 수정
      </button>
      <button id="secession" className={secessionbutton} onClick={Nav}>
        회원탈퇴
      </button>
      <button id="back" className={normalbutton} onClick={Nav}>
        나가기
      </button>
    </div>
  );
};

export default MyInfoSelect;
