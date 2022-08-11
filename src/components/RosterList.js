
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';




function RosterList(props) {
    //props.teamRoster


    console.log(props.teamRoster);

    let teamRosterAll = props.teamRoster.map((player) => 
        <div key={uuidv4()} className={"roster-item"}>
            <p>{player.playerId}</p>
        </div>
    );

    
    return (
        <div className="team-roster">            
            {teamRosterAll}
        </div>
    );
};

export default RosterList;