import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Common/Footer";
import Navbar from "../Common/Navbar";
import Pagination from "react-js-pagination";
import style from "../Dictionary/Dictionary.module.css";
import { useGetWorddictQuery, useLazyGetWorddictQuery } from "../../Store/api";
import { type } from "@testing-library/user-event/dist/type";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import {
  changeDictionaryDetail,
  changeDictList,
  changeDictPage,
  showDictionaryDetail,
} from "../../Store/store";

import styled from "styled-components";
import DictionaryDetail from "./DictionaryDetail";

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
  wordDetailResponseList: [];
};

type Worddict = {
  count: number;
  data: dictresponse[];
  message: string;
};

const DictionaryPage = () => {
  // =========================store============================

  const dictPage = useAppSelector((state: any) => {
    return state.dictPage;
  });
  const dictList = useAppSelector((state: any) => {
    return state.dictList;
  });

  // =========================RTK=========================
  const first = {
    filter: "",
    keyword: "",
    p: 0,
  };
  const {
    data: wordList,
    isLoading: isLading1,
    error: error1,
  } = useGetWorddictQuery(first);

  const [getWorddict] = useLazyGetWorddictQuery();
  // =========================WordList=========================

  const [WordList, setWordList] = useState<Worddict>();
  const [WordListSize, setWordListSize] = useState<number>(46737);
  const [keyWord, setkeyWord] = useState("");
  const [filter, setfilter] = useState("");
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(0);
  const [Search, setSearch] = useState("");
  // ===============charPage==================
  const [pageNumbers, setPageNumbers] = useState<any>([]);
  useEffect(() => {
    const newPageNumbers = [];
    const initialConsonants = [
      { initialConsonants: "전체", id: "" },
      { initialConsonants: "ㄱ", id: "가" },
      { initialConsonants: "ㄴ", id: "나" },
      { initialConsonants: "ㄷ", id: "다" },
      { initialConsonants: "ㄹ", id: "라" },
      { initialConsonants: "ㅁ", id: "마" },
      { initialConsonants: "ㅂ", id: "바" },
      { initialConsonants: "ㅅ", id: "사" },
      { initialConsonants: "ㅇ", id: "아" },
      { initialConsonants: "ㅈ", id: "자" },
      { initialConsonants: "ㅊ", id: "차" },
      { initialConsonants: "ㅋ", id: "카" },
      { initialConsonants: "ㅌ", id: "타" },
      { initialConsonants: "ㅍ", id: "파" },
      { initialConsonants: "ㅎ", id: "하" },
    ];
    for (let i = 0; i < 15; i++) {
      const pageNumber = initialConsonants[i];
      newPageNumbers.push(pageNumber);
    }
    setPageNumbers(newPageNumbers);
    return () => {};
  }, []);

  // ===============charPage==================
  const handlePageChange = (page: any) => {
    // console.log((page * items) / 10);
    console.log("keyword는", keyWord);
    console.log("page는?", page);

    const tempdata = {
      filter: filter,
      keyword: keyWord,
      p: (page * items) / 10 - 1,
    };
    getWorddict(tempdata)
      .unwrap()
      .then((r) => {
        console.log("rtk결과", r);
        // console.log(Math.floor(r.count/10));

        setWordList(r);

        setPage(page);
      });

    // wordList변경
  };
  const handleSearchPageChange = (keyword: any) => {
    const tempdata = {
      filter: "",
      keyword: keyword,
      p: 0,
    };
    // console.log("tempdata", tempdata);

    getWorddict(tempdata)
      .unwrap()
      .then((r) => {
        console.log("rtk결과", r);
        // console.log(Math.floor(r.count/10));
        setWordList(r);
        // console.log("r은?", r.count);
        setWordListSize(r.count)
        setPage(1);
      });

    // wordList변경
  };

  const handleCharPageChange = (filter: any) => {
    const tempdata = {
      filter: filter,
      keyword: "",
      p: 0,
    };
    // console.log("tempdata", tempdata);

    getWorddict(tempdata)
      .unwrap()
      .then((r) => {
        console.log("rtk결과", r);
        // console.log(Math.floor(r.count/10));
        setWordList(r);
        // console.log("r은?", r.count);
        setWordListSize(r.count)
        setSearch("");
        setPage(1);
      });

    // wordList변경
  };

  useEffect(() => {
    console.log(WordList);

    return () => {};
  }, [WordList]);

  useEffect(() => {
    console.log(wordList);
    setWordList(wordList);    
    // setWordListSize(wordList!.count);
    return () => {};
  }, [wordList]);
  // 가로 사이즈에 따라
  const [Width, setWidth] = useState(window.innerWidth);
  const handleResize = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  useEffect(() => {
    // console.log(Width);
    if (Width < 475) {
      setItems(5);
    } else {
      setItems(10);
    }
    return () => {};
  }, [Width]);

  useEffect(() => {
    // console.log("item바뀌었다", items);
    return () => {};
  }, [items]);

  if (isLading1) {
    return <>loading</>;
  } else if (error1) {
    return <>error</>;
  } else {
    // console.log("Math.floor(wordList!.count)", Math.floor(wordList!.count));

    return (
      <>
        {WordList ? (
          <>
            <div className="flex flex-col justify-between h-[80vh]">
              <Navbar />
              <div className="container max-w-screen-lg w-full h-full mx-auto px-10 lg:px-10">
                <Searchbar
                  onchangeSearch={setSearch}
                  Search={Search}
                  WordList={WordList}
                  fetchData={handleSearchPageChange}
                  setWordList={setWordList}
                />
                <CharPagination
                  currentPage={page}
                  newPageNumbers={pageNumbers}
                  totalPages={14}
                  onfilterChange={setfilter}
                  fetchData={handleCharPageChange}
                  changeList={setWordList}
                />
                <List data={WordList} />
                <PaginationBox>
                  <Pagination
                    activePage={page}
                    itemsCountPerPage={items}
                    totalItemsCount={WordListSize}
                    pageRangeDisplayed={items}
                    onChange={handlePageChange}
                  ></Pagination>
                </PaginationBox>
              </div>
              <Footer />
            </div>
          </>
        ) : (
          <>없음</>
        )}
      </>
    );
  }
};

