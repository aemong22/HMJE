import React, { useState } from "react";
import Footer from "../Common/Footer";
import Navbar from "../Common/Navbar";

const Join = (): JSX.Element => {
  const [Name, setName] = useState<string>();
  const [Password, setPassword] = useState<string>();
  const [PasswordCheck, setPasswordCheck] = useState<string>();
  const [Nickname, setNickname] = useState<string>();
  const [Phonenum, setPhonenum] = useState<number>();
  const [Authnum, setAuthnum] = useState<number>();

  const TextSize: number = 1; //가입하기
  const HongSize: number = (TextSize / 32) * 50;
  const TitleSize: number = (TextSize / 32) * 25;
  const AcceptSize: number = (TextSize / 32) * 20;
  const Explanation: number = (TextSize / 32) * 15;

  const ChangeName = (event: any): void => {
    console.log(event.target.value);
    setName(event.target.value);
  };
  const ChangePassword = (event: any): void => {
    console.log(event.target.value);
    setPassword(event.target.value);
  };
  const ChangePasswordCheck = (event: any): void => {
    console.log(event.target.value);
    setPasswordCheck(event.target.value);
  };
  const ChangeNickname = (event: any): void => {
    console.log(event.target.value);
    setNickname(event.target.value);
  };
  const ChangePhonenum = (event: any): void => {
    console.log(event.target.value);
    setPhonenum(event.target.value);
  };
  const ChangeAuthnum = (event: any): void => {
    console.log(event.target.value);
    setAuthnum(event.target.value);
  };

  const CheckDuplication = (check: string): void => {
    if (check === "Name") {
      // 이름 중복 axios
    } else if (check === "Nickname") {
      // 닉네임 중복 axios
    } else if (check === "Phonenum") {
      //  폰 중복 axios
    }
  };

  const CheckAuthnum = (): void => {
    if (Authnum === 1) {
    }
    // 인증번호확인axios
  };

  const GoJoin = (): void => {
    // 회원가입axios
  };

  return (
    <>
      <Navbar />
      <div
        id="container"
        className="flex flex-col items-center justify-center h-[30rem] sm:h-[30rem] md:h-[40rem] lg:h-[50rem]"
      >
        <div id="head" className="h-[10rem]">
          <div
            className={`font-extrabold text-[#A87E6E] text-[${HongSize}rem] sm:text-[1.5rem] md:text-[2.4rem] lg:text-[3rem]`}
          >
            홍민정음
          </div>
          <div
            className={`font-extrabold text-[#BD9789] text-[${TextSize}rem] sm:text-[1rem] md:text-[1.6rem] lg:text-[2rem]`}
          >
            가입하기
          </div>
        </div>
        <div id="body" className="h-[30rem]">
          <div
            className={`font-extrabold text-[#A87E6E] text-[${TitleSize}rem] sm:text-[1rem] md:text-[1.6rem] lg:text-[2rem]`}
          >
            또이름
          </div>
          <div className="flex flex-row">
            <input
              type="text"
              className="border-2 border-[#A87E6E]"
              onChange={ChangeName}
            />
            <div
              className={`text-[${AcceptSize}rem] sm:text-[0.8rem] md:text-[1.28rem] lg:text-[1.6rem] border-2 border-black rounded-[15px] cursor-pointer`}
              onClick={() => {
                CheckDuplication("Name");
              }}
            >
              중복확인
            </div>
          </div>
          <div className="flex flex-row">
            <div
              className={`font-extrabold text-[#A87E6E] text-[${TitleSize}rem] sm:text-[1rem] md:text-[1.6rem] lg:text-[2rem]`}
            >
              별명
            </div>
            <div className={`text-[#868686] text-[${Explanation}rem]`}>
              6자 이내 한글만 사용하실 수 있습니다.
            </div>
          </div>
          <div className="flex flex-row">
            <input
              type="text"
              className="border-2 border-[#A87E6E]"
              onChange={ChangeNickname}
            />
            <div
              className={`text-[${AcceptSize}rem] sm:text-[0.8rem] md:text-[1.28rem] lg:text-[1.6rem] border-2 border-black rounded-[15px] cursor-pointer`}
              onClick={() => {
                CheckDuplication("Nickname");
              }}
            >
              중복확인
            </div>
          </div>
          <div
            className={`font-extrabold text-[#A87E6E] text-[${TitleSize}rem] sm:text-[1rem] md:text-[1.6rem] lg:text-[2rem]`}
          >
            비밀번호
          </div>
          <input
            type="text"
            className="border-2 border-[#A87E6E]"
            onChange={ChangePassword}
          />
          <div
            className={`font-extrabold text-[#A87E6E] text-[${TitleSize}rem] sm:text-[1rem] md:text-[1.6rem] lg:text-[2rem]`}
          >
            비밀번호 확인
          </div>
          <input
            type="text"
            className="border-2 border-[#A87E6E]"
            onChange={ChangePasswordCheck}
          />
          <div
            className={`font-extrabold text-[#A87E6E] text-[${TitleSize}rem] sm:text-[1rem] md:text-[1.6rem] lg:text-[2rem]`}
          >
            전화번호
          </div>
          <div className="flex flex-row">
            <input
              type="text"
              className="border-2 border-[#A87E6E]"
              onChange={ChangePhonenum}
            />
            <div
              className={`text-[${AcceptSize}rem] sm:text-[0.8rem] md:text-[1.28rem] lg:text-[1.6rem] border-2 border-black rounded-[15px] cursor-pointer`}
              onClick={() => {
                CheckDuplication("Phonenum");
              }}
            >
              중복확인
            </div>
          </div>
          <div className="flex flex-row">
            <div
              className={`text-[${AcceptSize}rem] sm:text-[0.8rem] md:text-[1.28rem] lg:text-[1.6rem] border-2 border-black rounded-[15px]`}
            >
              인증번호 요청
            </div>
            <input
              type="text"
              className="border-2 border-[#A87E6E]"
              onChange={ChangeAuthnum}
            />
            <div
              className={`text-[${AcceptSize}rem] sm:text-[0.8rem] md:text-[1.28rem] lg:text-[1.6rem] border-2 border-black rounded-[15px] cursor-pointer`}
              onClick={CheckAuthnum}
            >
              확인
            </div>
          </div>
          <div
            className={`border-2 border-[#A87E6E] font-extrabold text-[#BD9789] text-[${TextSize}rem] sm:text-[1rem] md:text-[1.6rem] lg:text-[2rem] cursor-pointer`}
            onClick={GoJoin}
          >
            가입하기
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Join;
