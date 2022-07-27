
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { 
    signInWithEmailAndPassword,
} from "firebase/auth";


function Login(props) {
    //props.logInEmailPassword (removed)
    //props.auth
    //props.switchPage

    const userLogin = (e) => {
        e.preventDefault();
        let validEmail = false;
        let validPass = false;
        let userEmail = document.getElementById("email").value;
        let userPassword = document.getElementById("pwd").value;
        //Form Validation Email Length
        if (userEmail.length < 1) {
            console.log("no email")
            document.getElementById("email-error-login").className = "invalid";
            document.getElementById("email-error-login").textContent = "Cannot be empty, please enter a email";
        } else {
            validEmail = true;
            document.getElementById("email-error-login").className = "";
            document.getElementById("email-error-login").textContent = "";
        }
        //Form Validation Password Length
        if (userPassword.length < 1) {
            console.log("no pass")
            document.getElementById("pass-error-login").className = "invalid";
            document.getElementById("pass-error-login").textContent = "Cannot be empty, please enter a password";
        } else {
            validPass = true;
            document.getElementById("pass-error-login").className = "";
            document.getElementById("pass-error-login").textContent = "";
        }
        
        if (validPass && validEmail) {
            logInEmailPassword(userEmail, userPassword);
        }
    };



    const logInEmailPassword = async (email, password) => {
        try {
          const userCredential = await signInWithEmailAndPassword(props.auth, email, password);
        //   console.log(userCredential.user);
          document.getElementById("email-error-login").className = "";
          document.getElementById("pass-error-login").className = "";
          //Send UserCredential to App State??
        //   props.checkAuthState(userCredential.user);
        }
        catch(error) {
        //   console.log("ERROR!")
          handleLoginError(error);
        }
    }

    const handleLoginError = (error) => {
        // console.log(error.code);
        switch (error.code) {
            case ("auth/user-not-found"):
                // console.log("email Error");
                document.getElementById("email-error-login").className = "invalid";
                document.getElementById("email-error-login").textContent = "Sorry, this user does not exist";
                break;
            case ("auth/wrong-password"):
                // console.log("password Error");
                document.getElementById("pass-error-login").className = "invalid";
                document.getElementById("pass-error-login").textContent = "Your password was incorrect";
                break;
        }
    }


    return (
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
                            Sign in using email
                        </div>

                    </div>

                    <form className="login-form">

                        <div className="form-item-container">
                            <label htmlFor="email">Email</label>

                            <div className="input-container">
                                <input type="email" id="email" name="email" placeholder="Enter email" ></input>
                            </div>

                            <p id="email-error-login" ></p>
                        </div> 

                        <div className="form-item-container">
                            <label htmlFor="pwd">Password</label>

                            <div className="input-container">
                                <input type="password" id="pwd" name="pwd" placeholder="Enter password" ></input>
                            </div>

                            <p id="pass-error-login">Your password was incorrect</p>
                        </div> 

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
    );
}

export default Login;