
import { useState, useEffect } from 'react';
import settingsIcon from "../images/icons/cog-outline-wh.png";
//Components
import List from "./List";
import LeagueSettingsList from "./LeagueSettingsList"


function LeagueTab(props) {
    //props.test
    //props.LeagueData

    console.log(props.leagueData);

    const editSettings = () => {
        console.log("Add edit settings handling");
        //conditionally render out logo if not admin
    }

    return (
        <div className="center-panel-content-all">            
            <div className="league-standings-all">
                <div className="league-section-header">
                    <p>Team Standings</p>

                </div>
                <List dataArray={props.leagueData.teams} listType={"league-standings"} />
            </div>
            <div className="league-activity-all">
                <div className="league-section-header">
                    <p>League Activity</p>
                </div>
                <List dataArray={props.leagueData.activity} listType={"league-activity"} />
            </div>
            <div className="league-settings-all">
                <div className="league-section-header">
                    <p>League Settings</p>
                    <img src={settingsIcon} alt="settings icon" ></img>
                </div>
                <LeagueSettingsList settingsData={props.leagueData.settings}/>
            </div>
        </div>
    );
}

export default LeagueTab;