

function List(props) {
    //props.leagueData
    //props.dataArray
    // console.log(props.dataArray);
    // console.log(props.listType);

    let listItemsAll = {};
    if(props.listType === "league-activity") {
        listItemsAll = props.dataArray.map((dataItem) =>
            <div className={`${props.listType}-item`}>
                <p>{dataItem.user} {dataItem.item}, {dataItem.time}</p>
            </div>
        );
    }

    return (
        <div className={`${props.listType}-all`}>
            {listItemsAll}
        </div>
    );
}

export default List;
