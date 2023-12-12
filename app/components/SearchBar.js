import { TextField, IconButton } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useContext } from "react";
import { MyContext } from "./MyContext";

const SearchBar = () => {

    const { text, setText, allTexts, setAllTexts } = useContext(MyContext);

    const onFormSubmit = (e) => {
        e.preventDefault();
        if (!text) return;
        const updateAllTexts = [...allTexts, text];
        setAllTexts(updateAllTexts)
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
            />
        </form>
    );
}

export default SearchBar;