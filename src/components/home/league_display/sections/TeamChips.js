import Box from '@mui/material/Box';
import { v4 as uuidv4 } from 'uuid';
import PlayerChip from './PlayerChip';
import { useSelector, useDispatch } from 'react-redux';


export default function TeamChips({roster}) {
    const {league, isLoading, isError, message} = useSelector((state) => state.leagueSelected)
    let playersAll = [...roster];
    playersAll.sort((a,b) => {
        return Number(a.event_sort_total) - Number(b.event_sort_total)
    });
    console.log(playersAll);
    //Add placeholder players
    // for (let i=0; i < league.roster_qty; i++) {
    //     if (i >= playersAll.length) {
    //         playersAll.push({
    //             id: i+1,
    //             first_name: `Player`,
    //             last_name: `Player ${i+1}`,
    //             username: "Invite Manager",
    //             event_wins: 0,
    //             player_wins: 0,
    //             players: [],
    //             avatar: null,
    //         })
    //     } 
    // }

    console.log(playersAll);
    
    return (
        <Box id="leaderboard-container" sx={{ display:"flex", flexWrap: "wrap", gap: "0.5rem", flexGrow: 1,}}>
                {playersAll.map((item, index) => (
                    <PlayerChip key={uuidv4()} player={item} />
                ))}
        </Box>
    );
}
