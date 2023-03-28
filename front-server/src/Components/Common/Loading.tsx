import styles from "./Common.module.css";


function Loading():JSX.Element {

    return(
        <>
         <div className="mx-auto container max-w-screen-xl h-[100vh] flex flex-col justify-center">
            <div className={`${styles.loading} w-[10rem] h-[10rem]`}></div>
            <div className="text-[2.5rem] text-center">조금만 기다려주세요.</div>
         </div>
        </>
    )
}

export default Loading;