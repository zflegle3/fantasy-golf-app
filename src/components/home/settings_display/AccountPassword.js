import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// Added
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLeagueOne, resetSelected } from '../../../features/leagues/leagueSelectedSlice';
import { logout, resetUser } from "../../../features/auth/authSlice"
//Icons
import { FaRegCheckCircle, FaCheck, FaRegTimesCircle } from 'react-icons/fa';
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
import {addFocus, removeFocus} from "../../../features/style"


export default function AccountPassword({title}) {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");



    return (
        <Box sx={{width: "100%", height: "100%", padding: "3rem"}}>
            <Box id="section-header" >
                <Typography variant='h5' sx={{color:"#ffffff", fontWeight: "600", marginBottom: "3rem"}}>Account Password</Typography>
                <form className='account-details-form'>
                    <div className='form-input-container'>

                        <Box className='names-container' sx={{display: "flex", width: "100%", gap: "1.5rem"}}>

                            <Box className={`form-item-container pass-current`} sx={{ flexGrow: 1}}>
                                <label htmlFor="pass-current">current password</label>
                                <div className="input-container pass-in">
                                    <input type="password" id="pass-current" name="pass-current" placeholder="Current password" onFocus={addFocus} onBlur={removeFocus} onChange={e => setCurrentPassword(e.target.value)}></input>
                                </div>
                                <p id="pass-error-current">Password Error</p>
                            </Box> 

                            <Box className={`form-item-container pass-in`} sx={{ flexGrow: 1}}>
                                <label htmlFor="pass-new">new password</label>
                                <div className="input-container pass-in">
                                    <input type="password" id="pass-new" name="pass-new" placeholder="New password" onFocus={addFocus} onBlur={removeFocus} onChange={e => setNewPassword(e.target.value)}></input>
                                </div>
                                <p id="pass-error">Password Error</p>
                            </Box> 

                        </Box>

                        <div className="pass-error-container">
                            <div id="pass-error-signin-length">
                                <div>
                                    <FaRegCheckCircle />
                                </div>
                                <p>have at least 8 characters</p>
                            </div>
                            <div id="pass-error-signin-upper">
                                <div>
                                    <FaRegCheckCircle />
                                </div>
                                <p >have at least 1 Upper characters</p>
                            </div>
                            <div id="pass-error-signin-number">
                                <div>
                                    <FaRegCheckCircle />
                                </div>
                                <p >have at least 1 number</p>
                            </div>
                            <div id="pass-error-signin-special">
                                <div>
                                    <FaRegCheckCircle />
                                </div>
                                <p >have at least 1 special character (i.e. ! @ # $ % ^ & *)</p>
                            </div>
                        </div>

                    </div>


                    <div className="form-btn-container">
                        <button onClick={console.log("submit")}>SUBMIT</button>
                    </div>

                </form>
                



            </Box>

        </Box>
    );

}