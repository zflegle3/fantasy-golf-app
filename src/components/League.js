


function League(props) {

    return (
        <div className="home-page">
            <div className="center-panel-header">{props.name}</div>
            <div className="dual-content-panel">
              <div className="center-panel"></div>
              <div className="right-panel"></div>
            </div>
        </div>
    );
}

export default League;