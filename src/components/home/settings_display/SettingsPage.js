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
import LeagueHome from "../league_display/LeagueHome"
import TeamHome from '../league_display/TeamHome';
import PlayersPage from '../league_display/PlayersPage';
import Button from '@mui/material/Button';
import { logout, resetUser } from "../../../features/auth/authSlice"
import { resetLeagues } from "../../../features/leagues/leagueSlice"
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
    Link,
    useNavigate
} from "react-router-dom";


export default function SettingsPage({title}) {
    const theme = useTheme();
    const { id } = useParams();
    const [selectedTab, setSelectedTab] = useState('details');
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
        setSelectedTab('details');
    }, [id]);

    const onLogout = () => {
        //logs out user using redux state and navigates to login page
        dispatch(logout());
        dispatch(resetUser());
        dispatch(resetLeagues());
        dispatch(resetSelected());
        navigate("/");
      }


    if (league) {
        return (

            <div id="page-all">
    
                <div id="section-container">
                        
                        <div id="main-section">

                            <Box sx={{width: "100%", height: "100%", padding: "3rem"}}>
                                <Box id="section-header" >
                                    <Typography variant='h5' sx={{color:"#ffffff", fontWeight: "600"}}>Account Settings</Typography>
                                </Box>


                            </Box>

                            {/* <div className='test-container'>
                                



                                <Routes>
                                    <Route exact path="/details" element={<LeagueHome />}/>
                                    <Route exact path="/password" element={<TeamHome managerId={user._id}/>}/>
                                    <Route exact path="profile" element={<PlayersPage />}/>
                                    <Route exact path="preferences" element={<Box>draft</Box>}/>
                                </Routes>
                            </div> */}

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
                                        flexDirection: "column",
                                        justifyContent: "flex-start",
                                        gap: "1rem",
                                        p: 3,
                                    }}
                                    >
                                    <Typography variant='body2' sx={{color: "fff"}}>ACCOUNT</Typography>
                                    <ToggleButton component={Link} to={`/account-settings/details`} value="details" sx={{color:"#00ceb8", backgroundColor:"rgba(0,206,184,0.1)", borderRadius: "1rem"}}>
                                        ACCOUNT DETAILS
                                    </ToggleButton>
                                    <ToggleButton component={Link} to={`/account-settings/password`} value="password" sx={{color:"#00ceb8", backgroundColor:"rgba(0,206,184,0.1)"}}>
                                        PASSWORD
                                    </ToggleButton>
                                    <Typography variant='body1'>PERSONAL</Typography>
                                    <ToggleButton component={Link} to={`/account-settings/profile`} value="profile" sx={{color:"#00ceb8", backgroundColor:"rgba(0,206,184,0.1)"}}>
                                        PROFILE
                                    </ToggleButton>
                                    <ToggleButton component={Link} to={`/account-settings/preferences`} value="preferences" sx={{color:"#00ceb8", backgroundColor:"rgba(0,206,184,0.1)"}}>
                                        PREFERENCES
                                    </ToggleButton>
                                </StyledToggleButtonGroup>
                            </div>

                            <Box  
                                sx={{ 
                                    flexGrow: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "flex-end",
                                    gap: "1rem",
                                    p: 3,
                                }}>
                                <Button onClick={onLogout} variant='outlined' color="error">Logout</Button>
                            </Box>


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