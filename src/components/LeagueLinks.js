import {
    Link,
} from "react-router-dom";

function LeagueLinks(props) {
    //props.leagues
    // props.selectTabDisplay

    const linksAll = props.leagues.map((leagueInfo) =>
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