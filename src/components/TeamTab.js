
import { useState, useEffect } from 'react';
import leagueIcon from "../images/icons/golf-flag-wh.png";
import settingsIcon from "../images/icons/cog-outline-wh.png";




function TeamTab(props) {
    //props.test
    //props.LeagueData
    //props.userInfo
    //props.openSettingsModal()

    console.log(props.leagueData);
    console.log(props.userInfo);



    let teamSelected = props.leagueData.teams.filter((team) => {
        return team.managerId === props.userInfo.uid;
    });
    console.log(teamSelected.teamName);



    
    return (
        <div className="center-panel-content-all">            
            <div className="team-menu">
                <div className="team-header">
                    <div className="team-avatar">
                        <img src={leagueIcon} alt="team avatar image"/>
                    </div>
                    <div className="team-name">
                        <p>{teamSelected[0].teamName}</p>
                    </div>
                    <div className="team-settings">
                        <img src={settingsIcon} alt="settings link and image"/>
                    </div>
                </div>
                <div className="team-roster-controls">
                    <div className="team-event-select">
                        <p className="event-select-dec">{"<"}</p>
                        <p className="event-select-txt">{"Week 1"}</p>
                        <p className="event-select-inc">{">"}</p>
                    </div>
                </div>
                <div className="roster-header">
                        <p>Golfers</p>
                        <p>World Rankings</p>
                        <p>Fedex Rankings</p>
                </div>
            </div>
            {/* <RosterList /> */}
        </div>
    );
};

export default TeamTab;