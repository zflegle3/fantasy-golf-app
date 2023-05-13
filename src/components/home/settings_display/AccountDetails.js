import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// Added
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLeagueOne, resetSelected } from '../../../features/leagues/leagueSelectedSlice';
import { logout, resetUser, updateDetails } from "../../../features/auth/authSlice"
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
import {addFocus, removeFocus} from "../../../features/style"


export default function AccountDetails({title}) {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);
    const [firstIn, setFirstIn] = useState(user.first_name);
    const [lastIn, setLastIn] = useState(user.last_name);
    const [usernameIn, setUsernameIn] = useState(user.username);
    const [emailIn, setEmailIn] = useState(user.email);



    const submitSettings = (e) => {
        e.preventDefault();
        //takes and validates user inputs and dispatches and an update user function to submit the values
        //id, first_name, last_name, username, email
        console.log(firstIn === user.first_name );
        let payload = {
            id: user.id,
            first_name: (firstIn.length < 1 || firstIn === user.first_name ? null : firstIn),
            last_name: (lastIn.length < 1 || lastIn === user.last_name ? null : lastIn),
            username: (usernameIn.length < 1 || usernameIn === user.username ? null : usernameIn),
            email: (emailIn.length < 1 || emailIn === user.email ? null : emailIn),
        }
        dispatch(updateDetails(payload));
    }



    return (
        <Box sx={{width: "100%", height: "100%", padding: "3rem"}}>
            <Box id="section-header" >
                <Typography variant='h5' sx={{color:"#ffffff", fontWeight: "600", marginBottom: "3rem"}}>Account Settings</Typography>
                <form className='account-details-form'>
                    <div className='form-input-container'>

                        <Box className='names-container' sx={{display: "flex", width: "100%", gap: "1.5rem"}}>

                            <Box className="form-item-container name-first" sx={{ flexGrow: 1}}>
                                <label htmlFor="name-first">first name</label>
                                <div className="input-container">
                                    <input type="text" id="name-first" name="name-first" value={firstIn} onFocus={addFocus} onBlur={removeFocus} onChange={e => setFirstIn(e.target.value)}></input>
                                </div>
                                <p id="name-first-error">first name error</p>
                            </Box>

                            <Box className="form-item-container name-last" sx={{ flexGrow: 1}}>
                                <label htmlFor="name-last">last name</label>
                                <div className="input-container">
                                    <input type="text" id="name-last" name="name-last" value={lastIn} onFocus={addFocus} onBlur={removeFocus} onChange={e => setLastIn(e.target.value)} ></input>
                                </div>
                                <p id="name-last-error">last name error</p>
                            </Box>

                        </Box>

                        <div className="form-item-container user-name-in">
                            <label htmlFor="user-name-in">username</label>
                            <div className="input-container">
                                <input type="text" id="user-name-in" name="user-name-in" value={usernameIn} onFocus={addFocus} onBlur={removeFocus} onChange={e => setUsernameIn(e.target.value)} ></input>
                            </div>
                            <p id="user-name-error">username error</p>
                        </div>

                        <div className="form-item-container email-in">
                            <label htmlFor="email-in">email</label>
                            <div className="input-container" >
                                <input type="email-in" id="email" name="email-in" value={emailIn} onFocus={addFocus} onBlur={removeFocus} onChange={e => setEmailIn(e.target.value)} ></input>
                            </div>
                            <p id="email-error">email error</p>
                        </div>


                        <div className='password-container'>
                            {/* {passChange} */}
                        </div>

                    </div>


                    <div className="form-btn-container">
                        <button onClick={submitSettings}>SUBMIT</button>
                    </div>

                </form>
                



            </Box>

        </Box>
    );

}