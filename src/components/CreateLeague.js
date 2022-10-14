import { useState, useEffect } from 'react';
import ReactDom from "react-dom";
import { 
    getFirestore, 
    doc, 
    getDoc,
    getDocs,
    addDoc,
    setDoc,
    updateDoc,
    collection,
  } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

import NewLeagueModal from "./NewLeagueModal";



function CreateLeague(props) {
    //props.userData

    return (
        <NewLeagueModal userData={props.userData} setNewLeagueOpen={props.setNewLeagueOpen}/>
    );
}

export default CreateLeague;