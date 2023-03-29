import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Slide, toast, ToastContainer } from "react-toastify";
import styled from "styled-components";
import { usePutUserChangePhonenumberMutation } from "../../../Store/api";
import {
  usePostSmsmodifyMutation,
  usePostSmssendMutation,
} from "../../../Store/NonAuthApi";
import Footer from "../../Common/Footer";
import Navbar from "../../Common/Navbar";
import style from "./ChangePhonenum.module.css";

type find = {
  modifyNumber: string;
  phoneNumber: string;
  purpose: string;
};
type smssend = {
  to: string;
  role: string;
};
const ChangePhonenum = () => {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
      <div className="flex flex-col justify-between h-[100vh]">
        <Navbar />
        <Phonenum />
        <Footer />
      </div>
    </>
  );
};
const Phonenum = () => {
  const navigate = useNavigate();
  const [AmIHidden, setAmIHidden] = useState("hidden");
  const [Phonenum, setPhonenum] = useState<string>(`전화번호 입력   "-" 생략`);
  const [Authnum, setAuthnum] = useState<string>("");
  const [IsAuthnum, setIsAuthnum] = useState<boolean>(false);

  const [postSmsmodify, isLoading] = usePostSmsmodifyMutation();
  const [postSmssend, isLoading2] = usePostSmssendMutation();
  const [putUserChangePhonenumber, isLoading3] =
    usePutUserChangePhonenumberMutation();

  const [placeholder, setPlaceholder] = useState(" ");
  const [placeholder2, setPlaceholder2] = useState(" ");
  const passwordInputRef = useRef<any>();
  function handleInputClick() {
    passwordInputRef.current.placeholder = "";
    setPlaceholder(`전화번호 입력시 "-" 생략`);
  }
  function handleInputBlur() {
    if (passwordInputRef.current.value === "") {
      passwordInputRef.current.placeholder = "";
      setPlaceholder(` `);
    }
  }
  const passwordInputRef2 = useRef<any>();
  function handleInputClick2() {
    passwordInputRef2.current.placeholder = "";
    setPlaceholder2(`3분 이내로 입력해주세요`);
  }
  function handleInputBlur2() {
    if (passwordInputRef2.current.value === "") {
      passwordInputRef2.current.placeholder = "";
      setPlaceholder2(` `);
    }
  }

  const CheckAuthnum = (
    authnum: string | undefined,
    phonenum: string,
  ): void => {
    const data: find = {
      modifyNumber: Authnum,
      phoneNumber: Phonenum,
      purpose: "",
    };
    postSmsmodify(data)
      .unwrap()
      .then((r: any) => {
        //console.log("인증번호 결과", r.data);
        if (r.data === "true") {
          // 인증성공!
          toast.success("인증되었습니다");
          setIsAuthnum(true);
        } else if (r.data === "false") {
          // 인증실패!
          toast.error("인증번호가 틀렸습니다");
          setIsAuthnum(false);
        }
      });
  };

  const ChangeAuthnum = (event: React.ChangeEvent<HTMLInputElement>): void => {
    // //console.log(event.target.value);
    const temp: string = event.target.value;
    setAuthnum(temp);
  };

  const NewPhonenum = (event: React.ChangeEvent<HTMLInputElement>): void => {
    //console.log(event.target.value);
    setPhonenum(event.target.value);
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
  const PhoneCheck = (): any => {
    // SendAuthnum(Phonenum);
    if (Phonenum.length === 11) {
      if (checkNum(Phonenum) === false) {
        // 인증번호 보여주고
        SendAuthnum(Phonenum);
      } else {
        // 전화번호 border 변경
        toast.error("번호가 이상합니다");
      }
    } else {
      // 전화번호 border변경
      toast.error("번호가 이상합니다");
    }
  };
  // 인증번호 전송
  const SendAuthnum = (phonenum: string): void => {
    //console.log("폰번호확인", phonenum);
    const data: smssend = {
      to: phonenum,
      role: "only",
    };
    postSmssend(data)
      .unwrap()
      .then((r: any) => {
        if (r.data !== "이미 가입된 휴대폰입니다.") {
          toast.success("전송하였습니다!");
          setAmIHidden("");
          setTimeout(() => {
            setAmIHidden("hidden");
          }, 300000);
        } else {
          toast.error(`${r.data}`);
        }
      })
      .catch((e: any) => {
        console.log(e);
      });
  };

  const ChangeNewPhonenum = () => {
    const userId = localStorage.getItem("userId");
    const data = [
      {
        newPassword: "",
        newPhonenumber: Phonenum,
        password: "",
      },
      userId,
    ];
    putUserChangePhonenumber(data)
      .unwrap()
      .then((r) => {
        if (r.data === true) {
          navigate("/myinfoselect", { state: { ModifyResult: true } });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const elemetPadding = "my-2";
  return (
    <div className="flex mx-auto w-full justify-center max-w-screen-lg">
      {/* 상 */}
      <div className="flex flex-col items-center w-full ">
        {/* mx-5 sm:mx-5 md:mx-7 lg:mx-[20%] */}
        <div className="flex flex-col max-w-screen-lg p-[2rem]">
          <div className="my-4 font-extrabold text-[#A87E6E] text-4xl  sm:text-4xl md:text-4xl lg:text-6xl">
            홍민정음
          </div>
          <div className="text-[#BD9789] font-extrabold text-xl sm:text-xl md:text-2xl lg:text-4xl ">
            전화번호 수정하기
          </div>
        </div>
        {/* 중 */}
        {/* <div className=" flex flex-col justify-center "> */}
        <div className=" flex flex-col w-full justify-center items-center ">
          {/* 왼 */}
          {/* <div></div> */}
          {/* 가운데 */}
          <div className="flex flex-col justify-center lg:min-w-[30%] lg:max-w-[90%] md:w-[50%] w-[80%] ">
            <div className="flex flex-row justify-between relative z-0 my-7 w-[100%]">
              <input
                type="text"
                id="phonenum"
                name="phonenum"
                ref={passwordInputRef}
                className="block py-2.5 px-0 w-[70%] text-base font-bold text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#A87E6E] peer"
                placeholder={placeholder}
                onClick={handleInputClick}
                onBlur={handleInputBlur}
                onChange={NewPhonenum}
              />
              <label
                htmlFor="phonenum"
                className="absolute text-sm font-extrabold text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#A87E6E] peer-focus:dark:text-[#A87E6E] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                새 전화번호 입력
              </label>
              <button
                className="px-3 py-1 md:px-4 md:py-2 border-2 focus:outline-none focus:border-[#d2860c] bg-[#BF9F91] text-[#FFFFFF]  rounded-lg font-medium"
                onClick={PhoneCheck}
              >
                인증하기
              </button>
            </div>
            <div className={`${elemetPadding} ${AmIHidden}`}>
              <div className="flex flex-row justify-between relative z-0 my-7 w-[100%]">
                <input
                  type="text"
                  id="phonenum"
                  name="phonenum"
                  ref={passwordInputRef2}
                  className="block py-2.5 px-0 w-[70%] text-base font-bold text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#A87E6E] peer"
                  placeholder={placeholder2}
                  onClick={handleInputClick2}
                  onBlur={handleInputBlur2}
                  onChange={ChangeAuthnum}
                />
                <label
                  htmlFor="phonenum"
                  className="absolute text-sm font-extrabold text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#A87E6E] peer-focus:dark:text-[#A87E6E] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  인증번호 입력
                </label>
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
            <div className="flex flex-row justify-between w-full">
              <button
                className="mt-7 cursor-pointer w-[45%] h-[3.5rem] rounded-lg font-extrabold bg-[#B7B7B7] text-white disabled:cursor-not-allowed"
                onClick={() => {
                  navigate("/myinfoselect");
                }}
              >
                <div className="flex justify-center items-center ">
                  <div>취소</div>
                </div>
              </button>
              <button
                className="mt-7 cursor-pointer w-[45%] h-[3.5rem] rounded-lg font-extrabold bg-[#F0ECE9] text-[#A87E6E] disabled:cursor-not-allowed disabled:opacity-50 "
                disabled={!IsAuthnum}
                onClick={ChangeNewPhonenum}
              >
                <div className="flex justify-center items-center ">
                  <div>수정하기</div>
                </div>
              </button>
            </div>
          </div>
          {/* 우 */}
          {/* <div></div> */}
        </div>
        {/* 하 */}
        <div className="h-[2rem]"></div>
      </div>
    </div>
  );
};

export default ChangePhonenum;
