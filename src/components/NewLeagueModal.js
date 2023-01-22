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
import { ReactComponent as BackArrSvg} from "../images/icons/arrow-left.svg";
import SnakeImg from "../images/icons/snake.png"
import LinearImg from "../images/icons/top-right.png"

function NewLeagueModal(props) {
    //props.userData
    //props.userId
    //props.db
    //props.refreshUserData
    const [step, setStep] = useState(1)
    const [draftType, setDraftType] = useState("");
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


    const logPga = () => {
        //add league to league settings state
        let tempSettings = {...leagueSettings};
        tempSettings.proLeague = "pga";
        setLeagueSettings(tempSettings);
        //increment to next step
        let currentStep = step;
        ++currentStep;
        setStep(currentStep);
    }

    const logLiv = () => {
        //add league to league settings state
        let tempSettings = {...leagueSettings};
        tempSettings.proLeague = "liv";
        setLeagueSettings(tempSettings);
        //increment to next step
        let currentStep = step;
        ++currentStep;
        setStep(currentStep);
    }

    const logDetails= (e) => {
        e.stopPropagation()
        //pull input values
        let leagueNameIn = document.getElementById("new-league-name").value;
        let leagueTeamsIn = document.getElementById("new-league-teams").value;
        // let leagueLogoIn = document.getElementById("new-league-logo").value;
        //clear previous errors
        document.getElementById("input-error-name").classList="";
        document.getElementById("input-error-name").innerHTML="League Name Error";
        //LOGO SUBMISSION TEMPORARILY DISABLED
        // document.getElementById("input-error-logo").classList="";
        // document.getElementById("input-error-logo").innerHTML="Logo URL Error";
        //validate input values (Name)
        if (leagueNameIn.length > 0) {
            // if (checkUrl(leagueLogoIn)) {
                //save inputs
                let tempSettings = {...leagueSettings};
                tempSettings.name = leagueNameIn;
                tempSettings.teamCount = leagueTeamsIn;
                setLeagueSettings(tempSettings);
                //increment step
                let currentStep = step;
                ++currentStep;
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
        e.stopPropagation();
        //pull input values
        let rosterSizeIn = document.getElementById("new-league-team-size").value;
        let rosterCutIn = document.getElementById("new-league-team-cut").value;
        //validate inputs (cut < roster size)
        if (rosterCutIn < rosterSizeIn) {
            //save inputs
            let tempSettings = {...leagueSettings};
            tempSettings.scoring.rosterSize = rosterSizeIn;
            tempSettings.scoring.rosterCut = rosterCutIn;
            setLeagueSettings(tempSettings);
            //increment step
            let currentStep = step;
            ++currentStep;
            setStep(currentStep);

        } else {
            //handle errors
            document.getElementById("input-error-team-cut").classList.add("invalid");
            document.getElementById("input-error-team-cut").innerHTML="Please select a number less than the total roster size.";
        }

    }

    const createTeams = (teamQty, rosterSize) => {
        //create rosters per player qty
        let rosterArray=[];
        for (let i=0; i < rosterSize; i++) {
            rosterArray.push({
                playerName: `Player ${i+1}`,
                playerId: i+1,
            });
        }
        //create tems with created roster templates
        let teamArray = [{
            teamName: "New Team 1",
            managerId: props.userId,
            managerName: props.userData.userName,
            roster: rosterArray,
        }];
        for (let i=1; i < teamQty; i++) {
            teamArray.push({
                teamName: `New Team ${i+1}`,
                managerId: "none",
                managerName: `Manager ${i+1}`,
                roster: rosterArray,
            });
        }
        return (teamArray);
    }



    const logDraft= (e) => {
        e.stopPropagation();
        document.getElementById("input-error-draft-date").classList.remove("invalid");
        let draftDateIn = new Date(document.getElementById("new-league-draft-date").value);
        let todayDate = new Date();
        let dateDiff = (draftDateIn - todayDate);
        if (dateDiff > 86000000) {
            if (draftType) {
                let tempSettings = {...leagueSettings};
                tempSettings.draft = {
                    type: draftType,
                    date: draftDateIn,
                    order: "",
                }
                createLeague(tempSettings);
            } else {
                document.getElementById("input-error-draft-type").classList.add("invalid");
                document.getElementById("input-error-draft-type").innerHTML="Please select a draft type.";
            }
        } else {
            document.getElementById("input-error-draft-date").classList.add("invalid");
            document.getElementById("input-error-draft-date").innerHTML="Draft date must be at least 24 hours in the future.";
        }
    };

    const getLeagueType = () => {
        if (leagueSettings.proLeague === "pga") {
            return "PGA Tour"
        } else {
            return "LIV Golf"
        }
    }

    const createLeague = (leagueSettingsNew) => {
        //Create league ID
        let leagueIdNew = `L-${uuidv4()}`;
        //Initiate league activity
        let leagueActivityNew = [{
            item: `Created a new ${leagueSettingsNew.teamCount} team ${getLeagueType()} league, ${leagueSettingsNew.name} `,
            time: new Date(),
            user: props.userId,
        }]
        //Create teams & rosters
        let teamsNew = createTeams(leagueSettingsNew.teamCount, leagueSettingsNew.scoring.rosterSize);
        //Save final league data inputs and submit to firebase
        let leagueDataNew = {
            leagueId: leagueIdNew,
            activity: leagueActivityNew,
            schedule: [],
            settings: leagueSettingsNew,
            teams: teamsNew,
        }
        submitLeague(leagueDataNew);
    }

    async function submitLeague(leagueDataNew) {
        console.log(leagueDataNew);
        //create doc & add to league collection
        const newLeagueDoc = doc(props.db, "leagues",`${leagueDataNew.leagueId}`);
        await setDoc(newLeagueDoc, leagueDataNew);
        //add league id to user's doc
        const userDoc = doc(props.db, "users", `U-${props.userId}`);
        const userSnap  = await getDoc(userDoc);
        if (userSnap.exists()) {
            let userData = userSnap.data();
            //pull current data 
            let leaguesAll = userData.leagues;
            //write new data to doc db
            leaguesAll.push({
                id: leagueDataNew.leagueId,
                logo: leagueDataNew.settings.logoSrc,
                name: leagueDataNew.settings.name,
            });
            await updateDoc(userDoc,{leagues: leaguesAll});
            //update display with new league
            props.refreshUserData(props.userId);
            if (props.setNewLeagueOpen) {
                props.setNewLeagueOpen(false);
            }
        } else {
            //console.log("No User Doc found, handle error");
           document.getElementById("input-error-draft-type").classList.add("invalid");
           document.getElementById("input-error-draft-type").innerHTML="There was an error in creating your league, please start over and try again.";
        }
    }

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
                    <div id="pga" className="league-option-btn" onClick={logPga}>
                        <div id="pga" className="pga-img">
                            <PgaSvg />
                            <p>PGA Tour</p>
                        </div>
                        <p> Draft and manage a team of players from the PGA tour.</p>
                        <p>TEAMS: 4 to 12</p>
                    </div>
                    {/* TEMPORARILY DISABLING LIV LEAGUE FOR SIMPLICITY DURING DEV */}
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

                    <h1 className="new-league-main-txt">Set your league size</h1>
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
                        <p className="input-notes">The number of bench players who's scores will not count towards the team score each week (bench spots)</p>
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

                        <div className={`new-league-draft-type snake ${draftBtnSelect[0]}`}  defaultValue={leagueSettings.scoring.rosterCut} onClick={selectSnake}>
                            <div className="draft-type-logo snake" ></div>
                            <div className="draft-type-details" >
                                <p className="draft-type-title" >Snake Draft</p>
                                <p className="draft-type-info" >Each round, the draft order reverses</p>
                            </div>
                        </div>

                        <div className={`new-league-draft-type snake ${draftBtnSelect[1]}`}  defaultValue={leagueSettings.scoring.rosterCut} onClick={selectLinear}>
                            <div className="draft-type-logo linear" ></div>
                            <div className="draft-type-details" >
                                <p className="draft-type-title" >Linear Draft</p>
                                <p className="draft-type-info" >Each round, the draft order repeats</p>
                            </div>
                        </div>
                        <p id='input-error-draft-type'>Name Error</p>
                    </div>

                </div>

                <div className="new-league-btn" onClick={logDraft}>CREATE LEAGUE</div>
            </div> 
        );
    } 
}

export default NewLeagueModal;


    // const checkUrl = (urlIn) => {
    //     return urlIn.match(
    //         /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    //       );
    // }