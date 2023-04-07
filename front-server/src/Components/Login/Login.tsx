import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { usePostUserloginMutation } from "../../Store/NonAuthApi";
import Api from "../Common/Api";
import Footer from "../Common/Footer";
import { toast, ToastContainer } from "react-toastify";
import { Toast } from "../Common/Toast";
import IntroNavbar from "../Intro/IntroNavbar";
type login = {
  username: string;
  password: string;
};
function Login(): JSX.Element {
  const navigate = useNavigate();
  // 입력 타입
  // type input = string | undefined;

  const [Id, setId] = useState<string>("");
  const [Password, setPassword] = useState<string>("");

  const [PostUserlogin, isloading5] = usePostUserloginMutation();

  const ChangeId = (event: any): void => {
    setId(event.target.value);
  };
  const ChangePassword = (event: any): void => {
    setPassword(event.target.value);
  };
  const Nav = (e: any) => {
    if (e.target.id === "forgetPassword") {
      navigate("/forgetpassword");
    } else if (e.target.id === "forgetId") {
      navigate("/forgetid");
    } else if (e.target.id === "join") {
      navigate("/join");
    } else if (e.target.id === "enter") {
      // axios 입장하기
    }
  };

  const Enter = () => {
    const data: login = { username: Id, password: Password };
    PostUserlogin(data)
      .unwrap()
      .then((r: any) => {
        //console.log("벳지 로그인 결과", r.newBadge.length);
        // console.log(r);
        if (r.status === "200") {
          if (r.isSecession === "true") {
            toast.error("탈퇴한 회원입니다.", { position: "top-center" });
          } else {
            const accessToken = r.accessToken;
            const refreshToken = r.refreshToken;
            const userId = r.userId;
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("userName", Id!);
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
          }
        }
      })
      .catch((e) => {
        // console.log("error났다", e);
        if (e.data.status === 401 || e.data.status === 500) {
          toast.error("아이디 혹은 패스워드가 틀렸습니다");
        }
      });
  };

  const handleOnKeyPress = (e: any) => {
    if (e.key === "Enter") {
      Enter();
    }
  };

  const location = useLocation();

  useEffect(() => {
    if (location.state !== null) {
      if (location.state.ModifyResult > 0) {
        toast.info(`수정되었습니다`);
      }
      if (location.state.FindId != null) {
        if (location.state.FindId === "false") {
          toast.info("아이디 찾기에 실패했습니다");
        } 
        else if(location.state.FindId ==="none"){
          toast.info("없는 아이디입니다.");
        }
        else {
          toast.info(`아이디는 " ${location.state.FindId} " 입니다.`, {
            autoClose: 10000,
          });
        }
      }
      const stateData = {
        ...window.history.state,
        usr: {
          ...window.history.state.usr,
          ModifyResult: 0,
          FindId: null,
        },
      };
      const pageTitle = "Title";
      const pageUrl = "/login";
      window.history.replaceState(stateData, pageTitle, pageUrl);
    }
    return () => {};
  }, []);

  return (
    <>
      <ToastContainer />

      <div className="flex flex-col justify-between h-[110vh]">
        <IntroNavbar />
        {/* <!-- Container --> */}
        <div className="flex flex-row justify-center w-full">
          {/* <!-- Login --> */}
          <div className="flex flex-col items-center justify-center">
            {/* <!-- Login box --> */}
            <div className="flex flex-col justify-center">
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="text-5xl font-extrabold text-[#A87E6E] md:text-6xl">
                  홍민정음
                </div>
                <div className="text-[#BD9789] font-extrabold text-[20px] leading-7 md:text-[24px] md:leading-8  w-[20rem] ">
                  즐거운 단어 학습
                </div>
              </div>
              <div className="flex flex-col max-w-xl w-[100%] lg:w-[50rem] space-y-5">
                <div className="text-[#A87C6E] font-extrabold text-[22px] leading-7">
                  계정
                </div>
                <input
                  type="text"
                  placeholder="계정"
                  className="flex px-3 py-2 md:px-4 md:py-3 border-2 focus:outline-none focus:border-[#d2860c] border-[#A87E6E] rounded-lg font-medium placeholder:font-normal"
                  onChange={ChangeId}
                  autoFocus
                />
                <div className="text-[#A87C6E] font-extrabold text-[22px] leading-7">
                  비밀번호
                </div>
                <input
                  type="password"
                  placeholder="비밀번호"
                  className="flex px-3 py-2 md:px-4 md:py-3 border-2 focus:outline-none focus:border-[#d2860c] border-[#A87E6E] rounded-lg font-medium placeholder:font-normal"
                  onChange={ChangePassword}
                  onKeyPress={handleOnKeyPress}
                />
                <button
                  className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-extrabold bg-[#BF9F91] text-white"
                  onClick={Enter}
                >
                  입장하기
                </button>
                <div
                  className={`flex flex-row-reverse items-center text-[#666666]  h-4 text-base`}
                >
                  <div
                    id="forgetPassword"
                    className=" cursor-pointer font-extrabold "
                    onClick={Nav}
                  >
                    비밀번호 찾기
                  </div>
                  <div
                    id="forgetId"
                    className=" cursor-pointer font-extrabold px-10"
                    onClick={Nav}
                  >
                    계정 찾기
                  </div>
                  <div
                    id="join"
                    className=" cursor-pointer font-extrabold "
                    onClick={Nav}
                  >
                    가입하기
                  </div>
                </div>
                {/* <div className="flex justify-center items-center">
                    <div className="w-[45%] border border-[#B18978]"></div>
                    <div className="w-[10%] text-center text-[#BF9F91] font-extrabold text-base">
                      또는
                    </div>
                    <div className="w-[45%] border border-[#B18978]"></div>
                  </div>

                  <button
                    className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-extrabold bg-[#F0ECE9] text-[#A87E6E] cursor-not-allowed"
                    onClick={Social}
                  >
                    <span className="absolute left-4"></span>
                    <span className=""> 소셜 로그인</span>
                  </button> */}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Login;
