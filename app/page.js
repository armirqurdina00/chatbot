"use client";

import { useEffect, useState, useRef } from "react";
import Sidebar from "./components/sidebar";
import SearchBar from "./components/SearchBar";

import { MyContext } from "./components/MyContext";

import Router from "next/router";
import { BeatLoader } from "react-spinners";

export default function Home() {
  const [text, setText] = useState("");
  const [allTexts, setAllTexts] = useState([]);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const texts = JSON.parse(localStorage.getItem("texts")) || [];
  const initialChats = texts.map((t) => t.chat);
  const [chats, setChats] = useState(initialChats);
  const [currentChat, setCurrentChat] = useState(initialChats[0]);

  const bottomSection = useRef(null);

  useEffect(() => {
    bottomSection.current.scroll({
      top: bottomSection.current.scrollHeight,
      behavior: "smooth",
    });
  }, [allTexts]);

  return (
    <MyContext.Provider
      value={{
        text,
        setText,
        allTexts,
        setAllTexts,
        response,
        setResponse,
        loading,
        setLoading,
        bottomSection,
        currentChat,
        setCurrentChat,
        chats,
        setChats,
      }}
    >
      <div className="flex">
        <Sidebar />
        <div className="md:w-5/6 w-full h-screen overflow-scroll relative">
          <div className="w-full h-screen flex flex-col-reverse justify-between">
            <div className="w-full h-1/6 flex justify-center items-center border border-t-black">
              <SearchBar />
            </div>
            <div
              className="w-full flex justify-center h-5/6 overflow-scroll my-6"
              ref={bottomSection}
              id="bottom-section"
            >
              <div className="md:w-1/2 w-3/4">
                {allTexts &&
                  allTexts.map((session, index) => (
                    <div key={index}>
                      <div className="w-full bg-[#222] text-white rounded-xl p-3 my-5 overflow-scroll">
                        {session.question}
                      </div>
                      {session.answer && (
                        <div className="w-full rounded-xl bg-gray-200 p-3 my-5 overflow-scroll">
                          {session.answer}
                        </div>
                      )}
                    </div>
                  ))}
                {loading && (
                  <div className="flex my-10 justify-center">
                    <BeatLoader color="gray" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MyContext.Provider>
  );
}