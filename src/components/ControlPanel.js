import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

//images
import addIcon from "../images/icons/plus-circle-outline-wh.png";
import logoIcon from "../images/icons/golf-tee-wh.png";
import leagueIcon from "../images/icons/golf-flag-wh.png";
import profileIcon from "../images/icons/golf-cart-wh.png";
import settingsIcon from "../images/icons/cog-outline-wh.png";

//Components
import LeagueLinks from "./LeagueLinks";


function ControlPanel(props) {
    //props.userData
    //props.userLogOut
    //props.setNewLeagueOpen()

    const createNewLeague = (e) => {
        console.log("New League");
        // let newLeagueModal = document.getElementById("new-league-modal-form");
        // newLeagueModal.classList = "visable";
        props.setNewLeagueOpen(true);
    }

    const selectTabDisplay = (e) => {
        let allTabs = document.querySelectorAll("[id=nav-tab]");
        for (let i=0; i< allTabs.length; i++) {
          allTabs[i].classList =  "nav-link";
        };
        let selected = e.target;
        if (!selected.id) {
          selected = e.target.parentElement;
        }
        selected.classList = "nav-link tab-selected";
    }


    return(
        <div className="left-panel-container">
        <div className="nav-header">
            <img src={logoIcon}></img>
            <h1 className="header-logo">Site Name</h1>
        </div>

        <div className="nav-body">

          <Link to="/messages" className="nav-link" id="nav-tab" onClick={selectTabDisplay}>
            <img src={logoIcon}></img>
            <p>Direct Messages</p>
          </Link>

          <Link to="/inbox" className="nav-link" id="nav-tab" onClick={selectTabDisplay}>
            <img src={logoIcon}></img>
            <p>Inbox</p>
          </Link>

          <div className="nav-link " id="new-league" onClick={() => props.setNewLeagueOpen(true)}>
            <p>LEAGUES</p>
            <img src={addIcon}></img>
          </div>

          <Link to="/draftboards" className="nav-link" id="nav-tab" onClick={selectTabDisplay}>
            <img src={logoIcon}></img>
            <p>MOCK DRAFTS</p>
          </Link>

          <LeagueLinks leagues={props.userData.leagues} selectTabDisplay={selectTabDisplay}/>
        </div>

        <div className="nav-footer"> 
          <img src={profileIcon}></img>
          <div className="profile-container">
            <p>{props.userData.userName}</p>
            <button onClick={props.userLogOut}> Log Out</button>
          </div>
          <Link to="/account-settings" className="nav-link" id="nav-tab" onClick={selectTabDisplay}>
            <img src={settingsIcon}></img>
          </Link>
        </div>
      </div>
    );
}

export default ControlPanel;