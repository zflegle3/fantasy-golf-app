import { v4 as uuidv4 } from 'uuid';
uuidv4(); 

function Roster(props) {
    //props.players
    //props.leaderboardData

    console.log(props.leaderboardData.leaderboardRows);
    console.log(props.players);

    let playerScores = []
    for (let i=0; i <props.players.length; i++) {
        let selectedScore = props.leaderboardData.leaderboardRows.filter(playerLeaderboard =>{
            return Number(playerLeaderboard.playerId) === props.players[i].playerId;
        });
        // console.log(selectedScore);
        playerScores.push(selectedScore[0]);
    }

    console.log(playerScores);

    //if player has started render Round/Total Score
    //if player hasn't started render Tee Time

    let listItemsAll =  playerScores.map((player) =>
            <div key={uuidv4()} className="standings-roster-item">
                <p>{player.firstName} {player.lastName}</p>
                <p>{player.teeTime} </p>
            </div>
        );


    return (
        <div className="standings-roster-list">
            {listItemsAll}
        </div>
    );
}

export default Roster;