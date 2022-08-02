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
    // let newLeagueUserIns = document.querySelectorAll("#new-league-input");
    // console.log.log(newLeagueUserIns);
    //
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
      // console.log(userData);
      setLeagues(userData.leagues);
      // setLeagueData();
      // for (let i=0;i<userData.leagues.length;i++) {
      //   pullLeagueData(userData.leagues[i].id);
      // }
    } else {
      console.log("No Doc found");
      //if not valid (Signed Up), populate empty doc w/ uId
      // addNewDoc(userDocPath)
      await setDoc(doc(db, "users", `U-${userId}`), {email: `${userEmail}`,leagues: []});
    }

  }

  // async function pullLeagueData(leagueIdToPull) {
  //   console.log("Pull league data",leagueIdToPull);
  //   let leagueDoc = doc(db,`leagues/${leagueIdToPull}`);
  //   const leagueSnap  = await getDoc(leagueDoc);
  //   console.log(leagueSnap.data());
  //   let newLeagueData = leagueData;
  //   newLeagueData.push(leagueSnap.data());
  //   setLeagueData(newLeagueData);
  // }

  // const pullLeagueData = (leagueIdToPull) => {


  // }



  

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
