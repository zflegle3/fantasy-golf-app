import { useState } from 'react';
import { ReactComponent as EyeSvg } from '../images/icons/eye-outline.svg';
import { ReactComponent as NoEyeSvg } from '../images/icons/eye-off-outline.svg';


function PasswordInput(props) {
    //props.passStatus
    const [hideState, setHideState] = useState(true);

    const handleClick = (e) => {
        e.preventDefault();
        let button = document.querySelector("button");
        if (button.id === "show-pass") {
            setHideState(false);
        } else {
            setHideState(true);
        }
    }

    const addFocus = (e) => {
        e.target.parentElement.parentElement.classList.add("focus");
    }

    const removeFocus = (e) => {
        e.target.parentElement.parentElement.classList.remove("focus");
    }

    if (hideState) {
        return(
            <div className={`form-item-container ${props.passStatus} pass-in`}>
                <label htmlFor="pwd">password</label>
                <div className="input-container pass-in">
                    <input type="password" id="pass-in" name="pwd" placeholder="Enter password" onFocus={addFocus} onBlur={removeFocus}></input>
                    <button id="show-pass" onClick={handleClick}>
                        <EyeSvg id="show-pass"/>
                    </button>
                </div>

                <p id="pass-error">Password Error</p>
            </div> 
        );
    } else {
        return(
            <div className={`form-item-container ${props.passStatus} pass-in`}>
                <label htmlFor="pwd">password</label>

                <div className="input-container pass-in">
                    <input type="text" id="pass-in" name="pwd" placeholder="Enter password" className="show" onFocus={addFocus} onBlur={removeFocus}></input>
                    <button id="hide-pass" onClick={handleClick}>
                        <NoEyeSvg id="hide-pass" />
                    </button>
                </div>

                <p id="pass-error">Password Error</p>
            </div> 
        )
    }

}

export default PasswordInput;