import React, { useState } from "react";
import API from "../Common/Api";
import Footer from "../Common/Footer";
import IntroNavbar from "../Intro/IntroNavbar";

const ForgetId = () => {
  const [Name, setName] = useState<string>("");
  const [Phonenum, setPhonenum] = useState<string>("");
  const [Authnum, setAuthnum] = useState<string>();

  const [AmIHidden, setAmIHidden] = useState("hidden");

  // 유효성
  const [IsAuthnum, setIsAuthnum] = useState<boolean>(false);

  const ChangePhonenum = (event: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(event.target.value);
    setPhonenum(event.target.value);
  };
  const ChangeAuthnum = (event: React.ChangeEvent<HTMLInputElement>): void => {
    // console.log(event.target.value);
    const temp: string = event.target.value;
    setAuthnum(temp);
  };
  // 숫자 체크
  function checkNum(str: string) {
    // const regExp = /[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]/g;
    const regExp = /[^0-9]/g;

    if (regExp.test(str)) {
      return true;
    } else {
      return false;
    }
  }

  const CheckAuthnum = (
    authnum: string | undefined,
    phonenum: string,
  ): void => {
    // API.post(`/user/modify`, {
    //   modifyNumber: authnum,
    //   phoneNumber: phonenum,
    // }).then((r) => {
    //   console.log(r.data);
    // });
    // axios({
    //   method: "post",
    //   url: "https://hmje.net/api/sms/modify",
    //   data: {
    //     modifyNumber: Authnum,
    //     phoneNumber: Phonenum,
    //   },
    // }).then((r) => {
    //   console.log("인증번호 결과", r.data);
    //   if (r.data.data === true) {
    //     // 인증성공!
    //     setIsAuthnum(true);
    //   } else {
    //     // 인증실패!
    //     setIsAuthnum(false);
    //   }
    // });
  };

  // 휴대폰번호가 유효한지 체크
  const PhoneCheck = (): any => {
    // SendAuthnum(Phonenum);
    if (Phonenum.length === 11) {
      if (checkNum(Phonenum) === false) {
        // 인증번호 보여주고

        console.log("폰번호확인", Phonenum);
        // API.post(`/sms/send/newbie`, {
        //   to: Phonenum,
        // }).then((r) => {
        //   console.log("전화번호 중복 결과", r.data);
        //   alert("전송하였습니다!");
        // });

        console.log("인증message api 요청");

        setAmIHidden("");
        setAuthnum("");
        setIsAuthnum(false);
        // 인증번호 닫고
        setTimeout(
          () => {
            setAmIHidden("hidden");
          },
          180000,
          // 1000 = 1초
          // 180000 = 3분
          // timeout : 얼만큼 지나서 위 함수를 실행할 것인지(ms)
        );
      } else {
        // 전화번호 border 변경
        alert("번호가 이상합니다");
      }
    } else {
      // 전화번호 border변경
      alert("번호가 이상합니다");
    }
  };
  return (
    <div className="flex flex-col justify-between h-[100vh] ">
      <IntroNavbar />
      <div className="container max-w-screen-lg w-full mx-auto flex flex-col ">
        <div className="flex flex-col mx-5 sm:mx-5 sm:[10%] md:mx-[25%] lg:mx-[10%]">
          <div className="my-4 font-extrabold text-[#A87E6E] text-4xl  sm:text-4xl md:text-4xl lg:text-6xl">
            홍민정음
          </div>
          <div className="text-[#BD9789] font-extrabold text-xl sm:text-xl md:text-2xl lg:text-4xl ">
            계정찾기
          </div>
        </div>
        <div className=" flex flex-col max-w-[100%] justify-center my-[2rem] mx-6 md:mx-[25%] lg:mx-[30%]">
          <div className="w-full">
            <div className={`my-2 `}>
              <div className="text-[#A87C6E] font-extrabold text-base">
                이름
              </div>
              <input
                type="text"
                className="min-w-[100%] px-3 py-1 md:px-4 md:py-2 border-2 focus:outline-none focus:border-[#d2860c] border-[#A87E6E] rounded-lg font-medium placeholder:font-normal"
                placeholder="이름 입력"
              />
            </div>
            <div className={`my-2 `}>
              <div className="text-[#A87C6E] font-extrabold text-base">
                전화번호
              </div>
              <div className="flex flex-row justify-between">
                <input
                  type="text"
                  className="min-w-[70%] px-3 py-1 md:px-4 md:py-2 border-2 focus:outline-none focus:border-[#d2860c] border-[#A87E6E] rounded-lg font-medium placeholder:font-normal"
                  onChange={ChangePhonenum}
                />
                <div
                  className="px-3 py-1 md:px-4 md:py-2 border-2 focus:outline-none focus:border-[#d2860c] bg-[#BF9F91] text-[#FFFFFF]  rounded-lg font-medium"
                  onClick={PhoneCheck}
                >
                  인증하기
                </div>
              </div>
            </div>
            <div className={`my-2 ${AmIHidden}`}>
              <div className="text-[#A87C6E] font-extrabold text-base">
                인증번호
              </div>
              <div className="flex flex-row justify-between ">
                <input
                  type="text"
                  className="min-w-[70%] px-3 py-1 md:px-4 md:py-2 border-2 focus:outline-none focus:border-[#d2860c] border-[#A87E6E] rounded-lg font-medium placeholder:font-normal"
                  onChange={ChangeAuthnum}
                />
                <button
                  className="px-3 py-1 md:px-4 md:py-2 border-2 focus:outline-none focus:border-[#d2860c] bg-[#BF9F91] text-[#FFFFFF]  rounded-lg font-medium"
                  onClick={() => {
                    CheckAuthnum(Authnum, Phonenum);
                  }}
                  disabled={IsAuthnum}
                >
                  &nbsp; &nbsp;확인&nbsp; &nbsp;
                </button>
              </div>
            </div>
          </div>
          <div className="w-full">
            <button
              className="mt-7 cursor-pointer w-full h-[3.5rem] rounded-lg font-extrabold bg-[#F0ECE9] text-[#A87E6E] disabled:cursor-not-allowed"
              // disabled
            >
              <div
                className="flex justify-center items-center "
                onClick={() => {}}
              >
                <div>계정 찾기</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ForgetId;
