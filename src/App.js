import './App.css';
//Components
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home";

// FIREBASE
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  getAuth,
  connectAuthEmulator,
  onAuthStateChanged,
 } from "firebase/auth";
import { useState, useEffect } from 'react';
const firebaseConfig = {
  apiKey: "AIzaSyAI0DXYQ5rRJFxL5oIqEcPf3h5dkRiW_fw",
  authDomain: "fantasy-golf-e2dc1.firebaseapp.com",
  projectId: "fantasy-golf-e2dc1",
  storageBucket: "fantasy-golf-e2dc1.appspot.com",
  messagingSenderId: "98644773374",
  appId: "1:98644773374:web:79405b5ea7830b34ba58af",
  measurementId: "G-MRB45784YQ"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//Authentication
const auth = getAuth(app);
connectAuthEmulator(auth, "http://localhost:9099")









function App() {
  const [pageSelect, setPageSelect] = useState("login");
  const [userAuth, setUserAuth] = useState(false);



  const switchPage = (e) => {
    e.preventDefault();
    console.log("switching page", e.target.id);
    setPageSelect(e.target.id);
  }

  useEffect(() => {
    onAuthStateChanged( auth, user => {
      console.log(user);
      if (user) {
        // User is signed in.
        console.log("logged in")
        setUserAuth(true);
      }
      else {
        console.log("logged out")
        setUserAuth(false);
      }
    });
  }, []);


  // const checkAuthState = async () => {
  //   onAuthStateChanged(auth, user => {

  //     if (user) {
  //       console.log("logged in")
  //     } else {
  //       console.log("not logged in");
  //     }

  //   });

  // }



  if (userAuth) {
    return (
      <div className="App">
        <Home auth={auth} />
      </div>
    );
  } else {
    switch (pageSelect) {
      case "login":
        return (
          <div className="App">
            <Login auth={auth} switchPage={switchPage} />
          </div>
        );
      case "signup":
        return (
          <div className="App">
            <SignUp auth={auth} switchPage={switchPage} />
          </div>
        );
      case "reset-pwd":
        break;
    }
  }
}

export default App;
