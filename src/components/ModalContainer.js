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



function ModalContainer(props) {
    //props.newLeagueOpen
    //props.setNewLeagueOpen()
    //props.userData
    //props.userId
    //props.db
    //props.refreshUserData()

    console.log(props.userId);
    if (!props.newLeagueOpen) {
        return null;
    } else {
        return ReactDom.createPortal(
            <>  
                <div className="modal-overlay" onClick={() => props.setNewLeagueOpen(false)}></div>
                <NewLeagueModal userData={props.userData} userId={props.userId} db={props.db} refreshUserData={props.refreshUserData} setNewLeagueOpen={props.setNewLeagueOpen}/>
            </>,
            document.getElementById("modal-portal")
        );

    }

}

export default ModalContainer;