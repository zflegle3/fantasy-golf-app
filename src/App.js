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
// import "./styles/Auth.css";
import "./styles/auth.scss";
import "./styles/Home.css";
import "./styles/NewLeague.css";
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
import Home from "./components/Home";
import League from "./components/League";
import LeagueLinks from "./components/LeagueLinks";
import NewLeagueModal from "./components/NewLeague";


//Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  getFirestore, 
  doc, 
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  collection,
  Timestamp,
} from "firebase/firestore";
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
// connectAuthEmulator(auth, "http://localhost:9099");
//firebase emulators:start --only auth

//Firestore Storage
const db = getFirestore(app);
// const testDoc = doc(db, "users/user-id-01");
// const testCollection = collection(db, "users");



function App() {
  const [pageSelect, setPageSelect] = useState("login");
  const [userAuth, setUserAuth] = useState(false);
  const [userActive, setUserActive] = useState();
  //Data passed to components 
  const [userData, setUserData] = useState("");
  const [leagues, setLeagues] = useState([]); 
  const [scheduleDataAll, setScheduleDataAll] = useState();
  const [leaderboardData, setLeaderboardData] = useState();
  const [eventInfo, setLeaderboardInfo] = useState();
  const [worldRanksData, setWorldRanksData] = useState();
  const [fedexRanksData, setFedexRanksData] = useState();

  async function pullUserData(user) { 
    //pulls user data 
    let userId = user.uid;
    let userEmail = user.email;
    let userDocPath = `users/U-${userId}`;
    const userDoc = doc(db, `${userDocPath}`);
    const userSnap  = await getDoc(userDoc);
    if (userSnap.exists()) { //if valid store league ids in state
      const userData = userSnap.data();
      setUserData(userData);
    } else {
      console.log("No Doc found");
      //USER DOC CREATED IN SIGN IN, HANDLE ERROR ONLY IF NEEDED
      // await setDoc(doc(db, "users", `U-${userId}`), {email: `${userEmail}`,leagues: []});
    }
  }

  const authSwitchPage = (e) => {
    console.log("switch from login");
    e.preventDefault();
    setPageSelect(e.target.id);
  };

  const userLogOut = async () => {
    await signOut(auth);
    setUserActive();
    console.log("Log Out");
  };

  const selectTabDisplay = (e) => {
    let allTabs = document.querySelectorAll("[id=nav-tab]");
    for (let i=0; i< allTabs.length; i++) {
      allTabs[i].classList =  "nav-link";
    };
    let selected = e.target;
    if (!selected.id) {
      selected = e.target.parentElement;
    }
    selected.classList = "nav-link tab-selected";
  }

  const createNewLeague = (e) => {
    // console.log("New League");
    let newLeagueModal = document.getElementById("new-league-modal-form");
    newLeagueModal.classList = "visable";
  }



  useEffect(() => {
    onAuthStateChanged( auth, user => {
    //Pulls required app data on user login
      if (user) { // User is signed in.
        console.log("User:",user.uid,"logged in");
        setUserAuth(true);
        setUserActive(user);
        //Pull Data
        pullUserData(user);
        // pullScheduleData();
        // pullWorldRankData();
        // pullFedexRankData();
      }
      else {
        console.log("logged out");
        setUserAuth(false);
      }
    });
  }, []);


  console.log(userData);
  if (userData) {
    // if (leagues && scheduleDataAll && leaderboardData && eventInfo && worldRanksData && fedexRanksData) {
    if (userData.leagues) {
    //added conditional to check data is loaded before rendering App components to solve props bug
      return (
        <div className="app-layout">
          <div className="new-league-modal-form" id="new-league-modal-form">
            <NewLeagueModal userActive={userActive} db={db} setLeagues={setLeagues} />
          </div>
          <Router>
            <div className="left-panel-container">
              <div className="nav-header">
                  <img src={logoIcon}></img>
                  <h1 className="header-logo">Site Name</h1>
              </div>
  
              <div className="nav-body">
  
                {/* <Link to="/" className="nav-link tab-selected" id="nav-tab" onClick={selectTabDisplay}>
                  <img src={logoIcon}></img>
                  <p>Golf Home</p>
                </Link> */}
  
                <div className="nav-link " id="new-league" onClick={createNewLeague}>
                  <p>New League</p>
                  <img src={addIcon}></img>
                </div>
  
                <LeagueLinks leagues={userData.leagues} selectTabDisplay={selectTabDisplay}/>
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
                  {/* <Route exact path="/*" element={<Home scheduleDataAll={scheduleDataAll} leaderboardData={leaderboardData} eventInfo={eventInfo} worldRanksData={worldRanksData} fedexRanksData={fedexRanksData} />}/> */}
                  {/* <Route exact path="/league/:id/*" element={<League db={db}  leagues={leagues} userInfo={userActive} leaderboardData={leaderboardData} eventInfo={eventInfo} worldRanksData={worldRanksData} fedexRanksData={fedexRanksData} />}/> */}
              </Routes>
            </div>
          </Router>
        </div>
      );
    } else {
      return(
        <div>Loading</div>
      )
    }
    
  } else {
    return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Login db={db} auth={auth}/>}/>
          <Route exact path="/sign-up" element={<SignUp db={db} auth={auth}/>}/>
          <Route exact path="/forgot" element={<PasswordReset db={db} auth={auth}/>}/>
        </Routes>
      </Router>
    )
  }
}

export default App;
