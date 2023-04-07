//React
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  HashRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate
} from "react-router-dom";

//functions
import { useSelector, useDispatch } from 'react-redux';

//Styles
import './styles/Reset.css';
import './styles/app.scss';
// import "./styles/Auth.css";
import "./styles/auth.scss";
// import "./styles/Home.css";
import "./styles/NewLeague.scss";
// import './styles/Tabs.css';
// import "./styles/ChatConsole.css"
// import "./styles/EditSettings.css"

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
import Reset from "./components/auth/Reset";
import Layout from "./components/home/Layout"
import PageRouter from './components/home/PageRouter';
import { Box, Typography} from '@mui/material';

function App() {
  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth);


  if (window.innerWidth < 800){ 
    return (
      <div className="app-layout">
        <div className="app-container">
          <Box sx={{width: "100%", height: "100%", backgroundColor: "#181c28", display: "flex", justifyContent: "center", alignItems: "center", padding: "3rem"}}>
            <Typography variant='body1' sx={{color: "#ffffff"}}>Whoops! We don't work for mobile devices yet! Please switch to a laptop or computer.</Typography>

          </Box>
        </div>
        <div id="modal-portal"></div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="app-layout">
        <div className="app-container">
          <HashRouter>
            <Layout />
            <PageRouter />
          </HashRouter>
        </div>
        <div id="modal-portal"></div>
      </div>
    );
    } else {
      return (
        <HashRouter>
          <Routes>
            <Route exact path="/login" element={<Login />}/>
            <Route exact path="/signup" element={<SignUp/>}/>
            <Route exact path="/forgot" element={<PasswordReset/>}/>
            <Route exact path="/reset/:email/:id/:token" element={<Reset/>}/>
            <Route path="*" element={<Navigate to="/login" replace={true} />}/>
          </Routes>
        </HashRouter>
      )
    }
  }

export default App;
