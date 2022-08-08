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



function EditSettingsModal(props) {
    //props.db
    //props.leagueSettings
    //props.userInfo
    //props.closeSettingsModal

    console.log(props.leagueSettings);
    console.log(props.userInfo);


    const handleEdits = (e) => {
        e.preventDefault();
        //Add some form validation for certain fields
        console.log("Submit Edits");
        let leagueNameIn = document.getElementById("edit-league-name").value;
        if (!leagueNameIn) {
            leagueNameIn = props.leagueSettings.settings.name;
        }
        let leagueTeamsIn = document.getElementById("edit-league-teams").value;
        let leagueFormatIn = document.getElementById("edit-league-format").value;
        let leaguePlayersIn = document.getElementById("edit-league-roster-players").value;
        let leagueCutIn = document.getElementById("edit-league-roster-cut").value;
        let newLeagueVarsAll = [leagueNameIn, leagueTeamsIn, leagueFormatIn, leaguePlayersIn, leagueCutIn]
        console.log(newLeagueVarsAll);
        if (validateEdits(newLeagueVarsAll)) {
            submitEdits(newLeagueVarsAll);
            document.getElementById("edit-settings-form").reset();
        } else {
            console.log("handle error new league");
        }
    }


    const validateEdits = (formVals) => {
        let validValues = true;
        // let errorOut = document.getElementById("edit-league-name");
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
        console.log(leagueVarsAll,props.leagueSettings.leagueId);
        let leagueDoc = doc(props.db,`leagues/${props.leagueSettings.leagueId}`);
        // let leagueDoc = doc(props.db,`leagues/league-test`);
        let dataNew = {
            settings: {
                name: leagueVarsAll[0],
                admin: props.userInfo.uid,
                teamCount: leagueVarsAll[1],
                scoring: {
                    format: leagueVarsAll[2],
                    missCutScore: -1,
                    rosterCut: leagueVarsAll[4],
                    rosterSize: leagueVarsAll[3],
                }
            },
        }
        await updateDoc(leagueDoc, dataNew);



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
                    <input type="text" id="edit-league-name" name="name" placeholder={props.leagueSettings.settings.name}></input>
                </div>
            </div>

            <div className="edit-settings-input">
                <label htmlFor="teams">Number of Teams</label>
                <div className="input-container-edit">
                    <select id="edit-league-teams" name="teams" defaultValue={props.leagueSettings.settings.teamCount}>
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

            <div className="edit-settings-input">
                <label htmlFor="format">Game Format</label>
                <p>Tournament - teams play against the entire league each week</p>
                <p>Head to Head - teams play against one team each week </p>
                <div className="input-container-edit">
                    <select id="edit-league-format" name="format" defaultValue={props.leagueSettings.settings.scoring.format}>
                        <option value="league-play" >Tournament</option>
                        <option value="h2h-play">Head to Head</option>
                    </select>
                </div>
            </div>

            <div className="edit-settings-input">
                <label htmlFor="roster-players">Golfers Per Roster</label>
                <p>number of players allowed on a team's roster</p>
                <div className="input-container-edit">
                    <input type="number" id="edit-league-roster-players" name="roster-players"  min="4" max="10" defaultValue={props.leagueSettings.settings.scoring.rosterSize} ></input>
                </div>
            </div>

            <div className="edit-settings-input">
                <label htmlFor="roster-cut">Team Cut</label>
                <p>the number of players who's scores will not count to team score</p>
                <div className="input-container-edit">
                    <input type="number" id="edit-league-roster-cut" name="roster-cut"  min="0" max="4" defaultValue={props.leagueSettings.settings.scoring.rosterCut} ></input>
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