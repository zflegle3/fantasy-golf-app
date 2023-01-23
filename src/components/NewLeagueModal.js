import { useState, useEffect } from 'react';
import axios from "axios";
import ReactDom from "react-dom";
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';

//SVGs & Images
import { ReactComponent as PgaSvg } from '../images/icons/golf-pga.svg';
import { ReactComponent as LivSvg } from '../images/icons/golf-liv.svg';
import { ReactComponent as BackArrSvg} from "../images/icons/arrow-left.svg";
import SnakeImg from "../images/icons/snake.png"
import LinearImg from "../images/icons/top-right.png"

function NewLeagueModal(props) {
    //props.userData
    //props.userId
    //props.db
    //props.refreshUserData
    const {user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);
    const [step, setStep] = useState(1)
    const [name, setName] = useState("League Name");
    const [settings, setSettings] = useState({
        schedule: [],
        teamCount: 8,
        missCutScore: "avg",
        rosterCut: 2,
        rosterSize: 6,
        proLeague: "pga",
    });
    // const [draft, setDraft] = useState({
    //     type: "",
    //     date: "",
    //     order: "",
    // },);
    //State holds draft type per button selection
    const [draftType, setDraftType] = useState(""); 
    //select status of snake/linear draft types, determines class & styling
    const [draftBtnSelect, setDraftBtnSelect] = useState(["",""]) 

    const [leagueSettings, setLeagueSettings] = useState({
        admin: props.userId,
        name: "League Name",
        proLeague: "",
        logoSrc: "",
        teamCount: 8,
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
        },
    })

    const backStep = () => {
        let currentStep = step;
        --currentStep;
        setStep(currentStep);
    }

    const selectSnake = () => {
        let btnClasses = ["selected",""];
        setDraftBtnSelect(btnClasses);
        setDraftType("snake");
        document.getElementById("input-error-draft-type").classList.remove("invalid");
    }

    const selectLinear = () => {
        let btnClasses = ["","selected"];
        setDraftBtnSelect(btnClasses);
        setDraftType("linear");
        document.getElementById("input-error-draft-type").classList.remove("invalid");
    }


    const logStepOne = () => {
        // Temporarily disables functionality during dev 
        // //add league to league settings state
        // let tempSettings = {...leagueSettings};
        // tempSettings.proLeague = "pga";
        // setLeagueSettings(tempSettings);

        //increment to next step
        let currentStep = step;
        ++currentStep;
        setStep(currentStep);
    }

    //Temporarily removed LIV league selection
    // const logLiv = () => {
    //     //add league to league settings state
    //     let tempSettings = {...leagueSettings};
    //     tempSettings.proLeague = "liv";
    //     setLeagueSettings(tempSettings);
    //     //increment to next step
    //     let currentStep = step;
    //     ++currentStep;
    //     setStep(currentStep);
    // }

    const logStepTwo= (e) => {
        e.stopPropagation()
        //pull input values (name and league size)
        let leagueNameIn = document.getElementById("new-league-name").value;
        let leagueTeamsIn = Number(document.getElementById("new-league-teams").value);
        // let leagueLogoIn = document.getElementById("new-league-logo").value;
        //clear previous errors
        document.getElementById("input-error-name").classList="";
        document.getElementById("input-error-name").innerHTML="League Name Error";

        //validate input values (Name)
        if (leagueNameIn.length > 0) {
            // if (checkUrl(leagueLogoIn)) {
                setName(leagueNameIn);
                //save inputs
                let tempSettings = {...settings};
                tempSettings.teamCount = leagueTeamsIn;
                setSettings(tempSettings);
                //increment step
                let currentStep = step;
                ++currentStep;
                setStep(currentStep);
            // } else {
        } else {
            //add error messages
            document.getElementById("input-error-name").classList.add("invalid");
            document.getElementById("input-error-name").innerHTML="Please enter a league name";
        }

    }

    const logStepThree= (e) => {
        e.stopPropagation();
        //pull input values and sanatize to numbers if required
        let rosterSizeIn = Number(document.getElementById("new-league-team-size").value);
        let rosterCutIn = Number(document.getElementById("new-league-team-cut").value);
        let missCutIn = document.getElementById("new-league-miss-cut").value;
        if (missCutIn !== "avg") {
            missCutIn = Number(missCutIn);
        }
        console.log(rosterSizeIn,rosterCutIn, missCutIn);
        console.log(rosterCutIn < rosterSizeIn);
        //clear previous errors
        document.getElementById("input-error-team-size").classList="";
        document.getElementById("input-error-team-size").innerHTML="Roster Size Error";
        document.getElementById("input-error-team-cut").classList="";
        document.getElementById("input-error-team-cut").innerHTML="Team Cut Error";

        //validate inputs (cut < roster size)
        if (rosterCutIn < rosterSizeIn) {
            //validate enough players to fill roster spots (~90 players)
            if (settings.teamCount*rosterSizeIn < 90) {
                //save inputs
                let tempSettings = {...settings};
                tempSettings.rosterSize = rosterSizeIn;
                tempSettings.rosterCut = rosterCutIn;
                tempSettings.missCutScore = missCutIn;
                setSettings(tempSettings);
                //increment step
                let currentStep = step;
                ++currentStep;
                setStep(currentStep);

            } else {
                document.getElementById("input-error-team-size").classList.add("invalid");
                document.getElementById("input-error-team-size").innerHTML="Please reduce roster size or number of teams to ensure there are enough players to fill each team.";
            }
        } else {
            //handle errors
            document.getElementById("input-error-team-cut").classList.add("invalid");
            document.getElementById("input-error-team-cut").innerHTML="Please select a number less than the total roster size.";
        }

    }

    // const createTeams = (teamQty, rosterSize) => {
    //     //create rosters per player qty
    //     let rosterArray=[];
    //     for (let i=0; i < rosterSize; i++) {
    //         rosterArray.push({
    //             playerName: `Player ${i+1}`,
    //             playerId: i+1,
    //         });
    //     }
    //     //create tems with created roster templates
    //     let teamArray = [{
    //         teamName: "New Team 1",
    //         managerId: props.userId,
    //         managerName: props.userData.userName,
    //         roster: rosterArray,
    //     }];
    //     for (let i=1; i < teamQty; i++) {
    //         teamArray.push({
    //             teamName: `New Team ${i+1}`,
    //             managerId: "none",
    //             managerName: `Manager ${i+1}`,
    //             roster: rosterArray,
    //         });
    //     }
    //     return (teamArray);
    // }



    const logStepFour= (e) => {
        e.stopPropagation();
        //clear errors
        document.getElementById("input-error-draft-date").classList = "";
        document.getElementById("input-error-draft-type").innerHTML = "Draft Date Error";
        document.getElementById("input-error-draft-date").classList = "";
        document.getElementById("input-error-draft-date").innerHTML = "Draft Type Error";
        //Validate draft date 24 hours in advance
        let draftDateIn = new Date(document.getElementById("new-league-draft-date").value);
        let todayDate = new Date();
        let dateDiff = (draftDateIn - todayDate);
        if (dateDiff > 86000000) {
            if (draftType) {
                let draft = {
                    type: draftType,
                    date: draftDateIn,
                };
                createLeague(draft);
            } else {
                document.getElementById("input-error-draft-type").classList.add("invalid");
                document.getElementById("input-error-draft-type").innerHTML="Please select a draft type.";
            }
        } else {
            document.getElementById("input-error-draft-date").classList.add("invalid");
            document.getElementById("input-error-draft-date").innerHTML="Draft date must be at least 24 hours in the future.";
        }
    };

    const createLeague = async (draft) => {
        //Initiate league activity
        let leagueActivityNew = [{
            item: `Created ${name}, a new ${settings.teamCount} team Masters Tournament league.`,
            time: new Date(),
            user: user.email,
        }]
        //Create payload for backend call
        let payload = {
            name: name,
            settings: settings,
            activity: leagueActivityNew,
            year: 2023,
            draft: draft,
        }
        console.log(payload);
        // const response = await axios.post("http://localhost:8080/league/create", payload);
        //confirm response and close modal
    }

    // async function submitLeague(leagueDataNew) {
    //     console.log(leagueDataNew);
    //     //create doc & add to league collection
    //     const newLeagueDoc = doc(props.db, "leagues",`${leagueDataNew.leagueId}`);
    //     await setDoc(newLeagueDoc, leagueDataNew);
    //     //add league id to user's doc
    //     const userDoc = doc(props.db, "users", `U-${props.userId}`);
    //     const userSnap  = await getDoc(userDoc);
    //     if (userSnap.exists()) {
    //         let userData = userSnap.data();
    //         //pull current data 
    //         let leaguesAll = userData.leagues;
    //         //write new data to doc db
    //         leaguesAll.push({
    //             id: leagueDataNew.leagueId,
    //             logo: leagueDataNew.settings.logoSrc,
    //             name: leagueDataNew.settings.name,
    //         });
    //         await updateDoc(userDoc,{leagues: leaguesAll});
    //         //update display with new league
    //         props.refreshUserData(props.userId);
    //         if (props.setNewLeagueOpen) {
    //             props.setNewLeagueOpen(false);
    //         }
    //     } else {
    //         //console.log("No User Doc found, handle error");
    //        document.getElementById("input-error-draft-type").classList.add("invalid");
    //        document.getElementById("input-error-draft-type").innerHTML="There was an error in creating your league, please start over and try again.";
    //     }
    // }

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
                    <h1 className="new-league-main-txt">Choose an Event</h1>
                </div>

                <div className="league-options-row">
                    <div id="pga" className="league-option-btn" onClick={logStepOne}>
                        <div id="pga" className="pga-img">
                            <PgaSvg />
                            <p>The Masters</p>
                        </div>
                        <p> Draft and manage a team of players from the Masters Tournament.</p>
                        <p>Teams: 4 to 12</p>
                    </div>

                    {/* TEMPORARILY DISABLING LIV LEAGUE FOR SIMPLICITY DURING DEV 
                        Will add functionality at a later date*/}
                    {/* <div id="liv" className="league-option-btn" onClick={logLiv}>
                        <div id="liv" className="liv-img">
                            <LivSvg />
                            <p>LIV GOLF</p>

                        </div>
                        <p> Draft and manage a team of players from LIV Golf.</p>
                        <p>TEAMS: 4 to 10</p>
                    </div> */}

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
                    <h1 className="new-league-main-txt">Customize your league details</h1>
                    <p>Don't worry, you can still make changes to all settings later</p>
                </div>

                <div className="league-inputs-container">
                    <div className="league-input-item">
                        <div className="league-input-header">
                            <label htmlFor="name" className="league-input-label">LEAGUE NAME</label>
                            <div className="league-input-spacer"></div>
                        </div>
                        <input type="text" id="new-league-name" name="name" placeholder={name} ></input>
                        <p id='input-error-name'>Name Error</p>
                    </div>

                    <div className="league-input-item">
                        <div className="league-input-header">
                            <label htmlFor="teams" className="league-input-label">NUMBER OF TEAMS</label>
                            <div className="league-input-spacer"></div>
                        </div>
                        <select id="new-league-teams" name="teams" defaultValue={settings.teamCount}>
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

                </div>

                <div className="new-league-btn" onClick={logStepTwo}>NEXT</div>
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
                        <select id="new-league-team-size" name="team-size" defaultValue={settings.rosterSize}>
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
                        <p className="input-notes">The number of bench players who's scores will not count towards the team score each week (bench spots)</p>
                        <select id="new-league-team-cut" name="team-cut" defaultValue={settings.rosterCut}>
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

                    <div className="league-input-item">
                        <div className="league-input-header">
                            <label htmlFor="miss-cut" className="league-input-label">MISSED CUT SCORE</label>
                            <div className="league-input-spacer"></div>
                        </div>
                        <p className="input-notes">The score that will be applied to any players who miss the tournament cut</p>
                        <select id="new-league-miss-cut" name="miss-cut" defaultValue={settings.missCutScore}>
                            <option value={"avg"}>Average Round Score (active players)</option>
                            <option value={-3}>-3</option>
                            <option value={-2}>-2</option>
                            <option value={-1}>-1</option>
                            <option value={0}>0</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                        </select>
                        <p id='input-error-miss-cut'>Name Error</p>
                    </div>

                </div>

                <div className="new-league-btn" onClick={logStepThree}>NEXT</div>
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
                            <label htmlFor="draft-date" className="league-input-label">DRAFT DATE</label>
                            <div className="league-input-spacer"></div>
                        </div>

                        <input type="datetime-local" name="draft-date" id="new-league-draft-date"></input>

                        <p id='input-error-draft-date'>Name Error</p>

                    </div>

                    <div className="league-input-item">
                        <div className="league-input-header">
                            <label htmlFor="draft-type" className="league-input-label">DRAFT TYPE</label>
                            <div className="league-input-spacer"></div>
                        </div>

                        <div className={`new-league-draft-type snake ${draftBtnSelect[0]}`} onClick={selectSnake}>
                            <div className="draft-type-logo snake" ></div>
                            <div className="draft-type-details" >
                                <p className="draft-type-title" >Snake Draft</p>
                                <p className="draft-type-info" >Each round, the draft order reverses</p>
                            </div>
                        </div>

                        <div className={`new-league-draft-type snake ${draftBtnSelect[1]}`} onClick={selectLinear}>
                            <div className="draft-type-logo linear" ></div>
                            <div className="draft-type-details" >
                                <p className="draft-type-title" >Linear Draft</p>
                                <p className="draft-type-info" >Each round, the draft order repeats</p>
                            </div>
                        </div>
                        <p id='input-error-draft-type'>Name Error</p>
                    </div>

                </div>

                <div className="new-league-btn" onClick={logStepFour}>CREATE LEAGUE</div>
            </div> 
        );
    } 
}

export default NewLeagueModal;