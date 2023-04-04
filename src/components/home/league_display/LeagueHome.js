import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Leaderboard from './sections/Leaderboard';
import Standings from './sections/Standings';
import LeagueActivity from './sections/LeagueActivity';
import LeagueSettings from './sections/LeagueSettings';
import LeagueInvites from "./sections/LeagueInvites";


export default function LeagueHome() {
    // const dispatch = useDispatch();
    const {league} = useSelector((state) => state.leagueSelected)
    const {user} = useSelector((state) => state.auth)
 

    console.log(league);
    return (
        <div id="league-home-container">

            {league.managers.length < league.teams.length ? <LeagueInvites /> : null}
            <Leaderboard />
            <Standings />
            <LeagueActivity/>
            <LeagueSettings/>

            {/* <div className='test-div'></div>
            <div className='test-div'></div>
            <div className='test-div'></div>
            <div className='test-div'></div> */}

        </div>
    
    );

}