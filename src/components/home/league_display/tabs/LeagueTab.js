
import { useState, useEffect } from 'react';
import settingsIcon from "../../../../images/icons/cog-outline-wh.png";
import { useSelector, useDispatch } from 'react-redux';
import { openEditSettings } from '../../../../features/modals/modalSlice';
//Components
import LeagueActivityList from "../sections/LeagueActivityList";
import WeekStandings from "../../../WeekStandings";
import SeasonStandings from "../../../SeasonStandings";
import LeagueSettingsList from "../sections/LeagueSettingsList";


function LeagueTab(props) {
    //props.leagueData
    //props.leagueWeekLeaderboardData
    //props.leaderboardData
    //props.userInfo
    //props.openSettingsModal() 
    const dispatch = useDispatch();
    const {league, isLoading, isError, message} = useSelector((state) => state.leagueSelected)
    const {user} = useSelector((state) => state.auth)


    const openSettings = () => {
        dispatch(openEditSettings());
    };


    if (league.admin === user._id) {
        return (
            <div className="center-panel-content-all"> 
                <div className="season-standings-all">
                    <div className="league-section-header">
                        <p>Season Standings</p>
                    </div>
                    {/* <SeasonStandings dataArray={seasonStandings}/> */}
                </div>  
                <div className="week-standings-all">
                    <div className="league-section-header">
                        <p>Weekly Standings</p>
                        <p>Add Event Details Here</p>
                    </div>
                    {/* <WeekStandings leagueWeekLeaderboardData={props.leagueWeekLeaderboardData}/> */}
                </div>
                <div className="league-activity-all">
                    <div className="league-section-header">
                        <p>League Activity</p>
                    </div>
                    <LeagueActivityList dataArray={league.activity}/>
                </div>
                <div className="league-settings-all">
                    <div className="league-section-header">
                        <p>League Settings</p>
                        <img src={settingsIcon} alt="settings icon" onClick={openSettings} />
                    </div>
                    <LeagueSettingsList settingsData={league.settings}/>
                </div>
            </div>
        );
    } else {
        return (
            <div className="center-panel-content-all">   
                <div className="season-standings-all">
                    <div className="league-section-header">
                        <p>Season Standings</p>
                    </div>
                    {/* <SeasonStandings dataArray={seasonStandings} leaderboardData={props.leaderboardData}/> */}
                </div>           
                <div className="week-standings-all">
                    <div className="league-section-header">
                        <p>Team Standings</p>
                    </div>
                    {/* <WeekStandings leagueWeekLeaderboardData={props.leagueWeekLeaderboardData}/> */}
                </div>
                <div className="league-activity-all">
                    <div className="league-section-header">
                        <p>League Activity</p>
                    </div>
                    <LeagueActivityList dataArray={league.activity} />
                </div>
                <div className="league-settings-all">
                    <div className="league-section-header">
                        <p>League Settings</p>
                    </div>
                    <LeagueSettingsList settingsData={league.settings}/>
                </div>
            </div>
        );
    }
}

export default LeagueTab;