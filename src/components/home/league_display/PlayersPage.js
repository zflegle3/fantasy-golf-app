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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AddAction from './AddAction';
import DropAction from './DropAction';
import TradeAction from "./TradeAction"
import axios from 'axios';


export default function PlayersPage({managerId}) {
    const {league, isLoading, isError, message} = useSelector((state) => state.leagueSelected)
    const {user} = useSelector((state) => state.auth)
    const [players, setPlayers] = useState([])

    const options = ["All","Available","Rostered"]

    const getActionBtn = (status) => {
        switch (status) {
            case 'available':
                return <AddAction />
            case 'taken':
                return <TradeAction />
            case 'rostered':
                return <DropAction />
            default:
          }
    }


    const getPlayerScores = async () => {
        await axios.get("https://fantasy-golf-41.herokuapp.com/player/all")
        .then(function (response) {
            let filteredRanks = response.data.filter((element, index) => 
                element.leaderboard.pos != null
            );
            filteredRanks.sort((a,b) => {
                return Number(a.world.average) -  Number(b.world.average)
            } )
            setPlayers(filteredRanks)
        })
    }

    useEffect(() => {
        getPlayerScores();
    },[]);


    return (
        <div id="league-home-container">
            <Box id="players-container" sx={{ display:"flex", flexDirection: "column", padding: "1.5rem", flexGrow: 1, borderRadius: "1.6rem", backgroundColor: "rgba(163,187,211,0.05)", border: '1px solid rgba(58,70,91)'}}>
                <Box sx={{ display:"flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <Typography variant='h6'>All Players</Typography>
                    <LongMenu options={options} title="Filter"/>
                </Box>

                <TableContainer >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">

                        <TableHead>
                            <TableRow>
                                <TableCell align="left">
                                    <Typography variant="body1" sx={{ color: "#d8e2ed", fontWeight: "600"}}>GOLFER</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant="body1" sx={{ color: "#d8e2ed", fontWeight: "600"}}>STATUS</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant="body1" sx={{ color: "#d8e2ed", fontWeight: "600"}}>WORLD RANK</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant="body1" sx={{ color: "#d8e2ed", fontWeight: "600"}}>Fedex </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant="body1" sx={{ color: "#fff", fontWeight: "600"}}>ACTION</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>


                        <TableBody>
                        {players.map((row, index) => (
                            <TableRow
                            key={row._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left" component="th" scope="row" sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                    <Avatar sx={{marginRight: "0.5rem"}} >{row.first_name.charAt(0).toUpperCase()}</Avatar>
                                    <Typography variant="body1" sx={{ color: "#fff", fontWeight: "600"}}>{row.first_name} {row.family_name}</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant="overline" sx={{ color: "#d8e2ed"}}>{"FA"}</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    {row.world.rank ? <Typography variant="overline" sx={{ color: "#d8e2ed"}}>{row.world.rank}</Typography> : <Typography variant="overline" sx={{ color: "#d8e2ed"}}>-</Typography>}
                                </TableCell>
                                <TableCell align="center">
                                    {row.fedex.standing ? <Typography variant="overline" sx={{ color: "#d8e2ed"}}>{row.fedex.standing}</Typography> : <Typography variant="overline" sx={{ color: "#d8e2ed"}}>-</Typography>}
                                </TableCell>
                                <TableCell align="center" component="th" scope="row">
                                    {getActionBtn('available')}
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
    
    );

}