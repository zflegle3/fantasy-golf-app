import { useState, useEffect } from 'react';
import {
    Routes,
    Route,
    Link,
} from "react-router-dom";
import { 
    getFirestore, 
    doc, 
    getDoc,
    getDocs,
    addDoc,
    setDoc,
    collection,
  } from "firebase/firestore";
import { useHistory, useParams } from 'react-router-dom'
//Components
import Test from "./Test";
import LeagueTab from "./LeagueTab";
import ChatConsole from "./ChatConsole";
import EditSettingsModal from "./EditSettingsModal";
//img
import leagueIcon from "../images/icons/golf-flag-wh.png";
import settingsIcon from "../images/icons/cog-outline-wh.png";



function League(props) {
    //props.leagues
    //props.userInfo
    //props.db
    const { id } = useParams();
    const [LeagueName, setLeagueName]= useState("League Name Temp");
    const [leagueSelectData, setLeagueSelectedData] = useState();


    const openSettingsModal = () => {
        console.log("Open Edit Settings");
        let EditModal = document.getElementById("edit-settings-modal-container");
        EditModal.classList = "edit-settings-modal-container visable";
    }

    const closeSettingsModal = (e) => {
        console.log("Close Edit Settings");
        console.log(e.target);
        let EditModal = document.getElementById("edit-settings-modal-container");
        EditModal.classList = "edit-settings-modal-container";
    }


    useEffect(() => {
        console.log(`Pulling League Data,`);
        let data = pullLeagueData(id);
        console.log(data);
    }, [id]);


    async function pullLeagueData(leagueIdToPull) {
        console.log("Pull league data",leagueIdToPull);
        let leagueDoc = doc(props.db,`leagues/${leagueIdToPull}`);
        const leagueSnap  = await getDoc(leagueDoc);
        setLeagueSelectedData(leagueSnap.data());
        setLeagueName(leagueSnap.data().settings.name)
        return(leagueSnap.data());
    }



    if (leagueSelectData) {
        console.log(leagueSelectData);
        return (
            <div className="center-panel-content">
                <div className="center-panel-header">
                    <img src={leagueIcon}></img>
                    <h1>{leagueSelectData.settings.name}</h1>
                    <p>{`${leagueSelectData.settings.teamCount}-Team ${leagueSelectData.settings.scoring.format}`}</p>
                    <div>
                        <img src={settingsIcon} onClick={openSettingsModal}></img>
                    </div>
                </div>
                <div className="dual-content-panel">
                    <div className="center-panel">
                    <ul className="center-panel-tabs">
                        <Link to={`/league/${id}`} className="center-panel-tab-item">League</Link>
                        <Link to={`/league/${id}/roster`} className="center-panel-tab-item">Team</Link>
                        <Link to={`/league/${id}/players`} className="center-panel-tab-item">Players</Link>
                        <Link to={`/league/${id}/draft`} className="center-panel-tab-item">Draft</Link>
                    </ul>
                    <div className="center-panel-display">
                        <Routes>
                            <Route exact path="" element={<LeagueTab test={`${LeagueName}, League Home`} leagueData={leagueSelectData} userInfo={props.userInfo} openSettingsModal={openSettingsModal} />}/>
                            <Route exact path="roster" element={<Test test={`${LeagueName}, Team/Roster`}/>}/>
                            <Route exact path="players" element={<Test test={`${LeagueName}, Players`}/>}/>
                            <Route exact path="draft" element={<Test test={`${LeagueName}, Draft`}/>}/>
                        </Routes>
                    </div>
                    </div>
                    <div className="right-panel">
                        <ChatConsole db={props.db}/>
                    </div>
                </div>
                <div className="edit-settings-modal-container" id="edit-settings-modal-container">
                    <EditSettingsModal db={props.db} leagueSettings={leagueSelectData} userInfo={props.userInfo} closeSettingsModal={closeSettingsModal}/>
                </div>
            </div>
        );
    } else {
        return(
            <div>Loading</div>
        )
    }


}

export default League;