import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// Added
import { useHistory, useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
// import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
// import Divider from '@mui/material/Divider';
// import TextField from '@mui/material/TextField';
// import IconButton from '@mui/material/IconButton';
// import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
// import Message from './Message';
import { useState } from 'react';
import CustomizedHook from './CustomizedHook';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';


export default function NewChat() {
    const theme = useTheme();

    const {league, isLoading, isError, message} = useSelector((state) => state.leagueSelected);
    const {user} = useSelector((state) => state.auth);



    return (
        <Box id="chat-container" sx={{display: "flex", flexDirection: "column", justifyContent: "flex-start", height: "100%"}}>
            <Typography variant='h5' sx={{color: "#ffffff", fontWeight: "600"}}>New Chat</Typography>
            
            <TextField id="outlined-basic" label="Chat Name" variant="outlined" />
            <CustomizedHook/>
            <Button>Submit</Button>


        </Box>
    
    );

}