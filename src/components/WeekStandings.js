import { v4 as uuidv4 } from 'uuid';
import Roster from './Roster';

function WeekStandings(props) {
    //props.leagueWeekLeaderboardData
    // console.log(props.leagueWeekLeaderboardData);

    let listItemsAll = props.leagueWeekLeaderboardData.leagueTeamScores.map((teamItem) =>
        <div key={uuidv4()} className={"week-standings-item"}>
            <div className="week-standings-item-header">
                <div className="team-title">
                    <p>{teamItem.teamName}</p>
                    <p>{teamItem.managerName}</p>
                </div>
                <div className="team-score">
                    <p>{teamItem.teamTotal}</p>
                </div>
            </div>
            <Roster playersAll={teamItem.roster}/>
        </div>
    );

    return (
        <div className={"week-standings-list"}>
            {listItemsAll}
        </div>
    );
}

export default WeekStandings;