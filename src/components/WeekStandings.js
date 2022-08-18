import { v4 as uuidv4 } from 'uuid';
import Roster from './Roster';

function WeekStandings(props) {
    //props.listType
    //props.dataArray
    //props.leaderboardData
    console.log(props.dataArray);
    // console.log(props.listType);

    // let leagueLeaderboard = props.leaderboardData.filter{

    // }
    console.log(props.leaderboardData);
    console.log(props.dataArray);



    let listItemsAll = props.dataArray.map((dataItem) =>
        <div key={uuidv4()} className={"week-standings-item"}>
            <div className="week-standings-item-header">
                <div className="team-title">
                    <p>{dataItem.teamName}</p>
                    <p>{dataItem.managerName}</p>
                </div>
                <div className="team-score">
                    <p>{-8}</p>
                </div>
            </div>
            <Roster players={dataItem.roster} leaderboardData ={props.leaderboardData}/>
        </div>
    );

    return (
        <div className={"week-standings-list"}>
            {listItemsAll}
        </div>
    );
}

export default WeekStandings;