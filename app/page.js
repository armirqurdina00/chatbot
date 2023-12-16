"use client";

import { useEffect, useState, useRef } from "react";
import Sidebar from "./components/sidebar";
import SearchBar from "./components/SearchBar";

import { MyContext } from "./components/MyContext";

import Router from "next/router";
import { BeatLoader } from "react-spinners";
import MenuIcon from '@mui/icons-material/Menu';

export default function Home() {
  const [text, setText] = useState("");
  const [allTexts, setAllTexts] = useState([]);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const texts = JSON.parse(localStorage.getItem("texts")) || [];
  if (texts.length == 0) {
    const newChat = { chat: `chat_${Date.now()}`, texts: [] };
    texts.push(newChat);
    window.localStorage.setItem("texts", JSON.stringify(texts));
  }
  const initialChats = texts.map((t) => t.chat);
  const [chats, setChats] = useState(initialChats);
  const [currentChat, setCurrentChat] = useState(initialChats[0]);

  const bottomSection = useRef(null);
  const sideBarRef = useRef(null)

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
        sideBarRef
      }}
    >
      <div className="flex">
        <div className="cursor-pointer absolute z-10 p-4 md:hidden " onClick={() => {
          sideBarRef.current.classList.replace('-translate-x-full', 'translate-x-0')
        }}>
          <MenuIcon className="" />
        </div>
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
              <div className="md:w-1/2 w-3/4 md:mt-0 mt-5">
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