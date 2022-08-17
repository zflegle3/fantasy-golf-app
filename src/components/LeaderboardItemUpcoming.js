
function LeaderboardItemUpcoming(props) {
    //props.rowData
    //props.currentRound
    // console.log(props.rowData)

    return (
        <div className="leaderboard-item-live">
            <p>{props.rowData.position}</p>
            <p>{props.rowData.firstName} {props.rowData.lastName}</p>
            <p>{props.rowData.teeTime}</p>
        </div>
    );
}

export default LeaderboardItemUpcoming;