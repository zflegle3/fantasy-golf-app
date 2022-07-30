import { useState, useEffect } from 'react';
import {
    Routes,
    Route,
    Link,
} from "react-router-dom";


function WorldRanks(props) {
    //props.topHundred
    console.log(props.topHundred)

    const playerRanks = props.topHundred.map((player) =>
        <div key={player.playerId} className="player-rank-item">
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