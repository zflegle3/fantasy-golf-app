//React
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom";
//Others
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
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
import ControlPanel from "./components/ControlPanel";
import ContentPanel from "./components/ContentPanel";
import Home from "./components/Home";
import League from "./components/League";
import Reset from "./components/auth/Reset";

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
  const [newLeagueOpen, setNewLeagueOpen] = useState(false);
  const {user} = useSelector((state) => state.auth);

  // const pullUserData = (user) => { 
  //   //pulls user data 
  //   let userId = user.uid;
  //   setUserId(userId);
  //   // let userEmail = user.email;
  //   refreshUserData(userId)

  // }

  // async function refreshUserData(userId) {
  //   console.log("updating user");
  //   let userDocPath = `users/U-${userId}`;
  //   const userDoc = doc(db, `${userDocPath}`);
  //   const userSnap  = await getDoc(userDoc);
  //   if (userSnap.exists()) { //if valid store league ids in state
  //     const userData = userSnap.data();
  //     setUserData(userData);
  //   } else {
  //     console.log("No Doc found");
  //     //USER DOC CREATED IN SIGN IN, HANDLE ERROR ONLY IF NEEDED
  //     // await setDoc(doc(db, "users", `U-${userId}`), {email: `${userEmail}`,leagues: []});
  //   }
  // }

  // const userLogOut = async () => {
  //   await signOut(auth);
  //   setUserData("");
  //   console.log("Log Out");
  // };

  // useEffect(() => {
  //   onAuthStateChanged( auth, user => {
  //   //Pulls required app data on user login
  //     if (user) { // User is signed in.
  //       console.log("User:",user.uid,"logged in");
  //       setUserAuth(true);
  //       setUserActive(user);
  //       //Pull Data
  //       pullUserData(user);
  //       // pullScheduleData();
  //       // pullWorldRankData();
  //       // pullFedexRankData();
  //     }
  //     else {
  //       console.log("logged out");
  //       setUserAuth(false);
  //     }
  //   });
  // }, []);

console.log(user);
if (user) {
  return (
    <div className="app-layout">
      <div className="app-container">
        <Router>
          {/* <ControlPanel userData={userData} userId={userId} userLogOut={userLogOut} setNewLeagueOpen={setNewLeagueOpen}/>
          <ContentPanel userData={userData} userId={userId} db={db} refreshUserData={refreshUserData} setNewLeagueOpen={setNewLeagueOpen} newLeagueOpen={newLeagueOpen}/> */}
          <ControlPanel userData={user} setNewLeagueOpen={setNewLeagueOpen}/>
          <ContentPanel userData={user}/>
        </Router>
      </div>
      <div id="modal-portal"></div>
    </div>
  );
  } else {
    return (
      <Router>
        <Routes>
          {/* <Route exact path="/" element={<Login db={db} auth={auth}/>}/>
          <Route exact path="/sign-up" element={<SignUp db={db} auth={auth}/>}/>
          <Route exact path="/forgot" element={<PasswordReset db={db} auth={auth}/>}/>
          <Route path="*" element={<Navigate to="/create-league" replace />}/> */}
          <Route exact path="/sign-up" element={<SignUp/>}/>
          <Route exact path="/forgot" element={<PasswordReset/>}/>
          <Route exact path="/reset/:email/:id/:token" element={<Reset/>}/>
          <Route exact path="*" element={<Login />}/>
          {/* <Route path="*" element={<Navigate to="/create-league" replace />}/> */}
        </Routes>
      </Router>
    )
  }
}

export default App;
