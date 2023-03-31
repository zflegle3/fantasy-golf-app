import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// Added
import { useHistory, useNavigate, useParams } from 'react-router-dom'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import MuiToggleButton from '@mui/material/ToggleButton';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLeagueOne, resetSelected } from '../../../features/leagues/leagueSelectedSlice';
import IconButton from '@mui/material/IconButton';
import MapsUgcTwoToneIcon from '@mui/icons-material/MapsUgcTwoTone';
import NewChat from './NewChat';
import { Avatar } from '@mui/material';

//Icons
import LocalPoliceTwoToneIcon from '@mui/icons-material/LocalPoliceTwoTone';
import GroupsTwoToneIcon from '@mui/icons-material/GroupsTwoTone';
import GroupAddTwoToneIcon from '@mui/icons-material/GroupAddTwoTone';
import DvrTwoToneIcon from '@mui/icons-material/DvrTwoTone';
import AddIcon from '@mui/icons-material/Add';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import gsap from "gsap";
import Chat from './Chat';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    Link
} from "react-router-dom";


export default function InboxPage({title}) {
    const theme = useTheme();
    const { id } = useParams();
    const [selectedChat, setSelectedChat] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {league, isLoading, isError, message} = useSelector((state) => state.leagueSelected)
    const {user} = useSelector((state) => state.auth)
    const [newChat, setNewChat] = useState(false);

    const handleSelect = (e, newSelection) => {
        setSelectedChat(newSelection);
    };

    const ToggleButton = styled(MuiToggleButton)({
        "&.Mui-selected, &.Mui-selected:hover": {
            color: "#022047",
            backgroundColor: '#00ceb8',
        }
    });

    const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
        '& .MuiToggleButtonGroup-grouped': {
        //   margin: theme.spacing(0.5),
        //   color: "#00ceb8", 
        //   backgroundColor: "rgba(0,206,184,0.1",

        //   '&.Mui-disabled': {
        //     border: 0,
        //   },
            // borderRadius: "1rem",
          '&:not(:first-of-type)': {
            borderRadius: "0.8rem",
          },
          '&:first-of-type': {
            borderRadius: ".8rem",
          },
        },
    }));


    const addToClose = () => {
        gsap.to(`#add-chat-icon`, {
            duration: 0.3,
            rotation: 45,
            delay: 0,
        });
    }

    const closeToAdd = () => {
        //Rotate
        gsap.to(`#add-chat-icon`, {
            duration: 0.3,
            rotation: 0,
        });
    }

    const handleNewChat = (e) => {
        e.preventDefault();
        if (newChat) { //close new chat modal
            setSelectedChat(null)
            closeToAdd()
            setNewChat(false);
            navigate("/inbox/")
        } else {
            setSelectedChat(null)
            addToClose()
            setNewChat(true);
            navigate("/inbox/new-chat")
        };

    };


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


    return (

        <div id="page-all">

            <Box id="section-header"  sx={{display: "flex", alignItems: "baseline"}}>

                <IconButton aria-label="create chat" size="large" color="primary" onClick={handleNewChat}>
                    <AddIcon id="add-chat-icon" fontSize="inherit"/>
                </IconButton>

                <Typography variant='h3' sx={{color:"#ffffff", marginRight: "1rem"}}>Inbox</Typography>
                <Typography variant='body1' sx={{color:"#7888a4"}}>Direct messages and group chats</Typography>
            </Box>

            <div id="section-container">
                    
                    <div id="main-section">

                        <Box id="toggle-chat-container" sx={{display: "flex", flexDirection: "column", alignItems: "baseline"}}>

                            <StyledToggleButtonGroup
                                color="primary"
                                value={selectedChat}
                                exclusive
                                onChange={handleSelect}
                                aria-label="league-tab"
                                sx={{ 
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "flex-start",
                                    gap: "1rem",
                                    p: 3,
                                }}
                                >
                                {tempChatData.map((chat, index) => (
                                    <Box sx={{display: "flex", width: "100%"}}>
                                        <ToggleButton component={Link} to={`/inbox/chat/${chat._id}`} value={chat._id} sx={{width: "80%", display: "flex", justifyContent: "flex-start", color:"#00ceb8", backgroundColor:"rgba(0,206,184,0.1)", borderRadius: "1rem"}}>
                                            <Avatar sx={{marginRight: "0.5rem"}}>{chat.chatName.charAt(0).toUpperCase()}</Avatar>
                                            {chat.chatName}
                                        </ToggleButton>

                                        {/* <Box sx={{display: "flex", justifyContent: "flex-end", width: "20%"}}>
                                            <IconButton>
                                                <EditTwoToneIcon />
                                            </IconButton>

                                            <IconButton>
                                                <DeleteForeverTwoToneIcon/>
                                            </IconButton>
                                        </Box> */}

                                    </Box>

                                ))}

                            </StyledToggleButtonGroup>

                        </Box>

                    </div>

                    <Box 
                        sx={{ 
                            flexGrow: 1, 
                            p: 3, 
                            color: '#bbb',
                            backgroundColor: "rgba(58,70,91,0.5)",
                            border: "1px solid #3a465b",
                            borderRadius: "16px",
                        }}
                    >
                        {/* {newChat ?  : <p>Current Selected Chat</p>} */}
                        <Routes>
                                <Route exact path="/" element={<p>No Selection</p>}/>
                                <Route exact path="/chat/:id" element={<Chat chatDataAll={tempChatData}/>}/>
                                <Route exact path="/new-chat" element={<NewChat/>}/>
                        </Routes>
                    </Box>

            </div>

        </div>

        
        // </Box>
    
    );



}