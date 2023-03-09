import React from "react";
import Footer from "../Common/Footer";
import Navbar from "../Common/Navbar";

const Dictionary = () => {
  return (
    <>
      <div className="flex flex-col justify-between h-[100vh]">
        <Navbar />
        <div className="h-[20rem]">사전나올곳</div>
        <Footer />
      </div>
    </>
  );
};

export default Dictionary;
