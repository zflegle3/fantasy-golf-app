
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
    signInWithEmailAndPassword,
} from "firebase/auth";

import PasswordInput from "./PasswordInput"


function Login(props) {
    //props.logInEmailPassword (removed)
    //props.auth
    //props.switchPage
    //props.db
    const [passStatus, setPassStatus] = useState("hidden");//true when user is valid
    const [userValid, setUserValid] = useState("");

    async function userLogin(e) {
        e.preventDefault();
        let userEmailOrNameIn = document.getElementById("email-in");
        console.log(userEmailOrNameIn)
        if (await checkUser(userEmailOrNameIn.value)) {
            //resets user error codes and displays password on valid user input
            document.getElementById("user-error-login").className = "";
            document.getElementById("user-error-login").textContent = "";
            if (passStatus === "hidden")
                setPassStatus("");
            else {
                let userPasswordIn = document.getElementById("pwd-in").value;
                if (userPasswordIn.length >0) {
                    console.log("login")
                    logInEmailPassword(userValid.email,userPasswordIn);
                } else {
                    document.getElementById("pass-error-login").className = "invalid";
                    document.getElementById("pass-error-login").textContent = "Cannot be empty, ";
                }
            }
        }
    };

    async function checkUser(userEmailOrNameIn) {
        if (userEmailOrNameIn.length > 0) {
            if (await checkUserName(userEmailOrNameIn)) {
                console.log("set data by username");
                //username is valid
                return(true);
            } else if ( await checkEmail(userEmailOrNameIn)) {
                console.log("set data by email");
                //email is valid
                return(true);
            } else {
                //invalid user credentials 
                document.getElementById("user-error-login").className = "invalid";
                document.getElementById("user-error-login").textContent = `Sorry, we were unable to find anyone using ${userEmailOrNameIn}`;
            }
        } else {
            document.getElementById("user-error-login").className = "invalid";
            document.getElementById("user-error-login").textContent = "Cannot be empty, ";
        }
    }

    async function checkUserName (userInput) {
        const userByNameQuery = query(
            collection(props.db,"users"),
            where("userName", "==", userInput),
            limit(1),
        );
        const userByNameSnap = await getDocs(userByNameQuery);
        let userByNameDocs = []
        userByNameSnap.forEach((doc) => {
            userByNameDocs.push(doc.data());
        });
        console.log(userByNameDocs);
        if (userByNameDocs.length > 0) {
            console.log("valid username")
            setUserValid(userByNameDocs[0]);
            return true;
        } else {
            console.log("invalid username")
            return false;
        }
    }

    async function checkEmail (userInput) {
        const userByNameQuery = query(
            collection(props.db,"users"),
            where("email", "==", userInput),
            limit(1),
        );
        const userByNameSnap = await getDocs(userByNameQuery);
        let userByNameDocs = []
        userByNameSnap.forEach((doc) => {
            userByNameDocs.push(doc.data());
        });
        if (userByNameDocs.length > 0) {
            console.log("valid email")
            setUserValid(userByNameDocs[0]);
            return true;
        } else {
            console.log("invalid email")
            return false;
        }
    }

    const logInEmailPassword = async (emailIn, passwordIn) => {
        //Pulls User Credentials from Firebase
        console.log("logging in");
        try {
          const userCredential = await signInWithEmailAndPassword(props.auth, emailIn, passwordIn);
          console.log(userCredential.user);
          //Send UserCredential to App State??
        //   props.checkAuthState(userCredential.user);
        }
        catch(error) {
           console.log(error.code);
           if (error.code ==="auth/wrong-password") {
            document.getElementById("pass-error-login").className = "invalid";
            document.getElementById("pass-error-login").textContent = "Your password was incorrect.";
           }
        }
    }

    const resetInput = (e) => {
        //reset errors on input changes
        if (e.target.classList.contains("invalid")) {
            e.target.className="";
            e.target.textContent ="";
            document.getElementById("user-error-login").className = "";
            document.getElementById("pass-error-login").className = "";
        }
    }

    // if (!passStatus) {
        return(
            <div className="auth-container">
                <div className="auth-left"></div>
                <div className="auth-right">
                    <div className="auth-content">

                        <div className="auth-header">
                            <div className="auth-header-main">
                                <h1>Login</h1>
                                <p id="signup" onClick={props.switchPage}>Sign Up</p>
                            </div>
                            <div className="auth-header-sub">
                                Sign in using email or username
                            </div>

                        </div>

                        <form className="login-form">

                            <div className="form-item-container">
                                <label htmlFor="email">email or username</label>

                                <div className="input-container">
                                    <input type="email" id="email-in" name="email" placeholder="Enter email" ></input>
                                </div>

                                <p id="user-error-login" ></p>
                            </div> 

                            <PasswordInput passStatus={passStatus}/>

                            <div className="form-submit-container">
                                <div className="form-btn-container">
                                    <button onClick={userLogin}>Continue</button>
                                </div>

                                <p id="pass-reset">
                                    Forgot password?
                                </p>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        )
    } 
    // else {
    //     return(
    //         <div className="auth-container">
    //             <div className="auth-left"></div>
    //             <div className="auth-right">
    //                 <div className="auth-content">

    //                     <div className="auth-header">
    //                         <div className="auth-header-main">
    //                             <h1>Login</h1>
    //                             <p id="signup" onClick={props.switchPage}>Sign Up</p>
    //                         </div>
    //                         <div className="auth-header-sub">
    //                             Sign in using email or username
    //                         </div>

    //                     </div>

    //                     <form className="login-form">

    //                         <div className="form-item-container">
    //                             <label htmlFor="email">email or username</label>

    //                             <div className="input-container">
    //                                 <input type="email" id="email-in" name="email" placeholder="Enter email" ></input>
    //                             </div>

    //                             <p id="user-error-login" ></p>
    //                         </div> 

    //                         <PasswordInput />

    //                         <div className="form-submit-container">
    //                             <div className="form-btn-container">
    //                                 <button onClick={userLogin}>Continue</button>
    //                             </div>
    //                             <p id="pass-reset">
    //                                 Forgot password?
    //                             </p>

    //                         </div>

    //                     </form>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }

