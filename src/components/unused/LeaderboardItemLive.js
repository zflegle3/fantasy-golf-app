
function LeaderboardItemLive(props) {
    //props.rowData
    //props.currentRound
    // console.log(props.rowData)

    let roundData = []
    let roundScore;
    for (let i=0; i<4; i++) {
        if (props.rowData.rounds[i]) {
            roundScore = props.rowData.rounds[i].strokes.$numberInt;
        } 
        // else if (!props.rowData.rounds[i] && i<(props.rowData.rounds.length+1) && props.rowData.teeTime) {
        //     roundScore = props.rowData.teeTime;
        // } 
        else if (!props.rowData.rounds[i] && i === (props.currentRound-1) && props.rowData.teeTime) {
            roundScore = props.rowData.teeTime;
        } 
        else {
            roundScore = "--";
        }
        roundData[i] = roundScore;
    }

    let currentHole = "F";
    if (!props.rowData.roundComplete) {
        currentHole = props.rowData.currentHole.$numberInt;
    }



    return (
        <div className="leaderboard-item-live">
            <p>{props.rowData.position}</p>
            <p>{props.rowData.firstName} {props.rowData.lastName}</p>
            <p>{props.rowData.total}</p>
            <p>{currentHole}</p>
            <p>{props.rowData.rounds[props.rowData.rounds.length-1].scoreToPar}</p>
            <p>{roundData[0]}</p>
            <p>{roundData[1]}</p>
            <p>{roundData[2]}</p>
            <p>{roundData[3]}</p>
            
        </div>
    );
}

export default LeaderboardItemLive;