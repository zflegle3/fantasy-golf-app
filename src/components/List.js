import { v4 as uuidv4 } from 'uuid';
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
                <p>{dataItem.name}</p>
                <p>{dataItem.manager}</p>
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
