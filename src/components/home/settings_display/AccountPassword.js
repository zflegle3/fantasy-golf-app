import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// Added
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLeagueOne, resetSelected } from '../../../features/leagues/leagueSelectedSlice';
import { logout, resetUser, updatePassword } from "../../../features/auth/authSlice"
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
import {checkPassDb, checkNewPass} from "../../../features/auth/validation"


export default function AccountPassword({title}) {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");


    const submitPassword = async (e) => {
        e.preventDefault();
        resetErrors();
        //validate current password
        //if valid dispatch update for new password
        if (currentPassword.length > 0) {
            if (await checkPassDb(user.id, currentPassword)) {
                document.querySelector(".form-item-container.pass-current").classList.add("invalid");
                document.getElementById("pass-error-current").textContent = "Whoops? You sure thats your password?";
            } else {
                if (checkNewPass(newPassword)) {
                    let payload = {
                        id: user.id,
                        password: currentPassword,
                        password_new: newPassword,
                    }
                    dispatch(updatePassword(payload));

                } 
            }
        } else {
            document.querySelector(".form-item-container.pass-current").classList.add("invalid");
            document.getElementById("pass-error-current").textContent = "cannot be empty";
        }


    }

    const resetErrors = () => {
        let currentPass = document.querySelector(".form-item-container.pass-current");
        if (currentPass.classList.contains("invalid")) {
            currentPass.classList.remove("invalid");
            document.getElementById("pass-error-current").textContent = "Current Error";
        }
        let passItem = document.querySelector(".form-item-container.pass-in");
        if (passItem.classList.contains("invalid")) {
            passItem.classList.remove("invalid");
            document.getElementById("pass-error").textContent = "Password Error";
        }
    }

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
                        <button onClick={submitPassword}>SUBMIT</button>
                    </div>

                </form>
                



            </Box>

        </Box>
    );

}