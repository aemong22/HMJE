import React, { useState } from "react";
import Footer from "../Common/Footer";
import Navbar from "../Common/Navbar";

const Join = () => {
  const [Name, setName] = useState();
  const [Password, setPassword] = useState();
  const [PasswordCheck, setPasswordCheck] = useState();
  const [Nickname, setNickname] = useState();
  const [Phonenum, setPhonenum] = useState();
  const [Authnum, setAuthnum] = useState();

  const ChangeName = (event: any) => {
    console.log(event.target.value);
    setName(event.target.value);
  };

  const ChangePassword = (event: any) => {
    console.log(event.target.value);
    setPassword(event.target.value);
  };
  const ChangePasswordCheck = (event: any) => {
    console.log(event.target.value);
    setPasswordCheck(event.target.value);
  };
  const ChangeNickname = (event: any) => {
    console.log(event.target.value);
    setNickname(event.target.value);
  };
  const ChangePhonenum = (event: any) => {
    console.log(event.target.value);
    setPhonenum(event.target.value);
  };
  const ChangeAuthnum = (event: any) => {
    console.log(event.target.value);
    setAuthnum(event.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center">
        <div className="h-[10rem]">
          <div>홍민정음</div>
          <div>가입하기</div>
        </div>
        <div className="h-[30rem]">
          <div>또이름</div>
          <div className="flex flex-row">
            <input
              type="text"
              className="border-2 border-black"
              onChange={ChangeName}
            />
            <div>중복확인</div>
          </div>
          <div>별명</div>
          <div className="flex flex-row">
            <input
              type="text"
              className="border-2 border-black"
              onChange={ChangeNickname}
            />
            <div>중복확인</div>
          </div>
          <div>비밀번호</div>
          <input
            type="text"
            className="border-2 border-black"
            onChange={ChangePassword}
          />
          <div>비밀번호 확인</div>
          <input
            type="text"
            className="border-2 border-black"
            onChange={ChangePasswordCheck}
          />
          <div>전화번호</div>
          <div className="flex flex-row">
            <input
              type="text"
              className="border-2 border-black"
              onChange={ChangePhonenum}
            />
            <div>중복확인</div>
          </div>
          <div>인증번호</div>
          <div className="flex flex-row">
            <div>인증번호 요청</div>
            <input
              type="text"
              className="border-2 border-black"
              onChange={ChangeAuthnum}
            />
            <div>확인</div>
          </div>
          <div className="border-2 border-black">가입하기</div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Join;
