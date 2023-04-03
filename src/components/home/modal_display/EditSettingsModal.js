import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {closeModal} from "../../../features/modals/modalSlice"
import LeagueEditForm from './LeagueEditForm';
import { Box } from '@mui/material';



function EditSettingsModal(props) {
    //props.db
    //props.leagueSettings
    //props.userInfo
    //props.closeSettingsModal
    //props.pullLeagueData()

    // console.log(props.leagueSettings);
    // console.log(props.userInfo);
    const dispatch = useDispatch();
    const {league, isLoading, isError, message} = useSelector((state) => state.leagueSelected)
    const {user} = useSelector((state) => state.auth)
    const { formDisplay, setFormDisplay } = useState("league");


    const handleEdits = (e) => {
        e.preventDefault();
        //Add some form validation for certain fields
        // console.log("Submit Edits");
        let leagueNameIn = document.getElementById("edit-league-name").value;
        if (!leagueNameIn) { //in case of no league name updates, all other values populated as select inputs
            leagueNameIn = league.name;
        }
        let leagueTeamsIn = document.getElementById("edit-league-teams").value;
        let leaguePlayersIn = document.getElementById("edit-league-roster-players").value;
        let leagueCutIn = document.getElementById("edit-league-roster-cut").value;
        let newLeagueVarsAll = [leagueNameIn, leagueTeamsIn, leaguePlayersIn, leagueCutIn]
        console.log(newLeagueVarsAll);


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
        // let leagueDoc = doc(props.db,`leagues/${league._id}`);
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
        // await updateDoc(leagueDoc, dataNew);
        props.pullLeagueData(league._id);
    }

    const close = () => {
        dispatch(closeModal())
    }

    const navigateSettings = (e) => {
        console.log(e.target.id);
        setFormDisplay(e.target.id);
    }

    const deleteLeague = () => {
        console.log("delete");
    }


    return (
        <Box>Settings Modal</Box>
    )

    // if (formDisplay ==="draft") {
    //     return (
    //         <div className="edit-settings-modal-form" id="edit-settings-modal-form">
    //             <div className="edit-settings-modal-tabs">
    //                 <p id="league" onClick={navigateSettings}>League Settings</p>
    //                 <p id="draft" onClick={navigateSettings}>Draft Settings</p>
    //                 <p id="team" onClick={navigateSettings}>Team Settings</p>
    //                 <p id="delete-league" onClick={deleteLeague}>Delete League</p>
    //             </div>
    
    //             <LeagueEditForm />
    //         </div>
    //     );
    // } else if (formDisplay === "team") {
    //     return (
    //         <div className="edit-settings-modal-form" id="edit-settings-modal-form">
    //             <div className="edit-settings-modal-tabs">
    //                 <p id="league" onClick={navigateSettings}>League Settings</p>
    //                 <p id="draft" onClick={navigateSettings}>Draft Settings</p>
    //                 <p id="team" onClick={navigateSettings}>Team Settings</p>
    //                 <p id="delete-league" onClick={deleteLeague}>Delete League</p>
    //             </div>
    
    //             <LeagueEditForm />
    //         </div>
    //     );
    // } else { //default is team settings
    //     return (
    //         <div className="edit-settings-modal-form" id="edit-settings-modal-form">
    //             <div className="edit-settings-modal-tabs">
    //                 <p id="league" onClick={navigateSettings}>League Settings</p>
    //                 <p id="draft" onClick={navigateSettings}>Draft Settings</p>
    //                 <p id="team" onClick={navigateSettings}>Team Settings</p>
    //                 <p id="delete-league" onClick={deleteLeague}>Delete League</p>
    //             </div>
    
    //             <LeagueEditForm />
    //         </div>
    //     );
    // }
    
}

export default EditSettingsModal;