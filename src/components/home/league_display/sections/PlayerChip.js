import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';


export default function PlayerChip({player}) {

    const getStyle = (playerScore) => {
        if (Number(playerScore) > 0) {
            return "#ca5e5e";
        } else if (Number(playerScore) < 0) {
            return "#009B77"
        } else {
            //par
            return "#ffffff";
        }
    }

    const color = getStyle(player.event_sort_total);
    console.log(color);
    return (
        <Stack key={uuidv4()} direction="row" spacing={1}>
            <Chip
                avatar={player.id !== "none" ? <Avatar sx={{ bgcolor: "#ffffff"}}>{player.event_to_par}</Avatar> : <Avatar sx={{ bgcolor: "#ffffff" }}>0</Avatar>}
                label={`${player.last_name}`}
                variant="outlined"
                sx ={{color: color}}
            />
        </Stack>
    );
}
