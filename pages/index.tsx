import type { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import axios from "axios";
import Link from "next/link";

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
    console.log("req:", e.target.value);

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
        <link rel="icon" href="/icon.jpg" />
      </Head>
      <div className="w-full flex items-center flex-col px-2">
        <div className="w-full h-auto flex items-center flex-col">
          <p className="text-black mt-14 text-4xl">অভিধান</p>
          <p className=" text-gray-500">বাংলা একাডেমি আধুনিক বাংলা অভিধান</p>
          <input
            className=" mt-5 bg-blue-50 m-2 p-2 max-w-xl w-full rounded-md outline-blue-500 focus:bg-white"
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
        <div className="flex justify-between w-full max-w-xl mt-2 mb-1">
          <div className=" text-xs">
            সূত্র:
            <span className="text-gray-500">
              {" "}
              বাংলা একাডেমি আধুনিক বাংলা অভিধান
            </span>
          </div>
          <div className="text-xs">
            ©{" "}
            <Link href="https://github.com/tajultonim">
              <a className=" text-gray-500">তাজুল তনিম </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

function WordCard(prop: any) {
  return (
    <>
      <div className=" w-full py-2 px-4 border-b-[1px] border-gray-200">
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
