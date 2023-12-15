import { TextField, IconButton } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useContext, useEffect, useState } from "react";
import { MyContext } from "./MyContext";

// const url = 'https://api-v2.longshot.ai/custom/api/generate/factgpt/custom';
const url = '/api/answers';


const SearchBar = () => {

    const { text, setText, allTexts, setAllTexts, response, setResponse, loading, setLoading, bottomSection } = useContext(MyContext);

    const onFormSubmit = (e) => {
        e.preventDefault();
        if (!text) return;
        setLoading(true);
        const new_session = {
            question: text,
        }
        setAllTexts([...allTexts, new_session])
        const data = {
            question: text,
        };
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(result => {
                setResponse(result.content)
                setLoading(false)
                setAllTexts(allTexts => allTexts.map((session) => {
                    if (session.question === text) {
                        return { ...session, answer: result.content };
                    }
                    return session;
                }))
                // save to local storage
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle errors here
            });
        setText('')
    }

    const SendButton = () => (
        <IconButton onClick={onFormSubmit}>
            <SendIcon />
        </IconButton>
    )

    return (
        <form onSubmit={onFormSubmit} className="md:w-1/2 w-3/4">
            <TextField
                id="outlined-basic"
                label="Message chatbot"
                variant="outlined"
                value={text}
                onChange={(e) => setText(e.target.value)}
                sx={{
                    width: '100%', "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black"
                    }, "& .MuiInputLabel-outlined.Mui-focused": {
                        color: "black"
                    }
                }}
                InputProps={{ endAdornment: <SendButton /> }}
                disabled={loading ? true : false}
            />
        </form>
    );
}

export default SearchBar;