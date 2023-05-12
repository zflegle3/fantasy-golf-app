import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import Message from './Message';
import { useState, useEffect } from 'react';
//socket connection 
import { socket } from '../../../features/socket';

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


export default function LeagueChat({chatId}) {
    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    const {league, isLoading, isError, message} = useSelector((state) => state.leagueSelected);
    const {user} = useSelector((state) => state.auth);
    const [msgInput, setMsgInput] = useState("");
    const [msgOutput, setMsgOutput] = useState(null);
    const [chatData, setChatData] = useState(null);


    const handleSend = (e) => {
        e.preventDefault();
        if (msgInput.length > 0){
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
        socket.disconnect();
        //Leave room on dismount
      };
    },[chatId]);


    useEffect(() => {
      //listens to socket events
      socket.on("receive_message", (data) => {
        setMsgOutput((msgOutput) => ([...msgOutput, data]));
      })
    },[socket]);


    const getChatData = async (chatIdIn) => {
      await axios.post(process.env.REACT_APP_API_URL+"/chat/get/id", {chatId: chatIdIn})
      .then(function (response) {
          //set chat data for reference
          setChatData(response.data);
          //set message data for ui output
          setMsgOutput(response.data.messages)
      })
    }

    useEffect(() => {
      getChatData(chatId);
    },[chatId]);


    let managersOut = "";
    let managedTeams = league.teams.filter(team => team.manager.id != null);
    for (let i=0; i < managedTeams.length; i++) {
      if (i === managedTeams.length-1) {
        managersOut += `${managedTeams[i].manager.username}`;
      } else {
        managersOut += `${managedTeams[i].manager.username}, `;
      }
    }

    if (chatData) {
      return (
        <Box id="chat-container" sx={{display: "flex", flexDirection: "column", justifyContent: "flex-start", height: "100%"}}>

            <Box id="chat-header" sx={{backgroundColor: "#1d2230", padding: "1rem 1.5rem", borderRadius: "1.5rem"}}>
                <Box id="chat-title" sx={{display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                    <Typography variant='h5' sx={{color: "#ffffff", fontWeight: "600"}}>{chatData.name}</Typography>
                    <Box sx={{display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                        <Typography variant='body1' sx={{color: "#7888a4", fontWeight: "600", alignItems: "center", marginRight: "0.5rem"}}>{league.managers.length}</Typography>
                        <PeopleAltTwoToneIcon sx={{color: "#7888a4", marginRight: "0.5rem"}}/>
                        <Divider orientation="vertical" sx={{ bgcolor:"#677897"}}/>
                        <Typography variant='body2' sx={{color: "#7888a4", fontWeight: "600", alignItems: "center", overflow: "hidden", maxWidth: "15rem", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{managersOut}</Typography>
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