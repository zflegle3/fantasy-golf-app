import List from "./List"


function LeagueSettingsList(props) {
    //props.settingsData
    console.log(props.settingsData);

    const editSettings = () => {
        console.log("Add edit settings handling");
        //conditionally render out logo if not admin
    }



    return (
        <div className="league-settings-list">
            <div className="league-settings-item">
                <p>Number of Teams</p>
                <p>{props.settingsData.teamCount}</p>
            </div>
            <div className="league-settings-item">
                <p>Scoring Format</p>
                <p>{props.settingsData.scoring.format}</p>
            </div>
            <div className="league-settings-item">
                <p>Roster Size</p>
                <p>{props.settingsData.scoring.rosterSize} Golfers</p>
            </div>
            <div className="league-settings-item">
                <p>Team Cut</p>
                <p>{props.settingsData.scoring.rosterCut} Golfers, top {props.settingsData.scoring.rosterSize-props.settingsData.scoring.rosterCut} scores count to team score </p>
            </div>
            <div className="league-settings-item">
                <p>Miss Cut Score</p>
                <p>{props.settingsData.scoring.missCutScore}, for golfers who miss tournament cut</p>
            </div>
        </div>
    );
}

export default LeagueSettingsList;
