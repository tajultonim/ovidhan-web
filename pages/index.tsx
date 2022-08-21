import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";

const Home: NextPage = () => {
  const [words, setWords] = useState([]);

  let searchTimeout: any;
  function checkInput(e: any) {
    if (searchTimeout != undefined) clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      callServerScript(e);
    }, 1000);
  }
  function callServerScript(e: any) {
    console.log("req:",e.target.value);
    
    axios("/api/search?q=" + e.target.value).then((res: any) => {
      setWords(res.data);
    });
  }
  return (
    <>
      <Head>
        <title>
          বাংলা একাডেমি আধুনিক বাংলা অভিধান – Bangla Academy Adhunik Bangla
          Ovidhan
        </title>
      </Head>
      <div className="w-full flex items-center flex-col">
        <div className=" bg-blue-300 w-full h-auto flex justify-center">
          <input
            className="m-2 p-2 max-w-xl w-full rounded-md"
            placeholder="কাঙ্ক্ষিত শব্দ লিখুন"
            onChange={checkInput}
          />
        </div>
        <div className="max-w-xl w-full">
          {words.map((word: any) => (
            <WordCard
              key={word.item.count}
              word={word.item.word}
              pronunciation={word.item.pronunciation}
              definition={word.item.definition}
            />
          ))}
        </div>
      </div>
    </>
  );
};

function WordCard(prop: any) {
  return (
    <>
      <div className=" w-full py-2 px-4 bg-gray-100 border-b-[1px] border-gray-200">
        <p>
          <span className=" text-lg text-gray-900">{prop.word}</span>
          <span className=" pl-1 text-gray-500 text-xs">
            /{prop.pronunciation}/
          </span>
        </p>
        <p className=" text-gray-800">{prop.definition}</p>
      </div>
    </>
  );
}

export default Home;
