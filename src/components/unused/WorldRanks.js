import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
    Routes,
    Route,
    Link,
} from "react-router-dom";


function WorldRanks(props) {
    //props.worldRanksData
    console.log(props.worldRanksData);

    const playerRanks = props.worldRanksData.worldRanks.rankings.map((player) =>
        <div key={uuidv4()} className="player-rank-item">
            <p>{player.rank}</p>
            <p>{player.previousRank}</p>
            <p>{player.firstName} {player.lastName}</p>
            <p>{player.totalPoints}</p>
            <p>{player.pointsGained}</p>
            <p>{player.pointsLost}</p>
            <p>{player.events}</p>
        </div>
    );


    return (
        <div className="world-rankings-display">
            <div className="player-rank-heading">
                <p>Rank</p>
                <p>Previous Rank</p>
                <p>Player</p>
                <p>Total Points</p>
                <p>Points Gained</p>
                <p>Points Lost</p>
                <p>Events Played</p>
            </div>
            {playerRanks}
        </div>
    );
}

export default WorldRanks;