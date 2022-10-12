import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect } from 'react';
import PasswordInput from "./PasswordInput"
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

function SignUp(props) {
    //props.db
    const [passStatus, setPassStatus] = useState(false);//true when user is valid
    const [newUserValid, setNewUserValid] = useState("");
    const [newEmailValid, setNewEmailValid] = useState("");
    const [newPassValid, setNewPassValid] = useState("");

    async function validateSignUp(e) {
        e.preventDefault();
        let userNameIn = document.getElementById("user-name").value;
        let emailIn = document.getElementById("email").value;
        let passwordIn = document.getElementById("pwd-in").value;

        if (await checkNewUserName(userNameIn)) {
            //add validation for username format in checkNewUserName
            console.log("check email next");
            if (await checkNewEmail(emailIn)) {
                console.log("check password next");
                if (checkNewPass(passwordIn)) {
                    //creat new user
                    console.log("Create User");
                    createAccount(userNameIn, emailIn, passwordIn);
                }
            }
        } 
    }

    //USERNAME VALIDATION
    async function checkNewUserName(userNameIn) {
        console.log(userNameIn);
        console.log(userNameIn.length);
        //LENGTH
        if (userNameIn.length > 2 && userNameIn.length < 16) {
            //FORMAT
            if (validateUserNameFormat(userNameIn)) { 
                //validate username format (Numbers and letters only 0-XX characters)
                //check if userName is in firebase already 
                const userByNameQuery = query(
                    collection(props.db,"users"),
                    where("userName", "==", userNameIn),
                    limit(1),
                );
                const userByNameSnap = await getDocs(userByNameQuery);
                let userByNameDocs = []
                userByNameSnap.forEach((doc) => {
                    userByNameDocs.push(doc.data());
                });
                //AVAILABILITY IN DATABASE
                if (userByNameDocs.length > 0) {
                    console.log("invalid username")
                    document.getElementById("user-name-error").className = "invalid";
                    document.getElementById("user-name-error").textContent = `Whoops! ${userNameIn} is already taken `;
                    return false;
                } else {
                    console.log("valid username");
                    document.getElementById("user-name-error").className = "";
                    document.getElementById("user-name-error").textContent = "";
                    return true;
                };
            } else {
                document.getElementById("user-name-error").className = "invalid";
                document.getElementById("user-name-error").textContent = `Only letter ans numbers, between 3 to 15 characters`;
            }
        } else {
            console.log("username length error");
            //handle Error 
            if (userNameIn.length < 1) {
                document.getElementById("user-name-error").className = "invalid";
                document.getElementById("user-name-error").textContent = "Cannot be empty";
            } else {
                document.getElementById("user-name-error").className = "invalid";
                document.getElementById("user-name-error").textContent = `Only letter ans numbers, between 3 to 15 characters`;
            }
        };
    }


    //EMAIL VALIDATION
    async function checkNewEmail(emailIn) {
        //LENGTH
        if (emailIn.length > 0) {
            //FORMAT
            if (validateEmailFormat(emailIn)) {
                const userByEmailQuery = query(
                    collection(props.db,"users"),
                    where("email", "==", emailIn),
                    limit(1),
                );
                const userByEmailSnap = await getDocs(userByEmailQuery);
                let userByEmailDocs = []
                userByEmailSnap.forEach((doc) => {
                    userByEmailDocs.push(doc.data());
                });
                //AVAILABILITY IN DATABASE
                if (userByEmailDocs.length > 0) {
                    console.log("invalid email")
                    document.getElementById("email-error").className = "invalid";
                    document.getElementById("email-error").textContent = `Whoops! ${emailIn} is already taken `;
                    return false;
                } else {
                    console.log("valid username");
                    document.getElementById("email-error").className = "";
                    document.getElementById("email-error").textContent = "";
                    return true;
                };
            } else {
                console.log("invalid email");
                document.getElementById("email-error").className = "invalid";
                document.getElementById("email-error").textContent = "Oops, that looks like an invalid email";
            }
        } else {
            document.getElementById("email-error").className = "invalid";
            document.getElementById("email-error").textContent = "Cannot be empty";
        };
    }


    const validateEmailFormat = (email) => {
        return email.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const validateUserNameFormat = (userName) => {
        return userName.match(/^[a-zA-Z0-9]+$/);
    };

    const checkNewPass = (passwordIn) => {
        console.log(passwordIn);
        let passTest = true;
        let passErrorLen = document.getElementById("pass-error-signin-length");
        let passErrorUp = document.getElementById("pass-error-signin-upper");
        let passErrorNum = document.getElementById("pass-error-signin-number");
        let passErrorSp = document.getElementById("pass-error-signin-special");

        //8 characters
        if(passwordIn.length < 8) {
            passTest = false;
            passErrorLen.classList = "invalid";
        } else {
            passErrorLen.classList = "";
        }
        //uppercase
        if(!passwordIn.match(/[A-Z]/g)) {
            passTest = false;
            passErrorUp.classList = "invalid";
        } else {
            passErrorUp.classList = "";
        }
        //number
        if(!passwordIn.match(/[0-9]/g)) {
            passTest = false;
            passErrorNum.classList = "invalid";
        } else {
            passErrorNum.classList = "";
        }
        // special character
        if(!passwordIn.match(/[!@#\$%\^&\*]/g)) {
            passTest = false;
            passErrorSp.classList = "invalid";
        } else {
            passErrorSp.classList = "";
        }
        return passTest;
    };


    const createAccount = async (userNameIn, userEmail, userPassword) => {
        createUserWithEmailAndPassword(props.auth, userEmail, userPassword)
            .then((userCredential) => {
                console.log("user created",userCredential.user.uid);
                //write user doc to db 
                //set user data to app state
                setDoc(doc(props.db, "users", `U-${userCredential.user.uid}`), {userName: userNameIn, email: `${userCredential.user.email}`,leagues: []});
            })
            .catch(error => console.log("ERROR!", error))
    }

    
    return (
        <div className="app-landing">
            <div className="auth-container">
                <div className="auth-left-signup"></div>
                <div className="auth-right">
                    <div className="auth-content">
                        <div className="auth-header">
                            <div className="auth-header-main">
                                <h1>Sign Up</h1>
                                <Link to="/" id="signup">Login</Link>
                            </div>
                            <div className="auth-header-sub">
                                Let's get started by creating an account
                            </div>
                        </div>
                        
                        <form className="sign-up-form">

                            <div className="form-item-container">
                                <label htmlFor="user-name">username</label>

                                <div className="input-container">
                                    <input type="text" id="user-name" name="user-name" placeholder="Enter new username" ></input>
                                </div>

                                <p id="user-name-error" >Username Error</p>
                            </div>

                            <div className="form-item-container">
                                <label htmlFor="email">email</label>

                                <div className="input-container">
                                    <input type="email" id="email" name="email" placeholder="Enter email" ></input>
                                </div>

                                <p id="email-error" >Username Error</p>
                            </div>

                            <PasswordInput />
                            <div className="form-item-container">
                                <p id="pass-error-signin-length">have at least 8 characters</p>
                                <p id="pass-error-signin-upper">have at least 1 Upper characters</p>
                                <p id="pass-error-signin-number">have at least 1 number</p>
                                <p id="pass-error-signin-special">have at least 1 special character (i.e. ! @ # $ % ^ & *)</p>
                            </div>

                            <div className="form-submit-container">
                                <div className="form-btn-container">
                                    <button onClick={validateSignUp}>Continue</button>
                                </div>
                            </div>



                        </form>

                    </div>
                    

                </div>
            </div>
        </div>
    );
}

export default SignUp;
