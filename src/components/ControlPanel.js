import { useState } from 'react';

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

    const createNewLeague = (e) => {
        // console.log("New League");
        // let newLeagueModal = document.getElementById("new-league-modal-form");
        // newLeagueModal.classList = "visable";
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

          {/* <Link to="/" className="nav-link tab-selected" id="nav-tab" onClick={selectTabDisplay}>
            <img src={logoIcon}></img>
            <p>Golf Home</p>
          </Link> */}

          <div className="nav-link " id="new-league" onClick={createNewLeague}>
            <p>New League</p>
            <img src={addIcon}></img>
          </div>

          <LeagueLinks leagues={props.userData.leagues} selectTabDisplay={selectTabDisplay}/>
        </div>

        <div className="nav-footer"> 
          <img src={profileIcon}></img>
          <div className="profile-container">
            <p>{props.userData.userName}</p>
            <button onClick={props.userLogOut}> Log Out</button>
          </div>
          <img src={settingsIcon}></img>
        </div>
      </div>
    );
}

export default ControlPanel;