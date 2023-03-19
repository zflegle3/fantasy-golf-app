import { useState, useEffect } from 'react';
import {
    Routes,
    Route,
    Link,
} from "react-router-dom";
import { useHistory, useParams } from 'react-router-dom'
import { getLeagueOne, resetSelected } from '../../../features/leagues/leagueSelectedSlice';
import { openEditSettings } from '../../../features/modals/modalSlice';
import { useSelector, useDispatch } from 'react-redux';
//Components
import Test from "../../Test";
import LeagueTab from "./tabs/LeagueTab";
import ChatConsole from "../../ChatConsole";
import TeamTab from "../../TeamTab";
//img
import leagueIcon from "../../../images/icons/golf-flag-wh.png";
import settingsIcon from "../../../images/icons/cog-outline-wh.png";



function League(props) {
    //props.db
    //props.leagues
    //props.userData 
    //props.leaderboardData
    //props.eventInfo
    //props.worldRanksData
    //props.fedexRanksData
    const { id } = useParams();
    const [LeagueName, setLeagueName]= useState("League Name Temp");
    const [leagueSelectData, setLeagueSelectedData] = useState();
    const [leagueWeekLeaderboardData, setLeagueWeekLeaderboardData] = useState();
    const dispatch = useDispatch();
    const {league, isLoading, isError, message} = useSelector((state) => state.leagueSelected)
    // console.log(props.worldRanksData);
    // console.log(props.fedexRanksData);


    useEffect(() => {
        //get league info on id change
        dispatch(getLeagueOne(id));
    }, [id]);


    // async function pullLeagueData(leagueIdToPull) {
    //     //pulls league data to display
    //     const leagueDoc = doc(props.db,"leagues",`${leagueIdToPull}`);
    //     // const newLeagueDoc = doc(props.db, "leagues",`${leagueDataNew.leagueId}`);
    //     const leagueSnap  = await getDoc(leagueDoc);
    //     let leagueDataPulled = leagueSnap.data();
    //     setLeagueSelectedData(leagueDataPulled);
    //     setLeagueName(leagueDataPulled.settings.name)
    //     // return(leagueSnap.data());
    //     //Update score with pulled data
    //     updateScores(leagueSnap.data())
    // }

    // const updateScores = (leagueData) => {
    //     //determine next event on league's schedule
    //     let upcomingEvents = leagueData.schedule.filter((tournament) => {
    //         return tournament.completeStatus === false;
    //     });
    //     let nextLeagueEvent = upcomingEvents[0];
    //     //next event on pga schedule is passed in as props
    //     //if id's match between pga and league events
    //     if (nextLeagueEvent.tournId === props.leaderboardData.tournId) {
    //         //Create Weekly Scorecard Object
    //         let weeklyScoreData = createWeekScoringData(leagueData);
    //         //Set State with Object to display
    //         setLeagueWeekLeaderboardData(weeklyScoreData);

    //         // if (props.leaderboardData.roundStatus === "Official") {
    //         //     // let seasonScoreData = seasonScoringData(leagueData);
    //         //     //Create Weekly Scorecard Object
    //         //     //Create Season Scorecard Object
    //         //     //Write data objects to League doc in firebase
    //         // }
    //     }

    // }

    // const createWeekScoringData = (leagueDataIn) => {
    //     //leagueDataIn.leagueId
    //     //props.leaderboardData
    //     let tempScoreCard = [];
    //     for (let i=0; i< leagueDataIn.teams.length; i++) { //for every team
    //         let tempTeam= leagueDataIn.teams[i];
    //         let rosterRef = leagueDataIn.teams[i].roster;
    //         let newRosterScores = [];
    //         let teamTotalScore = 0;
    //         for (let j=0; j< rosterRef.length; j++) { //for every player on that team's roster
    //             let playerScoreData = props.leaderboardData.leaderboardRows.filter((playerSelected) => {
    //                 return Number(playerSelected.playerId) === rosterRef[j].playerId;
    //             })
    //             newRosterScores.push(playerScoreData[0]);
    //             teamTotalScore += Number(playerScoreData[0].total); //UPDATE TEAM TOTAL TO INCLUDE LEAGUE SCORING SETTINGS (CUT, CUT SCORE, ETC.)
    //         }
    //         tempTeam.roster = newRosterScores;
    //         tempTeam.teamTotal = teamTotalScore
    //         tempScoreCard.push(tempTeam);
    //     }
    //     return {
    //         tournId: props.leaderboardData.tournId,
    //         leagueId: leagueDataIn.leagueId,
    //         leagueTeamScores: tempScoreCard,
    //     }
    // }

    const openSettings = () => {
        dispatch(openEditSettings());
    };

    if (league) {
        return (
            <div className="center-panel-content">
                <div className="center-panel-header">
                    <img src={leagueIcon}></img>
                    <h1>{league.name}</h1>
                    <p>{`${league.settings.teamCount}-Team Masters Tournament League`}</p>
                    <div>
                        <img src={settingsIcon} onClick={openSettings}></img>
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
                            <Route exact path="" element={<LeagueTab leagueWeekLeaderboardData={leagueWeekLeaderboardData} leaderboardData={props.leaderboardData}/>}/>
                            {/* <Route exact path="roster" element={<TeamTab test={`${LeagueName}, Team/Roster`} userInfo={props.userInfo} leagueData={leagueSelectData} worldRanksData={props.worldRanksData} fedexRanksData={props.fedexRanksData} leagueWeekLeaderboardData={leagueWeekLeaderboardData}/>}/> */}
                            <Route exact path="players" element={<Test test={`${LeagueName}, Players`}/>}/>
                            <Route exact path="draft" element={<Test test={`${LeagueName}, Draft`}/>}/>
                        </Routes>
                    </div>
                    </div>
                    <div className="right-panel">
                        <ChatConsole/>
                    </div>
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