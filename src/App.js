//React
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

//Styles
import './styles/Reset.css';
import './styles/App.css';
import "./styles/Auth.css";

//images
import addIcon from "./images/icons/plus-circle-outline-wh.png";
import logoIcon from "./images/icons/golf-tee-wh.png";
import leagueIcon from "./images/icons/golf-flag-wh.png";
import profileIcon from "./images/icons/golf-cart-wh.png";
import settingsIcon from "./images/icons/cog-outline-wh.png";

//Components
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home";
import League from "./components/League";
import LeagueLinks from "./components/LeagueLinks";

//Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  getAuth,
  connectAuthEmulator,
  onAuthStateChanged,
  signOut,
 } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAI0DXYQ5rRJFxL5oIqEcPf3h5dkRiW_fw",
  authDomain: "fantasy-golf-e2dc1.firebaseapp.com",
  projectId: "fantasy-golf-e2dc1",
  storageBucket: "fantasy-golf-e2dc1.appspot.com",
  messagingSenderId: "98644773374",
  appId: "1:98644773374:web:79405b5ea7830b34ba58af",
  measurementId: "G-MRB45784YQ"
};
//Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
//Authentication
const auth = getAuth(app);
connectAuthEmulator(auth, "http://localhost:9099")





function App() {
  const [pageSelect, setPageSelect] = useState("login");
  const [userAuth, setUserAuth] = useState(false);
  const [userActive, setUserActive] = useState();
  const [leagues, setLeagues] = useState([
    {name: "League One", id: "league-1", logo: leagueIcon},
    {name: "League Two", id: "league-2", logo: leagueIcon},
    {name: "League Three", id: "league-3", logo: leagueIcon},
  ]);



  const authSwitchPage = (e) => {
    e.preventDefault();
    setPageSelect(e.target.id);
  };

  const userLogOut = async () => {
    await signOut(auth);
    setUserActive();
    console.log("Log Out");
  };

  useEffect(() => {
    onAuthStateChanged( auth, user => {
      console.log(user);
      if (user) {
        // User is signed in.
        console.log("logged in")
        setUserAuth(true);
        setUserActive(user);
      }
      else {
        console.log("logged out")
        setUserAuth(false);
      }
    });
  }, []);

  console.log(userActive);

  if (userAuth) {
    return (
      <div className="app-layout">
        <Router>
          <div className="left-panel-container">
            <div className="nav-header">
                <img src={logoIcon}></img>
                <h1 className="header-logo">Site Name</h1>
            </div>

            <div className="nav-body">

              <Link to="/" className="nav-link">
                <img src={logoIcon}></img>
                <p>Golf Home</p>
              </Link>

              <div id="new-league" className="nav-link">
                <p>New League</p>
                <img src={addIcon}></img>
              </div>

              <LeagueLinks leagues={leagues}/>
            </div>

            <div className="nav-footer"> 
              <img src={profileIcon}></img>
              <div className="profile-container">
                <p>{userActive.email}</p>
                <button onClick={userLogOut}> Log Out</button>
              </div>
              <img src={settingsIcon}></img>
            </div>
          </div>
          <div className="center-panel-container">
            <Routes>
                <Route exact path="/*" element={<Home/>}/>
                <Route exact path="/league/:id/*" element={<League name={"League One"} />}/>
            </Routes>
          </div>
        </Router>
      </div>
    );
  } else {
    switch (pageSelect) {
      case "login":
        return (
          <div className="app-landing">
            <Login auth={auth} switchPage={authSwitchPage} />
          </div>
        );
      case "signup":
        return (
          <div className="app-landing">
            <SignUp auth={auth} switchPage={authSwitchPage} />
          </div>
        );
      case "reset-pwd":
        break;
    }
  }
}

export default App;
