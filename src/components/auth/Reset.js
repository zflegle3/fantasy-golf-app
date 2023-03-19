import {
    Link,
    useParams
} from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from "axios";
import {checkPassDbReset, checkNewPass } from "../../features/auth/validation";
//Components
import PasswordInput from "./PasswordInput"
//Icons
import { FaRegCheckCircle, FaCheck, FaRegTimesCircle } from 'react-icons/fa';

function Reset() {
    const [passStatus, setPassStatus] = useState("");//true when user is valid
    const [submitStatus, setSubmitStatus] = useState(false);
    let { email } = useParams();
    let { id } = useParams();
    let { token } = useParams();

    async function resetPassword(e) {
        e.preventDefault();
        //validate passwords have correct format
        let passwordIn = document.getElementById("pass-in").value;
        resetErrors();
        //validate password meets criteria
        if (checkNewPass(passwordIn)) {
            //validate password is different from previous
            if (await checkPassDbReset(id, passwordIn, token)) {
                //update user data with new password in db
                let payload = {
                    id: id,
                    token: token,
                    password: passwordIn
                };
                let responseUpdate = await axios.post(process.env.REACT_APP_API_URL+"/user/resetpass", payload);
                if (responseUpdate.data.updateStatus) {
                    //submit status conditionally renders confirmation once complete
                    setSubmitStatus(true);
                } else {
                    document.querySelector(".form-item-container.pass-in").classList.add("invalid");
                    document.getElementById("pass-error").textContent = "There was an error updating the password. Please try again.";
                };
            } else {
                document.querySelector(".form-item-container.pass-in").classList.add("invalid");
                document.getElementById("pass-error").textContent = "New password must not match a previous password";
            };
        };
    };

    const resetErrors = () => {
        let passItem = document.querySelector(".form-item-container.pass-in");
        if (passItem.classList.contains("invalid")) {
            passItem.classList.remove("invalid");
            document.getElementById("pass-error").textContent = "Password Error";
        };
    };


    let sideHero = null;
    if (window.innerWidth > 950) {
        sideHero =<div className="auth-left-reset"></div>;
    } 
    
    if (!submitStatus) {
        return(
            <div className="auth-container">
                {sideHero}
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
                                    <button onClick={resetPassword}>SEND</button>
                                </div>

                                <Link to="/login" id="pass-reset">
                                    Back to Login
                                </Link>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        )
    };
    return(
        <div className="auth-container">
            {sideHero}
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
                            <Link to="/login" id="pass-reset">
                                Back to Login
                            </Link>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    ) 
};

export default Reset;