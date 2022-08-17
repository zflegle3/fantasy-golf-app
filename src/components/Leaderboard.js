import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import LeaderboardItemLive from "./LeaderboardItemLive";
import LeaderboardItemUpcoming from "./LeaderboardItemUpcoming";
uuidv4(); 



function Leaderboard(props) {
    //props.leaderboardData
    //props.eventInfo
    // const [scheduleArray, setScheduleArray] = useState([]);

    console.log(props.leaderboardData)

    // let listItemsAll = props.leaderboardData.leaderboardRows.map((leaderboardRow) => (
    //         <LeaderboardItem key={uuidv4()} rowData={leaderboardRow} currentRound={props.leaderboardData.roundId.$numberInt}/>
    // ));
    

    if (props.leaderboardData.status === "Not Started") {
        //render Groupings
        let listItemsAll = props.leaderboardData.leaderboardRows.map((leaderboardRow) => (
            <LeaderboardItemUpcoming key={uuidv4()} rowData={leaderboardRow} currentRound={props.leaderboardData.roundId.$numberInt}/>
         ));
        return(
            <div>
                <div className="leaderboard-item-list">
                    <div className="leaderboard-header">
                        <p>PLAYER NAME</p>
                        <p>TEE TIME</p>
                    </div>
                    {listItemsAll}
                </div>
            </div>
        );
    } else if (props.leaderboardData.status === "Active") {
        let listItemsAll = props.leaderboardData.leaderboardRows.map((leaderboardRow) => (
            <LeaderboardItemLive key={uuidv4()} rowData={leaderboardRow} currentRound={props.leaderboardData.roundId.$numberInt}/>
        ));
        return(
            <div>
                <div className="leaderboard-item-list">
                    <div className="leaderboard-header">
                        <p>POS</p>
                        <p>PLAYER NAME</p>
                        <p>Tee Time</p>
                        <p>THRU</p>
                        <p>ROUND</p>
                        <p>R1</p>
                        <p>R2</p>
                        <p>R3</p>
                        <p>R4</p>
                    </div>
                    {listItemsAll}
                </div>
            </div>
        );
    }
}

export default Leaderboard;