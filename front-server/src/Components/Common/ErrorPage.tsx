import styles from "./Common.module.css";
import Lottie from "lottie-react";
import ErrorComp from "./lottie/ErrorComp.json";
import { useNavigate } from "react-router";


function ErrorPage():JSX.Element {
  const navigate = useNavigate()
  return(
    <>
      <div className="flex justify-center items-center w-screen h-screen">
        <div className="flex flex-col justify-center items-center">
          <Lottie animationData={ErrorComp}style={{width: '15rem', height: '15rem', marginBottom: '1rem'}}/>
          <div className="flex ">
            <div className={`${styles.errorAnimation}`}>정</div>
            <div className={`${styles.errorAnimation}`}>비</div>
            <div className={`${styles.errorAnimation}`}>중</div>
            <div className={`${styles.errorAnimation}`}>입</div>
            <div className={`${styles.errorAnimation}`}>니</div>
            <div className={`${styles.errorAnimation}`}>다</div>
            <div className={`${styles.errorAnimation}`}>.</div>
            <div className={`${styles.errorAnimation}`}>.</div>
            <div className={`${styles.errorAnimation}`}>.</div>
          </div>
          <div className="flex items-center justify-center flex-none px-20 py-3 mt-5 border-2 border-[#BF9F91] text-[#A87E6E] hover:text-white rounded-lg font-extrabold bg-[#F0ECE9] hover:bg-[#BF9F91] cursor-pointer transition-all duration-300">
            <span onClick={()=>{navigate(-1)}}>뒤로가기</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default ErrorPage;