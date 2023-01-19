
import { useState, useEffect } from 'react';
import { 
    getDocs,
    collection,
    query,
    where,
    limit,
} from "firebase/firestore";
import {
    // BrowserRouter as Router,
    Link,
    useNavigate
} from "react-router-dom";
import axios from "axios";
// import { 
//     signInWithEmailAndPassword,
// } from "firebase/auth";
import PasswordInput from "./PasswordInput";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {login, reset, checkUserValid } from "../../features/auth/authSlice";
import LoadingSpinner from "../LoadingSpinner";


function Login(props) {
    //props.auth
    //props.db
    const [passStatus, setPassStatus] = useState("hidden");//true when user is valid
    const [userValid, setUserValid] = useState("x");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    async function userLogin(e) {
        //handles user email submission for login
        //checks if ___ by calling checkUser() and resets errors if passed
        e.preventDefault();
        let userEmailOrNameIn = document.getElementById("email-in");
        if (await checkUser(userEmailOrNameIn.value)) {
            resetErrors();
            if (passStatus === "hidden") //used as class toggle pass input
                setPassStatus("");
            else {
                let userPasswordIn = document.getElementById("pass-in").value;
                if (userPasswordIn.length >0) {
                    // logInEmailPassword(userValid.email,userPasswordIn);
                    const userIn = {
                        email: userEmailOrNameIn.value,
                        password: userPasswordIn
                    };
                    console.log(userIn);
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

    async function checkUser(userEmailOrNameIn) {
        //Validates username/email is populated
        //only handles emails currently
        if (userEmailOrNameIn.length > 0) {
            // if (await checkUserName(userEmailOrNameIn)) {
            //     //username is valid
            //     return(true);
            // } else 
            if ( await checkEmail(userEmailOrNameIn)) {
                //email is valid
                console.log("email is valid");
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

    // async function checkUserName (userInput) {
    //     //checks db for existing user 
    //     //returns true and sets userValid state if found
    //     //else returns false
    //     const userByNameQuery = query(
    //         collection(props.db,"users"),
    //         where("userName", "==", userInput),
    //         limit(1),
    //     );
    //     const userByNameSnap = await getDocs(userByNameQuery);
    //     let userByNameDocs = []
    //     userByNameSnap.forEach((doc) => {
    //         userByNameDocs.push(doc.data());
    //     });
    //     if (userByNameDocs.length > 0) {
    //         setUserValid(userByNameDocs[0]);
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    async function checkEmail (userEmail) {
        console.log(userEmail);
        const response = await axios.post("http://localhost:8080/user/read", {email: userEmail});
        console.log(response.data.email);
        if (response.data.email === userEmail) {
            console.log("true");
            return true;
        } else {
            console.log("false");
            return false;
        }
    }

    // const logInEmailPassword = async (emailIn, passwordIn) => {
    //     //Pulls User Credentials from Firebase
    //     try {
    //         const userCredential = await signInWithEmailAndPassword(props.auth, emailIn, passwordIn);
    //     }
    //     catch(error) {
    //         // console.log(error.code);
    //         if (error.code ==="auth/wrong-password") {
    //             document.querySelector(".form-item-container.pass-in").classList.add("invalid");
    //         document.getElementById("pass-error").textContent = "Your password was incorrect.";
    //        }
    //     }
    // }

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
                            Sign in using email
                        </div>

                    </div>

                    <form className="login-form">

                        <div className="form-item-container email-in" >
                            <label htmlFor="email">email</label>

                            <div className="input-container">
                                <input type="email" id="email-in" name="email" placeholder="Enter email" onFocus={addFocus} onBlur={removeFocus}></input>
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