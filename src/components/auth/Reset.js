import {
    Link,
    useParams
} from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from "axios";

import PasswordInput from "./PasswordInput"
import { ReactComponent as CheckSvg } from '../../images/icons/check.svg';

function PasswordReset(props) {
    //props.auth
    //props.db
    const [passStatus, setPassStatus] = useState("");//true when user is valid
    const [submitStatus, setSubmitStatus] = useState(false);
    let { email } = useParams();
    let { id } = useParams();
    let { token } = useParams();

    console.log(id);
    console.log(token);


    async function resetPassword(e) {
        e.preventDefault();
        //validate passwords have correct format
        let passwordIn = document.getElementById("pass-in").value;
        resetErrors();

        if (checkNewPass(passwordIn)) {
            if (await checkPassDb(id, passwordIn)) {
                //creat new user
                // createAccount(userNameIn, emailIn, passwordIn); 
                console.log(passwordIn);
                let payload = {
                    id: id,
                    token: token,
                    password: passwordIn
                }
                let responseUpdate = await axios.post("http://localhost:8080/user/resetpass", payload);
                if (responseUpdate.data.updateStatus) {
                    setSubmitStatus(true);
                } else {
                    document.querySelector(".form-item-container.pass-in").classList.add("invalid");
                    document.getElementById("pass-error").textContent = "There was an error updating the password. Please try again.";
                }
            } else {
                document.querySelector(".form-item-container.pass-in").classList.add("invalid");
                document.getElementById("pass-error").textContent = "New password must not match a previous password";
            }
        } else {
            document.querySelector(".form-item-container.pass-in").classList.add("invalid");
            document.getElementById("pass-error").textContent = "Password does not meet criteria";
        }
        //validate passwords match
        //submit to database

    }

    const checkNewPass = (passwordIn) => {
        console.log(passwordIn.length);
        let passTest = true;
        let passErrorLen = document.getElementById("pass-error-signin-length");
        let passErrorUp = document.getElementById("pass-error-signin-upper");
        let passErrorNum = document.getElementById("pass-error-signin-number");
        let passErrorSp = document.getElementById("pass-error-signin-special");

        //8 characters
        if(passwordIn.length < 8) {
            passTest = false;
            passErrorLen.classList = "";
        } else {
            passErrorLen.classList = "valid";
        }
        //uppercase
        if(!passwordIn.match(/[A-Z]/g)) {
            passTest = false;
            passErrorUp.classList = "";
        } else {
            passErrorUp.classList = "valid";
        }
        //number
        if(!passwordIn.match(/[0-9]/g)) {
            passTest = false;
            passErrorNum.classList = "";
        } else {
            passErrorNum.classList = "valid";
        }
        // special character
        if(!passwordIn.match(/[!@#\$%\^&\*]/g)) {
            passTest = false;
            passErrorSp.classList = "";
        } else {
            passErrorSp.classList = "valid";
        }
        return passTest;
    };

    async function checkPassDb (idIn, passIn) {
        const responsePass = await axios.post("http://localhost:8080/user/read/password", {id: idIn, password: passIn});
        return responsePass.data.passMatch;
    }

    

    const addFocus = (e) => {
        e.target.parentElement.parentElement.classList.add("focus");
    }

    const removeFocus = (e) => {
        e.target.parentElement.parentElement.classList.remove("focus");
    }

    const resetErrors = () => {
        let passItem = document.querySelector(".form-item-container.pass-in");
        if (passItem.classList.contains("invalid")) {
            passItem.classList.remove("invalid");
            document.getElementById("pass-error").textContent = "Password Error";
        }
    }

    if (!submitStatus) {
        return(
            <div className="auth-container">
            <div className="auth-left-forgot"></div>
            <div className="auth-right">
                <div className="auth-content">

                    <div className="auth-header">
                        <div className="auth-header-main">
                            <h1>Reset password</h1>
                        </div>
                        <div className="auth-header-sub">Please enter a new password for {email}</div>
                    </div>

                    <form className="login-form">
                        <PasswordInput passStatus={passStatus}/>

                        <div className="pass-error-container">
                            <div id="pass-error-signin-length">
                                <div>
                                    <CheckSvg />
                                </div>
                                <p>have at least 8 characters</p>
                            </div>
                            <div id="pass-error-signin-upper">
                                <div>
                                    <CheckSvg />
                                </div>
                                <p >have at least 1 Upper characters</p>
                            </div>
                            <div id="pass-error-signin-number">
                                <div>
                                    <CheckSvg />
                                </div>
                                <p >have at least 1 number</p>
                            </div>
                            <div id="pass-error-signin-special">
                                <div>
                                    <CheckSvg />
                                </div>
                                <p >have at least 1 special character (i.e. ! @ # $ % ^ & *)</p>
                            </div>
                        </div>

                        <div className="form-submit-container">
                            <div className="form-btn-container">
                                <button onClick={resetPassword}>SEND</button>
                            </div>

                            <Link to="/" id="pass-reset">
                                Back to Login
                            </Link>
                        </div>

                    </form>
                </div>
            </div>
        </div>
        )
    }
    return(
        <div className="auth-container">
        <div className="auth-left-forgot"></div>
        <div className="auth-right">
            <div className="auth-content">

                <div className="auth-header">
                    <div className="auth-header-main">
                        <h1>Reset Password</h1>
                    </div>
                    <div className="auth-header-sub">Your password has been successfully udated.</div>
                </div>

                <form className="login-form">

                    <div className="form-submit-container">
                        <Link to="/" id="pass-reset">
                            Back to Login
                        </Link>
                    </div>

                </form>
            </div>
        </div>
    </div>
    ) 
} 

export default PasswordReset;