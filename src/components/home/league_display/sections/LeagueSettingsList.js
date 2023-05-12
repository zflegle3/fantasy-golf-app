import { useSelector, useDispatch } from 'react-redux';

function LeagueSettingsList(props) {
    //props.settingsData
    // console.log(props.settingsData);
    const {league, isLoading, isError, message} = useSelector((state) => state.leagueSelected)

    const editSettings = () => {
        // console.log("Add edit settings handling");
        //conditionally render out logo if not admin
    }

    let missCutDisplay = league.settings.missCutScore;
    if (league.settings.missCutScore === "avg") {
        missCutDisplay = "Average round score,"
    } 



    return (
        <div className="league-settings-list">
            <div className="league-settings-item">
                <p>Number of Teams</p>
                <p>{league.settings.teamCount}</p>
            </div>
            {/* <div className="league-settings-item">
                <p>Scoring Format</p>
                <p>{props.settingsData.scoring.format}</p>
            </div> */}
            <div className="league-settings-item">
                <p>Roster Size</p>
                <p>{league.settings.rosterSize} Golfers</p>
            </div>
            <div className="league-settings-item">
                <p>Team Cut</p>
                <p>{league.settings.rosterCut} Golfers, top {league.settings.rosterSize-league.settings.rosterCut} scores count to team score </p>
            </div>
            <div className="league-settings-item">
                <p>Miss Cut Score</p>
                <p>{missCutDisplay}, for golfers who miss tournament cut</p>
            </div>
        </div>
    );
}

export default LeagueSettingsList;
