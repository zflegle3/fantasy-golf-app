import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import * as React from 'react';
import Box from '@mui/material/Box';
import { v4 as uuidv4 } from 'uuid';
import PlayerChip from './PlayerChip';


export default function TeamChips({roster}) {
    console.log(roster);
    let playersAll = [...roster];
    playersAll.sort((a,b) => {
        return Number(a.score.sortTotal) -  Number(b.score.sortTotal)
    });

    const getStyle = (playerScore) => {
        if (Number(playerScore) < 0) {
            //under par
            return "rgb(186,12,47";
        } else if (Number(playerScore) >0) {
            //over par
            return "rgb(20,84,62";
            // #009B77
        } else {
            //par
            return "#ffffff";
        }
    }

    
    return (
        <Box id="leaderboard-container" sx={{ display:"flex", flexWrap: "wrap", gap: "0.5rem", flexGrow: 1,}}>
                {playersAll.map((item, index) => (
                    <PlayerChip key={uuidv4()} player={item} />
                ))}
        </Box>
    );
}
