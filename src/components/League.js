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
import TeamTab from "./TeamTab";
//img
import leagueIcon from "../images/icons/golf-flag-wh.png";
import settingsIcon from "../images/icons/cog-outline-wh.png";



function League(props) {
    //props.db
    //props.leagues
    //props.userInfo  
    //props.leaderboardData
    //props.worldRanksData
    //props.fedexRanksData
    const { id } = useParams();
    const [LeagueName, setLeagueName]= useState("League Name Temp");
    const [leagueSelectData, setLeagueSelectedData] = useState();
    const [leagueLeaderboard, setLeagueLeaderboard] = useState();


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
        pullLeagueData(id);
    }, [id]);


    async function pullLeagueData(leagueIdToPull) {
        //pulls league data to display
        // console.log("Pull league data",leagueIdToPull);
        let leagueDoc = doc(props.db,`leagues/${leagueIdToPull}`);
        const leagueSnap  = await getDoc(leagueDoc);
        setLeagueSelectedData(leagueSnap.data());
        setLeagueName(leagueSnap.data().settings.name)
        // return(leagueSnap.data());
        //Update score with pulled data
        console.log(leagueSnap.data());
        updateScores(leagueSnap.data())
    }

    const updateScores = (leagueData) => {
        let upcomingEvents = leagueData.schedule.filter((tournament) => {
            return tournament.completeStatus === false;
        })
        let nextEvent = upcomingEvents[0];
        console.log(nextEvent);
        console.log(props.leaderboardData);
        let tempScoreCard = []
        //if date between start and end date
            //pull scorecard data for players (teams/rosters, leaderboard data)
            let teams = leagueData.teams
            for (let i=0; i< teams.length; i++) {
                let tempTeam= []
                for (let j=0; j< teams[0].roster.length; j++) {
                    let playerData = props.leaderboardData.leaderboardRows.filter((playerSelected) => {
                        // console.log(playerSelected);
                        return Number(playerSelected.playerId) === teams[i].roster[j].playerId;
                    })
                    // console.log(props.leaderboardData.leaderboardRows);
                    console.log(playerData);
                    console.log(teams[i].roster[j].playerId);
                    let rosterItem ={
                        playerId: teams[i].roster[j].playerId,
                        playerName: teams[i].roster[j].playerName,
                        rounds: playerData[0].rounds,
                        tot: playerData[0].total,
                    }
                    tempTeam.push(rosterItem);
                }
                tempScoreCard.push(tempTeam);
            }
            console.log(tempScoreCard);
                //Pass in leaderboard data to League component 
                //pull r1/r2/r3/r4/tot data from there and populate object above
            //publish object to scorecard State to display in Leaderboard Component
            //publish object to scorecard backend, maybe only publish to backend once final??



            //calc scores 
            //display on leaderboard
        //if date after end date
            //pull data 
            //update Leaderboard Scores
            //set completeStatus to True

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
                            <Route exact path="roster" element={<TeamTab test={`${LeagueName}, Team/Roster`} userInfo={props.userInfo} leagueData={leagueSelectData} openSettingsModal={openSettingsModal} />}/>
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
                    <EditSettingsModal db={props.db} leagueSettings={leagueSelectData} userInfo={props.userInfo} closeSettingsModal={closeSettingsModal} pullLeagueData={pullLeagueData}/>
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