import { useState, useEffect } from 'react';
import { 
    getFirestore, 
    doc, 
    getDoc,
    getDocs,
    addDoc,
    setDoc,
    updateDoc,
    collection,
  } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';



function NewLeagueModal(props) {
    //props.userActive
    //props.db
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
        if (validateModal(leagueVarsAll)) {
            createLeagueDoc(leagueVarsAll);
            closeModal();
            document.getElementById("new-league-form").reset();
        } else {
            console.log("handle error new league");
        }
    } 

    async function createLeagueDoc(leagueVarsAll) { 
        //create league ID, format: L-leagueid
        let newId = `L-${uuidv4()}`; 
        //create rosters per player qty
        let rosterArray=[];
        for (let i=1; i < leagueVarsAll[3]; i++) {
            rosterArray.push({
                playerName: `Player ${i}`,
                playerId: i,
            });
        }
        //create teams per team qty
        let teamArray = [{
            teamnName: "New Team 1",
            managerId: props.userActive.uid,
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
        //create league schedule data per current date & 2022 schedule
        //Update later to LM selecting schedule
        const scheduleData = await createSchedule();
        console.log(scheduleData);


        let data = {
            leagueId: newId,
            activity: [{
                item: "Created new League, Test",
                time: Date(),
                user: props.userActive.uid,
            }],
            schedule: scheduleData,
            settings: {
                admin: props.userActive.uid,
                name: leagueVarsAll[0],
                scoring: {
                    missCutScore: -1,
                    rosterCut: leagueVarsAll[4],
                    rosterSize: leagueVarsAll[3],
                    format: leagueVarsAll[2],
                },
                teamCount: leagueVarsAll[1],
            },
            teams: teamArray,
        };
        //create new league doc
        await setDoc(doc(props.db, "leagues", `${newId}`), data);
        
        //add league info to user doc 
        const userDoc = doc(props.db, `users/U-${props.userActive.uid}`);
        const userSnap  = await getDoc(userDoc);
        if (userSnap.exists()) {
            let userData = userSnap.data();
            //pull data 
            let leaguesAll = userData.leagues;
            //write new data to doc db
            leaguesAll.push({
                id: newId,
                logo: "imgSrc",
                name: leagueVarsAll[0],
            });
            updateDoc(userDoc,{leagues: leaguesAll})
            //update display with league info
            props.setLeagues(leaguesAll);
        } else {
           console.log("No User Doc found, handle error");
        }
    }

    const validateModal = (formVals) => {
        let validValues = true;
        let errorOut = document.getElementById("new-league-error");
        if (formVals[0].length < 1) {
            errorOut.textContent = "Please enter a league name";
            return false;
        } else if (formVals[1].length < 1) {
            errorOut.textContent = "Please select the number of teams";
            return false;
        } else if (formVals[2].length < 1) {
            errorOut.textContent = "Please select a league format";
            return false;
        } else if (formVals[3].length < 1) {
            errorOut.textContent = "Please select the number of golfers per team";
            return false;
        } else if (formVals[4].length < 1) {
            errorOut.textContent = "Please select the team cut";
            validValues = false;
            return false;
        }
        errorOut.textContent = "";
        return(validValues);
    }

    async function createSchedule() {
        let scheduleData = [];
        let currentSchedule = [];
        const scheduleDocRef = doc(props.db,"schedules/2022-schedule");
        const scheduleSnap = await getDoc(scheduleDocRef);
        if (scheduleSnap.exists()) {
            //pull data 
            scheduleData = scheduleSnap.data().schedule;
            //filter data by date
            console.log(scheduleData);
            currentSchedule = scheduleData.filter((dateSelect) => {
                return Date.now()-dateSelect.date.start.$date.$numberLong < 0;
            })
            console.log(currentSchedule);
            currentSchedule = currentSchedule.map((tournament)=> {
                return {
                    tournId: tournament.tournId,
                    tournName: tournament.name,
                    startDate: tournament.date.start.$date.$numberLong,
                    endDate: tournament.date.end.$date.$numberLong,
                    Scorecard: [],
                    completeStatus: false,
                }
            })
        } else {
           console.log("No Schedule Doc found, handle error");
        }
        console.log(currentSchedule);
        return currentSchedule;
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
                        <option value="h2h-play">Head to Head</option>
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