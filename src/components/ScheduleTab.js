import { useState, useEffect } from 'react';
// import settingsIcon from "../images/icons/cog-outline-wh.png";
//Components
import ScheduleList from "./ScheduleList";
import LiveLeaderboard from "./LiveLeaderboard";
// import LeagueSettingsList from "./LeagueSettingsList"


function ScheduleTab(props) {
    //props.scheduleDataAll
    //props.leaderboardData
    //props.eventInfo
    // console.log(props.scheduleDataAll);
    console.log(props.leaderboardData);
    console.log(props.eventInfo);

    let startDate = new Date(Number(props.eventInfo.date.start.$date.$numberLong)).toLocaleDateString('en-us', { weekday:"long", month:"short", day:"numeric"});
    let endDate = new Date(Number(props.eventInfo.date.end.$date.$numberLong)).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});

    return (
        <div className="center-panel-content-all">     
            <div className="schedule-upcoming-all">
                <div className="leaderboard-live-header">
                    <div>
                        <p>{props.eventInfo.name}</p>
                        <p>{`${props.leaderboardData.roundStatus} Round ${props.leaderboardData.roundId.$numberInt}`}</p>
                    </div>  
                    <p>{`${props.eventInfo.courses[0].courseName} in ${props.eventInfo.courses[0].location.city}, ${props.eventInfo.courses[0].location.state}`}</p>
                    <p>{`${startDate}-${endDate}`}</p>
                </div>
                <LiveLeaderboard leaderboardData={props.leaderboardData} eventInfo={props.eventInfo}/>
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