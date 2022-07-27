import {
    Routes,
    Route,
    Link,
} from "react-router-dom";
import { useHistory, useParams } from 'react-router-dom'
import Test from "./Test";


function League(props) {
    //props.leagueId

    const { id } = useParams()
    //use id to pull data about league from firebase and populate
    console.log(id)

    return (
        <div className="center-panel-content">
            <div className="center-panel-header">{id}</div>
            <div className="dual-content-panel">
              <div className="center-panel">
                <ul className="center-panel-tabs">
                    <Link to={`/league/${id}/tab-1`} className="center-panel-tab-item">Tab1</Link>
                    <Link to={`/league/${id}/tab-2`} className="center-panel-tab-item">Tab2</Link>
                    <Link to={`/league/${id}/tab-3`} className="center-panel-tab-item">Tab3</Link>
                </ul>
                <div className="center-panel-display">
                    <Routes>
                        <Route exact path="" element={<Test test={"Tab 0 test, League"}/>}/>
                        <Route exact path="tab-1" element={<Test test={"Tab 1 test, League"}/>}/>
                        <Route exact path="tab-2" element={<Test test={"Tab 2 test, League"}/>}/>
                        <Route exact path="tab-3" element={<Test test={"Tab 3 test, League"}/>}/>
                    </Routes>
                </div>
              </div>
              <div className="right-panel"></div>
            </div>
        </div>
    );
}

export default League;