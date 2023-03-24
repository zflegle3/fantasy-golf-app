import { useState, useEffect } from 'react';
import ReactDom from "react-dom";
import { v4 as uuidv4 } from 'uuid';

import NewLeagueModal from "../../modal_display/NewLeagueModal";
import Box from '@mui/material/Box';



function CreateLeague(props) {
    //props.userData
    //props.userId
    //props.db
    //props.refreshUserData()

    return (
        <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%", backgroundColor: "#181c28"}}>
            <NewLeagueModal userData={props.userData} userId={props.userId} db={props.db} refreshUserData={props.refreshUserData} setNewLeagueOpen={props.setNewLeagueOpen}/>
        </Box>
    );
}

// #181c28

export default CreateLeague;