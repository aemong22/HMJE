import React, { useState } from "react";
import Footer from "../Common/Footer";
import Navbar from "../Common/Navbar";

const Join = () => {
  const [Name, setName] = useState();
  const [Password, setPassword] = useState();
  const [PasswordCheck, setPasswordCheck] = useState();
  const [Nickname, setNickname] = useState();
  const [Phonenum, setPhonenum] = useState<string>();
  const [Authnum, setAuthnum] = useState<string>();

  function ChangeName(event: any): void {
    console.log(event.target.value);
    setName(event.target.value);
  }
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
  const ChangeAuthnum = (event: React.ChangeEvent<HTMLInputElement>): void => {
    // console.log(event.target.value);
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
    // if (Authnum == 1) {
    // } else {
    // }
    // 인증번호확인axios
  };

  const GoJoin = (): void => {
    // 회원가입axios
  };

  return (
    <>
      <Navbar />
      <div id="container" className="flex flex-col w-screen">
        <div className="flex flex-col px-10">
          <div className="text-3xl font-extrabold text-[#A87E6E] sm:text-3xl md:text-4xl lg:text-6xl">
            홍민정음
          </div>
          <div className="text-[#BD9789] font-extrabold text-xl sm:text-xl md:text-2xl lg:text-4xl ">
            가입하기
          </div>
        </div>
        <div className=" flex flex-col justify-center max-w-[700px] mx-auto pt-4">
          <div className="h-[4rem]">
            <div className="text-[#A87C6E] font-extrabold text-base">
              또이름
            </div>
            <div className="flex flex-row ">
              <input
                type="text"
                className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-[#A87E6E] rounded-lg font-medium placeholder:font-normal"
                onChange={ChangeName}
              />
              <div className="flex px-3 py-2 md:px-4 md:py-3 border-2 bg-[#BF9F91] text-[#FFFFFF]  rounded-lg font-medium">
                중복확인
              </div>
            </div>
          </div>
          <div className="h-[4rem]">
            <div className="text-[#A87C6E] font-extrabold text-base">별명</div>
            <div className="flex flex-row ">
              <input
                type="text"
                className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-[#A87E6E] rounded-lg font-medium placeholder:font-normal"
                onChange={ChangeName}
              />
              <div className="flex px-3 py-2 md:px-4 md:py-3 border-2 bg-[#BF9F91] text-[#FFFFFF]  rounded-lg font-medium">
                중복확인
              </div>
            </div>
          </div>
          <div className="h-[4rem]">
            <div className="text-[#A87C6E] font-extrabold text-base">
              비밀번호
            </div>
            <div className="flex flex-row ">
              <input
                type="text"
                className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-[#A87E6E] rounded-lg font-medium placeholder:font-normal"
                onChange={ChangeName}
              />
            </div>
          </div>
          <div className="h-[4rem]">
            <div className="text-[#A87C6E] font-extrabold text-base">
              비밀번호확인
            </div>
            <div className="flex flex-row ">
              <input
                type="text"
                className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-[#A87E6E] rounded-lg font-medium placeholder:font-normal"
                onChange={ChangeName}
              />
            </div>
          </div>
          <div className="h-[4rem]">
            <div className="text-[#A87C6E] font-extrabold text-base">
              전화번호
            </div>
            <div className="flex flex-row ">
              <input
                type="text"
                className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-[#A87E6E] rounded-lg font-medium placeholder:font-normal"
                onChange={ChangeName}
              />
              <div className="flex px-3 py-2 sm:px-3 sm:py-2 md:px-4 md:py-3  border-2 bg-[#BF9F91] text-[#FFFFFF]  rounded-lg font-medium">
                중복확인
              </div>
            </div>
          </div>
          <div className="h-[4rem]">
            <div className="text-[#A87C6E] font-extrabold text-base">
              인증번호
            </div>
            <div className="flex flex-row ">
              <input
                type="text"
                className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-[#A87E6E] rounded-lg font-medium placeholder:font-normal"
                onChange={ChangeName}
              />
              <div className="flex px-3 py-2 md:px-4 md:py-3 border-2 bg-[#BF9F91] text-[#FFFFFF]  rounded-lg font-medium">
                확인
              </div>
            </div>
          </div>
          <div className="pt-3">
            <div className="flex justify-center items-center h-8 rounded-lg font-extrabold bg-[#F0ECE9] text-[#A87E6E]">
              <div>가입하기</div>
            </div>
          </div>
        </div>
        <div className="h-[2rem]"></div>
      </div>

      <Footer />
    </>
  );
};

{
  /* <div className="flex flex-col items-center justify-center">
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
</div>; */
}
export default Join;
