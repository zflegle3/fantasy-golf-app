import { useState, useEffect } from 'react';
import ReactDom from "react-dom";
import { v4 as uuidv4 } from 'uuid';

import NewLeagueModal from "./NewLeagueModal";
import {Box, Typography, TextField, Button, Fab} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector, useDispatch } from 'react-redux';
import { joinLeague } from '../../../features/auth/authSlice';



function JoinLeague({setLeagueType}) {
    const dispatch = useDispatch();
    const [leagueNameIn, setLeagueNameIn] = useState("");
    const [leaguePassIn, setLeaguePassIn] = useState("");
    const {user} = useSelector((state) => state.auth);

    const handleJoin = (e) => {
        e.preventDefault();
        console.log("join legaue");
        //validate inputs**

        const payload = {
            leagueName: leagueNameIn.trim(), 
            passcode: leaguePassIn.trim(),
            managerId: user._id,
        };
        //validate inputs and dispatch join league
        dispatch(joinLeague(payload))
        // console.log(payload)
    };

    const handleBack = (e) => {
        e.preventDefault();
        setLeagueType(null);
    }

    return (
        <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%", backgroundColor: "#181c28"}}>
                <div className="new-league-modal">
                    <Fab onClick={handleBack}>
                        <ArrowBackIcon />
                    </Fab>
                    <Typography variant='h6'>Join an Existing League</Typography>
                    <Typography variant='body1'>Enter the league name and password below to join</Typography>

                    <TextField id="league-name" label="League Name" variant="outlined" onChange={e => setLeagueNameIn(e.target.value)} sx={{width: "100%"}}/>
                    <TextField id="league-code" label="Passcode" variant="outlined" onChange={e => setLeaguePassIn(e.target.value)} sx={{width: "100%"}}/>

                    <Box className="form-btn-container" sx={{width: "100%"}}>
                        <Button sx={{width: "100%"}} onClick={handleJoin}>Join</Button>
                    </Box>


                </div>
        </Box>
    );
}

// #181c28

export default JoinLeague;