import "../styles/SignUp.css";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";



function SignUp(props) {




    const validateSignUp = (e) => {
        e.preventDefault();
        // console.log(e);
        let emailCheck = false;
        let passCheck = false;

        let emailEl = document.getElementById("email");
        let passEl = document.getElementById("pwd");

        let emailError = document.getElementById("email-error");
        // let passError = document.getElementById("pass-error");

        //check email valid, if not update error output
        if (validateEmail(emailEl.value)) {
            console.log("valid email");
            emailError.classList = "";
            emailCheck = true;
        } else {
            console.log("invalid email");
            emailError.classList = "invalid";
        }

        //check password valid, if not update error output
        if (validatePassword(passEl.value)) {
            console.log("valid password");
            // passError.classList = "pass-error";
            passCheck = true;
        } else {
            console.log("invalid password");
            // passError.classList = "pass-error invalid";
        }

        if (emailCheck && passCheck) {
            createAccount(emailEl.value, passEl.value);
        }

    }

    const validateEmail = (email) => {
        return email.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const validatePassword = (password) => {
        let passTest = true;
        let passErrorLen = document.getElementById("pass-error-signin-length");
        let passErrorUp = document.getElementById("pass-error-signin-upper");
        let passErrorNum = document.getElementById("pass-error-signin-number");
        let passErrorSp = document.getElementById("pass-error-signin-special");

        //8 characters
        if(password.length < 8) {
            passTest = false;
            passErrorLen.classList = "invalid";
        } else {
            passErrorLen.classList = "";
        }
        //uppercase
        if(!password.match(/[A-Z]/g)) {
            passTest = false;
            passErrorUp.classList = "invalid";
        } else {
            passErrorUp.classList = "";
        }
        //number
        if(!password.match(/[0-9]/g)) {
            passTest = false;
            passErrorNum.classList = "invalid";
        } else {
            passErrorNum.classList = "";
        }
        //special character
        // if(!password.match(/!@#$%^&*/g)) {
        //     passErrorNum.classList = "invalid";
        // } else {
        //     passErrorNum.classList = "";
        // }
        return passTest;
    };


    const createAccount = async (userEmail, userPassword) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(props.auth, userEmail, userPassword);
            console.log(userCredential);
          }
          catch(error) {
            console.log("ERROR!")
          }

    }




    
    return (
        <div className="login-form">
            <div className="login-header">
                <h1>Sign Up</h1>
                <p id="login" onClick={props.switchPage}>Login</p>
            </div>
            <p>Let's get started by creating an account</p>
            
            <form>
                {/* <label for="username">Username</label>
                <input type="text" id="username" name="username" placeholder="Enter new username" ></input>
                <p className="username-error">Username Error</p> */}

                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Enter email" ></input>
                <p id="email-error" >Username Error</p>

                <label htmlFor="pwd">Password</label>
                <input type="password" id="pwd" name="pwd" placeholder="Set a password" ></input>
                <p id="pass-error-signin-length">have at least 8 characters</p>
                <p id="pass-error-signin-upper">have at least 1 Upper characters</p>
                <p id="pass-error-signin-number">have at least 1 number</p>
                <p id="pass-error-signin-special">have at least 1 special character (i.e. ! @ # $ % ^ & *)</p>

                <button onClick={validateSignUp}>Continue</button>

            </form>
        </div>
    );
}

export default SignUp;