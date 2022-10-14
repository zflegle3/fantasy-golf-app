import { useState, useEffect } from 'react';
import ReactDom from "react-dom";
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

//SVGs & Images
import { ReactComponent as PgaSvg } from '../images/icons/golf-pga.svg';
import { ReactComponent as LivSvg } from '../images/icons/golf-liv.svg';
import{ReactComponent as BackArrSvg} from "../images/icons/arrow-left.svg";

function NewLeagueModal(props) {
    //props.userData
    const [step, setStep] = useState(1)
    const [leagueSettings, setLeagueSettings] = useState({
        admin: "userID",
        name: "League Name",
        proLeague: "",
        teamCount: 10,
        logoSrc: "",
        scoring: {
            format: "",
            missCutScore: "",
            rosterCut: 2,
            rosterSize: 6,
        },
        draft: {
            type: "",
            date: "",
            order: "",
        }
    })

    const closeModal = () => {
        let modalClose = document.getElementById("new-league-modal-form");
        modalClose.classList= "";
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
            // console.log(scheduleData);
            currentSchedule = scheduleData.filter((dateSelect) => {
                return Date.now()-dateSelect.date.start.$date.$numberLong < 0;
            }); //only pulls dates upcoming from current date 
            // console.log(currentSchedule);
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
        // console.log(currentSchedule);
        return currentSchedule;
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
        for (let i=0; i < leagueVarsAll[3]; i++) {
            rosterArray.push({
                playerName: `Player ${i}`,
                playerId: i,
            });
        }
        //create teams per team qty
        let teamArray = [{
            teamName: "New Team 1",
            managerId: props.userActive.uid,
            managerName: "Admin Name Temp",
            roster: rosterArray,
        }];
        for (let i=0; i < leagueVarsAll[1]; i++) {
            teamArray.push({
                teamName: `New Team ${i+1}`,
                managerId: "none",
                managerName: "Manager Name Temp",
                roster: rosterArray,
            });
        }

        //create league schedule data per current date & 2022 schedule
        //Update later to LM selecting schedule in form
        const scheduleData = await createSchedule();

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

    const checkUrl = (urlIn) => {
        return urlIn.match(
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
          );
    }

    const backStep = () => {
        let currentStep = step;
        console.log(--currentStep);
        setStep(currentStep);
    }


    const logLeague = (e) => {
        e.stopPropagation();
        //add league to league settings state
        let tempSettings = {...leagueSettings};
        tempSettings.proLeague = e.target.id;
        setLeagueSettings(tempSettings);
        //increment to next step
        let currentStep = step;
        console.log(++currentStep);
        setStep(currentStep);
    }

    const logDetails= (e) => {
        e.stopPropagation()
        //pull input values
        let leagueNameIn = document.getElementById("new-league-name").value;
        let leagueTeamsIn = document.getElementById("new-league-teams").value;
        // let leagueLogoIn = document.getElementById("new-league-logo").value;
        console.log(leagueNameIn);
        //clear previous errors
        document.getElementById("input-error-name").classList="";
        document.getElementById("input-error-name").innerHTML="League Name Error";
        //LOGO SUBMISSION TEMPORARILT DISABLED
        // document.getElementById("input-error-logo").classList="";
        // document.getElementById("input-error-logo").innerHTML="Logo URL Error";
        //validate input values (Name)
        if (leagueNameIn.length > 0) {
            // if (checkUrl(leagueLogoIn)) {
                //save inputs
                console.log("valid and submit")
                let tempSettings = {...leagueSettings};
                tempSettings.name = leagueNameIn;
                tempSettings.teamCount = leagueTeamsIn;
                setLeagueSettings(tempSettings);
                //increment step
                let currentStep = step;
                console.log(++currentStep);
                setStep(currentStep);
            // } else {
            //     document.getElementById("input-error-logo").classList.add("invalid");
            //     document.getElementById("input-error-logo").innerHTML="Whoops, that doesn't look like a valid URL";
            // }
        } else {
            //add error messages
            document.getElementById("input-error-name").classList.add("invalid");
            document.getElementById("input-error-name").innerHTML="Please enter a league name";
        }

    }

    const logScoring= (e) => {
        e.stopPropagation()
        // console.log(e.target);
        //pull input values
        let rosterSizeIn = document.getElementById("new-league-team-size").value;
        let rosterCutIn = document.getElementById("new-league-team-cut").value;
        //validate inputs (cut < roster size)
        if (rosterCutIn < rosterSizeIn) {
            //save inputs
            console.log("valid and submit")
            let tempSettings = {...leagueSettings};
            tempSettings.scoring.rosterSize = rosterSizeIn;
            tempSettings.scoring.rosterCut = rosterCutIn;
            setLeagueSettings(tempSettings);
            //increment step
            let currentStep = step;
            console.log(++currentStep);
            setStep(currentStep);

        } else {
            //handle errors
            document.getElementById("input-error-team-cut").classList.add("invalid");
            document.getElementById("input-error-team-cut").innerHTML="Please select a number less than the total roster size.";
        }

    }

    const submitLeague= (e) => {
        e.stopPropagation()
        // console.log(e.target);
        //pull input values
        //validate inputs
            //save inputs
            //increment step and switch page
        //handle errors
        let currentStep = step;
        console.log(++currentStep);
        setStep(currentStep);
    }



    console.log(leagueSettings);
    if (step === 1) {
        return(
            <div className="new-league-modal">
                <div className="step-back disable">
                    <BackArrSvg />
                </div>
                <div className="new-league-header">
                    <p>{`Step ${step} of 4`}</p>
                    <div className="progress-container">
                        <div className="progress-bar" style={{ width: `${(step/4)*100}%` }}></div>
                    </div>
                </div>

                <div className="new-league-header">
                    <h1 className="new-league-main-txt">Choose a pro league</h1>
                </div>

                <div className="league-options-row">
                    <div id="pga" className="league-option-btn" onClick={logLeague}>
                        <div id="pga" className="pga-img">
                            <PgaSvg id="pga"/>
                            <p id="pga">PGA Tour</p>
                        </div>
                        <p> Draft and manage a team of players from the PGA tour.</p>
                        <p>TEAMS: 4 to 12</p>
                    </div>

                    <div id="liv" className="league-option-btn" onClick={logLeague}>
                        <div id="liv" className="liv-img">
                            <LivSvg id="liv"/>
                            <p id="liv">LIV GOLF</p>

                        </div>
                        <p> Draft and manage a team of players from LIV Golf.</p>
                        <p>TEAMS: 4 to 10</p>
                    </div>
                </div>

            </div> 
        )
    } else if (step === 2) {
        return(
            <div className="new-league-modal">
                <div className="step-back" onClick={backStep}>
                    <BackArrSvg />
                </div>
                <div className="new-league-header">
                    <p>{`Step ${step} of 4`}</p>
                    <div className="progress-container">
                        <div className="progress-bar" style={{ width: `${(step/4)*100}%` }}></div>
                    </div>
                </div>

                <div className="new-league-header">

                    <h1 className="new-league-main-txt">Choose your league size</h1>
                    <p>Don't worry, you can still make changes to all settings later</p>
                </div>

                <div className="league-inputs-container">
                    <div className="league-input-item">
                        <div className="league-input-header">
                            <label htmlFor="name" className="league-input-label">LEAGUE NAME</label>
                            <div className="league-input-spacer"></div>
                        </div>
                        <input type="text" id="new-league-name" name="name" placeholder={leagueSettings.name} ></input>
                        <p id='input-error-name'>Name Error</p>
                    </div>

                    <div className="league-input-item">
                        <div className="league-input-header">
                            <label htmlFor="teams" className="league-input-label">NUMBER OF TEAMS</label>
                            <div className="league-input-spacer"></div>
                        </div>
                        <select id="new-league-teams" name="teams" defaultValue={leagueSettings.teamCount}>
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
                        <p id='input-error-teams'>Name Error</p>
                    </div>

                    {/* LOGO SUBMISSION TEMPORARILY PAUSED  */}
                    {/* <div className="league-input-item">
                        <div className="league-input-header">
                            <label htmlFor="logo" className="league-input-label">LOGO (optional)</label>
                            <div className="league-input-spacer"></div>
                        </div>
                        <input type="text" id="new-league-logo" name="logo" placeholder="Enter the URL of an image From the web" ></input>
                        <p id='input-error-logo'>Logo URL Error</p>
                    </div> */}

                </div>

                <div className="new-league-btn" onClick={logDetails}>NEXT</div>
            </div> 
        );
    } else if (step === 3) { //Scoring
        return(
            <div className="new-league-modal">
                <div className="step-back" onClick={backStep}>
                    <BackArrSvg />
                </div>
                <div className="new-league-header">
                    <p>{`Step ${step} of 4`}</p>
                    <div className="progress-container">
                        <div className="progress-bar" style={{ width: `${(step/4)*100}%` }}></div>
                    </div>
                </div>

                <div className="new-league-header">
                    <h1 className="new-league-main-txt">Choose how you'll keep score</h1>
                    <p>Don't worry, you can still make changes to all settings later</p>
                </div>

                <div className="league-inputs-container">

                    <div className="league-input-item">
                        <div className="league-input-header">
                            <label htmlFor="team-size" className="league-input-label">ROSTER SIZE</label>
                            <div className="league-input-spacer"></div>
                        </div>
                        <p className="input-notes">{"The number of total players on a team's roster (including bench spots)"}</p>
                        <select id="new-league-team-size" name="team-size" defaultValue={leagueSettings.scoring.rosterSize}>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                        </select>
                        <p id='input-error-team-size'>Name Error</p>
                    </div>

                    <div className="league-input-item">
                        <div className="league-input-header">
                            <label htmlFor="team-cut" className="league-input-label">ROSTER CUT</label>
                            <div className="league-input-spacer"></div>
                        </div>
                        <p className="input-notes">The number of bench players who's scores will not count towards the team score each week.</p>
                        <select id="new-league-team-cut" name="team-cut" defaultValue={leagueSettings.scoring.rosterCut}>
                            <option value={0}>0</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                        </select>
                        <p id='input-error-team-cut'>Name Error</p>
                    </div>

                </div>

                <div className="new-league-btn" onClick={logScoring}>NEXT</div>
            </div> 
        );
    } 
    else if (step === 4) { //Draft Type
        return(
            <div className="new-league-modal">
                <div className="step-back" onClick={backStep}>
                    <BackArrSvg />
                </div>
                <div className="new-league-header">
                    <p>{`Step ${step} of 4`}</p>
                    <div className="progress-container">
                        <div className="progress-bar" style={{ width: `${(step/4)*100}%` }}></div>
                    </div>
                </div>

                <div className="new-league-header">
                    <h1 className="new-league-main-txt">Define your draft</h1>
                    <p>Don't worry, you can still make changes to all settings later</p>
                </div>

                <div className="league-inputs-container">

                    <div className="league-input-item">
                        <div className="league-input-header">
                            <label htmlFor="teams" className="league-input-label">ROSTER SIZE</label>
                            <div className="league-input-spacer"></div>
                        </div>
                        <select id="new-league-teams" name="teams" defaultValue={leagueSettings.rosterSize}>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                        </select>
                        <p className='input-error teams'>Teams Error</p>
                    </div>

                    <div className="league-input-item">
                        <div className="league-input-header">
                            <label htmlFor="teams" className="league-input-label">ROSTER CUT</label>
                            <div className="league-input-spacer"></div>
                        </div>
                        <select id="new-league-teams" name="teams" defaultValue={leagueSettings.rosterCut}>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                        </select>
                        <p className='input-error teams'>Teams Error</p>
                    </div>

                </div>

                <div className="new-league-btn" onClick={submitLeague}>CREATE LEAGUE</div>
            </div> 
        );
    } 
    // return (
    //     <div className="new-league-modal">
    //         <div className="new-league-header">
    //             <p>{`Step 1 of 3`}</p>
    //             <div className="progress-container">
    //                 <div className="progress-bar"></div>
    //             </div>
    //         </div>
    //         <form className="new-league-form" id="new-league-form" >

    //             <div className="new-league-header">
    //                 <h1 className="new-league-main-txt">Create a new League</h1>
    //                 <p className="new-league-sub-txt">Don't worry, you can make changes to all settings later</p>
    //             </div>

    //             <div className="new-league-input">
    //                 <label htmlFor="name">League Name</label>
    //                 <div className="input-container">
    //                     <input type="text" id="new-league-name" name="name" placeholder="Enter the name of your league" ></input>
    //                 </div>
    //             </div>

    //             <div className="new-league-input">
    //                 <label htmlFor="teams">Number of Teams</label>
    //                 <div className="input-container">
    //                     <select id="new-league-teams" name="teams" defaultValue={6}>
    //                         <option value={4}>4</option>
    //                         <option value={5}>5</option>
    //                         <option value={6}>6</option>
    //                         <option value={7}>7</option>
    //                         <option value={8}>8</option>
    //                         <option value={9}>9</option>
    //                         <option value={10}>10</option>
    //                         <option value={11}>11</option>
    //                         <option value={12}>12</option>
    //                     </select>
    //                 </div>
    //             </div>

    //             <div className="new-league-header">
    //                 <p className="new-league-sub-txt">Scoring and Roster Settings:</p>
    //             </div>

    //             <div className="new-league-input">
    //                 <label htmlFor="format">Game Format</label>
    //                 <p>Tournament - teams play against the entire league each week</p>
    //                 <p>Head to Head - teams play against one team each week </p>
    //                 <div className="input-container">
    //                     <select id="new-league-format" name="format" defaultValue={"league-play"}>
    //                         <option value="league-play" >Tournament</option>
    //                         <option value="h2h-play">Head to Head</option>
    //                     </select>
    //                 </div>
    //             </div>

    //             <div className="new-league-input">
    //                 <label htmlFor="roster-players">Golfers Per Roster</label>
    //                 <p>number of players allowed on a team's roster</p>
    //                 <div className="input-container">
    //                     <input type="number" id="new-league-roster-players" name="roster-players"  min="4" max="10" placeholder="4" ></input>
    //                 </div>
    //             </div>

    //             <div className="new-league-input">
    //                 <label htmlFor="roster-cut">Team Cut</label>
    //                 <p>the number of players who's scores will not count to team score</p>
    //                 <div className="input-container">
    //                     <input type="number" id="new-league-roster-cut" name="roster-cut"  min="0" max="4" placeholder="0" ></input>
    //                 </div>
    //                 <p id="new-league-error" ></p>
    //             </div>

    //             <div className="new-league-error-div">
    //                 <p id="new-league-error" className="invalid"></p>
    //             </div>


    //             <div className="form-submit-container">
    //                 <div className="form-btn-container">
    //                     <button onClick={submitModal}>Continue</button>
    //                 </div>
    //                 <div id="cancel-new-league" onClick={() => props.setNewLeagueOpen(false)}>
    //                     Cancel
    //                 </div>
    //             </div>
    //         </form>
    //     </div> 
    // );
}

export default NewLeagueModal;