// }

export default Login;

// async function userLogin(e) {
//     e.preventDefault();
//     if (!userValid) {
//         //check if user is valid and set state/show password input if valid
//         let userEmailorNameIn = document.getElementById("email").value;
//         if (userEmailorNameIn.length >0) {
//             if (await checkUserName(userEmailorNameIn)) {
//                 console.log("set data by username");
//                 //displays password input
//                 setPassStatus(true);
//             } else if ( await checkEmail(userEmailorNameIn)) {
//                 console.log("set data by email");
//                 //displays password input
//                 setPassStatus(true);
//             } else {
//                 document.getElementById("user-error-login").className = "invalid";
//                 document.getElementById("user-error-login").textContent = `Sorry, we were unable to find anyone using ${userEmailorNameIn}`;
//             }
//         } else {
//             document.getElementById("user-error-login").className = "invalid";
//             document.getElementById("user-error-login").textContent = "Cannot be empty, ";
//         }
//     } else {
//         let userPasswordIn = document.getElementById("pwd").value;
//         if (userPasswordIn.length >0) {
//             console.log("login")
//             logInEmailPassword(userValid.email,userPasswordIn);
//         } else {
//             document.getElementById("pass-error-login").className = "invalid";
//             document.getElementById("pass-error-login").textContent = "Cannot be empty, ";
//         }
//     }
// };




// e.preventDefault();
// let validEmail = false;
// let validPass = false;
// let userEmail = document.getElementById("email").value;
// let userPassword = document.getElementById("pwd").value;
// //Form Validation Email Length
// if (userEmail.length < 1) {
//     console.log("no email")
//     document.getElementById("email-error-login").className = "invalid";
//     document.getElementById("email-error-login").textContent = "Cannot be empty, please enter a email";
// } else {
//     validEmail = true;
//     document.getElementById("email-error-login").className = "";
//     document.getElementById("email-error-login").textContent = "";
// }
// //Form Validation Password Length
// if (userPassword.length < 1) {
//     console.log("no pass")
//     document.getElementById("pass-error-login").className = "invalid";
//     document.getElementById("pass-error-login").textContent = "Cannot be empty, please enter a password";
// } else {
//     validPass = true;
//     document.getElementById("pass-error-login").className = "";
//     document.getElementById("pass-error-login").textContent = "";
// }
// //If Email and Password Valid pull user credentials from Firebase
// if (validPass && validEmail) {
//     logInEmailPassword(userEmail, userPassword);
// }
// };

// const logInEmailPassword = async (email, password) => {
//     //Pulls User Credentials from Firebase
//     console.log("logging in");
//     try {
//       const userCredential = await signInWithEmailAndPassword(props.auth, email, password);
//       console.log(userCredential.user);
//       document.getElementById("email-error-login").className = "";
//       document.getElementById("pass-error-login").className = "";
//       //Send UserCredential to App State??
//     //   props.checkAuthState(userCredential.user);
//     }
//     catch(error) {
//        console.log("ERROR!", error)
//       handleLoginError(error);
//     }
// }

// const handleLoginError = (error) => {
//     // console.log(error.code);
//     switch (error.code) {
//         case ("auth/user-not-found"):
//             // console.log("email Error");
//             document.getElementById("email-error-login").className = "invalid";
//             document.getElementById("email-error-login").textContent = "Sorry, this user does not exist";
//             break;
//         case ("auth/wrong-password"):
//             // console.log("password Error");
//             document.getElementById("pass-error-login").className = "invalid";
//             document.getElementById("pass-error-login").textContent = "Your password was incorrect";
//             break;
//     }
// }