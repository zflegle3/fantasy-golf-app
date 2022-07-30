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

        if (emailEl.value < 1) {
            emailError.classList = "invalid";
            emailError.textContent = "Cannot be empty, please enter an email";
        } else {
            //check email valid, if not update error output
            if (validateEmail(emailEl.value)) {
                console.log("valid email");
                emailError.classList = "";
                emailError.textContent = "no error";
                emailCheck = true;
            } else {
                console.log("invalid email");
                emailError.classList = "invalid";
                emailError.textContent = "Oops, that looks like an invalid email";
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
        // let passErrorSp = document.getElementById("pass-error-signin-special");

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
            console.log("ERROR!", error)
          }
    }




    
    return (
        <div className="auth-container">
            <div className="auth-left"></div>
            <div className="auth-right">
                <div className="auth-content">
                    <div className="auth-header">
                        <div className="auth-header-main">
                            <h1>Sign Up</h1>
                            <p id="login" onClick={props.switchPage}>Login</p>
                        </div>
                        <div className="auth-header-sub">
                            Let's get started by creating an account
                        </div>
                    </div>
                    
                    <form className="sign-up-form">

                        <div className="form-item-container">
                            <label htmlFor="email">Email</label>

                            <div className="input-container">
                                <input type="email" id="email" name="email" placeholder="Enter email" ></input>
                            </div>

                            <p id="email-error" >Username Error</p>
                        </div>

                        <div className="form-item-container">
                            <label htmlFor="pwd">Password</label>

                            <div className="input-container">
                                <input type="password" id="pwd" name="pwd" placeholder="Set a password" ></input>
                            </div>

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
    );
}

export default SignUp;
