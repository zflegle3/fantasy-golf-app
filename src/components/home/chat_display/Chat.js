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
import axios from 'axios';
import { resetUser } from '../../../features/auth/authSlice';

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
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const {league, isLoading, isError, message} = useSelector((state) => state.leagueSelected);
    const {user} = useSelector((state) => state.auth);
    const [msgInput, setMsgInput] = useState("");
    // const [chatId, setchatId] = useState("642658d7e34f23d7f548252a");
    let { chatId } = useParams();
    const [chatName, setChatName] = useState("Test Chat 69")
    const [chatUsers, setChatUsers] = useState([{name: "Zach Flegle", _id:"63cc338333a02d1e66d95569", username: "zflegs"}, {name: "Other User", _id:"u2", username: "user2"}, {name: "Some Guy", _id:"u3", username: "user3"}])
    const [msgOutput, setMsgOutput] = useState(null);
    const [chatData, setChatData] = useState(null);

    // dispatch(resetUser);

    // const [isConnected, setIsConnected] = useState(socket.connected);
    // const [fooEvents, setFooEvents] = useState([]);

    //Temp ID, will get chat id from league data
    // const chatOthers = chatUsers.filter((member) => member._id !== user._id )
    // let chatMembers = ""
    // chatOthers.map((member) => {
    //     chatMembers += `, ${member.username}`
    // })

    const handleSend = (e) => {
        e.preventDefault();
        console.log(msgInput);
        if (msgInput.length > 0){
          console.log("Send message");
          const messageOut = {
              id: uuidv4(),
              chatId: chatId,
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
      socket.emit("join_room", user.username, chatId);
 
      return () => {
        console.log("cleanup");
        socket.disconnect();
        //Leave room
        // socket.emit("join_room", user.username, chatId);
      };
    },[chatId]);


    useEffect(() => {
      //listens to socket events
      socket.on("receive_message", (data) => {
        console.log("message In:", data)
        setMsgOutput((msgOutput) => ([...msgOutput, data]));
      })
    },[socket]);


    const getChatData = async (chatIdIn) => {
      console.log(chatId);
      // await axios.post("http://localhost:8080/chat/get/id", {chatId: chatIdIn})
      await axios.post("https://fantasy-golf-41.herokuapp.com/chat/get/id", {chatId: chatIdIn})
      .then(function (response) {
          //set chat data for reference
          setChatData(response.data);
          //set message data for ui output
          setMsgOutput(response.data.messages)
      })
    }

    useEffect(() => {
      console.log("new chat", chatId);
      getChatData(chatId)
    },[chatId]);


    if (chatData) {
      return (
        <Box id="chat-container" sx={{display: "flex", flexDirection: "column", justifyContent: "flex-start", height: "100%"}}>

            <Box id="chat-header" sx={{backgroundColor: "#1d2230", padding: "1rem 1.5rem", borderRadius: "1.5rem"}}>
                <Box id="chat-title" sx={{display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                    <Typography variant='h5' sx={{color: "#ffffff", fontWeight: "600"}}>{chatData.name}</Typography>
                    <Box sx={{display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                        <Typography variant='body1' sx={{color: "#7888a4", fontWeight: "600", alignItems: "center", marginRight: "0.5rem"}}>{chatData.members.length}</Typography>
                        <PeopleAltTwoToneIcon sx={{color: "#7888a4", marginRight: "0.5rem"}}/>
                        <Divider orientation="vertical" sx={{ bgcolor:"#677897"}}/>
                        <Typography variant='body2' sx={{color: "#7888a4", fontWeight: "600", alignItems: "center", overflow: "hidden", maxWidth: "15rem", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{chatData.members}</Typography>
                    </Box>
                </Box>
            </Box>

            <Box id="message-scroll-window" sx={{height: "100%",overflowY: "scroll"}}>
              <Box id="message-container" sx={{display: "flex", flexDirection: "column-reverse", justifyContent: "flex-end"}}>
                  {msgOutput.map((message) => <Message key={message.id} messageData={message} />)}
              </Box>
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
    } else {
      return <div>Loading Chat</div>
    }


}