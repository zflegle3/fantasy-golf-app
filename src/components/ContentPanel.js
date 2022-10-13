import { useState } from 'react';

//Components
import NewLeagueModal from "../components/NewLeague";

function ContentPanel(props) {
    //props.setNewLeagueOpen()
    //props.newLeagueOpen


    console.log(props.newLeagueOpen);
    return(
        <div className="center-panel-container">
            {/* <Routes> */}
                {/* <Route exact path="/*" element={<Home scheduleDataAll={scheduleDataAll} leaderboardData={leaderboardData} eventInfo={eventInfo} worldRanksData={worldRanksData} fedexRanksData={fedexRanksData} />}/> */}
                {/* <Route exact path="/league/:id/*" element={<League db={db}  leagues={leagues} userInfo={userActive} leaderboardData={leaderboardData} eventInfo={eventInfo} worldRanksData={worldRanksData} fedexRanksData={fedexRanksData} />}/> */}
            {/* </Routes> */}
        <NewLeagueModal setNewLeagueOpen={props.setNewLeagueOpen} newLeagueOpen={props.newLeagueOpen}/>
      </div>
    )
}

export default ContentPanel;
