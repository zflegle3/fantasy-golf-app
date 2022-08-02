import { useState, useEffect } from 'react';
import {
    Routes,
    Route,
    Link,
} from "react-router-dom";
import { 
    getFirestore, 
    doc, 
    docs,
    getDoc,
    getDocs,
    addDoc,
    setDoc,
    query,
    where,
    limit,
    collection,
  } from "firebase/firestore";
import { useHistory, useParams } from 'react-router-dom'
//Components
import List from "./List";
//img
import sendIcon from "../images/icons/send-wh.png";




function ChatConsole(props) {
    //props.db
    const { id } = useParams();
    const [LeagueName, setLeagueName]= useState("League Name Temp");
    const [leagueMsgData, setLeagueMsgData] = useState();

    const sendNewMessage = (e) => {
        e.preventDefault();
        console.log("Send Message");
    }


    useEffect(() => {
        console.log(`Pulling Chat Data`);
        pullMsgData(id);
        console.log(id);
    }, [id]);


    async function pullMsgData(leagueIdToPull) {
        let allMessageData = [];
        const messagesRef = collection(props.db,"messages");

        const messagesQuery = query(
            messagesRef,
            where("leagueId", "==", leagueIdToPull),
            limit(15),
        );

        const messagesSnap = await getDocs(messagesQuery);


        messagesSnap.forEach((doc) => {
            console.log(doc.data());
            allMessageData.push(doc.data());
        })
        console.log(allMessageData);

        setLeagueMsgData(allMessageData);
    }


    if (leagueMsgData) {
        return (
            <div className="league-message-console">
                <List listType="league-message" dataArray={leagueMsgData} />
                <form className="league-message-form">
                    <input className="league-message-input" placeholder="Enter Message"></input>
                    <button onClick={sendNewMessage}><img className="league-message-input" src={sendIcon} alt="send icon" onClick={sendNewMessage}/></button>
                </form>
            </div>
        );
    } else {
        return(
            <div>Loading</div>
        )
    }


}

export default ChatConsole;