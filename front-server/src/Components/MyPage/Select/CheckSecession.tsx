import React from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteUserMutation } from "../../../Store/api";
import Footer from "../../Common/Footer";
import Navbar from "../../Common/Navbar";

const CheckSecession = (): JSX.Element => {
  return (
    <div className="flex flex-col justify-between h-[100vh]">
      <Navbar />
      <Secession />
      <Footer />
    </div>
  );
};

const Secession = (): JSX.Element => {
  const navigate = useNavigate();
  const [deleteUser, isLoading] = useDeleteUserMutation();
  const secession = () => {
    deleteUser(localStorage.getItem("userId"))
      .unwrap()
      .then((r: any) => {
        console.log(r);
        if (r.message === "success") {
          window.localStorage.clear();
          navigate("/", { state: { SecessionResult: true } });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="flex flex-col items-center mx-auto w-full max-w-screen-xl">
      <div className="flex flex-col w-[95%] sm:w-[95%] md:w-[60%] lg:w-[34%] justify-center">
        <div className="flex flex-col mx-5 sm:mx-5 md:mx-7 lg:mx-[20%] mb-[2rem]">
          <div className="my-4 font-extrabold text-[#A87E6E] text-4xl  sm:text-4xl md:text-4xl lg:text-6xl">
            홍민정음
          </div>
        </div>
        <div className="text-[#ff000079] font-extrabold text-2xl lg:pb-3  md:text-2xl lg:text-4xl text-center">
          진짜 탈퇴하시겠습니까?
        </div>

        <div className="flex flex-row justify-between pt-5">
          <button
            className=" p-3 rounded-2xl bg-[#B7B7B7] text-white font-extrabold"
            onClick={() => {
              navigate("/myinfoselect", { state: { RightAccess: true } });
            }}
          >
            돌아가기
          </button>
          <button
            className=" p-3 rounded-2xl bg-[#ff000079] text-white font-extrabold"
            onClick={secession}
          >
            탈퇴하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckSecession;
