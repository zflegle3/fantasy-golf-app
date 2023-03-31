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
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { socket } from '../../../features/socket';
import ChatInput from './ChatInput';
import { v4 as uuidv4 } from 'uuid';

// import socketIO from 'socket.io-client';
// import { socket } from './socket';
// import { io } from 'socket.io-client';
// import { ConnectionState } from './components/ConnectionState';
// import { ConnectionManager } from './components/ConnectionManager';
// const socket = io('http://localhost:8080');

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


export default function Chat() {
    const theme = useTheme();
    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    const {league, isLoading, isError, message} = useSelector((state) => state.leagueSelected);
    const {user} = useSelector((state) => state.auth);
    const [msgInput, setMsgInput] = useState("");
    const [chatId, setchatId] = useState(1);
    const [chatName, setChatName] = useState("Test Chat 69")
    const [chatUsers, setChatUsers] = useState([{name: "Zach Flegle", _id:"63cc338333a02d1e66d95569", username: "zflegs"}, {name: "Other User", _id:"u2", username: "user2"}, {name: "Some Guy", _id:"u3", username: "user3"}])
    const [msgOutput, setMsgOutput] = useState([{id: 1, username: "zflegs", time: "0", msg: "Howdy!"}, {id: 2, username: "user2", time: "1", msg: "Suh Dude!"}, {id: 3, username: "user3", time: "2", msg: "I'm here"}]);

    // const [isConnected, setIsConnected] = useState(socket.connected);
    // const [fooEvents, setFooEvents] = useState([]);

    //Temp ID, will get chat id from league data
    const chatOthers = chatUsers.filter((member) => member._id !== user._id )
    let chatMembers = ""
    chatOthers.map((member) => {
        chatMembers += `, ${member.username}`
    })


    const handleSend = (e) => {
        e.preventDefault();
        console.log(msgInput);
        if (msgInput.length > 0){
          console.log("Send message");
          const messageOut = {
              id: uuidv4(),
              username: user.username,
              time: new Date(),
              msg: msgInput,
          }
        setMsgInput("");
        socket.emit("send_message", messageOut)
      }     
    }



    useEffect(() => {
      //on mount and unmount connections
      socket.connect();
      return () => {
        console.log("cleanup");
        socket.disconnect();
      };
    },[]);

    const renderMessage = (data) => {
        setMsgOutput([...msgOutput, data]);
    }


    useEffect(() => {
      //listens to socket events
      socket.on("receive_message", (data) => {
        // alert(data.message);
        // console.log(msgOutput);
        // let newMessages = [...msgOutput]
        // console.log(newMessages);
        // newMessages.push(data);
        // setMsgOutput([...msgOutput, data]);
        // console.log(data);
        setMsgOutput((msgOutput) => ([...msgOutput, data]));
        // renderMessage(data);
      })
    },[socket]);


    return (
        <Box id="chat-container" sx={{display: "flex", flexDirection: "column", justifyContent: "flex-start", height: "100%"}}>

            <Box id="chat-header" sx={{backgroundColor: "#1d2230", padding: "1rem 1.5rem", borderRadius: "1.5rem"}}>
                <Box id="chat-title" sx={{display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                    <Typography variant='h5' sx={{color: "#ffffff", fontWeight: "600"}}>{chatName}</Typography>
                    <Box sx={{display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                        <Typography variant='body1' sx={{color: "#7888a4", fontWeight: "600", alignItems: "center", marginRight: "0.5rem"}}>{99}</Typography>
                        <PeopleAltTwoToneIcon sx={{color: "#7888a4", marginRight: "0.5rem"}}/>
                        <Divider orientation="vertical" sx={{ bgcolor:"#677897"}}/>
                        <Typography variant='body2' sx={{color: "#7888a4", fontWeight: "600", alignItems: "center", overflow: "hidden", maxWidth: "15rem", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{chatMembers.slice(2)}</Typography>
                    </Box>
                </Box>
            </Box>

            <Box id="message-container" sx={{display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "flex-end"}}>
                {msgOutput.map((message) => <Message key={message.id} messageData={message} />)}
            </Box>

            <Box id="chat-header" sx={{backgroundColor: "#1d2230", padding: "1rem 1.5rem", borderRadius: "1.5rem"}}>
                    <Box sx={{display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                        <IconButton onClick={handleSend} aria-label="create chat" size="large" color="primary">
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
                            onInput={e => setMsgInput(e.target.value)}
                        />
                    </Box>
            </Box>

        </Box>
    
    );

}