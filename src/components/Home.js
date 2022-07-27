import {
    Routes,
    Route,
    Link,
} from "react-router-dom";
import Test from "./Test";


function Home(props) {

    return (
        <div className="center-panel-content">
            <div className="center-panel-header">HOME</div>
            <div className="dual-content-panel">
              <div className="center-panel">
                <ul className="center-panel-tabs">
                    <Link to="/schedule" className="center-panel-tab-item">Tab1</Link>
                    <Link to="/players" className="center-panel-tab-item">Tab2</Link>
                    <Link to="/news" className="center-panel-tab-item">Tab3</Link>
                </ul>
                <div className="center-panel-display">
                    <Routes>
                        <Route exact path="" element={<Test test={"Tab 0 test, Home"}/>}/>
                        <Route exact path="schedule" element={<Test test={"Tab 1 test, Home"}/>}/>
                        <Route exact path="players" element={<Test test={"Tab 2 test, Home"}/>}/>
                        <Route exact path="news" element={<Test test={"Tab 3 test, Home"}/>}/>
                    </Routes>
                </div>
              </div>
              <div className="right-panel"></div>
            </div>
        </div>
    );
}

export default Home;