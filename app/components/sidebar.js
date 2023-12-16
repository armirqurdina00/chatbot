import { useContext } from "react";
import { MyContext } from "./MyContext";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from '@mui/icons-material/Close';

const Sidebar = () => {
  const { chats, currentChat, setChats, setAllTexts, setCurrentChat, sideBarRef } =
    useContext(MyContext);

  const addNewChat = () => {
    const storedTexts = JSON.parse(localStorage.getItem("texts")) || [];
    const chat = `chat_${Date.now()}`;
    storedTexts.push({ chat, texts: [] });
    localStorage.setItem("texts", JSON.stringify(storedTexts));
    setChats(storedTexts.map((t) => t.chat));
    setAllTexts([]);
    setCurrentChat(chat);
  };

  const deleteChat = (chat) => {
    const storedTexts = JSON.parse(localStorage.getItem("texts")) || [];
    const storedText = storedTexts.find((t) => t.chat === chat);
    if (storedTexts.length === 1) {
      alert('You need to have at least one active chat')
      return;
    }
    if (!storedText) return;

    const newTexts = [...storedTexts.filter((t) => t !== storedText)];
    localStorage.setItem("texts", JSON.stringify(newTexts));
    setChats(newTexts.map((t) => t.chat));
    setAllTexts([]);
    if (currentChat === chat) selectChat(newTexts[newTexts.length - 1].chat)
  };

  const selectChat = (chat) => {
    setCurrentChat(chat);

    const storedTexts = JSON.parse(localStorage.getItem("texts")) || [];
    const storedText = storedTexts.find((t) => t.chat === chat) || {};
    setAllTexts(storedText.texts);
  };

  return (
    <div className="bg-black md:w-2/6 lg:w-1/5 md:static w-2/3 absolute top-0 left-0 md:translate-x-0 -translate-x-full z-10 h-screen text-white transition-all" ref={sideBarRef}>
      <div className="flex justify-between items-center">
        <h1 className="p-2 text-xl">Welcome to Chatbot</h1>
        <div className="md:hidden p-2 cursor-pointer" onClick={() => sideBarRef.current.classList.replace('translate-x-0', '-translate-x-full')}><CloseIcon /></div>
      </div>
      <h1 className="p-2 text-xl">
        <button onClick={addNewChat} className="hover:text-underline">Add new chat</button>
      </h1>
      {chats &&
        chats.map((chat) => (
          <div key={chat} className={`p-2 text-lg flex justify-between overflow-scroll ${chat === currentChat && 'bg-gray-200 text-black'}`}>
            <button onClick={() => selectChat(chat)}>{chat}</button>
            <DeleteIcon titleAccess="Delete" className="cursor-pointer hover:text-red-600" onClick={() => deleteChat(chat)} />
          </div>
        ))}
    </div>
  );
};

export default Sidebar;