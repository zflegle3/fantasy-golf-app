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
        //validate data
        let conditions = validateModal(e);
        if (conditions) {
            closeModal();
        } else {
            console.log("handle error new league");
        }
    } 

    const validateModal = (e) => {
        return true;
    }


    return (
    <div className="new-league-modal">
        <form className="new-league-form">

            <div form className="new-league-header">
                <h1 className="new-league-main-txt">Create a new League</h1>
                <p className="new-league-sub-txt">Don't worry, you can make changes to all settings later</p>
            </div>

            <div form className="new-league-input">
                <label htmlFor="name">League Name</label>
                <div className="input-container">
                    <input type="text" id="new-league-input" name="name" placeholder="Enter email" ></input>
                </div>
                <p id="new-league-error" ></p>
            </div>

            <div form className="new-league-input">
                <label htmlFor="teams">Number of Teams</label>
                <div className="input-container">
                    <input type="number" id="new-league-input" name="teams" placeholder="4" ></input>
                    <select></select>
                </div>
                <p id="new-league-error" ></p>
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