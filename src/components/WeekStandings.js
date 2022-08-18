import { v4 as uuidv4 } from 'uuid';
import Roster from './Roster';

function WeekStandings(props) {
    //props.listType
    //props.dataArray
    console.log(props.dataArray);
    // console.log(props.listType);


    let listItemsAll = props.dataArray.map((dataItem) =>
        <div key={uuidv4()} className={"week-standings-item"}>
            <div className="week-standings-item-header">
                <div className="team-title">
                    <p>{dataItem.teamName}</p>
                    <p>{dataItem.managerName}</p>
                </div>
                <div className="team-score">
                    <p>-6</p>
                </div>
            </div>
            <Roster players={dataItem.roster}/>
        </div>
    );

    return (
        <div className={"week-standings-list"}>
            {listItemsAll}
        </div>
    );
}

export default WeekStandings;