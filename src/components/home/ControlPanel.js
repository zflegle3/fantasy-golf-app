import { useState, useEffect } from 'react';
// import { } from "react-icons/fa" 
//use react icons if possible
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {logout, resetUser} from "../../features/auth/authSlice";
import { getLeaguesAll, resetLeagues } from '../../features/leagues/leagueSlice';
import { openNewLeague } from '../../features/modals/modalSlice';
import { resetSelected } from '../../features/leagues/leagueSelectedSlice';
//images
import addIcon from "../../images/icons/plus-circle-outline-wh.png";
import logoIcon from "../../images/icons/golf-tee-wh.png";
import profileIcon from "../../images/icons/golf-cart-wh.png";
import settingsIcon from "../../images/icons/cog-outline-wh.png";
//Components
import LeagueLinks from "../LeagueLinks";


function ControlPanel(props) {
    //props.setNewLeagueOpen()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);
    const {leaguesAll, isLoading, isError, message} = useSelector((state) => state.leagues)


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

    const onLogout = () => {
      //logs out user using redux state and navigates to login page
      dispatch(logout());
      dispatch(resetUser());
      dispatch(resetLeagues());
      dispatch(resetSelected());
      navigate("/");
    }

    useEffect(() => {
      //update leagues onmount
      dispatch(getLeaguesAll());
    }, [])

    const openModal = () => {
      dispatch(openNewLeague());
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

          <div className="nav-link " id="new-league" onClick={openModal}>
            <p>LEAGUES</p>
            <img src={addIcon}></img>
          </div>

          <Link to="/draftboards" className="nav-link" id="nav-tab" onClick={selectTabDisplay}>
            <img src={logoIcon}></img>
            <p>MOCK DRAFTS</p>
          </Link>

          <LeagueLinks />
        </div>

        <div className="nav-footer"> 
          <img src={profileIcon}></img>
          <div className="profile-container">
            <p>{props.userData.userName}</p>
            <button onClick={onLogout}> Log Out</button>
          </div>
          <Link to="/account-settings" className="nav-link" id="nav-tab" onClick={selectTabDisplay}>
            <img src={settingsIcon}></img>
          </Link>
        </div>
      </div>
    );
}

export default ControlPanel;