import { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    Link
  } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { resetUser } from '../../features/auth/authSlice';

//Components
import ModalContainer from "./modal_display/ModalContainer";
// import League from "./league_display/League";
// import userEvent from '@testing-library/user-event';
import CreateLeague from "./new_league_display/CreateLeague";
// import AccountSettings from "../AccountSettings";
// import MockDraft from "../MockDraft";
// import Inbox from "../Inbox";
// import DirectMessages from "../DirectMessages";
import LoadingSpinner from '../LoadingSpinner';
import BlankPage from "./BlankPage";
import LeaguePage from './league_display/LeaguePage';
import SettingsPage from './settings_display/SettingsPage';
import HomePage from './home_display/HomePage';
import InboxPage from './chat_display/InboxPage';
import NewLeagueRouter from "./new_league_display/NewLeagueRouter";

function PageRouter(props) {
    //props.db
    //props.userData
    //props.userId
    //props.setNewLeagueOpen()
    //props.newLeagueOpen
    //props.refreshUserData
    const {user} = useSelector((state) => state.auth);
    const {leaguesAll, isLoading, isSuccess, isError, message} = useSelector((state) => state.leagues)
    const dispatch = useDispatch();


    console.log(user.leagues)
    if (user.leagues.length < 1) { //User doesn't have any leagues created User has leagues
        //return routes w/ default redirecting to new league component
        return(
            <div className="center-panel-container">
                <Routes>
                    <Route exact path="/home/*" element={<HomePage title="Golf Home Dashboard"/>}/>
                    <Route exact path="/new-league/*" element={<NewLeagueRouter/>}/>
                    <Route exact path="/mock-draft" element={<BlankPage title="Mock Draft"/>}/>
                    <Route exact path="/inbox/*" element={<InboxPage title="Inbox"/>}/>
                    <Route exact path="/account-settings/*" element={<SettingsPage title="Account Settings"/>}/>
                    <Route path="*" element={<Navigate to="/create-league" replace />}/>
                </Routes>
                {/* <ModalContainer userData={props.userData} userId={props.userId} db={props.db} refreshUserData={props.refreshUserData} setNewLeagueOpen={props.setNewLeagueOpen} newLeagueOpen={props.newLeagueOpen}/> */}
            </div>
        )
    } else {  //User has leagues
        //return routes w/ default redirecting to first league in route page
        return(
            <div className="center-panel-container">
                    <Routes>
                        <Route exact path="/home/*" element={<HomePage title="Golf Home Dashboard"/>}/>
                        <Route exact path="/league/:id/*" element={<LeaguePage title="League Name"/>}/>
                        <Route exact path="/new-league/*" element={<NewLeagueRouter/>}/>
                        <Route exact path="/mock-draft" element={<BlankPage title="Mock Draft"/>}/>
                        <Route exact path="/inbox/*" element={<InboxPage title="Inbox"/>}/>
                        <Route exact path="/account-settings/*" element={<SettingsPage title="Account Settings"/>}/>
                        <Route path="*" element={<Navigate to={`/league/${user.leagues[0].id}`} replace />}/>
                    </Routes>
                {/* <ModalContainer userData={props.userData} userId={props.userId} db={props.db} refreshUserData={props.refreshUserData} setNewLeagueOpen={props.setNewLeagueOpen} newLeagueOpen={props.newLeagueOpen}/> */}
            </div>
        )
    }
}

export default PageRouter;
