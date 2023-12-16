import { TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "./MyContext";

// const url = 'https://api-v2.longshot.ai/custom/api/generate/factgpt/custom';
const url = "/api/answers";

const SearchBar = () => {
  const {
    text,
    setText,
    allTexts,
    setAllTexts,
    loading,
    setLoading,
    currentChat,
  } = useContext(MyContext);

  const storeTextsToCache = (texts) => {
    const storedTexts = JSON.parse(localStorage.getItem("texts")) || [];
    const storedText = storedTexts.find((t) => t.chat === currentChat) || {};
    storedText.texts = texts;
    window.localStorage.setItem("texts", JSON.stringify(storedTexts));
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!text) return;

    setLoading(true);

    const newSession = {
      question: text,
    };
    setAllTexts([...allTexts, newSession]);

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSession),
    })
      .then((response) => response.json())
      .then((result) => {
        setLoading(false);

        setAllTexts((allTexts) => {
          const newTexts = allTexts.map((session) => {
            if (session.question === text) {
              return { ...session, answer: result.content };
            }
            return session;
          });
          storeTextsToCache(newTexts);
          return newTexts;
        });

        setText("");
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors here
      });
  };

  const SendButton = () => (
    <IconButton onClick={onFormSubmit}>
      <SendIcon />
    </IconButton>
  );

  return (
    <form onSubmit={onFormSubmit} className="md:w-1/2 w-3/4">
      <TextField
        id="outlined-basic"
        label="Message chatbot"
        variant="outlined"
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "black",
            },
          "& .MuiInputLabel-outlined.Mui-focused": {
            color: "black",
          },
        }}
        InputProps={{ endAdornment: <SendButton /> }}
        disabled={loading ? true : false}
      />
    </form>
  );
};

export default SearchBar;