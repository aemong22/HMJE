import { Dictionary } from "@reduxjs/toolkit";
import React from "react";
import Footer from "../Common/Footer";
import Navbar from "../Common/Navbar";
interface test {
  word_id: string;
  word_name: string;
  word_iso: string;
  word_type: string;
  word_rating: string;
  word_class: string;
  word_origin: string;
  word_detail: string;
  word_example: string;
  word_relation: string;
}
const DictionaryPage = () => {
  const TempWord: test[] | null | undefined = [
    {
      word_class: "test_word_class",
      word_detail: "시와 시, 시와 군 사이의 경계.",
      word_example: "test_word_example",
      word_id: "test_word_id",
      word_iso: "test_word_iso",
      word_name: "시계",
      word_origin: "市界",
      word_rating: "test_word_rating",
      word_relation: "test_word_relation",
      word_type: "명사",
    },
    {
      word_class: "test_word_class",
      word_detail:
        "시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2",
      word_example: "test_word_example",
      word_id: "test_word_id",
      word_iso: "test_word_iso",
      word_name: "시계2",
      word_origin: "市界2",
      word_rating: "test_word_rating",
      word_relation: "test_word_relation",
      word_type: "명사2",
    },
  ];
  console.log(TempWord);

  return (
    <>
      <div className="flex flex-col justify-between h-[100vh]">
        <Navbar />
        <Search />
        <List word={TempWord} />
        <Footer />
      </div>
    </>
  );
};

function Search(): JSX.Element {
  return (
    <>
      <div className="flex flex-row justify-between items-baseline container max-w-screen-lg w-full mx-auto px-10 lg:px-0">
        <div className=" text-[#A87E6E] font-extrabold text-3xl sm:text-3xl md:text-5xl lg:text-6xl">
          사전[辭典]
        </div>
        <input
          type="text"
          className="border-[#A87E6E] lg:h-[60%] w-[40%] sm:w-[40%] md:w-[40%] lg:w-[40%] border-2 rounded-md py-2 px-5 text-xl sm:text-xl md:text-2xl lg:text-2xl font-medium placeholder:font-normal"
          placeholder="검색"
        />
      </div>
    </>
  );
}

const List = ({ word }: { word: test[] }): JSX.Element => {
  return (
    <>
      <div className="flex flex-col container max-w-screen-lg w-full mx-auto px-10 lg:px-0">
        {word.map(function (word) {
          return (
            <div className="py-2">
              <div className="flex flex-row items-baseline">
                <div className="text-[#0078CE] text-2xl underline">
                  {word.word_name}
                </div>
                <div className="px-3">[ {word.word_origin} ]</div>
                <div>{word.word_type}</div>
              </div>
              <div className="truncate">{word.word_detail}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default DictionaryPage;
