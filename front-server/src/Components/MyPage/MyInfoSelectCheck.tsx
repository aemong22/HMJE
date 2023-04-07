import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { usePostUserChangeMutation } from "../../Store/api";
import Footer from "../Common/Footer";
import Navbar from "../Common/Navbar";

const MyInfoSelectCheck = () => {
  return (
    <>
      <ToastContainer />
      <div className="flex flex-col justify-between h-[100vh]">
        <Navbar />
        <Check />
        <Footer />
      </div>
    </>
  );
};
const Check = () => {
  const navigate = useNavigate();
  const [postUserChange, isLoading] = usePostUserChangeMutation();

  const [Password, setPassword] = useState<string>("");
  const ChangePassword = (event: any): void => {
    setPassword(event.target.value);
  };

  const handleOnKeyPress = (e: any) => {
    if (e.key === "Enter") {
      Click();
    }
  };

  const Click = () => {
    const userId = localStorage.getItem("userId");
    const data = [
      {
        isAdmin: false,
        isSecession: false,
        nickname: "",
        password: Password,
        phoneNumber: "",
        username: "",
      },
      userId,
    ];

    postUserChange(data)
      .unwrap()
      .then((r) => {
        if (r.data === true) {
          navigate("/myinfoselect", { state: { RightAccess: true } });
        } else if (r.data === false) {
          toast.error("틀렸습니다");
        }
      })
      .catch((e) => {
        // console.log(e);
      });
  };
  return (
    <div className="flex flex-col items-center mx-auto w-full max-w-screen-xl">
      <div className="flex flex-col w-[95%] sm:w-[95%] md:w-[60%] lg:w-[34%] justify-center">
        <div className="flex flex-col mx-5 sm:mx-5 md:mx-7 lg:mx-[20%] mb-[2rem]">
          <div className="my-4 font-extrabold text-[#A87E6E] text-4xl  sm:text-4xl md:text-4xl lg:text-6xl">
            홍민정음
          </div>
          <div className="text-[#BD9789] font-extrabold text-xl sm:text-xl md:text-2xl lg:text-4xl ">
            정보 수정
          </div>
        </div>
        <div className="flex flex-row items-baseline">
          <div className="text-[#A87C6E] font-extrabold text-base pb-2">
            비밀번호
          </div>
          <div className="text-[#868686] pl-2 lg:pl-4 font-extrabold text-sm sm:text-xs">
            비밀번호로 본인을 인증해주세요
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <input
            type="password"
            id="password"
            className="min-w-[100%] px-3 py-1 md:px-4 md:py-2 border-2 focus:outline-none focus:border-[#d2860c] border-[#A87E6E] rounded-lg font-medium  placeholder:font-normal "
            onChange={ChangePassword}
            onKeyPress={handleOnKeyPress}
            placeholder="비밀번호 입력"
          />
        </div>
        <div className="flex flex-row justify-between w-full">
          <button
            className="mt-7 cursor-pointer w-[45%] h-[3.5rem] rounded-lg font-extrabold bg-[#B7B7B7] text-white disabled:cursor-not-allowed"
            onClick={() => {
              navigate("/mypage");
            }}
          >
            <div className="flex justify-center items-center ">
              <div>돌아가기</div>
            </div>
          </button>
          <button
            className="mt-7 cursor-pointer w-[45%] h-[3.5rem] rounded-lg font-extrabold bg-[#F0ECE9] text-[#A87E6E] disabled:cursor-not-allowed disabled:opacity-50 "
            onClick={Click}
          >
            <div className="flex justify-center items-center ">
              <div>확인</div>
            </div>
          </button>
        </div>
      </div>      
    </div>
  );
};

export default MyInfoSelectCheck;
