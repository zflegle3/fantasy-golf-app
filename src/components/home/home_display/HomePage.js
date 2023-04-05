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
import GolfHome from './tabs/GolfHome';
import Stats from './tabs/Stats';
//Icons
import LocalPoliceIcon from '@mui/icons-material/LocalPolice'; //League
import GroupsIcon from '@mui/icons-material/Groups'; //Team
import GroupAddIcon from '@mui/icons-material/GroupAdd'; //Players
import DvrIcon from '@mui/icons-material/Dvr'; //Draft
import GolfRanks from './tabs/GolfRanks';
import FedExRanks from './tabs/FedExRanks';
import SportsGolfTwoToneIcon from '@mui/icons-material/SportsGolfTwoTone';
import EmojiEventsTwoToneIcon from '@mui/icons-material/EmojiEventsTwoTone';
import QueryStatsTwoToneIcon from '@mui/icons-material/QueryStatsTwoTone';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    Link
} from "react-router-dom";
import { TwitterTimelineEmbed } from 'react-twitter-embed';


export default function HomePage({title}) {
    const theme = useTheme();
    const [selectedTab, setSelectedTab] = useState('golf-home');
    const dispatch = useDispatch();
    // const {league, isLoading, isError, message} = useSelector((state) => state.leagueSelected)
    // const {user} = useSelector((state) => state.auth)

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
        setSelectedTab('golf-home');
    }, []);


    return (

        <div id="page-all">

            {/* <Box id="section-header" >
                <Typography variant='h3' sx={{color:"#ffffff"}}>{title}</Typography>
            </Box> */}

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
                                <ToggleButton component={Link} to={`/home/`} value="golf-home" sx={{color:"#00ceb8", backgroundColor:"rgba(0,206,184,0.1)", borderRadius: "1rem"}}>
                                    <SportsGolfTwoToneIcon sx={{ marginRight:"0.5rem"}}/>
                                    HOME
                                </ToggleButton>
                                <ToggleButton component={Link} to={`/home/world-ranks`} value="world-ranks" sx={{color:"#00ceb8", backgroundColor:"rgba(0,206,184,0.1)"}}>
                                    <StarTwoToneIcon sx={{ marginRight:"0.5rem"}}/>
                                    WORLD RANKING
                                </ToggleButton>
                                <ToggleButton component={Link} to={`/home/fedex-ranks`} value="fedex-ranks" sx={{color:"#00ceb8", backgroundColor:"rgba(0,206,184,0.1)"}}>
                                    <EmojiEventsTwoToneIcon sx={{ marginRight:"0.5rem"}}/>
                                    FEDEX CUP STANDINGS
                                </ToggleButton>
                                <ToggleButton component={Link} to={`/home/stats`}  value="stats" sx={{color:"#00ceb8", backgroundColor:"rgba(0,206,184,0.1)"}}>
                                    <QueryStatsTwoToneIcon sx={{ marginRight:"0.5rem"}}/>
                                    RESEARCH
                                </ToggleButton>
                            </StyledToggleButtonGroup>
                        </div>

                        <div className='test-container'>
                            <Routes>
                                <Route exact path="/" element={<GolfHome/>}/>
                                <Route exact path="/world-ranks" element={<GolfRanks />}/>
                                <Route exact path="/fedex-ranks" element={<FedExRanks />}/>
                                <Route exact path="/stats" element={<Stats />}/>
                            </Routes>
                        </div>

                    </div>
{/* 
                    <Box 
                        component="main" 
                        sx={{ 
                            flexGrow: 1, 
                            p: 0, 
                            color: '#bbb',
                            backgroundColor: "rgba(58,70,91,0.5)",
                            border: "1px solid #3a465b",
                            borderRadius: "16px",
                            maxWidth: "600px",
                            overflowY: "scroll",
                        }}
                    >
                        <TwitterTimelineEmbed 
                            sourceType="profile" 
                            screenName="TheMasters"
                            // options={} 
                            // backgroundColor="rgba(163,187,211,0.05)"
                            theme="dark"
                        />
                    </Box> */}

            </div>

        </div>

        
        // </Box>
    
    );


}