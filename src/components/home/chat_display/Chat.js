import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// Added
import { useHistory, useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import Message from './Message';
import { useState } from 'react';


export default function Chat() {
    const theme = useTheme();
    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    const {league, isLoading, isError, message} = useSelector((state) => state.leagueSelected);
    const {user} = useSelector((state) => state.auth);
    const [msgInput, setMsgInput] = useState("");

    //Temp ID, will get chat id from league data
    const id = "1";
    const tempChatData = [
        {
            _id: "0",
            chatName: "Test Chat 1",
            users: [{name: "Zach Flegle", _id:"63cc338333a02d1e66d95569", username: "zflegs"}, {name: "Other User", _id:"u2", username: "user2"}],
            messages: [{username: "zflegs", time: "0", msg: "Howdy!"}, {username: "user2", time: "1", msg: "Suh Dude!"}],
        },
        {
            _id: "1",
            chatName: "Test Chat 2",
            users: [{name: "Zach Flegle", _id:"63cc338333a02d1e66d95569", username: "zflegs"}, {name: "Other User", _id:"u2", username: "user2"}, {name: "Some Guy", _id:"u3", username: "user3"}],
            messages: [{username: "zflegs", time: "0", msg: "Howdy!"}, {username: "user2", time: "1", msg: "Suh Dude!"}, {username: "user3", time: "2", msg: "I'm here"}],
        }
    ]

    const chatDataAll = tempChatData;



    console.log(chatDataAll, id);
    const chatData = chatDataAll.filter((chat) => chat._id === id)[0]; 
    console.log(chatData);

    const chatOthers = chatData.users.filter((member) => member._id !== user._id )
    console.log(chatOthers);
    let chatMembers = ""
    chatOthers.map((member) => {
        chatMembers += `, ${member.username}`
    })


    const handleSend = (e) => {
        e.preventDefault();
        console.log("Send message");
    }

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

      const handleInput = (e) => {
        console.log(e.target.value);
        setMsgInput(e.target.value)
      }

      const sendMessage = (e) => {
        e.preventDefault();
        console.log("Send:", msgInput);
        if (msgInput.length > 0){
            const messageOut = {
                username: user.username,
                time: new Date(),
                msg: msgInput,
            }
            console.log("Send:", messageOut);
        }       

      }




    return (
        <Box id="chat-container" sx={{display: "flex", flexDirection: "column", justifyContent: "flex-start", height: "100%"}}>

            <Box id="chat-header" sx={{backgroundColor: "#1d2230", padding: "1rem 1.5rem", borderRadius: "1.5rem"}}>
                <Box id="chat-title" sx={{display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                    <Typography variant='h5' sx={{color: "#ffffff", fontWeight: "600"}}>{chatData.chatName}</Typography>
                    <Box sx={{display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                        <Typography variant='body1' sx={{color: "#7888a4", fontWeight: "600", alignItems: "center", marginRight: "0.5rem"}}>{chatOthers.length +1}</Typography>
                        <PeopleAltTwoToneIcon sx={{color: "#7888a4", marginRight: "0.5rem"}}/>
                        <Divider orientation="vertical" sx={{ bgcolor:"#677897"}}/>
                        <Typography variant='body2' sx={{color: "#7888a4", fontWeight: "600", alignItems: "center", overflow: "hidden", maxWidth: "15rem", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{chatMembers.slice(2)}</Typography>
                    </Box>
                </Box>
            </Box>

            <Box id="message-container" sx={{display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "flex-end"}}>
                {chatData.messages.map((message) => <Message messageData={message} />)}
            </Box>

            <Box id="chat-header" sx={{backgroundColor: "#1d2230", padding: "1rem 1.5rem", borderRadius: "1.5rem"}}>
                    <Box sx={{display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                        <IconButton onClick={sendMessage} aria-label="create chat" size="large" color="primary" onClick={handleSend}>
                            <SendTwoToneIcon id="add-chat-icon" fontSize="inherit"/>
                        </IconButton>
                        <StyledTextField
                            id="outlined-multiline-flexible"
                            label="Enter Message"
                            multiline
                            variant="outlined" 
                            maxRows={4}
                            inputProps={{ style: { color: "#ffffff" } }}
                            sx={{flexGrow: 1, color: "#ffffff"}}
                            onChange={handleInput}
                        />
                    </Box>
            </Box>

        </Box>
    
    );

}