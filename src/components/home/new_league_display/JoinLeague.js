import { useState, useEffect } from 'react';
import ReactDom from "react-dom";
import { v4 as uuidv4 } from 'uuid';

import NewLeagueModal from "./NewLeagueModal";
import {Box, Typography, TextField, Button, Fab, styled} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector, useDispatch } from 'react-redux';
import { joinLeague } from '../../../features/auth/authSlice';
import { ReactComponent as BackArrSvg} from "../../../images/icons/arrow-left.svg";

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
            league_name: leagueNameIn.trim(), 
            passcode: leaguePassIn.trim(),
            user_id: user.id,
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
                <Box className="new-league-modal" sx={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                    <div className="step-back" onClick={handleBack}> 
                        <BackArrSvg />
                    </div>
                    <Typography variant="h5" sx={{marginBottom: "2rem", color: "#ffffff", fontWeight: "600"}}>Join an Existing League</Typography>
                    <Typography variant='h7' sx={{color: "#b9c4d4", marginBottom: "1rem"}}>Enter the league name and password below to join</Typography>

                    <StyledTextField id="league-name" inputProps={{ style: { color: "#ffffff" } }} label="League Name" variant="outlined" onChange={e => setLeagueNameIn(e.target.value)} sx={{width: "100%"}}/>
                    <StyledTextField id="league-code" inputProps={{ style: { color: "#ffffff" } }} label="Passcode" variant="outlined" onChange={e => setLeaguePassIn(e.target.value)} sx={{width: "100%"}}/>

                    <Box className="form-btn-container" sx={{width: "100%"}}>
                        <Button sx={{width: "100%"}} onClick={handleJoin}>Join</Button>
                    </Box>


                </Box>
        </Box>
    );
}

// #181c28

export default JoinLeague;