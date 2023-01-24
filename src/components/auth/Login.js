import axios from "axios";
import { useState, useEffect } from 'react';
import {
    Link,
    useNavigate
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {login, resetUser} from "../../features/auth/authSlice";
//Components
import PasswordInput from "./PasswordInput";
import LoadingSpinner from "../LoadingSpinner";

function Login(props) {
    const [passStatus, setPassStatus] = useState("hidden");//true when user is valid
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    async function userLogin(e) {
        //handles user email submission for login
        //checks if email is valid by calling checkUser() and resets errors if passed
        e.preventDefault();
        let userEmailOrNameIn = document.getElementById("email-in").value;
        if (await validateUser(userEmailOrNameIn)) {
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

    async function validateUser(userEmailOrNameIn) {
        //Validates username/email is populated
        //only handles emails currently
        if (userEmailOrNameIn.length > 0) {
            if ( await checkUserDb(userEmailOrNameIn)) {
                //email is valid
                return(true);
            } else {
                //invalid user credentials 
                document.querySelector(".form-item-container.email-in").classList.add("invalid");
                document.getElementById("email-error").textContent = `Sorry, we were unable to find anyone using ${userEmailOrNameIn}`;
            }
        } else {
            document.querySelector(".form-item-container.email-in").classList.add("invalid");
            document.getElementById("email-error").textContent = "Cannot be empty";
        }
    }

    async function checkUserDb (userIn) {
        const responseEmail = await axios.post("http://localhost:8080/user/read/email", {email: userIn});
        const responseUsername = await axios.post("http://localhost:8080/user/read/username", {username: userIn});
        if (responseEmail.data.email === userIn) {
            return true;
        } else if (responseUsername.data.username === userIn) {
            return true;
        } else {
            return false;
        }
    }

    const addFocus = (e) => {
        e.target.parentElement.parentElement.classList.add("focus");
    }

    const removeFocus = (e) => {
        e.target.parentElement.parentElement.classList.remove("focus");
    }

    useEffect(() => {
        if(isError) {
            //catches & displays errors fron failed credential logins
            document.querySelector(".form-item-container.pass-in").classList.add("invalid");
            document.getElementById("pass-error").textContent = message;
            console.log(message);
        };

        if(isSuccess || user) {
            navigate("/")
        };

        dispatch(resetUser());

        if (isLoading) {
            
        }

    }, [user, isError, isSuccess, message, navigate, dispatch])


    return(
        <div className="auth-container">
            <div className="auth-left-login"></div>
            <div className="auth-right">
                <div className="auth-content">

                    <div className="auth-header">
                        <div className="auth-header-main"> 
                              <h1>Login</h1>
                            <Link to="/sign-up" id="signup">Sign Up</Link>
                        </div>
                        <div className="auth-header-sub">
                            Sign in using email or username
                        </div>

                    </div>

                    <form className="login-form">

                        <div className="form-item-container email-in" >
                            <label htmlFor="email">email or username</label>

                            <div className="input-container">
                                <input type="email" id="email-in" name="email" placeholder="Enter email or usernme" onFocus={addFocus} onBlur={removeFocus}></input>
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