import { v4 as uuidv4 } from 'uuid';
import Roster from './Roster';

function MessageList(props) {
    //props.dataArray
    console.log(props.dataArray);


    let listItemsTemp = props.dataArray.map((dataItem) =>
        <div key={uuidv4()} className="league-message-item">
            <div className="league-message-item-header">
                <p>{dataItem.userName}</p>
                <p>{`${dataItem.time}`}</p>
            </div>
            <div className="league-message-item-content">
                <p>{dataItem.text}</p>
            </div>
        </div>
    );
    let listItemsAll= listItemsTemp.reverse();


    return (
        <div className="league-message-list">
            {listItemsAll}
        </div>
    );
}

export default MessageList;