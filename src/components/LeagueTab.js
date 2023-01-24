
import { useState, useEffect } from 'react';
import settingsIcon from "../images/icons/cog-outline-wh.png";
import { useSelector, useDispatch } from 'react-redux';
//Components
import LeagueActivityList from "./LeagueActivityList";
import WeekStandings from "./WeekStandings";
import SeasonStandings from "./SeasonStandings";
import LeagueSettingsList from "./LeagueSettingsList";


function LeagueTab(props) {
    //props.leagueData
    //props.leagueWeekLeaderboardData
    //props.leaderboardData
    //props.userInfo
    //props.openSettingsModal() 
    console.log(props.leagueWeekLeaderboardData);
    const {league, isLoading, isError, message} = useSelector((state) => state.leagueSelected)
    const {user} = useSelector((state) => state.auth)

    //temp variable to work on styling while also working on scoring system
    //will be replaced by props.leagueSeasonLeaderboardData
    const seasonStandings =[
        {   pos: 1,
            teamName: "Everybody Hates Reed",
            teamManager: "P. Lapresto",
            points: 420,
            teamWins: 5,            
            playerWins: 2,            
            pointsBack: 0,
        },
        {   pos: 2,
            teamName: "Gilmore's Guys",
            teamManager: "Z. Flegle",
            points: 400,
            teamWins: 4,            
            playerWins: 1,            
            pointsBack: 20,
        },
        {   pos: 3,
            teamName: "D(ustin johnso)N",
            teamManager: "B. Jackish",
            points: 350,
            teamWins: 2,            
            playerWins: 0,            
            pointsBack: 70,
        },
        {   pos: 4,
            teamName: "BOFA Boys",
            teamManager: "L. Tobergte",
            points: 300,
            teamWins: 1,            
            playerWins: 1,            
            pointsBack: 120,
        },
    ];



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
                        <img src={settingsIcon} alt="settings icon" onClick={props.openSettingsModal} />
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