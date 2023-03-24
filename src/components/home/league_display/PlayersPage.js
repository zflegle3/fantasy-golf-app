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


export default function PlayersPage({managerId}) {
    const {league, isLoading, isError, message} = useSelector((state) => state.leagueSelected)
    const {user} = useSelector((state) => state.auth)
 
    console.log(league);

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
                                    <Typography variant="h6" sx={{ color: "#fff", fontWeight: "600"}}>GOLFER</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant="body1" sx={{ color: "#d8e2ed", fontWeight: "600"}}>STATUS</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant="body1" sx={{ color: "#d8e2ed", fontWeight: "600"}}>WORLD RANK</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant="body1" sx={{ color: "#d8e2ed", fontWeight: "600"}}>STAT A</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant="body1" sx={{ color: "#d8e2ed", fontWeight: "600"}}>STAT B</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant="body1" sx={{ color: "#fff", fontWeight: "600"}}>ACTION</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>


                        <TableBody>
                        {league.freeAgents.map((row, index) => (
                            <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left" component="th" scope="row" sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                    <Avatar sx={{marginRight: "0.5rem"}} >{row.player.charAt(0).toUpperCase()}</Avatar>
                                    <Typography variant="body1" sx={{ color: "#fff", fontWeight: "600"}}>{row.player}</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant="overline" sx={{ color: "#d8e2ed"}}>{row.status}</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant="overline" sx={{ color: "#d8e2ed"}}>{index}</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant="overline" sx={{ color: "#d8e2ed"}}>0</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant="overline" sx={{ color: "#d8e2ed"}}>0</Typography>
                                </TableCell>
                                <TableCell align="center" component="th" scope="row">
                                    {getActionBtn(row.status)}
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