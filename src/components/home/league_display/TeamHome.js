import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Leaderboard from './sections/Leaderboard';
import Standings from './sections/Standings';
import LeagueActivity from './sections/LeagueActivity';
import LeagueSettings from './sections/LeagueSettings';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LongMenu from './LongMenu';
import TeamRoster from "./TeamRoster"
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';




export default function TeamHome({managerId}) {
    const {league, isLoading, isError, message} = useSelector((state) => state.leagueSelected)
    const {user} = useSelector((state) => state.auth)
 
    console.log(managerId)
    console.log(league);
    let team = league.teams.filter((team) => team.manager === managerId)[0];

    console.log(team);

    const options = [
        'The Masters, Augusta National',
    ];

    return (
        <div id="league-home-container">
            <Box id="team-header" sx={{display: "flex", flexDirection:"row", alignItems: "center"}}>
                <Avatar sx={{marginRight: "1rem"}}>{team.name.charAt(0).toUpperCase()}</Avatar>
                <Box sx={{ display: "flex", flexDirection: "column", marginRight: "1rem"}}>
                    <Typography variant="h4" sx={{ color: "#fff", fontWeight: "600", marginRight: "0.5rem"}}>{team.name}</Typography>
                    <Typography variant="body1" sx={{ color: "#fff"}}>{team.manager}</Typography>
                </Box>
                {managerId === user._id ?  
                    <Fab variant="extended" size="small" aria-label="settings">
                        <SettingsIcon />
                    </Fab> 
                    : null
                }


            </Box>
            <Box id="leaderboard-container" sx={{ display:"flex", flexDirection: "column", padding: "1.5rem", flexGrow: 1, borderRadius: "1.6rem", backgroundColor: "rgba(163,187,211,0.05)", border: '1px solid rgba(58,70,91)'}}>
                <Box sx={{ display:"flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <LongMenu options={options} title={"Wk. 1"}/>
                    <Fab variant="extended" size="small" aria-label="edit">
                        <EditIcon />
                    </Fab>
                </Box>

                <TeamRoster team={team} />
            </Box>

        </div>
    
    );

}