import React, { useEffect, useState } from "react";
import Footer from "../Common/Footer";
import Navbar from "../Common/Navbar";
import ReactPaginate from "react-paginate";
import style from "../Dictionary/Dictionary.module.css";
import { useGetWorddictQuery, useLazyGetWorddictQuery } from "../../Store/api";
import { type } from "@testing-library/user-event/dist/type";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { changeDictList, changeDictPage } from "../../Store/store";

type dict = {
  filter: string;
  keyword: string;
  p: number;
};

type wordExampleResponseList = {
  exampleDetail: string;
  exampleType: string;
};

type wordDetailResponseList = {
  detailNum: number;
  details: Array<string>;
  wordExampleResponseList: wordExampleResponseList[];
};

type dictresponse = {
  wordId: number;
  wordName: string;
  wordIso: number;
  wordType: string;
  wordRating: string;
  wordOrigin: string;
  wordDetailResponseList: wordDetailResponseList[];
};

const DictionaryPage = () => {
  // store
  let dispatch = useAppDispatch();
  const dictPage = useAppSelector((state: any) => {
    return state.dictPage;
  });
  const dictList = useAppSelector((state: any) => {
    return state.dictList;
  });

  const [WordList, setWordList] = useState();

  // RTK
  const first = {
    filter: "",
    keyword: "",
    p: 0,
  };
  const { data: wordList, isLoading, error } = useGetWorddictQuery(first);

  useEffect(() => {
    setWordList(wordList);
    return () => {};
  }, [wordList]);

  if (isLoading) {
    return <>loading</>;
  } else if (error) {
    return <>error</>;
  } else {
    return (
      <>
        {WordList ? (
          <div className="flex flex-col justify-between h-[100vh]">
            <Navbar />
            <div className="container max-w-screen-lg w-full mx-auto px-10 lg:px-10">
              <Search />
              <List data={WordList} />
            </div>
            <Footer />
          </div>
        ) : (
          <>없음</>
        )}
      </>
    );
  }
};

function Search(): JSX.Element {
  const [Search, setSearch] = useState("");
  const ChangeSearch = (event: any) => {
    console.log(event.target.value);

    setSearch(event.target.value);
  };

  // const handleOnKeyPress = (e: any) => {
  //   if (e.key === "Enter") {
  //     FindWord();
  //     console.log("검색 ㄱ");
  //   }
  // };
  // const [getWorddict, isLoading, error] = useLazyGetWorddictQuery();

  // const FindWord = () => {
  //   const data: dict = {
  //     filter: "",
  //     keyword: Search,
  //     p: 0,
  //   };
  //   getWorddict(data)
  //     .unwrap()
  //     .then((r: any) => {
  //       console.log(r.data);
  //     });
  // };
  return (
    <>
      <div className="flex flex-row justify-between items-baseline container max-w-screen-lg w-full ">
        <div className=" text-[#A87E6E] font-extrabold text-3xl sm:text-3xl md:text-5xl lg:text-6xl">
          사전[辭典]
        </div>
        <input
          type="text"
          className="border-[#A87E6E] lg:h-[60%] w-[40%] sm:w-[40%] md:w-[40%] lg:w-[40%] border-2 rounded-md py-2 px-5 text-xl sm:text-xl md:text-2xl lg:text-2xl font-medium placeholder:font-normal"
          placeholder="검색"
          onChange={ChangeSearch}
          // onKeyPress={handleOnKeyPress}
        />
      </div>
    </>
  );
}

const List = (data: any) => {
  console.log(data);

  return (
    <div className={`m-3 max-h-[50%] overflow-auto ${style.example} `}>
      <div className="flex flex-col">
        {data.data.data.map((it: any) => {
          var a = new Array();
          it.wordDetailResponseList.map(function (wordDetailResponseList: any) {
            a.push(wordDetailResponseList.details);
          });
          const temp = a.join(" / ");

          return (
            <>
              <div className="flex flex-row items-baseline my-2 font-extrabold">
                <div className="pr-2 text-2xl text-[#0078CE] underline underline-offset-[0.3rem]">
                  {it.wordName}
                </div>
                {it.wordOrigin ? (
                  <div className=" text-[#767676] font-normal">
                    [ {it.wordOrigin} ]
                  </div>
                ) : null}
                <div className="pl-2 text-[#767676] font-normal">
                  {it.wordType}
                </div>
              </div>
              <div className="max-w-full truncate my-3">{temp}</div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default DictionaryPage;
