
function LeaderboardItem(props) {
    //props.rowData
    //console.log(props.rowData)


    // let listItemsAll = props.dataArray.leaderboardRows.map((leaderboardRow) => (
    //     <div key={uuidv4()} className="leaderboard-live-list" >
    //         <LeaderboardItem />
    //     </div>)
    // );

    return (
        <div className="leaderboard-item">
            <p>{props.rowData.position}</p>
            <p>{props.rowData.firstName} {props.rowData.lastName}</p>
            <p>{props.rowData.total}</p>
        </div>
    );
}

export default LeaderboardItem;