import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import LeaderboardItem from "./LeaderboardItem";
uuidv4(); 



function LiveLeaderboard(props) {
    //props.leaderboardData
    //props.leaderboardInfo
    // const [scheduleArray, setScheduleArray] = useState([]);


    let listItemsAll = props.leaderboardData.leaderboardRows.map((leaderboardRow) => (
            <LeaderboardItem key={uuidv4()} rowData={leaderboardRow} currentRound={props.leaderboardData.roundId.$numberInt}/>
    ));
    
    return (
        <div>
            <div className="leaderboard-item-list">
                <div className="leaderboard-header">
                    <p>POS</p>
                    <p>PLAYER NAME</p>
                    <p>TOTAL</p>
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

export default LiveLeaderboard;