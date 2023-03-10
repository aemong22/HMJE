import React from "react";
import Footer from "../Common/Footer";
import Navbar from "../Common/Navbar";

const Dictionary = () => {
  return (
    <>
      <div className="flex flex-col justify-between h-[100vh]">
        <Navbar />
        <div className="flex flex-col justify-center items-center border-2 border-black mx-auto px-10 sm:px-10 md:px-16 lg:px-20">
          <div className="flex flex-row justify-between py-10">
            <div>사전[辭典]</div>
            <input type="text" placeholder="검색" />
          </div>
          <div className="flex flex-row justify-between">
            <div className="">좌</div>
            <div className="">중</div>
            <div className="">우</div>
          </div>
          <div className="py-10">하</div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Dictionary;
