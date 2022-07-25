
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { 
    signInWithEmailAndPassword,
   } from "firebase/auth";
import "../styles/Login.css";


function Login(props) {
    //props.logInEmailPassword (removed)
    //props.auth
    //props.switchPage

    const userLogin = (e) => {
        e.preventDefault();
        let userEmail = document.getElementById("email").value;
        let userPassword = document.getElementById("pwd").value;
        logInEmailPassword(userEmail, userPassword);
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
                break;
            case ("auth/wrong-password"):
                // console.log("password Error");
                document.getElementById("pass-error-login").className = "invalid";
                break;
        }
    }


    return (
        <div className="auth-container">
            <div className="auth-left"></div>
            <div className="auth-right">
                <div className="login-container">
                    <div className="login-header">
                        <div className="login-header-main">
                            <h1>Login</h1>
                            <p id="signup" onClick={props.switchPage}>Sign Up</p>
                        </div>
                        <div className="login-header-sub">
                            Sign in using email
                        </div>

                    </div>


                    
                    <form className="login-form">

                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Enter email" ></input>
                        <p id="email-error-login" >Sorry, this user does not exist</p>

                        <label htmlFor="pwd">Password</label>
                        <input type="password" id="pwd" name="pwd" placeholder="Enter password" ></input>
                        <p id="pass-error-login">Your password was incorrect.</p>

                        <button onClick={userLogin}>Continue</button>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;