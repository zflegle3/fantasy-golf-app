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


export default function GolfRanks({managerId}) {
    const {league, isLoading, isError, message} = useSelector((state) => state.leagueSelected)
    const {user} = useSelector((state) => state.auth)
 
    console.log(league);

    const options = ["All","Available","Rostered"]


    return (
        <div id="league-home-container">
            <Box id="players-container" sx={{ display:"flex", flexDirection: "column", padding: "1.5rem", flexGrow: 1, borderRadius: "1.6rem", backgroundColor: "rgba(163,187,211,0.05)", border: '1px solid rgba(58,70,91)'}}>
                <Box sx={{ display:"flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <Typography variant='h6'>World Golf Rankings</Typography>
                    {/* <LongMenu options={options} title="Filter"/> */}
                </Box>

                <TableContainer >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">

                        <TableHead>
                            <TableRow>
                                <TableCell align="left">
                                    <Typography variant="h6" sx={{ color: "#fff", fontWeight: "600"}}>Rank</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    {/* <Typography variant="body1" sx={{ color: "#d8e2ed", fontWeight: "600"}}>^^</Typography> */}
                                    <ImportExportIcon sx={{ color: "#d8e2ed"}}/>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant="body1" sx={{ color: "#d8e2ed", fontWeight: "600"}}>Golfer</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant="body1" sx={{ color: "#d8e2ed", fontWeight: "600"}}>Avg Points</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant="body1" sx={{ color: "#d8e2ed", fontWeight: "600"}}>Total Points</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant="body1" sx={{ color: "#d8e2ed", fontWeight: "600"}}>Points Lost</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant="body1" sx={{ color: "#fff", fontWeight: "600"}}>Points Gained</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>


                        <TableBody>
                        {league.freeAgents.map((row, index) => (
                            <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left" >
                                    <Typography variant="body1" sx={{ color: "#fff", fontWeight: "600"}}>{index}</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant="overline" sx={{ color: "#d8e2ed"}}>0</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant="overline" sx={{ color: "#d8e2ed"}}>{row.player}</Typography>
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
                                <TableCell align="center">
                                    <Typography variant="overline" sx={{ color: "#d8e2ed"}}>0</Typography>
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