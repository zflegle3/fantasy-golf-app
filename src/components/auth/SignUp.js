// import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect } from 'react';
import PasswordInput from "./PasswordInput"
// import { 
//     doc, 
//     getDocs,
//     setDoc,
//     collection,
//     query,
//     where,
//     limit,
// } from "firebase/firestore";
import { Link, useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {register, reset } from "../../features/auth/authSlice";

import { ReactComponent as CheckSvg } from '../../images/icons/check.svg';

import LoadingSpinner from "../LoadingSpinner";

function SignUp(props) {
    //props.db
    //props.auth
    const [passStatus, setPassStatus] = useState("");//true when user is valid
    // const [newUserValid, setNewUserValid] = useState("");
    // const [newEmailValid, setNewEmailValid] = useState("");
    // const [newPassValid, setNewPassValid] = useState("");

     
    const navigate = useNavigate();
    const dispatch = useDispatch();
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

                } else {
                    document.querySelector(".form-item-container.pass-in").classList.add("invalid");
                    document.getElementById("pass-error").textContent = "Password does not meet criteria";
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

    //USERNAME VALIDATION
    async function checkNewUserName(userNameIn) {
        //LENGTH
        if (userNameIn.length > 2 && userNameIn.length < 16) {
            //FORMAT (Numbers and letters only 0-XX characters)
            if (validateUserNameFormat(userNameIn)) { 
                return true;
                // const userByNameQuery = query(
                //     collection(props.db,"users"),
                //     where("userName", "==", userNameIn),
                //     limit(1),
                // );
                // const userByNameSnap = await getDocs(userByNameQuery);
                // let userByNameDocs = []
                // userByNameSnap.forEach((doc) => {
                //     userByNameDocs.push(doc.data());
                // });
                //AVAILABILITY IN DATABASE
                // if (userByNameDocs.length > 0) {
                //     document.querySelector(".form-item-container.user-name-in").classList.add("invalid");
                //     document.getElementById("user-name-error").textContent = `Whoops! ${userNameIn} is already taken`;
                //     return false;
                // } else {
                //     document.getElementById("user-name-error").className = "";
                //     document.getElementById("user-name-error").textContent = "";
                //     return true;
                // };
            } else {
                document.querySelector(".form-item-container.user-name-in").classList.add("invalid");
                document.getElementById("user-name-error").textContent = `Only letter and numbers, between 3 to 15 characters`;
            }
        } else {
            if (userNameIn.length < 1) {
                document.querySelector(".form-item-container.user-name-in").classList.add("invalid");
                document.getElementById("user-name-error").textContent = "Cannot be empty";
            } else {
                document.querySelector(".form-item-container.user-name-in").classList.add("invalid");
                document.getElementById("user-name-error").textContent = `Only letter and numbers, between 3 to 15 characters`;
            }
        };
    }


    //EMAIL VALIDATION
    async function checkNewEmail(emailIn) {
        //LENGTH
        if (emailIn.length > 0) {
            //FORMAT
            if (validateEmailFormat(emailIn)) {
                return true;
                // const userByEmailQuery = query(
                //     collection(props.db,"users"),
                //     where("email", "==", emailIn),
                //     limit(1),
                // );
                // const userByEmailSnap = await getDocs(userByEmailQuery);
                // let userByEmailDocs = []
                // userByEmailSnap.forEach((doc) => {
                //     userByEmailDocs.push(doc.data());
                // });
                //AVAILABILITY IN DATABASE
                // if (userByEmailDocs.length > 0) {
                //     document.querySelector(".form-item-container.email-in").classList.add("invalid");
                //     document.getElementById("email-error").textContent = `Whoops! ${emailIn} is already taken `;
                //     return false;
                // } else {
                //     // document.getElementById("email-error").className = "";
                //     // document.getElementById("email-error").textContent = "";
                //     return true;
                // };
            } else {
                document.querySelector(".form-item-container.email-in").classList.add("invalid");
                document.getElementById("email-error").textContent = "Oops, that looks like an invalid email";
            }
        } else {
            document.querySelector(".form-item-container.email-in").classList.add("invalid");
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


    // const createAccount = async (userNameIn, userEmail, userPassword) => {
    //     createUserWithEmailAndPassword(props.auth, userEmail, userPassword)
    //         .then((userCredential) => {
    //             //write user doc to db, user data to be pulled in App component
    //             setDoc(doc(props.db, "users", `U-${userCredential.user.uid}`), {userName: userNameIn, email: `${userCredential.user.email}`,leagues: []});
    //         })
    //         .catch(error => console.log("ERROR!", error))
    // }
    //****refactored validate signup to include user creation ****

    const addFocus = (e) => {
        e.target.parentElement.parentElement.classList.add("focus");
    }

    const removeFocus = (e) => {
        e.target.parentElement.parentElement.classList.remove("focus");
    }


    useEffect(() => {
        if(isError) {
            toast.error(message);
        };

        if(isSuccess || user) {
            navigate("/")
        };

        dispatch(reset());

        if (isLoading) {
            
        }

    }, [user, isError, isSuccess, message, navigate, dispatch])


    if (isLoading) {
        return(<LoadingSpinner/>)
    }

    
    return (
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
