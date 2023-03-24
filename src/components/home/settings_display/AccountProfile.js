import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// Added
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLeagueOne, resetSelected } from '../../../features/leagues/leagueSelectedSlice';
import { logout, resetUser } from "../../../features/auth/authSlice"
import Avatar from '@mui/material/Avatar';
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


export default function AccountProfile({title}) {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth)


    const submitImage = (e) => {
        e.preventDefault();
        console.log("submit");
    }

    const displayFile = (e) => {
        e.preventDefault();
        console.log("display");
    }

    return (
        <Box sx={{width: "100%", height: "100%", padding: "3rem"}}>

            <Typography variant='h5' sx={{color:"#ffffff", fontWeight: "600", marginBottom: "3rem"}}>Account Profile</Typography>

            <Box className='settings-container' sx={{display: "flex", flexDirection: "co"}}>
                <form className='profile-image-form' >

                    <div className='image-display-container'> 
                        {/* <img src={null} alt="profile avatar" className='account-img'/> */}
                        {user.imgSrc ? <img src={null} alt="profile avatar" className='account-img'/> :<Avatar sx={{ width: "10rem", height: "10rem" }}>{user.username.charAt(0).toUpperCase()}</Avatar>}
                    </div>

                    <div className="image-upload-container">
                        <h2>Update your profile picture</h2>
                        <p>Upload a photo under 500 KB</p>

                        <div className='upload-controls-container'> 

                            <div className='upload-status-display'>
                                <label htmlFor="image-upload" className="custom-file-upload">
                                    <input id="image-upload" type="file" accept=".png, .jpg, .jpeg" onChange={displayFile}/>
                                    Choose a File
                                </label>
                                <p id="img-preview">No File Selected</p>
                            </div>

                            <div className="form-btn-container">
                                <button onClick={console.log("submit")}>SUBMIT</button>
                            </div>

                        </div>
                        
                    </div>
                </form>
            </Box>

        </Box>
    );

}