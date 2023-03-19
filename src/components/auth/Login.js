import axios from "axios";
import { useState, useEffect } from 'react';
import {
    Link,
    useNavigate
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {login, resetUser} from "../../features/auth/authSlice";
import {validateUsernameEmail } from "../../features/auth/validation";
import { addFocus, removeFocus} from '../../features/style';

//Components
import PasswordInput from "./PasswordInput";
// import Logo from "../Logo";


function Login() {
    const [passStatus, setPassStatus] = useState("hidden");//true when user is valid
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    async function userLogin(e) {
        //handles user email submission for login
        //checks if email is valid by calling checkUser() and resets errors if passed
        e.preventDefault();
        let userEmailOrNameIn = document.getElementById("email-in").value;
        if (await validateUsernameEmail(userEmailOrNameIn)) {
            resetErrors();
            if (passStatus === "hidden") 
                //used as class toggle the visability of the pass input
                setPassStatus("");
            else {
                let userPasswordIn = document.getElementById("pass-in").value;
                if (userPasswordIn.length >0) {
                    const userIn = {
                        emailOrUsername: userEmailOrNameIn,
                        password: userPasswordIn
                    };
                    dispatch(login(userIn));
                } else {
                    document.querySelector(".form-item-container.pass-in").classList.add("invalid");
                    document.getElementById("pass-error").textContent = "Cannot be empty";
                }
            }
        }
    };

    const resetErrors = () => {
    //resets user input error codes
        let emailItem = document.querySelector(".form-item-container.email-in");
        if (emailItem.classList.contains("invalid")) {
            emailItem.classList.remove("invalid");
            document.getElementById("email-error").textContent = "Email Error";
        }
        let passItem = document.querySelector(".form-item-container.pass-in");
        if (passItem.classList.contains("invalid")) {
            passItem.classList.remove("invalid");
            document.getElementById("pass-error").textContent = "Password Error";
        }
    }

    useEffect(() => {
        //catches & displays errors from failed credential logins
        if(isError) {
            document.querySelector(".form-item-container.pass-in").classList.add("invalid");
            document.getElementById("pass-error").textContent = message;
        };
        //Navigation and state reset handled in app.js
        // //Navigate to home on login
        // if(isSuccess || user) {
        //     navigate("/")
        // };
        // //resets state
        // dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch])


    let sideHero = null;
    if (window.innerWidth > 950) {
        sideHero = <div className="auth-left-login"></div>;
    } 
    return(
        <div className="auth-container">
            {sideHero}
            <div className="auth-right">
                {/* <Logo size="large"/> */}
                <div className="auth-content">
                    <div className="auth-header">
                        <div className="auth-header-main"> 
                              <h1>Login</h1>
                            <Link to="/signup" id="signup">Sign Up</Link>
                        </div>
                        <div className="auth-header-sub">
                            Sign in using email or username
                        </div>

                    </div>

                    <form className="login-form">

                        <div className="form-item-container email-in" >
                            <label htmlFor="email">email or username</label>

                            <div className="input-container">
                                <input type="email" id="email-in" name="email" placeholder="Enter email or username" onFocus={addFocus} onBlur={removeFocus}></input>
                            </div>

                            <p id="email-error" >Email Error</p>
                        </div> 

                        <PasswordInput passStatus={passStatus}/>

                        <div className="form-submit-container">
                            <div className="form-btn-container">
                                <button onClick={userLogin}>CONTINUE</button>
                            </div>

                            <Link to="/forgot" id="pass-reset">
                                Forgot password?
                            </Link>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
} 

export default Login;