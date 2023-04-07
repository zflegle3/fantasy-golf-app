import { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    Link
  } from "react-router-dom";
// import { useSelector, useDispatch } from 'react-redux';
// import { resetUser } from '../../features/auth/authSlice';
//Components
import { Box, Typography, Button } from '@mui/material';
import CreateLeague from './CreateLeague';
import JoinLeague from './JoinLeague';


function NewLeagueRouter(props) {
    // const {user} = useSelector((state) => state.auth);
    // const {leaguesAll, isLoading, isSuccess, isError, message} = useSelector((state) => state.leagues)
    // const dispatch = useDispatch();
    const [leagueType, setLeagueType] = useState(null);


    const handleLeagueTypeSelect = (e) => {
        e.preventDefault();
        setLeagueType(e.target.id);
    };

    // useEffect(() => {
    //     setLeagueType(null);
    // }, []);


    if (leagueType === "create") {
        return(
            <CreateLeague setLeagueType={setLeagueType}/>
        );
    } else if (leagueType === "join") {
        return(
            <JoinLeague setLeagueType={setLeagueType}/>
        );
    } else {
        return (
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%", backgroundColor: "#181c28"}}>
                <div className="new-league-modal">
                    <Typography variant="h5" sx={{marginBottom: "2rem", color: "#ffffff", fontWeight: "600"}}>Choose How To Start Your League</Typography>
                    <Box sx={{display: "flex", flexDirection: "column", width: "100%", gap: "1rem"}}>
                        <Button
                            id="create"
                            variant= "outlined"
                            onClick={handleLeagueTypeSelect}
                            sx={{padding: "1rem", fontWeight: 600}}
                        >
                        Create a League
                        </Button>

                        <Button
                            id="join"
                            variant= "outlined"
                            onClick={handleLeagueTypeSelect}
                            sx={{padding: "1rem", fontWeight: 600}}
                        >
                        Join an Existing League
                        </Button>
                    </Box>

                </div>
            </Box>
        )
    }
}

export default NewLeagueRouter;
