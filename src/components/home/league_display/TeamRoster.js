import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';


export default function BasicTable({team}) {

    //Temporary data 
    let starters = team.roster.slice(0,4);
    let bench = team.roster.slice(4);

    return (
        <Box sx={{ display:"flex", flexDirection: "column"}}>

            <TableContainer >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">

                    <TableHead>
                        <TableRow>
                            <TableCell align="left">
                                <Typography variant="h6" sx={{ color: "#fff", fontWeight: "600"}}>STARTERS</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="body1" sx={{ color: "#d8e2ed", fontWeight: "600"}}>RD. 1</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="body1" sx={{ color: "#d8e2ed", fontWeight: "600"}}>RD. 2</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="body1" sx={{ color: "#d8e2ed", fontWeight: "600"}}>RD. 3</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="body1" sx={{ color: "#d8e2ed", fontWeight: "600"}}>RD. 4</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="body1" sx={{ color: "#fff", fontWeight: "600"}}>SCORE</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>


                    <TableBody>
                    {starters.map((row) => (
                        <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="left" component="th" scope="row">
                                <Typography variant="body1" sx={{ color: "#fff", fontWeight: "600"}}>{row.first_name} {row.family_name}</Typography>
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
                            <TableCell align="center">
                                <Typography variant="overline" sx={{ color: "#d8e2ed"}}>0</Typography>
                            </TableCell>
                            <TableCell align="center" component="th" scope="row">
                                <Typography variant="body1" sx={{ color: "#fff", fontWeight: "600"}}>0</Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TableContainer >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">

                    <TableHead>
                        <TableRow>
                            <TableCell align="left">
                                <Typography variant="h6" sx={{ color: "#fff", fontWeight: "600"}}>BENCH</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="body1" sx={{ color: "#d8e2ed", fontWeight: "600", opacity: "0"}}>RD. 1</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="body1" sx={{ color: "#d8e2ed", fontWeight: "600", opacity: "0"}}>RD. 2</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="body1" sx={{ color: "#d8e2ed", fontWeight: "600", opacity: "0"}}>RD. 3</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="body1" sx={{ color: "#d8e2ed", fontWeight: "600", opacity: "0"}}>RD. 4</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="body1" sx={{ color: "#fff", fontWeight: "600", opacity: "0"}}>SCORE</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>


                    <TableBody>
                    {bench.map((row) => (
                        <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="left" component="th" scope="row">
                                <Typography variant="body1" sx={{ color: "#fff", fontWeight: "600"}}>{row.first_name} {row.family_name}</Typography>
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
                            <TableCell align="center">
                                <Typography variant="overline" sx={{ color: "#d8e2ed"}}>0</Typography>
                            </TableCell>
                            <TableCell align="center" component="th" scope="row">
                                <Typography variant="body1" sx={{ color: "#fff", fontWeight: "600"}}>0</Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </Box>
    );
}