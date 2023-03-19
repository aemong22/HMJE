import Navbar from "../Common/Navbar"

function Dogam(): JSX.Element {
  const userId = localStorage.getItem("userId")


    return(
      <>
        <div className="w-full h-screen">
          <Navbar />
          <DogamHeader />
          <DogamList/>
        </div>
      </>
    )
  
}
export default Dogam

function DogamHeader(): JSX.Element {
  return(
    <>
      <div className="w-full border-b-2 border-[#895229]">
        <div className="container max-w-screen-xl lg:w-[80%] w-full mx-auto font-bold sm:flex block justify-between md:pt-14 pt-8">
          <div className="lg:text-[2.6rem] md:text-[2.3rem] sm:text-[2rem] text-[1.6rem] lg:px-0 px-2 pb-1 text-[#A87E6E]">문맥도감[文脈圖鑑]
          <div className="lg:text-[1.5rem] md:text-[1.4rem] sm:text-[1.2rem] text-[1rem] font-medium text-[#8E8E8E] py-1">문맥학습으로 단어들을 수집해보세요!</div>
          </div>
          
          <div className="flex justify-end md:pt-6 pt-4 text-[#A2A2A2]">
              <div className="md:px-6 px-4 py-1 mr-2 flex flex-col justify-end rounded-t-lg md:text-[1.2rem] text-[0.9rem]">
                12 / 100
              </div>
          </div>
        </div>
      </div>
    </>
  )
}


function DogamList(): JSX.Element {
    return (
      <></>
    )
}