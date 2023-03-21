import Navbar from "../Common/Navbar";
import { useGetDogamUserIdQuery, useGetDogamQuery } from "../../Store/api";
import { Props } from "@react-three/fiber";

function Dogam(): JSX.Element {
  const userId = localStorage.getItem("userId");

  const {
    data: get,
    isLoading: isLoading,
    error: error,
  } = useGetDogamUserIdQuery(userId);
  const {
    data: total,
    isLoading: isLoading2,
    error: error2,
  } = useGetDogamQuery("");

  if (isLoading || isLoading2) {
    return <>로딩중</>;
  } else if (error || error2) {
    return <>에러</>;
  } else {
    return (
      <>
        <div className="w-full h-screen">
          <Navbar />
          <DogamHeader num={Object.keys(get.data).length} />
          <DogamList get={get.data} total={total.data} />
        </div>
      </>
    );
  }
}
export default Dogam;

function DogamHeader({ num }: any): JSX.Element {
  return (
    <>
      <div className="w-full border-b-2 border-[#895229]">
        <div className="container max-w-screen-xl lg:w-[80%] w-full mx-auto font-bold sm:flex block justify-between md:pt-14 pt-8">
          <div className="lg:text-[2.6rem] md:text-[2.3rem] sm:text-[2rem] text-[1.6rem] lg:px-0 px-2 pb-1 text-[#A87E6E]">
            문맥도감[文脈圖鑑]
            <div className="lg:text-[1.5rem] md:text-[1.4rem] sm:text-[1.2rem] text-[1rem] font-medium text-[#8E8E8E] py-1">
              문맥학습으로 단어들을 수집해보세요!
            </div>
          </div>

          <div className="flex justify-end md:pt-6 pt-4 text-[#A2A2A2]">
            <div className="md:px-6 px-4 py-1 mr-2 flex flex-col justify-end rounded-t-lg md:text-[1.2rem] text-[0.9rem]">
              {num} / 100
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function DogamList({ get, total }: any): JSX.Element {
  const numbers = Array.from({ length: 100 }, (_, i) => i + 1);

  return (
    <>
      <div className="w-full py-4">
        <div className="container max-w-screen-xl lg:w-[80%] w-full mx-auto justify-start flex flex-wrap sm:p-2 p-1">
          <div
            className={`md:relative static  sm:h-[15rem] sm:w-[15rem] h-[9rem] w-[9rem] rounded-lg border-2`}
          >
            <div className="text-[0.9rem] text-[#000000] rounded-full bg-[#AEAEAE]"></div>
            <div className="text-[#A87E6E] font-bold md:text-[1.8rem] sm:text-[1.4rem] text-[1.1rem] py-0.5"></div>
          </div>
        </div>
      </div>
    </>
  );
}
