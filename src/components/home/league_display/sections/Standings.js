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


export default function Standings() {
    // const dispatch = useDispatch();
    const {league, isLoading, isError, message} = useSelector((state) => state.leagueSelected)
    const {user} = useSelector((state) => state.auth)
 

    const TeamItem = <Box id="text-pair" sx={{display: "flex", alignItems: "center", flexDirection: "row", justifyContext: "flex-start", padding: "1rem 0rem"}}>
            <Typography variant="h5" sx={{margin: "0 0.5rem"}}>1</Typography>
            <Avatar >U</Avatar>
            <Typography variant="body1" sx={{margin: "0 0.5rem"}}>username</Typography>
        </Box>;
    
    


    return (
        <Box id="leaderboard-container" sx={{  minHeight: "300px", display:"flex", flexDirection: "column", padding: "1.5rem", flexGrow: 1, borderRadius: "1.6rem", backgroundColor: "rgba(163,187,211,0.05)", border: '1px solid rgba(58,70,91)'}}>
            <Typography variant='h6'>League Standings</Typography>

            <ButtonGroup variant="text" aria-label="outlined button group" sx={{display: "flex", alignItems: "flex-start", flexDirection: "column", justifyContext: "flex-start", padding: "1rem 0rem"}}>
                {league.teams.map((item, index) => (
                    <Button id="text-pair" sx={{display: "flex", width: "100%", alignItems: "flex-start", flexDirection: "row", justifyContext: "flex-start", padding: "1rem 0rem"}}>
                        <Typography variant="h5" sx={{margin: "0 1rem 0 0", color: "#fff"}}>{index+1}</Typography>
                        <Avatar >{item.name.charAt(0).toUpperCase()}</Avatar>
                        <Box sx={{display:"flex", flexDirection: "column", alignItems: "flex-start"}}>
                            <Typography variant="body1" sx={{margin: "0 0.5rem", color: "#fff", fontWeight: "600"}}>{item.name}</Typography>
                            {item.manager ? <Typography variant="overline" sx={{margin: "0 0.5rem"}}>{item.manager}</Typography> : <Typography variant="overline" sx={{margin: "0 0.5rem"}}>Manager {index}</Typography>}
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