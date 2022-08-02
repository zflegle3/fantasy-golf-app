import List from "./List"
import { useState, useEffect } from 'react';


function LeagueTab(props) {
    //props.test
    //props.LeagueData
    console.log(props.leagueData);

    return (
        <div className="league-display-all">
            <p>{`${props.leagueData.settings.name}, Testing`}</p>
            <div className="league-display-content">
                <h1>Standings</h1>
            </div>
            <div className="league-display-content">
                <h1>Activity</h1>
                <List dataArray={props.leagueData.activity} listType={"league-activity"} />
            </div>
            <div className="league-display-content">
                <h1>settings</h1>
            </div>
        </div>
    );
}

export default LeagueTab;