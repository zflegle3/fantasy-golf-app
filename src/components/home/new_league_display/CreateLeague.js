import { useState, useEffect } from 'react';
import ReactDom from "react-dom";
import { v4 as uuidv4 } from 'uuid';

import NewLeagueModal from "./NewLeagueModal";
import Box from '@mui/material/Box';



function CreateLeague({setLeagueType}) {

    return (
        <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%", backgroundColor: "#181c28"}}>
            <NewLeagueModal setLeagueType={setLeagueType}/>
        </Box>
    );
}

// #181c28

export default CreateLeague;