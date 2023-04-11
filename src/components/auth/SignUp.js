import { useState, useEffect } from 'react';
import { Link, useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {register, reset } from "../../features/auth/authSlice";
import { FaRegCheckCircle, FaCheck, FaRegTimesCircle } from 'react-icons/fa';
import {checkNewUserName, checkNewEmail, checkNewPass } from "../../features/auth/validation";
import { addFocus, removeFocus} from '../../features/style';

//Components
import LoadingSpinner from "../home/misc/LoadingSpinner";
import PasswordInput from "./PasswordInput"
// import Logo from '../Logo';

function SignUp() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [passStatus, setPassStatus] = useState("");//true when user is valid
    const {user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);


    async function validateSignUp(e) {
        e.preventDefault();
        let userNameIn = document.getElementById("user-name-in").value;
        let emailIn = document.getElementById("email-in").value;
        let passwordIn = document.getElementById("pass-in").value;
        resetErrors();
        if (await checkNewUserName(userNameIn)) {
            //add validation for username format in checkNewUserName
            if (await checkNewEmail(emailIn)) {
                if (checkNewPass(passwordIn)) {
                    //creat new user
                    // createAccount(userNameIn, emailIn, passwordIn); 
                    const userData = {
                        username: userNameIn,
                        email: emailIn,
                        password: passwordIn,
                    };
                    //dispatches register function from authSlice to create new user
                    dispatch(register(userData)); 
                }
            }
        } 
    }

    const resetErrors = () => {
        let userNameItem = document.querySelector(".form-item-container.user-name-in");
        if (userNameItem.classList.contains("invalid")) {
            userNameItem.classList.remove("invalid");
            document.getElementById("user-name-error").textContent = "Username Error";
        }
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
        //catches & displays errors fron failed credential logins
        if(isError) {
            alert(message);
        };
        //Navigation and state reset handled in app.js
        //Alternate nav and reset reference in login.js
    }, [user, isError, isSuccess, message, navigate, dispatch])

    if (isLoading) {
        return(<LoadingSpinner/>)
    }


    let sideHero = null;
    if (window.innerWidth > 950) {
        sideHero = <div className="auth-left-signup"></div>;
    } 
    return (
        <div className="auth-container">
            {sideHero}
            <div className="auth-right">
                {/* <Logo size="large"/> */}
                <div className="auth-content">
                    <div className="auth-header">
                        <div className="auth-header-main">
                            <h1>Sign Up</h1>
                            <Link to="/login" id="signup">Login</Link>
                        </div>
                        <div className="auth-header-sub">
                            Let's get started by creating an account
                        </div>
                    </div>
                    
                    <form className="sign-up-form">

                        <div className="form-item-container user-name-in">
                            <label htmlFor="user-name">username</label>

                            <div className="input-container">
                                <input type="text" id="user-name-in" name="user-name" placeholder="Enter new username" onFocus={addFocus} onBlur={removeFocus}></input>
                            </div>

                            <p id="user-name-error" >Username Error</p>
                        </div>

                        <div className="form-item-container email-in">
                            <label htmlFor="email">email</label>

                            <div className="input-container">
                                <input type="email-in" id="email-in" name="email-in" placeholder="Enter email" onFocus={addFocus} onBlur={removeFocus}></input>
                            </div>

                            <p id="email-error" >Email Error</p>
                        </div>

                        <PasswordInput passStatus={passStatus}/>

                        <div className="pass-error-container">
                            <div id="pass-error-signin-length">
                                <div>
                                    <FaRegCheckCircle />
                                </div>
                                <p>have at least 8 characters</p>
                            </div>
                            <div id="pass-error-signin-upper">
                                <div>
                                    <FaRegCheckCircle />
                                </div>
                                <p >have at least 1 Upper characters</p>
                            </div>
                            <div id="pass-error-signin-number">
                                <div>
                                    <FaRegCheckCircle />
                                </div>
                                <p >have at least 1 number</p>
                            </div>
                            <div id="pass-error-signin-special">
                                <div>
                                    <FaRegCheckCircle />
                                </div>
                                <p >have at least 1 special character (i.e. ! @ # $ % ^ & *)</p>
                            </div>
                        </div>

                        <div className="form-submit-container">
                            <div className="form-btn-container">
                                <button onClick={validateSignUp}>CONTINUE</button>
                            </div>
                        </div>

                    </form>

                </div>
                
            </div>
        </div>
    );
}

export default SignUp;