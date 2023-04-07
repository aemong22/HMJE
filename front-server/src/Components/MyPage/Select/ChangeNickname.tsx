import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Slide, toast, ToastContainer } from "react-toastify";
import {
  useGetUserMyinfoQuery,
  usePutUserdataMutation,
} from "../../../Store/api";
import { usePostUserchecknicknameMutation } from "../../../Store/NonAuthApi";
import Footer from "../../Common/Footer";
import Navbar from "../../Common/Navbar";

const ChangeNickname = () => {
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
        <NickName />
        <Footer />
      </div>
    </>
  );
};

const NickName = () => {
  const navigate = useNavigate();
  const {
    data: getUserMyinfo,
    isLoading,
    error,
  } = useGetUserMyinfoQuery(localStorage.getItem("userId"));

  const [postUserchecknickname, isLoading2] =
    usePostUserchecknicknameMutation();

  const [putUserdata, isLoading3] = usePutUserdataMutation();

  const [nickname, setnickname] = useState("");
  const [nicknameCheck, setnicknameCheck] = useState(true);

  const chkCharCode = (event: any) => {
    const regExp = /[^0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;
    const ele = event.target;
    if (regExp.test(ele.value)) {
      ele.value = ele.value.replace(regExp, "");
      setnickname(ele.value);
    }
  };

  useEffect(() => {
    if (getUserMyinfo !== undefined) {
      setnickname(getUserMyinfo.data.nickname);
    }

    return () => {};
  }, [getUserMyinfo]);

  const ChangeNicknameInput = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    // console.log(event.target.value);

    event.preventDefault();
    setnickname(event.target.value);
  };

  const CheckDuplication = (e: any) => {
    // console.log(e.target.id);

    // 닉네임
    if (e.target.id === "Nickname") {
      // 2글자에서 6글자
      //console.log("닉네임확인", Nickname);
      if (nickname === "") {
        toast.warn("빈칸입니다 다시 입력해주세요!");
        setnicknameCheck(true);
      } else if (nickname.length < 2) {
        toast.warn("2글자 이상 입력해주세요!");
        setnicknameCheck(true);
      } else {
        const data = {
          isAdmin: false,
          isSecession: false,
          nickname: nickname,
          password: "",
          phoneNumber: "",
          username: "",
        };
        // console.log(data);

        postUserchecknickname(data)
          .unwrap()
          .then((r: any) => {
            // console.log(r);
            if (r.data === true) {
              toast.success("사용 가능한 별명입니다.");
              setnicknameCheck(false);
            } else {
              toast.error("중복된 별명입니다.");
              setnicknameCheck(true);
            }
          })
          .catch((e) => {
            // console.log(e);
          });
      }
    }
  };

  const modify = () => {
    const userId = localStorage.getItem("userId");
    const data = [
      {
        isAdmin: false,
        isSecession: false,
        nickname: nickname,
        password: "",
        phoneNumber: "",
        username: "",
      },
      userId,
    ];
    putUserdata(data)
      .unwrap()
      .then((r: any) => {
        localStorage.setItem("nickname", nickname);
        navigate("/myinfoselect", {
          state: { ModifyResult: true, RightAccess: true },
        });
      })
      .catch((e) => {
        // console.log(e);
      });
  };

  if (isLoading) {
    return <></>;
  } else if (error) {
    return <></>;
  } else {
    return (
      <div className="flex flex-col items-center mx-auto w-full max-w-screen-xl">
        <div className="flex flex-col w-[95%] sm:w-[95%] md:w-[60%] lg:w-[34%] justify-center">
          <div className="flex flex-col mx-5 sm:mx-5 md:mx-7 lg:mx-[20%]">
            <div className="my-4 font-extrabold text-[#A87E6E] text-4xl  sm:text-4xl md:text-4xl lg:text-6xl text-center">
              홍민정음
            </div>
            <div className="text-[#BD9789] font-extrabold text-xl sm:text-xl md:text-2xl lg:text-4xl text-center ">
              별명 수정하기
            </div>
          </div>
          <div className="flex flex-row items-baseline mt-10">
            <div className="text-[#A87C6E] font-extrabold text-base pb-2">
              별명
            </div>
            <div className="text-[#868686] pl-2 lg:pl-4 font-extrabold text-sm sm:text-xs">
              6글자 이내 한글만 사용하실 수 있습니다.
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <input
              type="text"
              id="Nickname"
              value={nickname}
              className="min-w-[70%] px-3 py-1 md:px-4 md:py-2 border-2 focus:outline-none focus:border-[#d2860c] border-[#A87E6E] rounded-lg font-extrabold text-gray-800 placeholder:font-normal "
              onChange={ChangeNicknameInput}
              onKeyUp={chkCharCode}
              placeholder="별명 입력"
              maxLength={6}
            />
            <button
              id="Nickname"
              className="px-3 py-1 md:px-4 md:py-2 border-2 focus:outline-none focus:border-[#d2860c] bg-[#BF9F91] text-[#FFFFFF]  rounded-lg font-medium"
              onClick={CheckDuplication}
            >
              중복확인
            </button>
          </div>
          <div className="flex flex-row justify-between w-full">
            <button
              className="mt-7 cursor-pointer w-[45%] h-[3.5rem] rounded-lg font-extrabold bg-[#B7B7B7] text-white disabled:cursor-not-allowed"
              onClick={() => {
                navigate("/myinfoselect", { state: { RightAccess: true } });
              }}
            >
              <div className="flex justify-center items-center ">
                <div>취소</div>
              </div>
            </button>
            <button
              className="mt-7 cursor-pointer w-[45%] h-[3.5rem] rounded-lg font-extrabold bg-[#F0ECE9] text-[#A87E6E] disabled:cursor-not-allowed disabled:opacity-50 "
              onClick={modify}
              disabled={nicknameCheck}
            >
              <div className="flex justify-center items-center ">
                <div>수정하기</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default ChangeNickname;
