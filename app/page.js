'use client'

import { useEffect, useState } from "react";
import Sidebar from "./components/sidebar";
import SearchBar from "./components/SearchBar";

import { MyContext } from "./components/MyContext";

export default function Home() {
  const [text, setText] = useState("")
  const [allTexts, setAllTexts] = useState([])

  return (
    <MyContext.Provider value={{ text, setText, allTexts, setAllTexts }}>
      <div className="flex">
        <Sidebar />
        <div className="md:w-5/6 w-full h-screen overflow-scroll relative">
          <div className="w-full h-screen flex flex-col-reverse justify-between">
            <div className="w-full h-1/6 flex justify-center items-center border border-t-black">
              <SearchBar />
            </div>
            <div className="w-full flex justify-center h-5/6 overflow-scroll my-6">
              <div className="md:w-1/2 w-3/4">
                {allTexts && allTexts.map((text) => (
                  <div className="w-full border border-black rounded-xl p-3 my-5 overflow-scroll">{text}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MyContext.Provider>
  )
}
