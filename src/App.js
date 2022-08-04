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
import "./styles/Home.css";
import "./styles/NewLeague.css";
import './styles/Tabs.css';
import "./styles/ChatConsole.css"

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
import NewLeagueModal from "./components/NewLeague"

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
const testDoc = doc(db, "users/user-id-01");
const testCollection = collection(db, "users");







function App() {
  const [pageSelect, setPageSelect] = useState("login");
  const [userAuth, setUserAuth] = useState(false);
  const [userActive, setUserActive] = useState();
  const [leagues, setLeagues] = useState([]);
  // const [leagueData, setLeagueData] = useState([]);


  const authSwitchPage = (e) => {
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
    console.log("New League");
    let newLeagueModal = document.getElementById("new-league-modal-form");
    newLeagueModal.classList = "visable";
  }



  useEffect(() => {
    onAuthStateChanged( auth, user => {
      console.log(user);
      if (user) { // User is signed in.
        console.log("logged in")
        console.log(user.uid);
        setUserAuth(true);
        setUserActive(user);
        pullUserData(user);
        pullScheduleData();
      }
      else {
        console.log("logged out");
        setUserAuth(false);
      }
    });
  }, []);


  async function pullUserData(user) { 
    let userId = user.uid;
    let userEmail = user.email;
    let userDocPath = `users/U-${userId}`;
    const userDoc = doc(db, `${userDocPath}`);
    const userSnap  = await getDoc(userDoc);
    if (userSnap.exists()) { //if valid store league ids in state
      const userData = userSnap.data();
      setLeagues(userData.leagues);
    } else {//if not valid (Signed Up), populate empty doc w/ uId
      console.log("No Doc found");
      await setDoc(doc(db, "users", `U-${userId}`), {email: `${userEmail}`,leagues: []});
    }

  }

  async function pullScheduleData() { 
    //updates schedule data monthly when loaded (reduce frequency?)
    
    //pull timestamp from 2022 schedule doc
    const scheduleDoc = doc(db, "schedules/test-schedule");
    const scheduleSnap = await getDoc(scheduleDoc);
    if (scheduleSnap.exists()) {
      const scheduleData = scheduleSnap.data();
      const myTimestamp = Timestamp.fromDate(new Date()); //current timestamp
      let daysSinceUpdate = (myTimestamp - scheduleData.lastUpdate)/86400;
      if (daysSinceUpdate > 30) { //if last update more than 30days prior pull new data and populate
        console.log("Updating schedule data.")
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': '8a8c03b674msh32cd92a7c6fbf58p140730jsn7fb9bc80d982',
            'X-RapidAPI-Host': 'live-golf-data.p.rapidapi.com',
        }};
        const response = await fetch('https://live-golf-data.p.rapidapi.com/schedule?year=2022', options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const newData = await response.json();
        setDoc(scheduleDoc, {
          lastUpdate: Timestamp.fromDate(new Date()),
          schedule: newData.schedule,
        });
      } else {
        console.log("Schedule Data up to date");
      }
    } else {
      console.log("Schedule Updaing Error, no schedule doc found.");
    }
  }



  

  console.log(userActive);
  // console.log(leagueData);
  if (userAuth) {
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

              <Link to="/" className="nav-link tab-selected" id="nav-tab" onClick={selectTabDisplay}>
                <img src={logoIcon}></img>
                <p>Golf Home</p>
              </Link>

              <div className="nav-link " id="new-league" onClick={createNewLeague}>
                <p>New League</p>
                <img src={addIcon}></img>
              </div>

              <LeagueLinks leagues={leagues} selectTabDisplay={selectTabDisplay}/>
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
                <Route exact path="/league/:id/*" element={<League db={db}  leagues={leagues} />}/>
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
