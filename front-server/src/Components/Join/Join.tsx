import React, { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Common/Footer";
import axios from "axios";
import IntroNavbar from "../Intro/IntroNavbar";
import {
  usePostSmsmodifyMutation,
  usePostSmssendMutation,
  usePostUserchecknicknameMutation,
  usePostUsercheckusernameMutation,
  usePostUserjoinMutation,
  usePostUserloginMutation,
} from "../../Store/NonAuthApi";
import { toast, ToastContainer } from "react-toastify";
var pattern2 = /[a-zA-Z]/; //영어

type find = {
  modifyNumber: string;
  phoneNumber: string;
  purpose: string;
};

type smssend = {
  to: string;
  role: string;
};
const Join = () => {
  const navigate = useNavigate();

  // 이름, 비밀번호, 비밀번호 확인, 별명, 폰번호, 인증번호
  const [UserName, setUserName] = useState<string>("");
  const [Password, setPassword] = useState<string>("");
  const [PasswordCheck, setPasswordCheck] = useState<string>();
  const [Nickname, setNickname] = useState<string>("");
  const [Phonenum, setPhonenum] = useState<string>("");
  const [Authnum, setAuthnum] = useState<string>("");

  // 인증번호 번호 전송후 보여줌
  const [AmIHidden, setAmIHidden] = useState("hidden");

  const [PasswordShow, setPasswordShow] = useState("password");
  const [PasswordShowIcon, setPasswordShowIcon] = useState(
    "/Assets/Icon/view.png",
  );
  const [PasswordCheckShow, setPasswordCheckShow] = useState("password");
  const [PasswordCheckShowIcon, setPasswordCheckShowIcon] = useState(
    "/Assets/Icon/view.png",
  );

  // 오류메세지 상태저장
  const [passwordMessage, setPasswordMessage] = useState<string>("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] =
    useState<string>("");

  // 유효성 검사
  const [IsName, setIsName] = useState<boolean>(false);
  const [IsNickname, setIsNickname] = useState<boolean>(false);
  const [IsAuthnum, setIsAuthnum] = useState<boolean>(false);
  const [IsPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false);

  // Store 호출

  // 인증번호
  // 전송 확인
  const [postSmsmodify, isloading1] = usePostSmsmodifyMutation();
  const [postSmssend, isloading2] = usePostSmssendMutation();

  // 아이디 패스워드 중복확인
  const [postUserchecknickname, isloading3] =
    usePostUserchecknicknameMutation();
  const [postUsercheckusername, isloading4] =
    usePostUsercheckusernameMutation();

  // 회원가입
  const [postUserjoin, isloading5] = usePostUserjoinMutation();
  // 로그인
  const [PostUserlogin, isloading6] = usePostUserloginMutation();

  function ChangeName(event: any): void {
    //console.log("IsPasswordConfirm", IsPasswordConfirm);
    //console.log("IsAuthnum", IsAuthnum);
    //console.log("IsName", IsName);
    //console.log("IsNickname", IsNickname);
    //console.log(event.target.value);
    setUserName(event.target.value);
  }
  const ChangePassword = (event: any): void => {
    //console.log(event.target.value);
    setPassword(event.target.value);
  };
  const ChangePasswordCheck = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    //console.log(event.target.value);
    setPasswordCheck(event.target.value);
  };
  const ChangeNickname = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    event.preventDefault();
    //console.log(event.target.value);
    setNickname(event.target.value);
    // CheckEnglish();
  };

  const ChangePhonenum = (event: React.ChangeEvent<HTMLInputElement>): void => {
    //console.log(event.target.value);
    setPhonenum(event.target.value);
  };
  const ChangeAuthnum = (event: React.ChangeEvent<HTMLInputElement>): void => {
    // //console.log(event.target.value);
    const temp: string = event.target.value;
    setAuthnum(temp);
  };

  // 비밀번호 확인
  const onChangePasswordConfirm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordConfirmCurrent = e.target.value;
      setPasswordCheck(passwordConfirmCurrent);
      //console.log(passwordConfirmCurrent);

      if (Password === passwordConfirmCurrent) {
        setPasswordConfirmMessage("비밀번호를 똑같이 입력했어요 : )");
        setIsPasswordConfirm(true);
      } else {
        setPasswordConfirmMessage("비밀번호가 틀려요. 다시 확인해주세요 ㅜ ㅜ");
        setIsPasswordConfirm(false);
      }
    },
    [Password],
  );  
  const chkCharCode = (event: any) => {
    const regExp = /[^0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;
    const ele = event.target;
    if (regExp.test(ele.value)) {
      ele.value = ele.value.replace(regExp, "");
      setNickname(ele.value);
    }
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

  const ChangePasswordCheckShow = () => {
    if (PasswordCheckShow === "password") {
      setPasswordCheckShow("");
      setPasswordCheckShowIcon("/Assets/Icon/invisible.png");
    } else if (PasswordCheckShow === "") {
      setPasswordCheckShow("password");
      setPasswordCheckShowIcon("/Assets/Icon/view.png");
    }
  };

  // 중복확인
  const CheckDuplication = (e: any) => {
    // 이름

    if (e.target.id === "UserName") {
      // //console.log("Nickname", Nickname);
      // //console.log("UserName", UserName);
      // //console.log("Password", Password);
      if (UserName === "") {
        toast.info("빈칸입니다 다시 입력해주세요!");
      } else if (UserName.length < 2) {
        toast.info("두글자 이상 입력해 주세요!");
      } else {
        window.localStorage.clear();
        const data = {
          isAdmin: false,
          isSecession: false,
          nickname: Nickname,
          password: Password,
          phoneNumber: Phonenum,
          username: UserName,
        };

        postUsercheckusername(data)
          .unwrap()
          .then((r: any) => {
            if (r.data === true) {
              toast.success("사용 가능한 계정입니다.");
              setIsName(true);
            } else {
              toast.error("중복된 계정입니다.");
            }
          });
      }
    }
    // 닉네임
    else if (e.target.id === "Nickname") {
      // 2글자에서 6글자
      //console.log("닉네임확인", Nickname);
      if (Nickname === "") {
        toast.info("빈칸입니다 다시 입력해주세요!");
      } else if (Nickname.length < 2) {
        toast.info("2글자 이상 입력해주세요!");
      } else {
        window.localStorage.clear();
        const data = {
          isAdmin: false,
          isSecession: false,
          nickname: Nickname,
          password: Password,
          phoneNumber: Phonenum,
          username: UserName,
        };

        postUserchecknickname(data)
          .unwrap()
          .then((r: any) => {
            if (r.data === true) {
              toast.success("사용 가능한 별명입니다.");
              setIsNickname(true);
            } else {
              toast.error("중복된 별명입니다.");
            }
          });
      }
    }
  };

  // 휴대폰번호가 유효한지 체크
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
    //console.log("IsPasswordConfirm", IsPasswordConfirm);
    //console.log("IsAuthnum", IsAuthnum);
    //console.log("IsName", IsName);
    //console.log("IsNickname", IsNickname);
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
          //console.log("전화번호 중복 결과", r);
          setAmIHidden("");
          // 인증번호 닫고
          setTimeout(() => {
            setAmIHidden("hidden");
          }, 300000);
        } else {
          toast.error(`${r.data}`);
        }
      })
      .catch((e) => {
        //console.log(e);
      });
  };
  const Cancel = () => {
    navigate("/login");
  };
  // 회원가입
  const GoJoin = (): void => {
    // 회원가입axios
    //console.log("닉네임", Nickname);
    //console.log("패스워드", Password);
    //console.log("전화번호", Phonenum);
    //console.log("username", UserName);

    //console.log("IsPasswordConfirm", IsPasswordConfirm);
    //console.log("IsAuthnum", IsAuthnum);
    //console.log("IsName", IsName);
    //console.log("IsNickname", IsNickname);

    //console.log("disable", disable);

    const data = {
      isAdmin: false,
      isSecession: false,
      nickname: Nickname,
      password: Password,
      phoneNumber: Phonenum,
      username: UserName,
    };

    postUserjoin(data)
      .unwrap()
      .then((r: any) => {
        const data = { username: UserName, password: Password };
        PostUserlogin(data)
          .unwrap()
          .then((r: any) => {
            const accessToken = r.accessToken;
            const refreshToken = r.refreshToken;
            const userId = r.userId;
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("userName", UserName);
            localStorage.setItem("userId", userId);
            localStorage.setItem("refreshToken", refreshToken);
            if (r.isAdmin === "true") {
              navigate("/admin", {
                state: {
                  newBadgeNum: r.newBadge.length,
                },
              });
            } else if (r.isAdmin === "false") {
              navigate("/main", {
                state: {
                  newBadgeNum: r.newBadge.length,
                },
              });
            }
          });
      });
  };
  const CheckAuthnum = (
    authnum: string | undefined,
    phonenum: string,
  ): void => {
    //console.log("인증가자");
    //console.log(Authnum);
    //console.log(Phonenum);

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
    //console.log("IsPasswordConfirm", IsPasswordConfirm);
    //console.log("IsAuthnum", IsAuthnum);
    //console.log("IsName", IsName);
    //console.log("IsNickname", IsNickname);
  };

  const elemetPadding = "my-2";
  let disable = IsPasswordConfirm && IsAuthnum && IsName && IsNickname;

  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    if (accessToken&&accessToken === "undefined") {
      navigate("/");
    }
    else if(accessToken&&accessToken!==undefined){      
      navigate("/main");
    }

    return () => {};
  }, []);
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
      />
      <div className="flex flex-col justify-between items-center h-[100vh]">
        <IntroNavbar />
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
          {/* <div className=" flex flex-col justify-center "> */}
          <div className=" flex flex-col max-w-[100%] justify-center items-center ">
            {/* 왼 */}
            {/* <div></div> */}
            {/* 가운데 */}
            {/* <div className="mx-5 sm:mx-5 md:mx-[20%] lg:mx-[33%] justify-center"> */}
            <div className="flex flex-col w-[95%] sm:w-[95%] md:w-[60%] lg:w-[34%] justify-center">
              <div className={`"${elemetPadding}"`}>
                <div className="text-[#A87C6E] font-extrabold text-base pb-2">
                  계정
                </div>
                <div className="flex flex-row justify-between w-full">
                  <input
                    type="text"
                    className="min-w-[70%] px-3 py-1 md:px-4 md:py-2 border-2 focus:outline-none focus:border-[#d2860c] border-[#A87E6E] rounded-lg font-medium placeholder:font-normal"
                    onChange={ChangeName}
                    placeholder="계정 입력"
                  />
                  <button
                    id="UserName"
                    className="px-3 py-1 md:px-4 md:py-2 border-2 focus:outline-none focus:border-[#d2860c]  bg-[#BF9F91] text-[#FFFFFF] rounded-lg font-medium"
                    onClick={CheckDuplication}
                  >
                    중복확인
                  </button>
                </div>
              </div>
              <div className={`${elemetPadding}`}>
                <div className="flex flex-row items-baseline">
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
                    id="id"
                    className="min-w-[70%] px-3 py-1 md:px-4 md:py-2 border-2 focus:outline-none focus:border-[#d2860c] border-[#A87E6E] rounded-lg font-medium  placeholder:font-normal "
                    onChange={ChangeNickname}
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
              </div>
              <div className={`${elemetPadding}`}>
                <div className="text-[#A87C6E] font-extrabold text-base">
                  비밀번호
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
                  비밀번호확인
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
              <div className={`${elemetPadding}`}>
                <div className="text-[#A87C6E] font-extrabold text-base">
                  전화번호
                </div>
                <div className="flex flex-row justify-between">
                  <input
                    type="text"
                    className="min-w-[70%] px-3 py-1 md:px-4 md:py-2 border-2 focus:outline-none focus:border-[#d2860c] border-[#A87E6E] rounded-lg font-medium placeholder:font-normal"
                    onChange={ChangePhonenum}
                    placeholder={`전화번호 입력  " - 생략"`}
                  />
                  <button
                    className="px-3 py-1 md:px-4 md:py-2 border-2 focus:outline-none focus:border-[#d2860c] bg-[#BF9F91] text-[#FFFFFF]  rounded-lg font-medium"
                    onClick={PhoneCheck}
                  >
                    인증하기
                  </button>
                </div>
              </div>
              {/* 주석 */}
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
              <div className="flex flex-row justify-between w-full">
                <button
                  className="mt-7 cursor-pointer w-[45%] h-[3.5rem] rounded-lg font-extrabold bg-[#F0ECE9] text-[#A87E6E] disabled:cursor-not-allowed disabled:opacity-50 "
                  disabled={!disable}
                  onClick={() => {
                    GoJoin();
                  }}
                >
                  <div className="flex justify-center items-center ">
                    <div>가입하기</div>
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

export default Join;
