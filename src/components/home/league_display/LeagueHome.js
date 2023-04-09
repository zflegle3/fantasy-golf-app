import * as React from 'react';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MiniLeaderboard from './sections/MiniLeaderboard';
import Standings from './sections/Standings';
import LeagueActivity from './sections/LeagueActivity';
import LeagueSettings from './sections/LeagueSettings';
import LeagueInvites from "./sections/LeagueInvites";


export default function LeagueHome() {
    // const dispatch = useDispatch();
    const {league} = useSelector((state) => state.leagueSelected)
    const {user} = useSelector((state) => state.auth)
 

    return (
        <Box id="league-home-container">
            <Standings />
            <MiniLeaderboard />
            {league.managers.length < league.teams.length && user._id === league.admin ? <LeagueInvites /> : null}
            <LeagueActivity/>
            <LeagueSettings/>
        </Box>
    
    );

}