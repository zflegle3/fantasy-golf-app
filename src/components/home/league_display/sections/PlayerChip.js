import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import * as React from 'react';
import Box from '@mui/material/Box';
import { v4 as uuidv4 } from 'uuid';


export default function PlayerChip({player}) {

    const getStyle = (playerScore) => {
        if (Number(playerScore) > 0) {
            //under par
            return "#ca5e5e";
        } else if (Number(playerScore) < 0) {
            //over par
            // return "rgb(20,84,62)";
            return "#009B77"
        } else {
            //par
            return "#ffffff";
        }
    }

    const color = getStyle(player.score.sortTotal);
    console.log(color);
    return (
        <Stack key={uuidv4()} direction="row" spacing={1}>
            <Chip
                avatar={player._id !== "none" ? <Avatar sx={{ bgcolor: "#ffffff"}}>{player.score.toPar}</Avatar> : <Avatar sx={{ bgcolor: "#ffffff" }}>0</Avatar>}
                label={`${player.family_name}`}
                variant="outlined"
                sx ={{color: color}}
                // borderColor= {color}
                // color={color}
            />
        </Stack>
    );
}
