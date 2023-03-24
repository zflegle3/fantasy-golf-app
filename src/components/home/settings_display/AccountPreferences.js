import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// Added
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLeagueOne, resetSelected } from '../../../features/leagues/leagueSelectedSlice';
import { logout, resetUser } from "../../../features/auth/authSlice"
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


export default function AccountPreferences({title}) {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth)




    return (
        <Box sx={{width: "100%", height: "100%", padding: "3rem"}}>
            <Box id="section-header" >
                <Typography variant='h5' sx={{color:"#ffffff", fontWeight: "600"}}>Account Preferences</Typography>
            </Box>

        </Box>
    );

}