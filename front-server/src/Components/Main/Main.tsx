import Footer from "../Common/Footer"
import Navbar from "../Common/Navbar"
import Pangguin from "../Threejs/Pangguin"
import style from './Main.module.css'

function Main():JSX.Element {
    return(
        <>
            <Navbar/>
            <MyInfo/>
            <StudyContent/>
            <Footer/>
        </>
    )
}
export default Main


// 맨위 : 유저 정보 , 오늘의 정보
function MyInfo():JSX.Element {
    return (
        <div className="bg-[#F0ECE9]">
            <div className="container lg:w-[70%] w-full mx-auto flex flex-col md:flex-row md:justify-between items-center text-center py-[2rem]">
                <div className="md:w-[40%] w-[90%] bg-[#ffffff] py-[1.5rem] md:px-[2.5rem] rounded-md px-[1rem]">
                    <Pangguin/>
                    <div className="md:text-[1.2rem] text-[1rem] py-1 font-bold">
                        한글을 사랑하는 자
                    </div>
                    <div className="md:text-[2.2rem] text-[2rem] font-bold">
                        펭귄
                    </div>
                    <div className="md:text-[1.2rem] text[1rem] py-1 font-bold text-zinc-500" >
                        정2품
                    </div>
                    <div className="md:text-[0.8rem] text-[0.5rem] px-2 border-2 border-[#A87E6E] w-fit mx-auto rounded-full bg-[#F0ECE9] font-bold text-[#A87E6E]">
                        正二品
                    </div>
                    <div className="bg-[#F0ECE9] rounded-lg my-2">
                        <div className="bg-[#F7CCB7] rounded-lg w-[50%] py-[0.5rem]"></div>
                    </div>
                    <div className="text-[0.9rem] text-zinc-400">
                       50 / 100
                    </div>
                </div>
                <div className="md:w-[50%] w-[90%] pt-[2rem] pb-[0.5rem]">
                    <div className="md:text-[2.5rem] text-[2rem] font-bold">
                        오늘의
                    </div>
                    <div className="flex justify-center md:my-8 my-3">
                        <div className="w-[50%]">
                            <div className="md:text-[2.5rem] text-[2rem] font-bold text-[#BE8D65]">1<span className="md:text-[1.5rem] text-[1rem]">시간 </span>27<span className="md:text-[1.5rem] text-[1rem]">분</span></div>
                            <div className="md:text-[1.2rem] text-[0.8rem] pt-3  text-zinc-500">학습 시간</div>
                        </div>
                        <div className="w-[50%]">
                            <div className="md:text-[2.5rem] text-[2rem] font-bold text-[#BE8D65]">32<span className="md:text-[1.5rem] text-[1rem]">개</span></div>
                            <div className="md:text-[1.2rem] pt-3 text-[0.8rem] text-zinc-500">학습 단어</div>
                        </div>
                    </div>
                    <div className="flex justify-center rounded-full bg-[#A87E6E] p-[0.7rem] md:text-[2.2rem] text-[1.5rem] font-bold text-[#ffffff]">
                       <div className={ `${style.iconBook}`}></div><div>오늘의 단어</div>
                    </div>
                </div>
            </div>
        </div>
    )
}


// 학습 (3가지)

function StudyContent():JSX.Element {
    return (
        <>
            <div className="container lg:w-[70%] w-full  mx-auto text-center pt-[7rem]">
                <div className="text-[1.4rem]">홍민정음</div>
                <div className="text-[2.2rem] font-bold ">신나고 즐거운 <span className="text-[#A87E6E]">학습</span></div>
                <div className="flex md:justify-between flex-col md:flex-row items-center my-5">
                    <div className={`${style.studyContents} md:w-[30%] w-[90%] border-2 border-violet-900 rounded-md`}>
                        <div className="font-bold text-[1.0rem]">오늘의 학습 </div>
                        <div className="font-bold text-[1.5rem]" >단어학습</div>
                        <div className="font-bold text-[0.8rem]">뜻을 읽고 해당 단어를 찾고,<br/>정확한 뜻을 학습해보세요!</div>

                    </div>
                    <div className={`${style.studyContents} md:w-[30%] w-[90%] border-2 border-violet-900 rounded-md`}>
                        다의어 학습 <br/>
                        문맥학습
                    </div>
                    <div className={`${style.studyContents} md:w-[30%] w-[90%] border-2 border-violet-900 rounded-md`}>
                        실력점검 <br/>
                        과거시험
                    </div>
                </div>
            </div>
        </>
    )
}



