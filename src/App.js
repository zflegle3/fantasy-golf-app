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
import ControlPanel from "./components/ControlPanel";

import Home from "./components/Home";
import League from "./components/League";
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
  FirebaseAuth,
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
  return (
    <div className="app-layout">
      {/* <div className="new-league-modal-form" id="new-league-modal-form">
        <NewLeagueModal userActive={userActive} db={db} setLeagues={setLeagues} />
      </div> */}
      <Router>
        <ControlPanel userData={userData} userLogOut={userLogOut}/>



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
