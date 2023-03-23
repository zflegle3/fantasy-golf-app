import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// Added
import { useHistory, useParams } from 'react-router-dom'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import MuiToggleButton from '@mui/material/ToggleButton';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLeagueOne, resetSelected } from '../../../features/leagues/leagueSelectedSlice';
import LeagueHome from "./LeagueHome"
//Icons
import LocalPoliceIcon from '@mui/icons-material/LocalPolice'; //League
import GroupsIcon from '@mui/icons-material/Groups'; //Team
import GroupAddIcon from '@mui/icons-material/GroupAdd'; //Players
import DvrIcon from '@mui/icons-material/Dvr'; //Draft
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    Link
} from "react-router-dom";


export default function LeaguePage({title}) {
    const theme = useTheme();
    const { id } = useParams();
    const [selectedTab, setSelectedTab] = useState('league');
    const dispatch = useDispatch();
    const {league, isLoading, isError, message} = useSelector((state) => state.leagueSelected)
    const {user} = useSelector((state) => state.auth)

    const handleSelect = (e, newSelection) => {
        setSelectedTab(newSelection);
    };

    const ToggleButton = styled(MuiToggleButton)({
        "&.Mui-selected, &.Mui-selected:hover": {
            color: "#022047",
            backgroundColor: '#00ceb8',
        }
    });

    const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
        '& .MuiToggleButtonGroup-grouped': {
        //   margin: theme.spacing(0.5),
        //   color: "#00ceb8", 
        //   backgroundColor: "rgba(0,206,184,0.1",

        //   '&.Mui-disabled': {
        //     border: 0,
        //   },
            // borderRadius: "1rem",
          '&:not(:first-of-type)': {
            borderRadius: "0.8rem",
          },
          '&:first-of-type': {
            borderRadius: ".8rem",
          },
        },
    }));

    useEffect(() => {
        //get league info on id change
        dispatch(getLeagueOne(id));
        setSelectedTab('league');
    }, [id]);


    if (league) {
        return (

            <div id="page-all">

                <Box id="section-header" >
                    <Typography variant='h3' sx={{color:"#ffffff"}}>{league.name}</Typography>
                </Box>
    
                <div id="section-container">
                        
                        <div id="main-section">

                            <div id="toggle-btn-container">

                                <StyledToggleButtonGroup
                                    color="primary"
                                    value={selectedTab}
                                    exclusive
                                    onChange={handleSelect}
                                    aria-label="league-tab"
                                    sx={{ 
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        gap: "1rem",
                                        p: 3,
                                    }}
                                    >
                                    <ToggleButton component={Link} to={`/league/${id}`} value="league" sx={{color:"#00ceb8", backgroundColor:"rgba(0,206,184,0.1)", borderRadius: "1rem"}}>
                                        <LocalPoliceIcon sx={{ marginRight:"0.5rem"}}/>
                                        LEAGUE
                                    </ToggleButton>
                                    <ToggleButton component={Link} to={`/league/${id}/team`} value="team" sx={{color:"#00ceb8", backgroundColor:"rgba(0,206,184,0.1)"}}>
                                        <GroupsIcon sx={{ marginRight:"0.5rem"}}/>
                                        TEAM
                                    </ToggleButton>
                                    <ToggleButton component={Link} to={`/league/${id}/players`} value="players" sx={{color:"#00ceb8", backgroundColor:"rgba(0,206,184,0.1)"}}>
                                        <GroupAddIcon sx={{ marginRight:"0.5rem"}}/>
                                        PLAYERS
                                    </ToggleButton>
                                    <ToggleButton component={Link} to={`/league/${id}/draft`} value="draft" sx={{color:"#00ceb8", backgroundColor:"rgba(0,206,184,0.1)"}}>
                                        <DvrIcon sx={{ marginRight:"0.5rem"}}/>
                                        DRAFT
                                    </ToggleButton>
                                </StyledToggleButtonGroup>
                            </div>

                            <div className='test-container'>
                                <Routes>
                                    <Route exact path="" element={<LeagueHome />}/>
                                    <Route exact path="team" element={<Box>Team</Box>}/>
                                    <Route exact path="players" element={<Box>players</Box>}/>
                                    <Route exact path="draft" element={<Box>draft</Box>}/>
                                </Routes>
                            </div>

                        </div>
    
                        <Box 
                            sx={{ 
                                flexGrow: 1, 
                                p: 3, 
                                color: '#bbb',
                                backgroundColor: "rgba(58,70,91,0.5)",
                                border: "1px solid #3a465b",
                                borderRadius: "16px",
                            }}
                        >
                        </Box>
    
                </div>

            </div>

           
            // </Box>
        
        );
    } else {
        return(
            <div>Loading</div>
        )
    }



}