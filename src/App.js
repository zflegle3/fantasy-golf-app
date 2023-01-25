//React
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate
} from "react-router-dom";
//Others
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

//functions
import { getLeaguesAll, resetLeagues } from './features/leagues/leagueSlice';
import { resetSelected } from './features/leagues/leagueSlice';
import { useSelector, useDispatch } from 'react-redux';

//Styles
import './styles/Reset.css';
import './styles/App.css';
// import "./styles/Auth.css";
import "./styles/auth.scss";
import "./styles/Home.css";
import "./styles/NewLeague.scss";
import './styles/Tabs.css';
import "./styles/ChatConsole.css"
import "./styles/EditSettings.css"

//images
import addIcon from "./images/icons/plus-circle-outline-wh.png";
import logoIcon from "./images/icons/golf-tee-wh.png";
import leagueIcon from "./images/icons/golf-flag-wh.png";
import profileIcon from "./images/icons/golf-cart-wh.png";
import settingsIcon from "./images/icons/cog-outline-wh.png";

//Components
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import PasswordReset from "./components/auth/PasswordReset";
import ControlPanel from "./components/home/ControlPanel";
import ContentPanel from "./components/home/ContentPanel";
import Home from "./components/Home";
import League from "./components/home/league_display/League";
import Reset from "./components/auth/Reset";
import LoadingSpinner from "./components/LoadingSpinner"

function App() {
  // const [pageSelect, setPageSelect] = useState("login");
  // const [userAuth, setUserAuth] = useState(false);
  // const [userActive, setUserActive] = useState();
  //Data passed to components 
  // const [userData, setUserData] = useState("");
  // const [userId, setUserId] = useState("");
  // const [leagues, setLeagues] = useState([]); 
  // const [scheduleDataAll, setScheduleDataAll] = useState();
  // const [leaderboardData, setLeaderboardData] = useState();
  // const [eventInfo, setLeaderboardInfo] = useState();
  // const [worldRanksData, setWorldRanksData] = useState();
  // const [fedexRanksData, setFedexRanksData] = useState();
  const dispatch = useDispatch();
  const [newLeagueOpen, setNewLeagueOpen] = useState(false);
  const {user} = useSelector((state) => state.auth);

  if (user) {
    return (
      <div className="app-layout">
        <div className="app-container">
          <Router>
            {/* <ControlPanel userData={userData} userId={userId} userLogOut={userLogOut} setNewLeagueOpen={setNewLeagueOpen}/>
            <ContentPanel userData={userData} userId={userId} db={db} refreshUserData={refreshUserData} setNewLeagueOpen={setNewLeagueOpen} newLeagueOpen={newLeagueOpen}/> */}
            <ControlPanel userData={user} setNewLeagueOpen={setNewLeagueOpen}/>
            <ContentPanel userData={user} newLeagueOpen={newLeagueOpen} setNewLeagueOpen={setNewLeagueOpen}/>
          </Router>
        </div>
        <div id="modal-portal"></div>
      </div>
    );
    } else {
      return (
        <Router>
          <Routes>
            <Route exact path="/sign-up" element={<SignUp/>}/>
            <Route exact path="/forgot" element={<PasswordReset/>}/>
            <Route exact path="/reset/:email/:id/:token" element={<Reset/>}/>
            <Route exact path="*" element={<Login />}/>
          </Routes>
        </Router>
      )
    }
  }

export default App;
