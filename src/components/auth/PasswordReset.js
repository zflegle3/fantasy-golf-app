import { sendPasswordResetEmail } from "firebase/auth";
import {
    Link
} from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from "axios";

function PasswordReset(props) {
    //props.auth
    //props.db
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
                    if (await checkUserDb(resetEmail)) {
                        //send email and await confirmation 
                        console.log("send reset email to", resetEmail);
                        //update userEmail state to conditionally render confirmation
                        setUserEmail(resetEmail);


                        // sendPasswordResetEmail(props.auth, resetEmail)
                        // .then(() => {
                        //     document.querySelector(".form-item-container.email-in").classList.add("valid");
                        //     document.getElementById("email-error").textContent = `A password reset link has been sent to ${resetEmail}. Check your spam folder before trying again.`;
                        // })
                        // .catch((error) => {
                        //     const errorCode = error.code;
                        //     const errorMessage = error.message;
                        // });
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

    const validateEmailFormat = (email) => {
        return email.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    async function checkUserDb (userIn) {
        console.log(userIn);
        const responseEmail = await axios.post("http://localhost:8080/user/read/email", {email: userIn});
        console.log(responseEmail);
        if (responseEmail.data.email === userIn) {
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

    const resetErrors = () => {
    //resets user input error codes
        let emailItem = document.querySelector(".form-item-container.email-in");
        if (emailItem.classList.contains("invalid")) {
            emailItem.classList.remove("invalid");
            document.getElementById("email-error").textContent = "Email Error";
        }
    }

    if (userEmail) {
        return(
            <div className="auth-container">
            <div className="auth-left-forgot"></div>
            <div className="auth-right">
                <div className="auth-content">

                    <div className="auth-header">
                        <div className="auth-header-main">
                            <h1>Forgot Password?</h1>
                        </div>
                        <div className="auth-header-sub">A reset link was sent to {userEmail}. Please follow the email instructions to reset your password.</div>
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
    return(
        <div className="auth-container">
            <div className="auth-left-forgot"></div>
            <div className="auth-right">
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