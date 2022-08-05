import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import LeaderboardItem from "./LeaderboardItem";
uuidv4(); 



function LiveLeaderboard(props) {
    //props.dataArray
    //props.leaderboardInfo
    // const [scheduleArray, setScheduleArray] = useState([]);


    let listItemsAll = props.dataArray.map((leaderboardRow) => (
            <LeaderboardItem key={uuidv4()} rowData={leaderboardRow}/>
    ));
    
    return (
        <div>
            <div className={"schedule-item-list"}>
                {listItemsAll}
            </div>
        </div>

    );
}

export default LiveLeaderboard;