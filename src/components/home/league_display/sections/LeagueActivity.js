import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Avatar } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice'; //League


export default function LeagueActivity() {
    // const dispatch = useDispatch();
    const {league, isLoading, isError, message} = useSelector((state) => state.leagueSelected)
    const {user} = useSelector((state) => state.auth)
 


    return (
        <Box id="leaderboard-container" sx={{ display:"flex", flexDirection: "column", padding: "1.5rem", flexGrow: 1, borderRadius: "1.6rem", backgroundColor: "rgba(163,187,211,0.05)", border: '1px solid rgba(58,70,91)'}}>
            <Box sx={{paddingBottom: "1rem", display:"flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                <Typography variant='h6'>League Activity</Typography>
            </Box>

            <List variant="text" aria-label="outlined button group" sx={{display: "flex", alignItems: "flex-start", flexDirection: "column", justifyContext: "flex-start", padding: "1rem 0rem"}}>
                {league.activity.map((item, index) => (
                    <ListItem id="text-pair" sx={{display: "flex", width: "100%", alignItems: "flex-start", flexDirection: "row", justifyContext: "flex-start", padding: "1rem 0rem"}}>
                        <Avatar >
                            <LocalPoliceIcon />
                        </Avatar>
                        <Box sx={{display:"flex", flexDirection: "column", alignItems: "flex-start"}}>
                            <Typography variant="body1" sx={{margin: "0 0.5rem", color: "#fff", fontWeight: "600"}}>{item.user}</Typography>
                            <Typography variant="overline" sx={{margin: "0 0.5rem"}}>{item.time}</Typography> 
                        </Box>
                        <Box sx={{display:"flex", flexGrow: 1, flexDirection: "row", justifyContent: "flex-end"}}>
                            <Typography variant="overline" sx={{margin: "0 0.5rem"}}>{item.item}</Typography>
                        </Box>
                    </ListItem>
                ))}
            </List>

        </Box>
    
    );

}