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
    //props.userActive
    //props.db
    // const [rankData, setRankData] = useState({rankings: []});

    console.log(props.newLeagueOpen);
    if (!props.newLeagueOpen) {
        return null;
    } else {
        return ReactDom.createPortal(
            <>  
                <div className="modal-overlay" onClick={() => props.setNewLeagueOpen(false)}></div>
                <NewLeagueModal setNewLeagueOpen={props.setNewLeagueOpen}/>
            </>,
            document.getElementById("modal-portal")
        );

    }

}

export default ModalContainer;