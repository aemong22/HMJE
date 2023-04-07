import styles from "./Common.module.css";
import Lottie from "lottie-react";
import loadingLottie from "./lottie/hangulnal.json";


function Loading():JSX.Element {

  return(
    <>
      <div className="flex justify-center items-center w-screen h-screen">
        <div className="flex flex-col justify-center items-center">
          <Lottie animationData={loadingLottie} style={{width: '15rem', height: '15rem', marginBottom: '1rem'}}/>
          <div className="flex ">
            <div className={`${styles.loadingAnimation}`}>잠</div>
            <div className={`${styles.loadingAnimation}`}>시</div>
            <div className={`${styles.loadingAnimation}`}>만</div>
            <div className={`${styles.loadingAnimation}`}>&nbsp;</div>
            <div className={`${styles.loadingAnimation}`}>기</div>
            <div className={`${styles.loadingAnimation}`}>다</div>
            <div className={`${styles.loadingAnimation}`}>려</div>
            <div className={`${styles.loadingAnimation}`}>주</div>
            <div className={`${styles.loadingAnimation}`}>시</div>
            <div className={`${styles.loadingAnimation}`}>오</div>
            <div className={`${styles.loadingAnimation}`}>.</div>
            <div className={`${styles.loadingAnimation}`}>.</div>
            <div className={`${styles.loadingAnimation}`}>.</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Loading;