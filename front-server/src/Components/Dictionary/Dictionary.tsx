import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Common/Footer";
import Navbar from "../Common/Navbar";
import Pagination from "react-js-pagination";
import style from "../Dictionary/Dictionary.module.css";
import { useGetWorddictQuery, useLazyGetWorddictQuery, usePutUserBadgeMalrangMutation } from "../../Store/api";
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
import { toast } from "react-toastify";
import { Toast } from "../Common/Toast";
import Loading from "../Common/Loading";
import ErrorPage from "../Common/ErrorPage";

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

  // const dictPage: string = useAppSelector((state) => {
  //   return state.dictPage;
  // });
  // const dictList: string = useAppSelector((state) => {
  //   return state.dictList;
  // });

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
  const [WordListSize, setWordListSize] = useState<number>(46730);
  const [keyWord, setkeyWord] = useState("");
  const [filter, setfilter] = useState("");
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(0);
  const [Search, setSearch] = useState("");
  // ===============charPage==================
  const [pageNumbers, setPageNumbers] = useState<any>([]);
  const DictionaryDetailClickCheck: any = useAppSelector((state: any) => {
    return state.DictionaryDetailClickCheck;
  });
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
    const tempdata = {
      filter: filter,
      keyword: keyWord,
      p: page,
    };
    getWorddict(tempdata)
      .unwrap()
      .then((r) => {
        // console.log("rtk결과", r);
        // console.log(Math.floor(r.count / 10));

        setWordList(r);

        setPage(page);
      })
      .catch((e) => {
        console.log(e.status === 400);
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
        // console.log("rtk결과", r);
        // console.log(Math.floor(r.count/10));
        setWordList(r);
        // console.log("r은?", r.count);
        setWordListSize(r.count);
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
        // console.log("rtk결과", r);
        // console.log(Math.floor(r.count/10));
        setWordList(r);
        // console.log("r은?", Math.floor(r.count/10)*10);

        setWordListSize(Math.floor(r.count / 10) * 10);
        setSearch("");
        setPage(1);
      });

    // wordList변경
  };

  useEffect(() => {
    // console.log(WordList);

    return () => {};
  }, [WordList]);

  useEffect(() => {
    // console.log(wordList);
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
    return <Loading />;
  } else if (error1) {
    return <ErrorPage />;
  } else {
    // console.log("Math.floor(wordList!.count)", Math.floor(wordList!.count));

    return (
      <>
        <Toast/>
        {WordList ? (
          <>
            <Navbar />
            <Searchbar
              onchangeSearch={setSearch}
              Search={Search}
              WordList={WordList}
              fetchData={handleSearchPageChange}
              setWordList={setWordList}
            />
            <div className="flex flex-col justify-between min-h-[80vh]">
              <div className="container max-w-screen-lg w-full h-full mx-auto px-10 lg:px-10">
                <CharPagination
                  currentPage={page}
                  newPageNumbers={pageNumbers}
                  totalPages={14}
                  onfilterChange={setfilter}
                  fetchData={handleCharPageChange}
                  changeList={setWordList}
                />
                <List data={WordList} />
                {DictionaryDetailClickCheck ? <DictionaryDetail /> : null}
                <PaginationBox>
                  <Pagination
                    activePage={page}
                    itemsCountPerPage={10}
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

  const [putUserBadgeMalrang, {isLoading:isLoading1, isError:isError1}] = usePutUserBadgeMalrangMutation()

  const ChangeSearch = (event: any) => {
    // console.log(event.target.value);
    
    

    onchangeSearch(event.target.value);
  };

  const handleOnKeyPress = (e: any) => {
    if (e.key === "Enter") {
      fetchData(Search);
      const userId = localStorage.getItem('userId')
      if (Search === '홍민정음') {
        putUserBadgeMalrang([userId,23]).unwrap().then((r)=> {
          if (r.newbadge.length) {
            toast.success('숨겨진 칭호를 획득했습니다!')
          } else {
            toast.error('이미 획득했습니다!')
          }
        })
      }
      // FindWord();
      // console.log("검색 ㄱ");
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
      <div className="flex flex-row max-w-screen-lg mx-10 md:mx-auto justify-between items-baseline mt-10  ">
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
  // const DictionaryDetailClickCheck: any = useAppSelector((state: any) => {
  //   return state.DictionaryDetailClickCheck;
  // });

  return (
    <div className={`m-3 max-h-[100%] max-w-screen-md mx-auto`}>
      <div className="flex flex-col">
        {data.data.data.map((it: any) => {
          var a = new Array();
          it.wordDetailResponseList.map(function (wordDetailResponseList: any) {
            a.push(wordDetailResponseList.details);
          });
          const temp = a.join(" / ");
          return (
            <div className="border-b-2 my-2">
              <div className="flex flex-row items-baseline font-extrabold">
                <button
                  className="pr-2 text-1xl text-[#b97912] underline underline-offset-[0.3rem]"
                  onClick={() => {
                    // console.log(it);
                    dispatch(changeDictionaryDetail(it));
                    dispatch(showDictionaryDetail());
                  }}
                >
                  {/* {DictionaryDetailClickCheck ? <DictionaryDetail /> : null} */}
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
              <div className="max-w-full truncate mt-2 mb-3">{temp}</div>
            </div>
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
    // console.log("pageNumber는", pageNumber);
    onfilterChange(pageNumber.id);
    fetchData(pageNumber.id);
  };
  const buttonTail =
    "md:w-[3rem]  md:h-[3rem] text-[#A87E6E] font-extrabold hover:text-black focus:bg-[#b97912] focus:text-white focus:border-none  border-2 text-[0.8rem] md:text-[1.2rem] border-[#F7CCB7] rounded-lg md:rounded-2xl";
  return (
    <div className="flex flex-row w-full items-center justify-between pt-6 ">
      {newPageNumbers.map((pageNumber: any) => (
        <button
          className={`${buttonTail} text-ellipsis active:bg-[#b97912]  `} 
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
