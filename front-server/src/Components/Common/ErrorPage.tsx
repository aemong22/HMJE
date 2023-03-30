import styles from "./Common.module.css";
import Lottie from "lottie-react";
import ErrorComp from "./lottie/ErrorComp.json";


function ErrorPage():JSX.Element {


  return(
    <>
      <div className="flex justify-center items-center w-screen h-screen">
        <div className="flex flex-col justify-center items-center">
          <Lottie animationData={ErrorComp} className={`${styles.errorAnimation}`} style={{width: '15rem', height: '15rem', marginBottom: '1rem'}}/>
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
        </div>
      </div>
    </>
  )
}

export default ErrorPage;