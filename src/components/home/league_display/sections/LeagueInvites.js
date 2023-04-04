import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
import { Typography, Box, TextField, Autocomplete, Chip, Stack, Button, Fab } from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CheckIcon from '@mui/icons-material/Check';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { updateLeaguePasscodeInput, updateLeaguePasscodeAuto } from '../../../../features/leagues/leagueSelectedSlice';


export default function LeagueInvites() {
    const dispatch = useDispatch();
    const {league} = useSelector((state) => state.leagueSelected)
    const {user} = useSelector((state) => state.auth)
    const [usersAutocomplete, setUsersAutocomplete] = useState([]);
    const [passcode, setPasscode] = useState("");
 
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("invite");
        console.log(passcode);
        const payload = {
            id: league._id,
            adminId: user._id,
            passcodeIn: passcode,
        }
        dispatch(updateLeaguePasscodeInput(payload))
    }

    // const getUsers = async () => {
    //     await axios.get("http://localhost:8080/user/read/all")
    //     .then(function (response) {
    //         console.log(response.data);
    //         setUsersAutocomplete(response.data)
    //     });
    // };

    const handleAutoGenerate = (e) => {
        e.preventDefault();
        console.log("auto update")
        const payload = {
            id: league._id,
            adminId: user._id,
        }
        dispatch(updateLeaguePasscodeAuto(payload))
    };

    // useEffect(() => {
    //     getUsers();

    // }, []);

    console.log(league);
    return (
        <Box id="invites-container" sx={{  minHeight: "300px", display:"flex", flexDirection: "column", padding: "1.5rem", flexGrow: 1, borderRadius: "1.6rem", backgroundColor: "rgba(163,187,211,0.05)", border: '1px solid rgba(58,70,91)'}}>
            <Typography variant='h6'>Invite freiends to play</Typography>
            <Typography variant='h7' sx={{color: "#b9c4d4"}}>Share the following league info with friends to join your league</Typography>

            <Typography variant='h7' sx={{color: "#b9c4d4"}}>{`League Name: ${league.name}`}</Typography>
            <Typography variant='h7' sx={{color: "#b9c4d4"}}>{`Passcode: ${league.passcode}`}</Typography>

            <Typography variant='h7' sx={{color: "#b9c4d4"}}>Autogenerate or enter a new passcode below</Typography>

            <Box className="form-btn-container" sx={{width: "100%", display: "flex"}}>
                <Fab onClick={handleAutoGenerate}>
                    <AutorenewIcon /> 
                </Fab>
                <TextField variant='outlined' label="New Passcode" sx={{width: "100%"}} onChange={e => setPasscode(e.target.value)}></TextField>
                <Fab onClick={handleSubmit}>
                    <CheckIcon /> 
                </Fab>

            </Box>
        </Box>
    
    );

}