import { useState, useEffect } from 'react';
import {
    Routes,
    Route,
    Link,
} from "react-router-dom";
import Test from "./Test";
import WorldRanks from "./WorldRanks";
import FedexRanks from "./FedexRanks";
import ScheduleTab from "./ScheduleTab";
import LeaderboardTab from "./LeaderboardTab";


function Home(props) {
    //props.scheduleDataAll
    //props.leaderboardData
    //props.eventInfo
    //props.worldRanksData
    //props.fedexRanksData
    // const [rankData, setRankData] = useState({rankings: []});

    console.log(props.leaderboardData);


    return (
        <div className="center-panel-content">
            <div className="center-panel-header">HOME</div>
            <div className="dual-content-panel">
                <div className="center-panel">
                <ul className="center-panel-tabs">
                    <Link to="" className="center-panel-tab-item">Happening Now</Link>
                    <Link to="/schedule" className="center-panel-tab-item">Schedule</Link>
                    <Link to="/world-rankings" className="center-panel-tab-item">World Golf Rankings</Link>
                    <Link to="/fedex-rankings" className="center-panel-tab-item">Fedex Cup Rankings</Link>
                    <Link to="/news" className="center-panel-tab-item">Tab3</Link>
                </ul>
                <div className="center-panel-display">
                    <Routes>
                        <Route exact path="" element={<LeaderboardTab scheduleDataAll={props.scheduleDataAll} leaderboardData={props.leaderboardData} eventInfo={props.eventInfo}/>}/>
                        <Route exact path="schedule" element={<ScheduleTab scheduleDataAll={props.scheduleDataAll} leaderboardData={props.leaderboardData} eventInfo={props.eventInfo}/>}/>
                        <Route exact path="world-rankings" element={<WorldRanks worldRanksData={props.worldRanksData}/>}/>   
                        <Route exact path="fedex-rankings" element={<FedexRanks fedexRanksData={props.fedexRanksData}/>}/>
                        <Route exact path="news" element={<Test test={"Tab 3 test, Home"}/>}/>
                    </Routes>
                </div>
                </div>
            </div>
        </div>
    );



}

export default Home;