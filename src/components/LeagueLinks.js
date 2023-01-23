import {
    Link,
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

function LeagueLinks(props) {
    //props.leagues
    // props.selectTabDisplay
    console.log(props.leagues);
    
    const {leaguesAll, isLoading, isError, message} = useSelector((state) => state.leagues)

    const linksAll = leaguesAll.map((leagueInfo) =>
        <Link key={leagueInfo.id} to={`/league/${leagueInfo.id}`} className="nav-link" id="nav-tab" onClick={props.selectTabDisplay}>
            <img src={leagueInfo.logo}></img>
            <p>{leagueInfo.name}</p>
        </Link>
    );

    return (
        <div className="league-links">
            {linksAll}
        </div>
    );
}

export default LeagueLinks;