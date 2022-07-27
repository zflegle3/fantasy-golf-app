import {
    Link,
} from "react-router-dom";

function LeagueLinks(props) {
    //props.leagues

    const linksAll = props.leagues.map((leagueInfo) =>
        <Link key={leagueInfo.id} to={`/league/${leagueInfo.id}`} className="nav-link">
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