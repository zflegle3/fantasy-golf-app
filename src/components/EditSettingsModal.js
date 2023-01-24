import { useState, useEffect } from 'react';
import { 
    getFirestore, 
    doc, 
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    setDoc,
    collection,
  } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';



function EditSettingsModal(props) {
    //props.db
    //props.leagueSettings
    //props.userInfo
    //props.closeSettingsModal
    //props.pullLeagueData()

    // console.log(props.leagueSettings);
    // console.log(props.userInfo);
    const {league, isLoading, isError, message} = useSelector((state) => state.leagueSelected)
    const {user} = useSelector((state) => state.auth)


    const handleEdits = (e) => {
        e.preventDefault();
        //Add some form validation for certain fields
        // console.log("Submit Edits");
        let leagueNameIn = document.getElementById("edit-league-name").value;
        if (!leagueNameIn) { //in case of no league name updates, all other values populated as select inputs
            leagueNameIn = league.name;
        }
        let leagueTeamsIn = document.getElementById("edit-league-teams").value;
        let leagueFormatIn = document.getElementById("edit-league-format").value;
        let leaguePlayersIn = document.getElementById("edit-league-roster-players").value;
        let leagueCutIn = document.getElementById("edit-league-roster-cut").value;
        let newLeagueVarsAll = [leagueNameIn, leagueTeamsIn, leagueFormatIn, leaguePlayersIn, leagueCutIn]
        // console.log(newLeagueVarsAll);
        if (validateEdits(newLeagueVarsAll)) {//NEED CONDITIONAL TO NOT ALLOW CERTAIN UPDATES (ROSTER/TEAMS) AFTER DRAFT
            submitEdits(newLeagueVarsAll);
            // document.getElementById("edit-settings-form").reset();
            //Need to add call for app to reupload data
        } else {
            console.log("handle error new league");
        }
    }


    const validateEdits = (formVals) => {
        let validValues = true;
        // let errorOut = document.getElementById("edit-league-error");
        // if (formVals[0].length < 1) {
        //     errorOut.textContent = "Please enter a league name";
        //     return false;
        // } else if (formVals[1].length < 1) {
        //     errorOut.textContent = "Please select the number of teams";
        //     return false;
        // } else if (formVals[2].length < 1) {
        //     errorOut.textContent = "Please select a league format";
        //     return false;
        // } else if (formVals[3].length < 1) {
        //     errorOut.textContent = "Please select the number of golfers per team";
        //     return false;
        // } else if (formVals[4].length < 1) {
        //     errorOut.textContent = "Please select the team cut";
        //     validValues = false;
        //     return false;
        // }
        // errorOut.textContent = "";
        return(validValues);
    }

    
    async function submitEdits(leagueVarsAll) {
        // console.log(leagueVarsAll,props.leagueSettings.leagueId);
        let leagueDoc = doc(props.db,`leagues/${league._id}`);
        let teamsAll = league.teams;
        let currentTeams = teamsAll.length;

        let rosterArray=[];
        for (let i=0; i < leagueVarsAll[3]; i++) {
            rosterArray.push({
                playerName: `Player ${i}`,
                playerId: i,
            });
        }
        //create teams per team qty
        let teamArray = [{
            teamName: "New Team 1",
            managerId: user._id,
            managerName: "Admin Name Temp",
            roster: rosterArray,
        }];
        for (let i=1; i < leagueVarsAll[1]; i++) {
            teamArray.push({
                teamName: `New Team ${i+1}`,
                managerId: "none",
                managerName: "Manager Name Temp",
                roster: rosterArray,
            });
        }
   
        // console.log(teamArray);
        // let leagueDoc = doc(props.db,`leagues/league-test`);
        let dataNew = {
            settings: {
                name: leagueVarsAll[0],
                admin: user._id,
                teamCount: leagueVarsAll[1],
                scoring: {
                    format: leagueVarsAll[2],
                    missCutScore: -1,
                    rosterCut: leagueVarsAll[4],
                    rosterSize: leagueVarsAll[3],
                },
            },
            teams: teamArray,
        }
        await updateDoc(leagueDoc, dataNew);
        props.pullLeagueData(league._id);
    }





    return (
    <div className="edit-settings-modal-form" id="edit-settings-modal-form">
        <div className="edit-settings-modal-tabs">
            <p>League Settings</p>
            <p>Draft Settings</p>
            <p>Team Settings</p>
        </div>
        <form id="edit-settings-form" className="edit-settings-form">
            <div className="edit-settings-form-header">
                <p>League Settings</p>
                <p onClick={props.closeSettingsModal}>X</p>
            </div>

            <div className="edit-settings-input">
                <label htmlFor="name">League Name</label>
                <div className="input-container-edit">
                    <input type="text" id="edit-league-name" name="name" placeholder={league.name}></input>
                </div>
            </div>

            <div className="edit-settings-input">
                <label htmlFor="teams">Number of Teams</label>
                <div className="input-container-edit">
                    <select id="edit-league-teams" name="teams" defaultValue={league.settings.teamCount}>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={10}>10</option>
                        <option value={11}>11</option>
                        <option value={12}>12</option>
                    </select>
                </div>
            </div>

            <div className="edit-settings-form-header">
                <p>Scoring</p>
            </div>

            {/* <div className="edit-settings-input">
                <label htmlFor="format">Game Format</label>
                <p>Tournament - teams play against the entire league each week</p>
                <p>Head to Head - teams play against one team each week </p>
                <div className="input-container-edit">
                    <select id="edit-league-format" name="format" defaultValue={props.leagueSettings.settings.scoring.format}>
                        <option value="league-play" >Tournament</option>
                        <option value="h2h-play">Head to Head</option>
                    </select>
                </div>
            </div> */}

            <div className="edit-settings-input">
                <label htmlFor="roster-players">Golfers Per Roster</label>
                <p>number of players allowed on a team's roster</p>
                <div className="input-container-edit">
                    <select id="edit-league-roster-players" name="roster-players" defaultValue={league.settings.rosterSize}>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={10}>10</option>
                    </select>
                </div>
            </div>

            <div className="edit-settings-input">
                <label htmlFor="roster-cut">Team Cut</label>
                <p>the number of players who's scores will not count to team score</p>
                <div className="input-container-edit">
                    <select id="edit-league-roster-cut" name="roster-cut" defaultValue={league.settings.rosterCut}>
                        <option value={0}>0</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>

                    </select>
                </div>
                <p id="new-league-error" ></p>
            </div>

            <div className="new-league-error-div">
                <p id="edit-league-error" className="invalid"></p>
            </div>

            <div className="edit-settings-submit">
                <button onClick={handleEdits}>Submit Changes</button>
            </div>
        </form>
    </div>
    );
}

export default EditSettingsModal;