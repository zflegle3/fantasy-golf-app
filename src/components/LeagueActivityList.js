import { v4 as uuidv4 } from 'uuid';

function LeagueActivityList(props) {
    //props.dataArray
    console.log(props.dataArray);

    let listItemsAll = props.dataArray.map((dataItem) =>
            <div key={uuidv4()} className="league-activity-item">
                <p>{dataItem.user}</p>
                <p>{dataItem.item}, {dataItem.time}</p>
            </div>
        );

    return (
        <div className="league-activity-list">
            {listItemsAll}
        </div>
    );
}

export default LeagueActivityList;
