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
    //props.eventInfo
    //props.worldRanksData
    //props.fedexRanksData
    const { id } = useParams();
    const [LeagueName, setLeagueName]= useState("League Name Temp");
    const [leagueSelectData, setLeagueSelectedData] = useState();
    const [leagueLeaderboard, setLeagueLeaderboard] = useState();

    // console.log(props.worldRanksData);
    // console.log(props.fedexRanksData);
    console.log(props.leaderboardData);
    console.log(props.eventInfo);


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
        //determine next event on league's schedule
        let upcomingEvents = leagueData.schedule.filter((tournament) => {
            return tournament.completeStatus === false;
        });
        let nextEvent = upcomingEvents[0];
        console.log(nextEvent);
        //next event on pga schedule is passed in as props
        console.log(props.leaderboardData);
        //if id's match between pga and league events
        if (nextEvent.tournId === props.leaderboardData.tournId) {
            console.log("Current Event is on league schedule", props.leaderboardData.roundStatus);
            //
            console.log("Tournament is Live");
            //Create Weekly Scorecard Object
            let tempScoreCard = [];
            let teams = leagueData.teams;
            for (let i=0; i< teams.length; i++) { //for every team
                let tempTeam= [teams[i].teamName, teams[i].managerName];
                for (let j=0; j< teams[0].roster.length; j++) { //for every player on that team
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
            //Set State with Object to display
            setLeagueLeaderboard(tempScoreCard);

            if (props.leaderboardData.roundStatus === "Official") {
                console.log("Tournament complete, finalize scores");
                //Create Weekly Scorecard Object
                //Create Season Scorecard Object
                //Write data objects to League doc in firebase
            }

            // if (props.leaderboardData.roundStatus === "In Progress") { //tournament ongoing
            //     console.log("Tournament is Live");
            //     //Create Weekly Scorecard Object
            //     let tempScoreCard = [];
            //     let teams = leagueData.teams;
            //     for (let i=0; i< teams.length; i++) { //for every team
            //         let tempTeam= [teams[i].teamName, teams[i].managerName];
            //         for (let j=0; j< teams[0].roster.length; j++) { //for every player on that team
            //             let playerData = props.leaderboardData.leaderboardRows.filter((playerSelected) => {
            //                 // console.log(playerSelected);
            //                 return Number(playerSelected.playerId) === teams[i].roster[j].playerId;
            //             })
            //             // console.log(props.leaderboardData.leaderboardRows);
            //             console.log(playerData);
            //             console.log(teams[i].roster[j].playerId);
            //             let rosterItem ={
            //                 playerId: teams[i].roster[j].playerId,
            //                 playerName: teams[i].roster[j].playerName,
            //                 rounds: playerData[0].rounds,
            //                 tot: playerData[0].total,
            //             }
            //             tempTeam.push(rosterItem);
            //         }
            //         tempScoreCard.push(tempTeam);
            //     }
            //     console.log(tempScoreCard);
            //     //Set State with Object to display
            //     setLeagueLeaderboard(tempScoreCard);
            // } else if (props.leaderboardData.tournId === "Official") { //tournament complete
            // } else {
            //     console.log("Tournament complete, finalize scores");
            //     //Create Weekly Scorecard Object
            //     //Creare Season Scorecard Object
            //     //Write data objects to League doc in firebase
            // }
        }

    }






    if (leagueSelectData) {
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
                        <Link to={`/league/${id}`} className="center-panel-tab-item">LEAGUE</Link>
                        <Link to={`/league/${id}/roster`} className="center-panel-tab-item">TEAM</Link>
                        <Link to={`/league/${id}/players`} className="center-panel-tab-item">PLAYERS</Link>
                        <Link to={`/league/${id}/draft`} className="center-panel-tab-item">DRAFT</Link>
                    </ul>
                    <div className="center-panel-display">
                        <Routes>
                            <Route exact path="" element={<LeagueTab test={`${LeagueName}, League Home`} leagueData={leagueSelectData} userInfo={props.userInfo} openSettingsModal={openSettingsModal} leagueLeaderboard={leagueLeaderboard} leaderboardData={props.leaderboardData}/>}/>
                            <Route exact path="roster" element={<TeamTab test={`${LeagueName}, Team/Roster`} userInfo={props.userInfo} leagueData={leagueSelectData} openSettingsModal={openSettingsModal} worldRanksData={props.worldRanksData} fedexRanksData={props.fedexRanksData} leagueLeaderboard={leagueLeaderboard}/>}/>
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