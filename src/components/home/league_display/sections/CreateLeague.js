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

import NewLeagueModal from "../../modal_display/NewLeagueModal";



function CreateLeague(props) {
    //props.userData
    //props.userId
    //props.db
    //props.refreshUserData()

    return (
        <NewLeagueModal userData={props.userData} userId={props.userId} db={props.db} refreshUserData={props.refreshUserData} setNewLeagueOpen={props.setNewLeagueOpen}/>
    );
}

export default CreateLeague;