type Searchbar = {
  onchangeSearch: Function;
};

function Searchbar({
  onchangeSearch,
  Search,
  WordList,
  setWordList,
  fetchData,
}: any): JSX.Element {
  const ChangeSearch = (event: any) => {
    console.log(event.target.value);

    onchangeSearch(event.target.value);
  };

  const handleOnKeyPress = (e: any) => {
    if (e.key === "Enter") {
      fetchData(Search);
      // FindWord();
      console.log("검색 ㄱ");
    }
  };
  const [getWorddict, isLoading, error] = useLazyGetWorddictQuery();

  const FindWord = () => {
    const data: dict = {
      filter: "",
      keyword: Search,
      p: 0,
    };
    getWorddict(data)
      .unwrap()
      .then((r: any) => {
        setWordList(r.data);
      });
  };
  return (
    <>
      <div className="flex flex-row justify-between items-baseline ">
        <div className="pt-5 text-[#A87E6E] font-extrabold text-3xl sm:text-3xl md:text-5xl lg:text-6xl">
          사전[辭典]
        </div>
        <input
          type="text"
          value={Search}
          className="border-[#A87E6E] lg:h-[60%] w-[40%] sm:w-[40%] md:w-[40%] lg:w-[40%] border-2 rounded-md py-2 px-5 text-xl sm:text-xl md:text-2xl lg:text-2xl font-medium placeholder:font-normal"
          placeholder="검색"
          onChange={ChangeSearch}
          onKeyPress={handleOnKeyPress}
        />
      </div>
    </>
  );
}

const List = (data: any): JSX.Element => {
  const dispatch = useAppDispatch();
  // console.log("wordList", data);
  const DictionaryDetailClickCheck: any = useAppSelector((state: any) => {
    return state.DictionaryDetailClickCheck;
  });

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
                <button
                  className="pr-2 text-2xl text-[#0078CE] underline underline-offset-[0.3rem]"
                  onClick={() => {
                    // console.log(it);
                    dispatch(changeDictionaryDetail(it));
                    dispatch(showDictionaryDetail());
                  }}
                >
                  {DictionaryDetailClickCheck ? <DictionaryDetail /> : null}
                  {it.wordName}
                </button>
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

interface Props {
  currentPage: number;
  newPageNumbers: any[];
  totalPages: number;
  onfilterChange: Function;
  fetchData: Function;
  changeList: Function;
}
const CharPagination: React.FC<Props> = ({
  currentPage,
  newPageNumbers,
  totalPages,
  onfilterChange,
  fetchData,
  changeList,
}) => {
  const handlePageChange = (pageNumber: any) => {
    console.log("pageNumber는", pageNumber);
    onfilterChange(pageNumber.id);
    fetchData(pageNumber.id);
  };
  const buttonTail =
    "w-[3rem]  h-[3rem] text-[#A87E6E] font-extrabold hover:text-black border-2 text-[1.2rem] border-[#F7CCB7] rounded-lg";
  return (
    <div className="flex flex-row w-full items-center justify-between pt-6">
      {newPageNumbers.map((pageNumber: any) => (
        <button
          className={buttonTail}
          key={pageNumber.initialConsonants}
          onClick={() => handlePageChange(pageNumber)}
        >
          {pageNumber.initialConsonants}
        </button>
      ))}
    </div>
  );
};
const PaginationBox = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 5px;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  ul.pagination li {
    display: inline-block;
    width: 3rem;
    height: 3rem;

    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    margin: 10px;
  }
  ul.pagination li:first-child {
    border-radius: 5px 0 0 5px;
  }
  ul.pagination li:last-child {
    border-radius: 0 5px 5px 0;
  }
  ul.pagination li a {
    text-decoration: none;
    color: #a87e6e;
    font-size: 1.5rem;
  }
  ul.pagination li.active a {
    color: white;
  }
  ul.pagination li.active {
    background-color: #a87e6e;
    border-radius: 5px 5px 5px 5px;
  }
  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: black;
  }
`;

export default DictionaryPage;
