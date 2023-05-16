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


export default function LeagueInvites() {
    const dispatch = useDispatch();
    const {league} = useSelector((state) => state.leagueSelected)
    const {user} = useSelector((state) => state.auth)
    const [usersAutocomplete, setUsersAutocomplete] = useState([]);
    const [passcode, setPasscode] = useState("");
 
    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            id: league.id,
            admin: user.id,
            passcode: passcode,
        }
        dispatch(updateLeaguePasscodeInput(payload))
    }

    const handleAutoGenerate = (e) => {
        e.preventDefault();
        const payload = {
            id: league.id,
            admin: user.id,
        }
        dispatch(updateLeaguePasscodeAuto(payload))
    };

    return (
        <Box id="invites-container" sx={{  minHeight: "300px", display:"flex", flexDirection: "column", gap: "0.5rem", padding: "1.5rem", flexGrow: 1, borderRadius: "1.6rem", backgroundColor: "rgba(163,187,211,0.05)", border: '1px solid rgba(58,70,91)'}}>
            <Typography variant='h6'>Invite freiends to play</Typography>
            <Typography variant='h7' sx={{color: "#b9c4d4", marginBottom: "1rem"}}>Share the following league info with friends to join your league</Typography>

            <Box sx={{display:"flex"}}>
                <Typography variant='body1' sx={{color: "#b9c4d4", marginRight: "0.5rem"}}>{`League Name: `}</Typography>
                <Typography variant='body1' sx={{color: "#ffffff", fontWeight: "600"}}>{league.name}</Typography>
            </Box>

            <Box sx={{display:"flex", marginBottom: "1rem"}}>
                <Typography variant='body1' sx={{color: "#b9c4d4", marginRight: "0.5rem"}}>{`Passcode: `}</Typography>
                <Typography variant='body1' sx={{color: "#ffffff", fontWeight: "600"}}>{league.passcode}</Typography>
            </Box>


            <Typography variant='h7' sx={{color: "#b9c4d4"}}>Autogenerate or enter a new passcode below</Typography>

            <Box sx={{width: "100%", display: "flex", gap: "1rem"}}>

                <StyledTextField variant='outlined' label="New Passcode" inputProps={{ style: { color: "#ffffff" } }} sx={{width: "100%"}} onChange={e => setPasscode(e.target.value)}></StyledTextField>
                <Box className="form-btn-container">
                    <Fab onClick={handleSubmit}>
                        <CheckIcon /> 
                    </Fab>
                </Box>
                <Fab variant="extended" onClick={handleAutoGenerate}>
                    <AutorenewIcon /> 
                </Fab>

            </Box>
        </Box>
    
    );

}