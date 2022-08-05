import { useState, useEffect } from 'react';
// import settingsIcon from "../images/icons/cog-outline-wh.png";
//Components
import ScheduleList from "./ScheduleList";
import LiveLeaderboard from "./LiveLeaderboard";
// import LeagueSettingsList from "./LeagueSettingsList"


function ScheduleTab(props) {
    //props.scheduleDataAll
    //props.leaderboardData
    //props.leaderboardInfo
    // console.log(props.scheduleDataAll);
    // console.log(props.leaderboardData);
    // console.log(props.leaderboardInfo);

    let startDate = new Date(Number(props.leaderboardInfo.date.start.$date.$numberLong)).toLocaleDateString('en-us', { weekday:"long", month:"short", day:"numeric"});
    let endDate = new Date(Number(props.leaderboardInfo.date.end.$date.$numberLong)).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});

    return (
        <div className="center-panel-content-all">     
            <div className="schedule-upcoming-all">
                <div className="leaderboard-live-header">
                    <div>
                        <p>{props.leaderboardInfo.name}</p>
                        <p>{props.leaderboardData.roundStatus}</p>
                    </div>  
                    <p>{`${props.leaderboardInfo.courses[0].courseName} in ${props.leaderboardInfo.courses[0].location.city}, ${props.leaderboardInfo.courses[0].location.state}`}</p>
                    <p>{`${startDate}-${endDate}`}</p>
                </div>
                <LiveLeaderboard dataArray={props.leaderboardData.leaderboardRows} leaderboardInfo={props.leaderboardInfo}/>
            </div>       
            <div className="schedule-upcoming-all">
                <div className="schedule-upcoming-header">
                    <p>2022 Tournament Schedule</p>
                </div>
                <ScheduleList dataArray={props.scheduleDataAll}/>
            </div>
        </div>
    );
}

export default ScheduleTab;