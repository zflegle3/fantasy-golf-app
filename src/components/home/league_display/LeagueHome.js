import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Leaderboard from './sections/Leaderboard';
import Standings from './sections/Standings';
import LeagueActivity from './sections/LeagueActivity';
import LeagueSettings from './sections/LeagueSettings';


export default function LeagueHome() {
    // const dispatch = useDispatch();
    const {league, isLoading, isError, message} = useSelector((state) => state.leagueSelected)
    const {user} = useSelector((state) => state.auth)
 


    return (
        <div id="league-home-container">
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