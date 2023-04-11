import Box from '@mui/material/Box';
import { v4 as uuidv4 } from 'uuid';
import PlayerChip from './PlayerChip';


export default function TeamChips({roster}) {
    console.log(roster);
    let playersAll = [...roster];
    playersAll.sort((a,b) => {
        return Number(a.score.sortTotal) -  Number(b.score.sortTotal)
    });

    
    return (
        <Box id="leaderboard-container" sx={{ display:"flex", flexWrap: "wrap", gap: "0.5rem", flexGrow: 1,}}>
                {playersAll.map((item, index) => (
                    <PlayerChip key={uuidv4()} player={item} />
                ))}
        </Box>
    );
}
