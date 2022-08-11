
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';




function RosterList(props) {
    //props.teamRoster
    //props.worldRanksData
    //props.fedexRanksData


    console.log(props.teamRoster);
    console.log(props.worldRanksData);
    console.log(props.fedexRanksData);

    let teamRosterData = []
    for (let i=0; i<props.teamRoster.length; i++) {
        let playerSelectId = props.teamRoster[i].playerId;
        console.log(playerSelectId);
        let playerWR = props.worldRanksData.worldRanks.rankings.filter((player) => {
            return Number(player.playerId) === playerSelectId;
        });
        let playerFR = props.fedexRanksData.fedexRanks.rankings.filter((player) => {
            return Number(player.playerId) === playerSelectId;
        });
        let classText;
        if (i% 2 != 0 ) {
            classText = "roster-item odd";
        } else {
            classText = "roster-item";
        }
        console.log(playerWR);
        teamRosterData.push({
            name: `${playerWR[0].firstName} ${playerWR[0].lastName}`,
            worldRank: playerWR[0].rank,
            fedexRank: playerFR[0].rank,
            class: classText,
        });
    }

    console.log(teamRosterData)
    let teamRosterDisplay = teamRosterData.map((player) => 
        <div key={uuidv4()} className={"roster-item"}>
            <p>{player.name}</p>
            <p>{player.worldRank}</p>
            <p>{player.fedexRank}</p>
        </div>
    );


    
    return (
        <div className="team-roster">            
            {teamRosterDisplay}
        </div>
    );
};

export default RosterList;