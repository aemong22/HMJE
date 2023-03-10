import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Common/Footer";
import Navbar from "../Common/Navbar";
import API from "../Common/Api";
import axios from "axios";

const Join = () => {
  const navigate = useNavigate();
  const [Name, setName] = useState<string>("");
  const [Password, setPassword] = useState<string>("");
  const [PasswordCheck, setPasswordCheck] = useState<string>();
  const [Nickname, setNickname] = useState<string>("");
  const [Phonenum, setPhonenum] = useState<string>("");
  const [Authnum, setAuthnum] = useState<number>();  

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
    const temp: number = Number(event.target.value);
    setAuthnum(temp);
  };
  // 중복확인
  const CheckDuplication = (check: string): void => {
    if (check === "Name") {
      // 이름 중복 axios
      console.log("아이디확인", Name);
      // console.log("비었나", Name === "");

      API.post(`/user/check/username`, {
        isAdmin: false,
        isSecession: false,
        nickname: Nickname,
        password: Password,
        phoneNumber: Phonenum,
        username: Name,
      }).then((r) => {
        console.log("아이디 중복 결과", r.data);
      });
    } else if (check === "Nickname") {
      console.log("닉네임확인", Nickname);

      API.post(`/user/check/nickname`, {
        isAdmin: false,
        isSecession: false,
        nickname: Nickname,
        password: Password,
        phoneNumber: Phonenum,
        username: Name,
      }).then((r) => {
        console.log("닉네임 중복 결과", r.data);
      });
    }
  };

  // 인증번호 전송
  const SendAuthnum = (phonenum: string): void => {
    console.log("폰번호확인", Phonenum);
    //
    API.post(`/sms/send/newbie`, {
      isAdmin: false,
      isSecession: false,
      nickname: Nickname,
      password: Password,
      phoneNumber: Phonenum,
      username: Name,
      role: "newbie",
    }).then((r) => {
      console.log("전화번호 중복 결과", r.data);
    });
  };

  const CheckAuthnum = (authnum: number | undefined): void => {
    // if (Authnum == 1) {
    // } else {
    // }
    // 인증번호확인axios
  };

  const GoJoin = (): void => {
    // 회원가입axios
    console.log("닉네임", Nickname);
    console.log("패스워드", Password);
    console.log("전화번호", Phonenum);
    console.log("username", Name);

    API.post(`/user/join`, {
      isAdmin: false,
      isSecession: false,
      nickname: Nickname,
      password: Password,
      phoneNumber: Phonenum,
      username: Name,
    }).then((r) => {
      console.log(r.data);
      navigate("/login");
    });
  };

  return (
    <>
      <div className="flex flex-col justify-between h-[100vh]">
        <Navbar />
        {/* 상 */}
        <div className="w-full">
          <div className="flex flex-col mx-5 sm:mx-5 md:mx-7 lg:mx-[20%]">
            <div className="my-4 font-extrabold text-[#A87E6E] text-4xl  sm:text-4xl md:text-4xl lg:text-6xl">
              홍민정음
            </div>
            <div className="text-[#BD9789] font-extrabold text-xl sm:text-xl md:text-2xl lg:text-4xl ">
              가입하기
            </div>
          </div>
          {/* 중 */}
          <div className=" flex flex-col justify-center ">
            {/* 왼 */}
            {/* <div></div> */}
            {/* 가운데 */}
            <div className="mx-5 sm:mx-5 md:mx-[20%] lg:mx-[33%] justify-center">
              <div className="my-4">
                <div className="text-[#A87C6E] font-extrabold text-base pb-2">
                  계정
                </div>
                <div className="flex flex-row justify-between w-full">
                  <input
                    type="text"
                    className="min-w-[70%] px-3 py-1 md:px-4 md:py-2 border-2 border-[#A87E6E] rounded-lg font-medium placeholder:font-normal"
                    onChange={ChangeName}
                  />

                  <div
                    className="px-3 py-1 md:px-4 md:py-2 border-2 bg-[#BF9F91] text-[#FFFFFF]  rounded-lg font-medium"
                    onClick={() => {
                      CheckDuplication("Name");
                    }}
                  >
                    중복확인
                  </div>
                </div>
              </div>
              <div className="my-4">
                <div className="flex flex-row items-baseline">
                  <div className="text-[#A87C6E] font-extrabold text-base pb-2">
                    별명
                  </div>
                  <div className="text-[#868686] pl-2 lg:pl-4 font-extrabold text-[1px] md:text-xs">
                    6글자 이내 한글만 사용하실 수 있습니다.
                  </div>
                </div>
                <div className="flex flex-row justify-between ">
                  <input
                    type="text"
                    className="min-w-[70%] px-3 py-1 md:px-4 md:py-2 border-2 border-[#A87E6E] rounded-lg font-medium placeholder:font-normal"
                    onChange={ChangeNickname}
                  />
                  <div
                    className="px-3 py-1 md:px-4 md:py-2 border-2 bg-[#BF9F91] text-[#FFFFFF]  rounded-lg font-medium"
                    onClick={() => {
                      CheckDuplication("Nickname");
                    }}
                  >
                    중복확인
                  </div>
                </div>
              </div>
              <div className="my-4">
                <div className="text-[#A87C6E] font-extrabold text-base">
                  비밀번호
                </div>
                <div className="flex flex-row ">
                  <input
                    type="text"
                    className="min-w-[100%] px-3 py-1 md:px-4 md:py-2 border-2 border-[#A87E6E] rounded-lg font-medium placeholder:font-normal"
                    onChange={ChangePassword}
                  />
                </div>
              </div>
              <div className="my-4">
                <div className="text-[#A87C6E] font-extrabold text-base">
                  비밀번호확인
                </div>
                <div className="flex flex-row ">
                  <input
                    type="text"
                    className="min-w-[100%] px-3 py-1 md:px-4 md:py-2 border-2 border-[#A87E6E] rounded-lg font-medium placeholder:font-normal"
                    onChange={ChangeName}
                  />
                </div>
              </div>
              <div className="my-4">
                <div className="text-[#A87C6E] font-extrabold text-base">
                  전화번호
                </div>
                <div className="flex flex-row justify-between">
                  <input
                    type="text"
                    className="min-w-[70%] px-3 py-1 md:px-4 md:py-2 border-2 border-[#A87E6E] rounded-lg font-medium placeholder:font-normal"
                    onChange={ChangePhonenum}
                  />
                  <div
                    className="px-3 py-1 md:px-4 md:py-2 border-2 bg-[#BF9F91] text-[#FFFFFF]  rounded-lg font-medium"
                    onClick={() => {
                      SendAuthnum(Phonenum);
                    }}
                  >
                    인증하기
                  </div>
                </div>
              </div>
              <div className="my-2">
                <div className="text-[#A87C6E] font-extrabold text-base">
                  인증번호
                </div>
                <div className="flex flex-row justify-between ">
                  <input
                    type="text"
                    className="min-w-[70%] px-3 py-1 md:px-4 md:py-2 border-2 border-[#A87E6E] rounded-lg font-medium placeholder:font-normal"
                    onChange={ChangeAuthnum}
                  />
                  <div
                    className="px-3 py-1 md:px-4 md:py-2 border-2 bg-[#BF9F91] text-[#FFFFFF]  rounded-lg font-medium"
                    onClick={() => {
                      CheckAuthnum(Authnum);
                    }}
                  >
                    &nbsp; &nbsp;확인&nbsp; &nbsp;
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div
                  className="pt-3 cursor-pointer"
                  onClick={() => {
                    GoJoin();
                  }}
                >
                  <div className="flex justify-center items-center h-[3.5rem] rounded-lg font-extrabold bg-[#F0ECE9] text-[#A87E6E]">
                    <div>가입하기</div>
                  </div>
                </div>
              </div>
            </div>
            {/* 우 */}
            {/* <div></div> */}
          </div>
          {/* 하 */}
          <div className="h-[2rem]"></div>
        </div>
        <Footer />
      </div>
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
