import { v4 as uuidv4 } from 'uuid';
import LiveScoreItem from "./LiveScoreItem.js"
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

    //make playerTeeTime a component and pass data and contionally render 
        //if player has started render Round/Total Score
        //if player hasn't started render Tee Time
        //render past rounds & total or just total
        //if player's current hole > 1 render score, else render tee time 

    let listItemsAll =  playerScores.map((player) =>
            <div key={uuidv4()} className="standings-roster-item">
                <p>{player.firstName} {player.lastName}</p>
                <LiveScoreItem playerData={player}/>
            </div>
        );


    return (
        <div className="standings-roster-list">
            {listItemsAll}
        </div>
    );
}

export default Roster;