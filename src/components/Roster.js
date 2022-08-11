import { v4 as uuidv4 } from 'uuid';
uuidv4(); 

function Roster(props) {
    //props.players

    let listItemsAll =  props.players.map((player) =>
            <div key={uuidv4()} className="standings-roster-item">
                <p>{player.playerName}</p>
            </div>
        );


    return (
        <div className="standings-roster-list">
            {listItemsAll}
        </div>
    );
}

export default Roster;