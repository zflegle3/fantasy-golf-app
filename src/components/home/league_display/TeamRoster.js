import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux';


export default function BasicTable({team}) {
    const {league, isLoading, isError, message} = useSelector((state) => state.leagueSelected)

    //Temporary data 
    let playersAll = [...team.roster];
    playersAll.sort((a,b) => {
        return Number(a.score.sortTotal) -  Number(b.score.sortTotal)
    });
    let starters = playersAll.slice(0,(league.settings.rosterSize - league.settings.rosterCut));
    console.log(league.settings.rosterSize - league.settings.rosterCut);
    let bench = playersAll.slice(league.settings.rosterSize - league.settings.rosterCut);


    return (
        <Box sx={{ display:"flex", flexDirection: "column"}}>

            <TableContainer >

                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">
                                <Typography variant="h6" sx={{ color: "#fff", fontWeight: "600"}}>STARTERS</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="body1" sx={{ color: "#d8e2ed", fontWeight: "600"}}>To Par</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="body1" sx={{ color: "#d8e2ed", fontWeight: "600"}}>Rd. 1</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="body1" sx={{ color: "#d8e2ed", fontWeight: "600"}}>Rd. 2</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="body1" sx={{ color: "#d8e2ed", fontWeight: "600"}}>Rd. 3</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="body1" sx={{ color: "#d8e2ed", fontWeight: "600"}}>Rd. 4</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="body1" sx={{ color: "#fff", fontWeight: "600"}}>Total</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>


                    <TableBody>
                    {starters.map((row) => (
                        <TableRow
                        key={row._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="left" component="th" scope="row">
                                <Typography variant="body1" sx={{ color: "#fff", fontWeight: "600"}}>{row.first_name} {row.family_name}</Typography>
                            </TableCell>
                            <TableCell align="center">
                                {row._id !== "none" ? <Typography variant="overline" sx={{ color: "#d8e2ed"}}>{row.score.toPar}</Typography> : <Typography variant="overline" sx={{ color: "#d8e2ed"}}>0</Typography> }
                            </TableCell>
                            <TableCell align="center">
                                {row._id !== "none" ? <Typography variant="overline" sx={{ color: "#d8e2ed"}}>{row.score.rOne}</Typography> : <Typography variant="overline" sx={{ color: "#d8e2ed"}}>0</Typography> }
                            </TableCell>
                            <TableCell align="center">
                                {row._id !== "none" ? <Typography variant="overline" sx={{ color: "#d8e2ed"}}>{row.score.rTwo}</Typography> : <Typography variant="overline" sx={{ color: "#d8e2ed"}}>0</Typography> }
                            </TableCell>
                            <TableCell align="center">
                                {row._id !== "none" ? <Typography variant="overline" sx={{ color: "#d8e2ed"}}>{row.score.rThree}</Typography> : <Typography variant="overline" sx={{ color: "#d8e2ed"}}>0</Typography> }
                            </TableCell>
                            <TableCell align="center">
                            {row._id !== "none" ? <Typography variant="overline" sx={{ color: "#d8e2ed"}}>{row.score.rFour}</Typography> : <Typography variant="overline" sx={{ color: "#d8e2ed"}}>0</Typography> }
                            </TableCell>
                            <TableCell align="center" component="th" scope="row">
                                {row._id !== "none" ? <Typography variant="overline" sx={{ color: "#d8e2ed"}}>{row.score.total}</Typography> : <Typography variant="overline" sx={{ color: "#d8e2ed"}}>0</Typography> }
                            </TableCell>
                        </TableRow>
                    ))}
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="left" component="th" scope="row">
                                <Typography variant="body1" sx={{ color: "#fff", fontWeight: "600"}}>Team Total:</Typography>
                            </TableCell>
                            <TableCell align="center">
                                {team.total ? <Typography variant="body1" sx={{ color: "#fff", fontWeight: "600"}}>{team.total}</Typography> : <Typography variant="overline" sx={{ color: "#d8e2ed"}}>0</Typography> }
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <TableContainer >
                
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">
                                <Typography variant="h6" sx={{ color: "#fff", fontWeight: "600"}}>CUT</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="body1" sx={{ color: "#d8e2ed", fontWeight: "600"}}>To Par</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="body1" sx={{ color: "#d8e2ed", fontWeight: "600"}}>Rd. 1</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="body1" sx={{ color: "#d8e2ed", fontWeight: "600"}}>Rd. 2</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="body1" sx={{ color: "#d8e2ed", fontWeight: "600"}}>Rd. 3</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="body1" sx={{ color: "#d8e2ed", fontWeight: "600"}}>Rd. 4</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="body1" sx={{ color: "#fff", fontWeight: "600"}}>Total</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>


                    <TableBody>
                    {bench.map((row) => (
                        <TableRow
                        key={row._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="left" component="th" scope="row">
                                <Typography variant="body1" sx={{ color: "#fff", fontWeight: "600"}}>{row.first_name} {row.family_name}</Typography>
                            </TableCell>
                            <TableCell align="center">
                                {row._id !== "none" ? <Typography variant="overline" sx={{ color: "#d8e2ed"}}>{row.score.toPar}</Typography> : <Typography variant="overline" sx={{ color: "#d8e2ed"}}>0</Typography> }
                            </TableCell>
                            <TableCell align="center">
                                {row._id !== "none" ? <Typography variant="overline" sx={{ color: "#d8e2ed"}}>{row.score.rOne}</Typography> : <Typography variant="overline" sx={{ color: "#d8e2ed"}}>0</Typography> }
                            </TableCell>
                            <TableCell align="center">
                                {row._id !== "none" ? <Typography variant="overline" sx={{ color: "#d8e2ed"}}>{row.score.rTwo}</Typography> : <Typography variant="overline" sx={{ color: "#d8e2ed"}}>0</Typography> }
                            </TableCell>
                            <TableCell align="center">
                                {row._id !== "none" ? <Typography variant="overline" sx={{ color: "#d8e2ed"}}>{row.score.rThree}</Typography> : <Typography variant="overline" sx={{ color: "#d8e2ed"}}>0</Typography> }
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="overline" sx={{ color: "#d8e2ed"}}>0</Typography>
                            </TableCell>
                            <TableCell align="center" component="th" scope="row">
                                {row._id !== "none" ? <Typography variant="overline" sx={{ color: "#d8e2ed"}}>{row.score.total}</Typography> : <Typography variant="overline" sx={{ color: "#d8e2ed"}}>0</Typography> }
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </Box>
    );
}