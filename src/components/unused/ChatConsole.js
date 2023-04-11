import { useState, useEffect } from 'react';
import {
    Routes,
    Route,
    Link,
} from "react-router-dom";
import { useHistory, useParams } from 'react-router-dom'
//Components
import MessageList from "../MessageList";
//img
import sendIcon from "../images/icons/send-wh.png";




function ChatConsole(props) {
    //props.db
    const { id } = useParams();
    const [LeagueName, setLeagueName]= useState("League Name Temp");
    const [leagueMsgData, setLeagueMsgData] = useState();

    // const createNewMessage = (e) => {
    //     e.preventDefault();
    //     let messageIn = document.getElementById("message-input");
    //     let msgForm = document.getElementById("league-message-form");
    //     // console.log(messageIn.value);
    //     if (messageIn.value) {
    //         sendNewMessage(messageIn.value);
    //         msgForm.reset();
    //     }
    //     setTimeout(() => {
    //         console.log("Delayed for 1 second, update messages now");
    //         pullMsgData(id);
    //     }, "1000")
    // }


    // useEffect(() => {
    //     pullMsgData(id);
    // }, [id]);


    // async function pullMsgData(leagueIdToPull) {
    //     // console.log(`Pulling Chat Data`);
    //     let allMessageData = [];
    //     const messagesRef = collection(props.db,"messages");
    //     const messagesQuery = query(
    //         messagesRef,
    //         where("leagueId", "==", leagueIdToPull),
    //         orderBy("time"),
    //     );
    //     const messagesSnap = await getDocs(messagesQuery);
    //     messagesSnap.forEach((doc) => {
    //         allMessageData.push(doc.data());
    //     })
    //     setLeagueMsgData(allMessageData);
    // }

    // async function sendNewMessage(messageIn) {
    //     console.log(messageIn);
    //     console.log(typeof messageIn);
    //     const messagesRef = collection(props.db,"messages");
    //     const newMsgDoc = await addDoc(messagesRef, {
    //         leagueId: id,
    //         text: messageIn,
    //         time: Date(),
    //         userName: "zegle456@gmail.com",
    //     });
    // }


    if (leagueMsgData) {
        return (
            <div className="league-message-console">
                <h1 className="league-message-header">League Chat</h1>

                <form id="league-message-form">
                    <input className="league-message-input" id="message-input" placeholder="Enter Message"></input>
                    {/* <button onClick={createNewMessage}><img className="league-message-input" src={sendIcon} alt="send icon" /></button> */}
                </form>

                <MessageList dataArray={leagueMsgData} />
            </div>
        );
    } else {
        return(
            <div>Loading</div>
        )
    }


}

export default ChatConsole;