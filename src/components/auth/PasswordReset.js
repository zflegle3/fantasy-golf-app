import {
    Link
} from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from "axios";
import { addFocus, removeFocus} from '../../features/style';
import { checkEmailDb, validateEmailFormat } from "../../features/auth/validation";
// import Logo from "../Logo";

function PasswordReset() {
    const [userEmail, setUserEmail] = useState("");

    async function resetPassword(e) {
        e.preventDefault();
        resetErrors();
        let resetEmail = document.getElementById("email-in").value;
        //Validate length
        if (resetEmail.length >0) { 
            //validate email format
            if (validateEmailFormat(resetEmail)) {
                //validate email in db {
                    if (await checkEmailDb(resetEmail)) {
                        //send email and await confirmation 
                        const responseSend = await axios.post(process.env.REACT_APP_API_URL+"/user/forgetpass", {email: resetEmail});
                        if (responseSend.data.sendStatus) {
                            //update userEmail state to conditionally render confirmation
                            setUserEmail(resetEmail);
                        } else {
                            document.querySelector(".form-item-container.pass-in").classList.add("invalid");
                            document.getElementById("pass-error").textContent = "There was an error sending your reset link. Please try again.";
                        }
                    } else {
                        document.querySelector(".form-item-container.email-in").classList.add("invalid");
                        document.getElementById("email-error").textContent = `Whoops, we couldn't find anyone with that email.`;
                    }
            } else {
                document.querySelector(".form-item-container.email-in").classList.add("invalid");
                document.getElementById("email-error").textContent = `Whoops, It looks like ${resetEmail} is not a valid email.`;
            }
        } else {
            document.querySelector(".form-item-container.email-in").classList.add("invalid");
            document.getElementById("email-error").textContent = "Cannot be empty";
        }

    }

    const resetErrors = () => {
    //resets user input error codes
        let emailItem = document.querySelector(".form-item-container.email-in");
        if (emailItem.classList.contains("invalid")) {
            emailItem.classList.remove("invalid");
            document.getElementById("email-error").textContent = "Email Error";
        }
    }

    let sideHero = null;
    if (window.innerWidth > 950) {
        sideHero = <div className="auth-left-forgot"></div>;
    } 

    if (userEmail) {
        return(
            <div className="auth-container">
                {sideHero}
                <div className="auth-right">
                    {/* <Logo size="large"/> */}
                    <div className="auth-content">

                        <div className="auth-header">
                            <div className="auth-header-main">
                                <h1>Forgot Password?</h1>
                            </div>
                            <div className="auth-header-sub">A reset link was sent to {userEmail}. Please follow the email instructions to reset your password.</div>
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

    }
    return(
        <div className="auth-container">
            {sideHero}
            <div className="auth-right">
                {/* <Logo size="large"/> */}
                <div className="auth-content">

                    <div className="auth-header">
                        <div className="auth-header-main">
                            <h1>Forgot Password?</h1>
                        </div>
                        <div className="auth-header-sub">
                        We will send you a password reset link to your email.
                        </div>

                    </div>

                    <form className="login-form">

                        <div className="form-item-container email-in">
                            <label htmlFor="email">email</label>

                            <div className="input-container password">
                                <input type="email" id="email-in" name="email" placeholder="Enter email" onFocus={addFocus} onBlur={removeFocus}></input>
                            </div>

                            <p id="email-error" >Email Error</p>
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
} 

export default PasswordReset;