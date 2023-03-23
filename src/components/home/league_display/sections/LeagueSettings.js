import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Avatar } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';


export default function LeagueSettings() {
    // const dispatch = useDispatch();
    const {league, isLoading, isError, message} = useSelector((state) => state.leagueSelected)
    const {user} = useSelector((state) => state.auth)
 

    console.log(league.settings);
    return (
        <Box id="leaderboard-container" sx={{  minHeight: "300px", display:"flex", flexDirection: "column", padding: "1.5rem", flexGrow: 1, borderRadius: "1.6rem", backgroundColor: "rgba(163,187,211,0.05)", border: '1px solid rgba(58,70,91)'}}>

            <Box sx={{paddingBottom: "1rem", display:"flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                <Typography variant='h6'>League Settings</Typography>
                <SettingsIcon />
            </Box>
            <Box sx={{paddingTop: "0.5rem", display:"flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                <Typography variant="overline" sx={{ color: "#7988a1", fontWeight: "600"}}>Number of Teams</Typography>
                <Typography variant="overline" sx={{ color: "#fff", fontWeight: "600"}}>{league.settings.teamCount}</Typography>
            </Box>
            <Box sx={{ paddingTop: "0.5rem", display:"flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                <Typography variant="overline" sx={{ color: "#7988a1", fontWeight: "600"}}>Roster Size</Typography>
                <Typography variant="overline" sx={{ color: "#fff", fontWeight: "600"}}>{league.settings.rosterSize}</Typography>
            </Box>
            <Box sx={{ paddingTop: "0.5rem", display:"flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                <Typography variant="overline" sx={{ color: "#7988a1", fontWeight: "600"}}>Roster Spots Cut</Typography>
                <Typography variant="overline" sx={{ color: "#fff", fontWeight: "600"}}>{league.settings.rosterCut}</Typography>
            </Box>
            <Box sx={{ paddingTop: "0.5rem", display:"flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                <Typography variant="overline" sx={{ color: "#7988a1", fontWeight: "600"}}>Missed Cut Score</Typography>
                <Typography variant="overline" sx={{ color: "#fff", fontWeight: "600"}}>{league.settings.missCutScore}</Typography>
            </Box>
            <Box sx={{ paddingTop: "0.5rem", display:"flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                <Typography variant="overline" sx={{ color: "#7988a1", fontWeight: "600"}}>Tournament</Typography>
                <Typography variant="overline" sx={{ color: "#fff", fontWeight: "600"}}>The Masters, Augusta National</Typography>
            </Box>
            <Box sx={{ paddingTop: "0.5rem", display:"flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                <Typography variant="overline" sx={{ color: "#7988a1", fontWeight: "600"}}>Draft Type</Typography>
                <Typography variant="overline" sx={{ color: "#fff", fontWeight: "600"}}>{league.draft.type}</Typography>
            </Box>
            <Box sx={{ paddingTop: "0.5rem", display:"flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                <Typography variant="overline" sx={{ color: "#7988a1", fontWeight: "600"}}>Draft Date</Typography>
                <Typography variant="overline" sx={{ color: "#fff", fontWeight: "600"}}>{new Date(league.draft.date).toLocaleDateString()} {new Date(league.draft.date).toLocaleTimeString()}</Typography>
            </Box>
        </Box>
    
    );

}