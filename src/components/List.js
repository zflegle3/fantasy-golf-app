import { v4 as uuidv4 } from 'uuid';
import Roster from './Roster';
uuidv4(); 

function List(props) {
    //props.listType
    //props.dataArray
    console.log(props.dataArray);
    // console.log(props.listType);

    let listItemsAll = {};
    if(props.listType === "league-activity") {
        listItemsAll = props.dataArray.map((dataItem) =>
            <div key={uuidv4()} className={`${props.listType}-item`}>
                <p>{dataItem.user}</p>
                <p>{dataItem.item}, {dataItem.time}</p>
            </div>
        );
    } else if(props.listType === "league-standings") {
        listItemsAll = props.dataArray.map((dataItem) =>
            <div key={uuidv4()} className={`${props.listType}-item`}>
                <div className="league-standings-item-header">
                    <p>{dataItem.teamName}</p>
                    <p>{dataItem.managerName}</p>
                </div>
                <Roster players={dataItem.roster}/>
            </div>
        );
    } else if (props.listType === "league-message") {
        listItemsAll = props.dataArray.map((dataItem) =>
        <div key={uuidv4()} className={`${props.listType}-item`}>
            <div className="league-message-item-header">
                <p>{dataItem.userName}</p>
                <p>{`${dataItem.time.toDate()}`}</p>
            </div>
            <div className="league-message-item-content">
                <p>{dataItem.text}</p>
            </div>
        </div>
        );
    }

    return (
        <div className={`${props.listType}-list`}>
            {listItemsAll}
        </div>
    );
}

export default List;
