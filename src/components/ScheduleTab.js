import { useState, useEffect } from 'react';
// import settingsIcon from "../images/icons/cog-outline-wh.png";
//Components
import ScheduleList from "./ScheduleList";
// import LeagueSettingsList from "./LeagueSettingsList"


function ScheduleTab(props) {
    //props.scheduleDataAll
    //props.leaderboardLive

    console.log(props.scheduleDataAll);

    
    if (props.scheduleDataAll) {
        return (
            <div className="center-panel-content-all">            
                <div className="schedule-upcoming-all">
                    <div className="schedule-upcoming-header">
                        <p>2022 Tournament Schedule</p>
                    </div>
                    <ScheduleList dataArray={props.scheduleDataAll}/>
                </div>
            </div>
        );
    } else {
        return(
            <div>Loading</div>
        )
    }

}

export default ScheduleTab;