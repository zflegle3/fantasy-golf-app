import * as React from 'react';
// import { styled, useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import Leaderboard from '../../league_display/sections/Leaderboard';
import HeroInfo from '../HeroInfo';


export default function GolfHome() {
 

    return (
        <div id="league-home-container">
            <HeroInfo />
            <Leaderboard />
        </div>
    
    );

}