import { v4 as uuidv4 } from 'uuid';
import Roster from './Roster';

function SeasonStandings(props) {
    //props.dataArray
    console.log(props.dataArray);


    let listItemsAll = props.dataArray.map((dataItem) =>
        <div key={uuidv4()} className={"season-standings-item"}>
            <p>{dataItem.pos}</p>
            <div className="season-standings-team-header">
                <p>{dataItem.teamName}</p>
                <p>{dataItem.teamManager}</p>
            </div>
            <p>{dataItem.points}</p>
            <p>{dataItem.teamWins}</p>
            <p>{dataItem.playerWins}</p>
            <p>{dataItem.pointsBack}</p>
        </div>
    );


    return (
        <div className={"season-standings-list"}>
            <div className="season-standings-list-header">
                <p>Pos.</p>
                <p>Team</p>
                <p>Points</p>
                <p>Team Wins</p>
                <p>Player Wins</p>
                <p>Points Back</p>
            </div>
            {listItemsAll}
        </div>
    );
}

export default SeasonStandings;