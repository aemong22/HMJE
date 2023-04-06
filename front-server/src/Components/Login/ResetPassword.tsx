import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  usePostSmsmodifyMutation,
  usePostSmssendMutation,
  usePostUserfindpasswordMutation,
} from "../../Store/NonAuthApi";
import Footer from "../Common/Footer";
import IntroNavbar from "../Intro/IntroNavbar";

type find = {
  modifyNum: string;
  newPassword: string;
  phoneNum: string;
  username: string;
};

const ResetPassword = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const [beForeData, setbeForeData] = useState<find>();
  // const

  // const [Id, setId] = useState<string>("");
  const [Password, setPassword] = useState<string>("");
  const [PasswordCheck, setPasswordCheck] = useState<string>();
  const [Phonenum, setPhonenum] = useState<string>("");

  // 안보이게
  const [IsPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false);
  const [PasswordShow, setPasswordShow] = useState("password");
  const [PasswordShowIcon, setPasswordShowIcon] = useState(
    "/Assets/Icon/view.png",
  );
  const [PasswordCheckShow, setPasswordCheckShow] = useState("password");
  const [PasswordCheckShowIcon, setPasswordCheckShowIcon] = useState(
    "/Assets/Icon/view.png",
  );
  const [passwordConfirmMessage, setPasswordConfirmMessage] =
    useState<string>("");

  const [AmIHidden, setAmIHidden] = useState("hidden");

  // 버튼 비활성화
  const [Disalbe, setDisalbe] = useState(true);

  // 유효성
  const [IsAuthnum, setIsAuthnum] = useState<boolean>(false);

  // Store
  const [postUserfindpassword, { isLoading, error }] =
    usePostUserfindpasswordMutation();

  const ChangePassword = (event: any): void => {
    //console.log(event.target.value);
    setPassword(event.target.value);
  };

  const ChangePasswordCheckShow = () => {
    if (PasswordCheckShow === "password") {
      setPasswordCheckShow("");
      setPasswordCheckShowIcon("/Assets/Icon/invisible.png");
    } else if (PasswordCheckShow === "") {
      setPasswordCheckShow("password");
      setPasswordCheckShowIcon("/Assets/Icon/view.png");
    }
  };

  // 비밀번호 확인
  const onChangePasswordConfirm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordConfirmCurrent = e.target.value;
      setPasswordCheck(passwordConfirmCurrent);
      //console.log(passwordConfirmCurrent);

      if (Password === passwordConfirmCurrent) {
        setPasswordConfirmMessage("비밀번호를 똑같이 입력했어요 : )");
        //console.log("비밀번호를 똑같이 입력했어요 : )");
        setIsPasswordConfirm(true);
      } else {
        setPasswordConfirmMessage("비밀번호가 틀려요. 다시 확인해주세요 ㅜ ㅜ");
        setIsPasswordConfirm(false);
      }
    },
    [Password],
  );

  // 비밀번호 보이기
  const ChangePasswordShow = () => {
    if (PasswordShow === "password") {
      setPasswordShow("");
      setPasswordShowIcon("/Assets/Icon/invisible.png");
    } else if (PasswordShow === "") {
      setPasswordShow("password");
      setPasswordShowIcon("/Assets/Icon/view.png");
    }
  };

  const Cancel = () => {
    navigate("/login");
  };

  const elemetPadding = "my-2";

  const FindButton = () => {
    const data: find = {
      modifyNum: location.state.modifyNum,
      newPassword: Password,
      phoneNum: location.state.phoneNum,
      username: location.state.username,
    };

    //console.log("프론트에서 보내는거", data);
    postUserfindpassword(data)
      .unwrap()
      .then((r: any) => {        
        if (r.data === true) {
          navigate("/login", {
            state: { ModifyResult: true},
          });
        } else {
          navigate("/login", {
            state: { ModifyResult: -1},
          });
        }
      });
  };

  if (isLoading) {
    return <>로딩중</>;
  } else if (error) {
    return <>error</>;
  } else {
    return (
      <div className="flex flex-col justify-between h-[100vh] ">
        <IntroNavbar />
        <div className="container max-w-screen-lg w-full mx-auto flex flex-col ">
          <div className="flex flex-col mx-5 sm:mx-5 sm:[10%] md:mx-[30%] lg:mx-[10%]">
            <div className="my-4 font-extrabold text-[#A87E6E] text-4xl  sm:text-4xl md:text-4xl lg:text-6xl">
              홍민정음
            </div>
            <div className="text-[#BD9789] font-extrabold text-xl sm:text-xl md:text-2xl lg:text-4xl ">
              비밀번호 수정하기
            </div>
          </div>
          <div className=" flex flex-col max-w-[100%] justify-center my-[2rem] mx-4 md:mx-[25%] lg:mx-[30%]">
            <div className="w-full">
              <div className={`${elemetPadding}`}>
                <div className="text-[#A87C6E] font-extrabold text-base">
                  새 비밀번호
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-row justify-between items-center relative">
                    <input
                      type={`${PasswordShow}`}
                      className="min-w-[100%] max-h-[70%] px-3 py-1 md:px-4 md:py-2 border-2  focus:outline-none focus:border-[#d2860c] border-[#A87E6E] rounded-lg font-medium placeholder:font-normal"
                      onChange={ChangePassword}
                      placeholder="비밀번호 입력"
                    />
                    <div
                      className="cursor-pointer max-w-[1.5rem] mr-5 ml-auto absolute right-0"
                      onClick={ChangePasswordShow}
                    >
                      <img className="" src={`${PasswordShowIcon}`} alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${elemetPadding}`}>
                <div className="text-[#A87C6E] font-extrabold text-base">
                  새 비밀번호확인
                </div>
                <div className="flex flex-col ">
                  <div className="flex flex-row justify-between items-center relative">
                    <input
                      type={`${PasswordCheckShow}`}
                      className="min-w-[100%] max-h-[70%] px-3 py-1 md:px-4 md:py-2 border-2  focus:outline-none focus:border-[#d2860c] border-[#A87E6E] rounded-lg font-medium placeholder:font-normal"
                      onChange={onChangePasswordConfirm}
                      title="비밀번호 확인"
                      placeholder="비밀번호 확인 입력"
                    />
                    <div
                      className="cursor-pointer max-w-[1.5rem] mr-5 ml-auto absolute right-0"
                      onClick={ChangePasswordCheckShow}
                    >
                      <img
                        className=""
                        src={`${PasswordCheckShowIcon}`}
                        alt=""
                      />
                    </div>
                  </div>

                  {PasswordCheck && PasswordCheck.length > 0 && (
                    <span
                      className={`message ${
                        IsPasswordConfirm ? "success" : "error"
                      } max-h-[1rem] text-xs `}
                    >
                      {passwordConfirmMessage}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between w-full">
              <button
                className="mt-7 cursor-pointer w-[45%] h-[3.5rem] rounded-lg font-extrabold bg-[#F0ECE9] text-[#A87E6E] disabled:cursor-not-allowed"
                disabled={!IsPasswordConfirm}
                onClick={FindButton}
              >
                <div className="flex justify-center items-center ">
                  <div>비밀번호 수정하기</div>
                </div>
              </button>
              <button
                className="mt-7 cursor-pointer w-[45%] h-[3.5rem] rounded-lg font-extrabold bg-[#F0ECE9] text-[#A87E6E] disabled:cursor-not-allowed"
                onClick={Cancel}
              >
                <div className="flex justify-center items-center ">
                  <div>취소</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
};

export default ResetPassword;
