import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { Typography } from '@mui/material';



export default function Message({messageData}) {

    return (
        <Box id="chat-container" sx={{display: "flex", justifyContent: "flex-start", padding: "1rem"}}>
            <Avatar sx={{marginRight: "1rem"}}>{messageData.username.charAt(0)}</Avatar>

            <Box sx={{}}>
                <Box id="chat-container" sx={{display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                    <Typography variant='body1' sx={{color: "#ffffff", marginRight: "0.5rem", fontWeight: "600"}}>{messageData.username}</Typography>
                    <Typography variant='body2' sx={{color: "#7888a4"}}>{new Date(messageData.time).toLocaleString()}</Typography>
                </Box>
                <Typography variant='body1'>{messageData.msg}</Typography>
            </Box>

        </Box>

    );
}