
import { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { 
    getFirestore, 
    doc, 
    getDoc,
    getDocs,
    addDoc,
    setDoc,
    collection,
    Timestamp,
    query,
    where,
    limit,
    QuerySnapshot,
} from "firebase/firestore";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import { 
    signInWithEmailAndPassword,
} from "firebase/auth";

import PasswordInput from "./PasswordInput"


function PasswordReset(props) {


    const resetPassword = (e) => {
        e.preventDefault();
        console.log("reset password");
    }



    return(
        <div className="app-landing">
            <div className="auth-container">
                <div className="auth-left-forgot"></div>
                <div className="auth-right">
                    <div className="auth-content">

                        <div className="auth-header">
                            <div className="auth-header-main">
                                <h1>Forgot Password?</h1>
                                {/* <p id="signup" onClick={props.switchPage}>Sign Up</p> */}
                            </div>
                            <div className="auth-header-sub">
                                We will send a reset password code to your email 
                            </div>

                        </div>

                        <form className="login-form">

                            <div className="form-item-container">
                                <label htmlFor="email">email</label>

                                <div className="input-container">
                                    <input type="email" id="email-in" name="email" placeholder="Enter email" ></input>
                                </div>

                                <p id="user-error-login" ></p>
                            </div> 

                            <div className="form-submit-container">
                                <div className="form-btn-container">
                                    <button onClick={resetPassword}>Send</button>
                                </div>

                                <Link to="/" id="pass-reset">
                                    Back
                                </Link>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
} 

export default PasswordReset;