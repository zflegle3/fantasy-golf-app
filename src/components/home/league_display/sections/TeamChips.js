import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import * as React from 'react';
import Box from '@mui/material/Box';
import { v4 as uuidv4 } from 'uuid';


export default function TeamChips({roster}) {

    let playersAll = [...roster];
    playersAll.sort((a,b) => {
        return Number(a.total) -  Number(b.total)
    });

    
    return (
        <Box id="leaderboard-container" sx={{ display:"flex", flexWrap: "wrap", gap: "0.5rem", flexGrow: 1,}}>
                {playersAll.map((item, index) => (
                <Stack key={uuidv4()} direction="row" spacing={1}>
                    <Chip
                    avatar={item._id !== "none" ? <Avatar sx={{ bgcolor: "#ffffff" }}>{item.score.toPar}</Avatar> : <Avatar sx={{ bgcolor: "#ffffff" }}>0</Avatar>}
                    label={`${item.family_name}`}
                    variant="outlined"
                    sx ={{color: "#ffffff"}}
                    />
                </Stack>
                ))}
        </Box>
    );
}
