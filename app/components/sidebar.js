import { useContext } from "react";
import { MyContext } from "./MyContext";
import DeleteIcon from "@mui/icons-material/Delete";

const Sidebar = () => {
  const { chats, setChats, setAllTexts, setCurrentChat } =
    useContext(MyContext);

  const addNewChat = () => {
    const storedTexts = JSON.parse(localStorage.getItem("texts")) || [];
    const chat = `chat_${Date.now()}`;
    storedTexts.push({ chat, texts: [] });
    localStorage.setItem("texts", JSON.stringify(storedTexts));
    setChats(storedTexts.map((t) => t.chat));
    setAllTexts([]);
  };

  const deleteChat = (chat) => {
    const storedTexts = JSON.parse(localStorage.getItem("texts")) || [];
    const storedText = storedTexts.find((t) => t.chat === chat);
    if (!storedText) return;

    const newTexts = [...storedTexts.filter((t) => t !== storedText)];
    localStorage.setItem("texts", JSON.stringify(newTexts));
    setChats(newTexts.map((t) => t.chat));
    setAllTexts([]);
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
        <button onClick={addNewChat}>Add new chat</button>
      </h1>
      {chats &&
        chats.map((chat) => (
          <div key={chat} className="p-2 text-l">
            <button onClick={() => selectChat(chat)}>{chat}</button>
            <DeleteIcon onClick={() => deleteChat(chat)} />
          </div>
        ))}
    </div>
  );
};

export default Sidebar;