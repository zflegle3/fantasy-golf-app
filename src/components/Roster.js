import { v4 as uuidv4 } from 'uuid';
import LiveScoreItem from "./LiveScoreItem.js"
uuidv4(); 

function Roster(props) {
    //props.playersAll
    // console.log(playersAll);

    let listItemsAll =  props.playersAll.map((player) =>
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