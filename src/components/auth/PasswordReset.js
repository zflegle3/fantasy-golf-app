import { sendPasswordResetEmail } from "firebase/auth";
import {
    Link
} from "react-router-dom";

function PasswordReset(props) {
    //props.auth
    //props.db

    async function resetPassword(e) {
        e.preventDefault();
        let resetEmail = document.getElementById("email-in").value;
        if (resetEmail.length >0) {
            sendPasswordResetEmail(props.auth, resetEmail)
                .then(() => {
                    document.querySelector(".form-item-container.email-in").classList.add("valid");
                    document.getElementById("email-error").textContent = `A password reset link has been sent to ${resetEmail}. Check your spam folder before trying again.`;
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        } else {
            document.querySelector(".form-item-container.email-in").classList.add("invalid");
            document.getElementById("email-error").textContent = "Cannot be empty";
        }

    }

    const addFocus = (e) => {
        e.target.parentElement.parentElement.classList.add("focus");
    }

    const removeFocus = (e) => {
        e.target.parentElement.parentElement.classList.remove("focus");
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