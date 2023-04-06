import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LongMenu from '../../league_display/LongMenu';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import axios from 'axios';


export default function FedExRanks({managerId}) {
    const [standings, setStandings] = useState(null);

    const getStandings = async () => {
        await axios.get("https://fantasy-golf-41.herokuapp.com/player/all")
        .then(function (response) {
            let filteredStandings = response.data.filter((element, index) => 
                element.fedex.standing != null
            );
            filteredStandings.sort((a,b) => {
                return Number(a.fedex.standing) -  Number(b.fedex.standing)
            } )
            setStandings(filteredStandings)
        })
    }

    useEffect(() => {
        //send request for ranks data
        //filter and sort by docs with rank values
        //set state
        getStandings();
    },[]);


    if (standings) {
        return (
            <div id="league-home-container">
                <Box id="players-container" sx={{ display:"flex", flexDirection: "column", padding: "1.5rem", flexGrow: 1, borderRadius: "1.6rem", backgroundColor: "rgba(163,187,211,0.05)", border: '1px solid rgba(58,70,91)'}}>
                    <Box sx={{ display:"flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <Typography variant='h6'>FedExCup Standings</Typography>
                        {/* <LongMenu options={options} title="Filter"/> */}
                    </Box>

                    <TableContainer >
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">

                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">
                                        <Typography variant="h6" sx={{ color: "#fff", fontWeight: "600"}}>Rank</Typography>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Typography variant="h6" sx={{ color: "#fff", fontWeight: "600"}}>Golfer</Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="body1" sx={{ color: "#d8e2ed", fontWeight: "600"}}>Total Points</Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="body1" sx={{ color: "#d8e2ed", fontWeight: "600"}}>Wins</Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="body1" sx={{ color: "#d8e2ed", fontWeight: "600"}}>Top 10</Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="body1" sx={{ color: "#fff", fontWeight: "600"}}>Top 25</Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="body1" sx={{ color: "#fff", fontWeight: "600"}}>Avg. Score</Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="body1" sx={{ color: "#fff", fontWeight: "600"}}>Strokes</Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="body1" sx={{ color: "#fff", fontWeight: "600"}}>Events</Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>


                            <TableBody>
                            {standings.map((player, index) => (
                                <TableRow
                                key={player._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="left" >
                                        <Typography variant="body1" sx={{ color: "#fff", fontWeight: "600"}}>{player.fedex.standing}</Typography>
                                    </TableCell>
                                    <TableCell align="left" >
                                        <Typography variant="body1" sx={{ color: "#fff", fontWeight: "600"}}>{player.first_name} {player.family_name}</Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="overline" sx={{ color: "#d8e2ed"}}>{player.fedex.points}</Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="overline" sx={{ color: "#d8e2ed"}}>{player.fedex.wins}</Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="overline" sx={{ color: "#d8e2ed"}}>{player.fedex.top10}</Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="overline" sx={{ color: "#d8e2ed"}}>{player.fedex.top25}</Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="overline" sx={{ color: "#d8e2ed"}}>{player.fedex.scoreAvg}</Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="overline" sx={{ color: "#d8e2ed"}}>{player.fedex.strokes}</Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="overline" sx={{ color: "#d8e2ed"}}>{player.fedex.rounds}</Typography>
                                    </TableCell>

                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </div>
        
        );
    } else {
        return(<div>Loading</div>)
    }

}