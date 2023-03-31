import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { styled, useTheme } from '@mui/material/styles';

const StyledTextField = styled(TextField)({
    "& label": {
      color: "white"
    },
    "&:hover label": {
    //   fontWeight: 700
    },
    "& label.Mui-focused": {
      color: "white"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white"
      },
      "&:hover fieldset": {
        borderColor: "white",

      },
      "&.Mui-focused fieldset": {
        borderColor: "white"
      }
    }
});

export default function ChatInput() {
    const [msgInput, setMsgInput] = useState("");


    const handleInput = (e) => {
      e.preventDefault();
      setMsgInput(e.target.value);
    }

    return (

        <Box id="chat-header" sx={{backgroundColor: "#1d2230", padding: "1rem 1.5rem", borderRadius: "1.5rem"}}>
                <Box sx={{display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                    <IconButton aria-label="create chat" size="large" color="primary">
                        <SendTwoToneIcon id="add-chat-icon" fontSize="inherit"/>
                    </IconButton>
                    <StyledTextField
                        key="chat-input-1"
                        id="outlined-multiline-flexible"
                        label="Enter Message"
                        multiline
                        variant="outlined" 
                        maxRows={4}
                        value={msgInput}
                        inputProps={{ style: { color: "#ffffff" } }}
                        sx={{flexGrow: 1, color: "#ffffff"}}
                        onInput={handleInput}
                    />

                    {/* <input onInput={handleInput}></input> */}
                </Box>
        </Box>
    
    );

}