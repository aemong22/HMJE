import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../Common/Footer";
import Navbar from "../../Common/Navbar";
import { usePutUserChangePasswordMutation } from "../../../Store/api";
import { toast, ToastContainer, Slide } from "react-toastify";

const ChangePassword = (): JSX.Element => {
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
        <PassWord />
        {/* <Example /> */}
        <Footer />
      </div>
    </>
  );
};

const PassWord = () => {
  const navigate = useNavigate();

  const [putUserChangePassword, { isLoading }] =
    usePutUserChangePasswordMutation();

  const [passwordConfirmMessage, setPasswordConfirmMessage] =
    useState<string>("");
  const [IsPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false);
  //갹채를 업데이트하기위해 useState안에 객체를 사용
  const [inputs, setInputs] = useState({
    password: "",
    newPassword: "",
    newPasswordCheck: "",
  });
  //값을 가져오기 위해 inputs에 name으로 가져왔다
  const { password, newPassword, newPasswordCheck } = inputs;

  const onChange = (e: any) => {
    //input에 name을 가진 요소의 value에 이벤트를 걸었다
    const { name, value } = e.target;

    if (name === "newPasswordCheck") {
      const passwordConfirmCurrent = e.target.value;
      if (newPassword === passwordConfirmCurrent) {
        setPasswordConfirmMessage("비밀번호를 똑같이 입력했어요!");
        setIsPasswordConfirm(true);
      } else {
        setPasswordConfirmMessage("비밀번호가 틀려요. 다시 확인해주세요!");
        setIsPasswordConfirm(false);
      }
    }

    // 변수를 만들어 이벤트가 발생했을때의 value를 넣어줬다
    const nextInputs = {
      //스프레드 문법으로 기존의 객체를 복사한다.
      ...inputs,
      [name]: value,
    };
    //만든 변수를 seInput으로 변경해준다.
    setInputs(nextInputs);
  };

  const modify = () => {
    if (password === "") {
      toast.info("현재 비밀번호가 비어있습니다");
    }
    if (newPassword === "") {
      toast.info("새 비밀번호가 비어있습니다");
    }
    if (newPasswordCheck === "") {
      toast.info("새 비밀번호 확인이 비어있습니다");
    } else if (
      password !== "" &&
      newPassword !== "" &&
      newPasswordCheck !== ""
    ) {
      if (IsPasswordConfirm) {
        const userId = localStorage.getItem("userId");
        const data = [
          {
            newPassword: newPassword,
            newPhonenumber: "",
            password: password,
          },
          userId,
        ];
        putUserChangePassword(data)
          .unwrap()
          .then((r: any) => {
            if (r.data === true) {
              navigate("/myinfoselect", { state: { ModifyResult: true,RightAccess: true } });              
            } else if (r.data === false) {
              toast.error("현재 비밀번호가 틀렸습니다!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }
          })
          .catch((e: any) => {
            console.log(e);
          });
      } else {
        toast.error("새 비밀번호를 동일하게 입력해주세요");
      }
    }
  };
  const updown = "relative z-0 my-7 w-[100%]";
  return (
    <>
      <div className="max-w-screen-md mx-auto  w-full my-4">
        <div className=" mx-auto  py-[10%] px-[10%] w-[80%]">
          <div className="flex flex-col mx-5 sm:mx-5 md:mx-7 lg:mx-[20%]">
            <div className="my-4 font-extrabold text-[#A87E6E] text-4xl  sm:text-4xl md:text-4xl lg:text-6xl text-center">
              홍민정음
            </div>
            <div className="text-[#BD9789] font-extrabold text-xl sm:text-xl md:text-2xl lg:text-4xl text-center ">
              비밀번호 수정하기
            </div>
          </div>
          <div className={updown}>
            <input
              type="password"
              id="password"
              name="password"
              className="block pt-2.5 pb-1 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#A87E6E] peer"
              placeholder=" "
              onChange={onChange}
            />
            <label
              htmlFor="password"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#A87E6E] peer-focus:dark:text-[#A87E6E] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              현재 비밀번호
            </label>
          </div>
          <div className={updown}>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              className="block pt-2.5 pb-1 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#A87E6E] peer"
              placeholder=" "
              onChange={onChange}
            />
            <label
              htmlFor="newPassword"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#A87E6E] peer-focus:dark:text-[#A87E6E] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              새 비밀번호
            </label>
          </div>
          <div className={updown}>
            <input
              type="password"
              id="newPasswordCheck"
              name="newPasswordCheck"
              // value={newPasswordCheck}
              className="block pt-2.5 pb-1 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#A87E6E] peer"
              placeholder=" "
              onChange={onChange}
            />
            <label
              htmlFor="newPasswordCheck"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#A87E6E] peer-focus:dark:text-[#A87E6E] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              새 비밀번호 확인
            </label>
          </div>
          {newPasswordCheck && newPasswordCheck.length > 0 && (
            <div
              className={`${
                IsPasswordConfirm ? "text-violet-600" : "text-red-600"
              } max-h-[1.5rem] text-xs`}
            >
              {passwordConfirmMessage}
            </div>
          )}
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
            >
              <div className="flex justify-center items-center ">
                <div>수정하기</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
