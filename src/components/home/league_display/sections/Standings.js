import * as React from 'react';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography } from '@mui/material';
import { Avatar } from '@mui/material';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { v4 as uuidv4 } from 'uuid';
import TeamChips from './TeamChips';


export default function Standings() {
    const {league, isLoading, isError, message} = useSelector((state) => state.leagueSelected)


    let teamsAll = [...league.teams];
    teamsAll.sort((a,b) => {
        return Number(a.event_wins) -  Number(b.event_wins)
    });


    return (
        <Box id="leaderboard-container" sx={{  minHeight: "300px", display:"flex", flexDirection: "column", padding: "1.5rem", flexGrow: 1, borderRadius: "1.6rem", backgroundColor: "rgba(163,187,211,0.05)", border: '1px solid rgba(58,70,91)'}}>
            <Typography variant='h6'>League Standings</Typography>

            <ButtonGroup variant="text" aria-label="outlined button group" sx={{display: "flex", alignItems: "flex-start", flexDirection: "column", justifyContext: "flex-start", padding: "1rem 0rem"}}>
                {teamsAll.map((item, index) => (
                    <Button key={uuidv4()} id="text-pair" sx={{display: "flex", width: "100%", alignItems: "flex-start", flexDirection: "row", justifyContext: "flex-start", padding: "1rem 0rem 1rem 1rem"}}>
                        <Typography variant="h5" sx={{margin: "0 1rem 0 0", color: "#fff"}}>{index+1}</Typography>
                        {/* <Avatar >{item.name.charAt(0).toUpperCase()}</Avatar> */}
                        <Box sx={{display:"flex", flexDirection: "column", alignItems: "flex-start", paddingRight: "0.5rem"}}>
                            <Typography variant="body1" sx={{margin: "0 0.5rem", color: "#fff", fontWeight: "600", whiteSpace: "nowrap"}}>{item.name}</Typography>
                            {item.manager ? <Typography variant="overline" sx={{margin: "0 0.5rem", whiteSpace: "nowrap"}}>{item.username}</Typography> : <Typography variant="overline" sx={{margin: "0 0.5rem"}}>Manager {index+1}</Typography>}
                        </Box>
                        <TeamChips roster={item.players}/>
                        <Box sx={{display:"flex", flexGrow: 1, flexDirection: "row", justifyContent: "flex-end"}}>
                            <Typography variant="h5" sx={{margin: "0 1rem 0 0.5rem", color: "#fff"}}>{item.total}</Typography>
                        </Box>
                    </Button>
                ))}
            </ButtonGroup>
        </Box>


    );

}