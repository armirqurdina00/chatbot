import { useContext } from "react";
import { MyContext } from "./MyContext";
import DeleteIcon from "@mui/icons-material/Delete";

const Sidebar = () => {
  const { chats, currentChat, setChats, setAllTexts, setCurrentChat } =
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
    if (currentChat === chat) selectChat(newTexts[newTexts.length-1].chat)
  };

  const selectChat = (chat) => {
    setCurrentChat(chat);

    const storedTexts = JSON.parse(localStorage.getItem("texts")) || [];
    const storedText = storedTexts.find((t) => t.chat === chat) || {};
    setAllTexts(storedText.texts);
  };

  return (
    <div className="bg-black md:w-1/6 w-0 h-screen text-white">
      <h1 className="p-2 text-xl">Welcome to Chatbot</h1>

      <h1 className="p-2 text-xl">
        <button onClick={addNewChat} className="hover:text-underline">Add new chat</button>
      </h1>
      {chats &&
        chats.map((chat) => (
          <div key={chat} className={`p-2 text-lg flex justify-between ${chat === currentChat && 'bg-gray-200 text-black'}`}>
            <button onClick={() => selectChat(chat)}>{chat}</button>
            <DeleteIcon titleAccess="Delete" className="cursor-pointer hover:text-red-600" onClick={() => deleteChat(chat)} />
          </div>
        ))}
    </div>
  );
};

export default Sidebar;