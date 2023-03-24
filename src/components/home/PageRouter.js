import { useState } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    Link
  } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

//Components
import ModalContainer from "./modal_display/ModalContainer";
// import League from "./league_display/League";
// import userEvent from '@testing-library/user-event';
import CreateLeague from "./league_display/sections/CreateLeague";
// import AccountSettings from "../AccountSettings";
// import MockDraft from "../MockDraft";
// import Inbox from "../Inbox";
// import DirectMessages from "../DirectMessages";
import LoadingSpinner from '../LoadingSpinner';
import BlankPage from "./BlankPage";
import LeaguePage from './league_display/LeaguePage';
import SettingsPage from './settings_display/SettingsPage';
import HomePage from './home_display/HomePage';

function PageRouter(props) {
    //props.db
    //props.userData
    //props.userId
    //props.setNewLeagueOpen()
    //props.newLeagueOpen
    //props.refreshUserData
    const {user} = useSelector((state) => state.auth);
    const {leaguesAll, isLoading, isError, message} = useSelector((state) => state.leagues)

    if (isLoading) { //Loading Rendering
        //renders loading screen while loading array of user leagues
        return <LoadingSpinner/>
    }

    console.log(user.leagues)
    if (user.leagues.length < 1) { //User doesn't have any leagues created User has leagues
        //return routes w/ default redirecting to new league component
        return(
            <div className="center-panel-container">
                <Routes>
                    <Route exact path="/home/*" element={<HomePage title="Golf Home Dashboard"/>}/>
                    <Route exact path="/create-league" element={<CreateLeague/>}/>
                    <Route exact path="/mock-draft" element={<BlankPage title="Mock Draft"/>}/>
                    <Route exact path="/inbox" element={<BlankPage title="Inbox "/>}/>
                    <Route exact path="/account-settings/*" element={<SettingsPage title="Account Settings"/>}/>
                    <Route path="*" element={<Navigate to="/create-league" replace />}/>
                </Routes>
                <ModalContainer userData={props.userData} userId={props.userId} db={props.db} refreshUserData={props.refreshUserData} setNewLeagueOpen={props.setNewLeagueOpen} newLeagueOpen={props.newLeagueOpen}/>
            </div>
        )
    } else {  //User has leagues
        //return routes w/ default redirecting to first league in route page
        return(
            <div className="center-panel-container">
                    <Routes>
                        <Route exact path="/home/*" element={<HomePage title="Golf Home Dashboard"/>}/>
                        <Route exact path="/league/:id/*" element={<LeaguePage title="League Name"/>}/>
                        <Route exact path="/create-league" element={<CreateLeague/>}/>
                        <Route exact path="/mock-draft" element={<BlankPage title="Mock Draft"/>}/>
                        <Route exact path="/inbox" element={<BlankPage title="Inbox "/>}/>
                        <Route exact path="/account-settings/*" element={<SettingsPage title="Account Settings"/>}/>
                        <Route path="*" element={<Navigate to={`/league/${user.leagues[0].id}`} replace />}/>
                    </Routes>
                <ModalContainer userData={props.userData} userId={props.userId} db={props.db} refreshUserData={props.refreshUserData} setNewLeagueOpen={props.setNewLeagueOpen} newLeagueOpen={props.newLeagueOpen}/>
            </div>
        )
    }
}

export default PageRouter;
