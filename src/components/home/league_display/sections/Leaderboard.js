import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography } from '@mui/material';
import { Avatar } from '@mui/material';
import { padding } from '@mui/system';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';


export default function Leaderboard() {
    // const dispatch = useDispatch();
    const {league, isLoading, isError, message} = useSelector((state) => state.leagueSelected)
    const {user} = useSelector((state) => state.auth)

    let players = [
        {
            pos: 1,
            first_name: "Scottie",
            family_name:"Scheffler",
            score: 0,
            thru: "8:00AM 4/6/23"
        },
        {
            pos: 2,
            first_name: "Rory",
            family_name:"Mcllroy",
            score: 0,
            thru: "8:00AM 4/6/23"
        }, 
        {
            pos: 3,
            first_name: "Max",
            family_name:"Homa",
            score: 0,
            thru: "8:00AM 4/6/23"
        },
        {
            pos: 4,
            first_name: "Toger",
            family_name:"Woods",
            score: 0,
            thru: "8:00AM 4/6/23"
        }, 
        {
            pos: 5,
            first_name: "Phil",
            family_name:"Mickelson",
            score: 0,
            thru: "8:00AM 4/6/23"
        }, 
        {
            pos: 6,
            first_name: "Brooks",
            family_name:"Koepka",
            score: 0,
            thru: "8:00AM 4/6/23"
        }, 
        {
            pos: 7,
            first_name: "Colin",
            family_name:"Mirokowa",
            score: 0,
            thru: "8:00AM 4/6/23"
        }, 
        {
            pos: 8,
            first_name: "Jordan",
            family_name:"Spieth",
            score: 0,
            thru: "8:00AM 4/6/23"
        }, 
        {
            pos: 9,
            first_name: "Patrick",
            family_name:"Reed",
            score: 0,
            thru: "8:00AM 4/6/23"
        }, 
        {
            pos: 10,
            first_name: "Jon",
            family_name:"Rahm",
            score: 0,
            thru: "8:00AM 4/6/23"
        }
    ];
 


    return (
        <Box id="leaderboard-container" sx={{  minHeight: "300px", display:"flex", flexDirection: "column", padding: "1.5rem", flexGrow: 1, borderRadius: "1.6rem", backgroundColor: "rgba(163,187,211,0.05)", border: '1px solid rgba(58,70,91)'}}>
            <Typography variant='h6'>Leaderboard</Typography>

            <ButtonGroup variant="text" aria-label="outlined button group" sx={{display: "flex", alignItems: "flex-start", flexDirection: "column", justifyContext: "flex-start", padding: "1rem 0rem"}}>
                {players.map((item, index) => (
                    <Button id="text-pair" sx={{display: "flex", width: "100%", alignItems: "flex-start", flexDirection: "row", justifyContext: "flex-start", padding: "1rem 0rem"}}>
                        <Typography variant="h5" sx={{margin: "0 1rem 0 0", color: "#fff"}}>{item.pos}</Typography>
                        <Avatar >{item.first_name.charAt(0).toUpperCase()}</Avatar>
                        <Box sx={{display:"flex", flexDirection: "column", alignItems: "flex-start"}}>
                            <Typography variant="body1" sx={{margin: "0 0.5rem", color: "#fff", fontWeight: "600"}}>{item.first_name} {item.family_name}</Typography>
                            <Typography variant="overline" sx={{margin: "0 0.5rem"}}>THRU: {item.thru}</Typography>
                        </Box>
                        <Box sx={{display:"flex", flexGrow: 1, flexDirection: "row", justifyContent: "flex-end"}}>
                            <Typography variant="h5" sx={{margin: "0 1rem 0 0", color: "#fff"}}>0</Typography>
                        </Box>
                    </Button>
                ))}
            </ButtonGroup>
        </Box>
    
    );

}