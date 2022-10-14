import { useState } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    Link
  } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

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
    //props.userData
    //props.setNewLeagueOpen()
    //props.newLeagueOpen



    // let leagueRoutes = props.userData.leagues.map((league) => {
    //     <Route exact path={`/league/${league.id}`} element={<League userData={props.userData} leagueData={league}/>}/>
    // })

    console.log(props.userData.leagues.length < 1);
    if (props.userData.leagues.length < 1) {
        //return normal routes w/ default redirecting to new league route
        return(
            <div className="center-panel-container">
                    <Routes>
                        <Route exact path="/create-league" element={<CreateLeague userData={props.userData}/>}/>
                        <Route exact path="/messages" element={<DirectMessages />}/>
                        <Route exact path="/inbox" element={<Inbox />}/>
                        <Route exact path="/draftboards" element={<MockDraft />}/>
                        <Route exact path="/account-settings" element={<AccountSettings />}/>
                        <Route path="*" element={<Navigate to="/create-league" replace />}/>
                    </Routes>
            <ModalContainer setNewLeagueOpen={props.setNewLeagueOpen} newLeagueOpen={props.newLeagueOpen}/>
          </div>
        )
    } else {
        //return normal routes w/ default redirecting to first league 
        return(
            <div className="center-panel-container">
                    <Routes>
                        {/* <Route exact path="/league/:id/*" element={<League db={db}  leagues={leagues} userInfo={userActive} leaderboardData={leaderboardData} eventInfo={eventInfo} worldRanksData={worldRanksData} fedexRanksData={fedexRanksData} />}/> */}
                        <Route exact path="/league/:id/*" element={<League />}/>
                        <Route exact path="/messages" element={<DirectMessages />}/>
                        <Route exact path="/inbox" element={<Inbox />}/>
                        <Route exact path="/draftboards" element={<MockDraft />}/>
                        <Route exact path="/account-settings" element={<AccountSettings />}/>
                        <Route path="*" element={<Navigate to={`/league/${props.userData.leagues[0].id}`} replace />}/>
                    </Routes>
            <ModalContainer setNewLeagueOpen={props.setNewLeagueOpen} newLeagueOpen={props.newLeagueOpen}/>
          </div>
        )
    }
}

export default ContentPanel;


