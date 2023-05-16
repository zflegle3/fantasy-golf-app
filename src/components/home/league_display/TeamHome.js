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
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { updateLeagueTeamSettings } from "../../../features/leagues/leagueSelectedSlice";

const StyledTextField = styled(TextField)({
    "& label": {
      color: "white"
    },
    "&:hover label": {
    //   fontWeight: 700
    },
    "& label.Mui-focused": {
      color: "white"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white"
      },
      "&:hover fieldset": {
        borderColor: "white",
  
      },
      "&.Mui-focused fieldset": {
        borderColor: "white"
      }
    }
});


export default function TeamHome({managerId}) {
    const {league, isLoading, isError, message} = useSelector((state) => state.leagueSelected)
    const {user} = useSelector((state) => state.auth)
    const [open, setOpen] = useState(false);
    const [teamNameIn, setTeamNameIn] = useState("");
    const dispatch = useDispatch();
    let team = league.teams.filter((team) => team.manager === managerId)[0];
    const options = [
        'The Masters, Augusta National',
    ];

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(teamNameIn);
        dispatch(updateLeagueTeamSettings({
            managerId: user._id,
            leagueId: league._id,
            nameIn: teamNameIn,
        }));
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#2d3649',
        // bgcolor: "#ffffff",
        boxShadow: "1px 1px 15px #18202f",
        borderRadius: "2rem",
        p: 4,
    };


    console.log(managerId);

    return (
        <div id="league-home-container">
            <Box id="team-header" sx={{display: "flex", flexDirection:"row", alignItems: "center"}}>
                <Avatar sx={{marginRight: "1rem"}}>{team.name.charAt(0).toUpperCase()}</Avatar>
                <Box sx={{ display: "flex", flexDirection: "column", marginRight: "1rem"}}>
                    <Typography variant="h4" sx={{ color: "#fff", fontWeight: "600", marginRight: "0.5rem"}}>{team.name}</Typography>
                    <Typography variant="body1" sx={{ color: "#fff"}}>{team.manager.username}</Typography>
                </Box>
                {managerId === user._id ?  
                    <Fab variant="extended" size="small" aria-label="settings" onClick={handleOpen}>
                        <SettingsIcon />
                    </Fab> 
                    : null
                }


            </Box>
            <Box id="leaderboard-container" sx={{ display:"flex", flexDirection: "column", padding: "1.5rem", flexGrow: 1, borderRadius: "1.6rem", backgroundColor: "rgba(163,187,211,0.05)", border: '1px solid rgba(58,70,91)'}}>
                <Box sx={{ display:"flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <LongMenu options={options} title={"Wk. 1"}/>
                    <Fab variant="extended" size="small" aria-label="edit">
                        <EditIcon />
                    </Fab>
                </Box>

                <TeamRoster team={team} />
            </Box>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="h5" sx={{ color: "#ffffff", fontWeight: "600"}}>Team Settings</Typography>
                    <Typography variant="overline" sx={{ color: "#7988a1", fontWeight: "600"}}>Update your team name</Typography>
                    <Box sx={{display: "flex", flexDirection: "column", gap:"1rem"}}>

                        <StyledTextField id="team-name-edit" label="Team Name" inputProps={{ style: { color: "#ffffff"}}} placeholder={team.name} variant="outlined" onChange={e => setTeamNameIn(e.target.value)} sx={{width: "100%"}}/>

                        <Box className="form-btn-container" sx={{width: "100%"}}>
                            <Button sx={{width: "100%"}} onClick={handleSubmit}>Submit</Button>
                        </Box>

                    </Box>

                </Box>
            </Modal>

        </div>
    
    );

}