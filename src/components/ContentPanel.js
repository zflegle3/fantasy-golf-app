import { useState } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    Link
  } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';

//Components
import ModalContainer from "../components/ModalContainer";
import League from "../components/League"
import userEvent from '@testing-library/user-event';
import CreateLeague from "./CreateLeague";
import AccountSettings from "./AccountSettings";
import MockDraft from "./MockDraft";
import Inbox from "./Inbox";
import DirectMessages from "./DirectMessages";

function ContentPanel(props) {
    //props.db
    //props.userData
    //props.userId
    //props.setNewLeagueOpen()
    //props.newLeagueOpen
    //props.refreshUserData
    const {user} = useSelector((state) => state.auth);



    // let leagueRoutes = props.userData.leagues.map((league) => {
    //     <Route exact path={`/league/${league.id}`} element={<League userData={props.userData} leagueData={league}/>}/>
    // })

    console.log(user.leagues.length < 1);
    if (user.leagues.length < 1) {
        //return normal routes w/ default redirecting to new league route
        return(
            <div className="center-panel-container">
                <Routes>
                    <Route exact path="/create-league" element={<CreateLeague userData={props.userData} userId={props.userId} db={props.db} refreshUserData={props.refreshUserData}/>}/>
                    <Route exact path="/messages" element={<DirectMessages />}/>
                    <Route exact path="/inbox" element={<Inbox />}/>
                    <Route exact path="/draftboards" element={<MockDraft />}/>
                    <Route exact path="/account-settings" element={<AccountSettings />}/>
                    <Route path="*" element={<Navigate to="/create-league" replace />}/>
                </Routes>
                <ModalContainer userData={props.userData} userId={props.userId} db={props.db} refreshUserData={props.refreshUserData} setNewLeagueOpen={props.setNewLeagueOpen} newLeagueOpen={props.newLeagueOpen}/>
            </div>
        )
    } else {
        //return normal routes w/ default redirecting to first league 
        return(
            <div className="center-panel-container">
                    <Routes>
                        {/* <Route exact path="/league/:id/*" element={<League db={db}  leagues={leagues} userInfo={userActive} leaderboardData={leaderboardData} eventInfo={eventInfo} worldRanksData={worldRanksData} fedexRanksData={fedexRanksData} />}/> */}
                        <Route exact path="/league/:id/*" element={<League db={props.db} userData={props.userData}/>}/>
                        <Route exact path="/messages" element={<DirectMessages />}/>
                        <Route exact path="/inbox" element={<Inbox />}/>
                        <Route exact path="/draftboards" element={<MockDraft />}/>
                        <Route exact path="/account-settings" element={<AccountSettings />}/>
                        <Route path="*" element={<Navigate to={`/league/${props.userData.leagues[0].id}`} replace />}/>
                    </Routes>
                <ModalContainer userData={props.userData} userId={props.userId} db={props.db} refreshUserData={props.refreshUserData} setNewLeagueOpen={props.setNewLeagueOpen} newLeagueOpen={props.newLeagueOpen}/>
            </div>
        )
    }
}

export default ContentPanel;


