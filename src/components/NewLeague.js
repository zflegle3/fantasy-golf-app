import { useState, useEffect } from 'react';
import {
    Routes,
    Route,
    Link,
} from "react-router-dom";



function NewLeagueModal(props) {
    // const [rankData, setRankData] = useState({rankings: []});

    const closeModal = () => {
        let modalClose = document.getElementById("new-league-modal-form");
        modalClose.classList= "";
    }

    const submitModal = (e) => {
        e.preventDefault();
        //pull values from form
        let leagueNameIn = document.getElementById("new-league-name").value;
        let leagueTeamsIn = document.getElementById("new-league-teams").value;
        let leagueFormatIn = document.getElementById("new-league-format").value;
        let leaguePlayersIn = document.getElementById("new-league-roster-players").value;
        let leagueCutIn = document.getElementById("new-league-roster-cut").value;
        let leagueVarsAll = [leagueNameIn, leagueTeamsIn, leagueFormatIn, leaguePlayersIn, leagueCutIn]
        console.log(leagueVarsAll);
        if (validateModal(leagueVarsAll)) {
            //write data to database
            //update state leagues & update display
            closeModal();
            document.getElementById("new-league-form").reset();
        } else {
            console.log("handle error new league");
        }
    } 

    const validateModal = (formVals) => {
        console.log("Validating Data");
        let validValues = true;
        let errorOut = document.getElementById("new-league-error");
        console.log(errorOut);

        if (formVals[0].length < 1) {
            console.log("Name Error");
            errorOut.textContent = "Please enter a league name";
            return false;
        } else if (formVals[1].length < 1) {
            console.log("Teams Error");
            errorOut.textContent = "Please select the number of teams";
            return false;
        } else if (formVals[2].length < 1) {
            console.log("Format Error");
            errorOut.textContent = "Please select a league format";
            return false;
        } else if (formVals[3].length < 1) {
            console.log("Roster Players Error");
            errorOut.textContent = "Please select the number of golfers per team";
            return false;
        } else if (formVals[4].length < 1) {
            console.log("Roster Players Error");
            errorOut.textContent = "Please select the team cut";
            validValues = false;
            return false;
        }
        errorOut.textContent = "";
        return(validValues);
    }


    return (
    <div className="new-league-modal">
        <form className="new-league-form" id="new-league-form" >

            <div className="new-league-header">
                <h1 className="new-league-main-txt">Create a new League</h1>
                <p className="new-league-sub-txt">Don't worry, you can make changes to all settings later</p>
            </div>

            <div className="new-league-input">
                <label htmlFor="name">League Name</label>
                <div className="input-container">
                    <input type="text" id="new-league-name" name="name" placeholder="Enter the name of your league" ></input>
                </div>
            </div>

            <div className="new-league-input">
                <label htmlFor="teams">Number of Teams</label>
                <div className="input-container">
                    <select id="new-league-teams" name="teams" defaultValue={6}>
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

            <div className="new-league-header">
                <p className="new-league-sub-txt">Scoring and Roster Settings:</p>
            </div>

            <div className="new-league-input">
                <label htmlFor="format">Game Format</label>
                <p>Tournament - teams play against the entire league each week</p>
                <p>Head to Head - teams play against one team each week </p>
                <div className="input-container">
                    <select id="new-league-format" name="format" defaultValue={"league-play"}>
                        <option value="league-play" >Tournament</option>
                        <option value="h2h--play">Head to Head</option>
                    </select>
                </div>
            </div>

            <div className="new-league-input">
                <label htmlFor="roster-players">Golfers Per Roster</label>
                <p>number of players allowed on a team's roster</p>
                <div className="input-container">
                    <input type="number" id="new-league-roster-players" name="roster-players"  min="4" max="10" placeholder="4" ></input>
                </div>
            </div>

            <div className="new-league-input">
                <label htmlFor="roster-cut">Team Cut</label>
                <p>the number of players who's scores will not count to team score</p>
                <div className="input-container">
                    <input type="number" id="new-league-roster-cut" name="roster-cut"  min="0" max="4" placeholder="0" ></input>
                </div>
                <p id="new-league-error" ></p>
            </div>

            <div className="new-league-error-div">
                <p id="new-league-error" className="invalid"></p>
            </div>


            <div className="form-submit-container">
                <div className="form-btn-container">
                    <button onClick={submitModal}>Continue</button>
                </div>
                <p id="cancel-new-league" onClick={closeModal}>
                    Cancel
                </p>
            </div>
        </form>
    </div>
    );
}

export default NewLeagueModal;