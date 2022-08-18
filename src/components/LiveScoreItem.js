import { v4 as uuidv4 } from 'uuid';


function LiveScoreItem(props) {
    //props.playerData
    console.log(props.playerData.currentHole);

    //make playerTeeTime a component and pass data and contionally render 
        //if player has started render Round/Total Score
        //if player hasn't started render Tee Time
        //render past rounds & total or just total
        //if player's current hole > 1 render score, else render tee time 


    let playerScore = "";
    if (Number(props.playerData.currentHole.$numberInt) > 1) {
        playerScore = `${props.playerData.total} thru hole ${props.playerData.currentHole.$numberInt} `;
    } else {
        playerScore = props.playerData.teeTime;
    }

    let playerRoundsArray = [];
    for (let i=0; i<4; i++) {
        console.log(props.playerData.rounds[i]);
        if (props.playerData.rounds[i]) {
            playerRoundsArray.push({
                roundNum: `R${i+1}`,
                roundScore: props.playerData.rounds[i],
            })
        } else {
            playerRoundsArray.push({
                roundNum: `R${i+1}`,
                roundScore: "--",
            })
        }
    }
    console.log(playerRoundsArray);
    let playerRoundsDisplay = playerRoundsArray.map((roundData) => 
        <div className={"player-round-item"}>
            <p>{roundData.roundNum}</p>
            <p>{roundData.roundScore}</p>
        </div>
    ); //map over player rounds and output p elements for each value in arrau





    let scoreItem ={};

    return (
        <div className={"player-score-item"}>
            {playerRoundsDisplay}
            <p>{playerScore}</p>
        </div>
    );
}

export default LiveScoreItem;