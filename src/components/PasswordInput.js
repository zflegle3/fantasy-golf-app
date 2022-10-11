import { useState, useEffect } from 'react';
import { ReactComponent as EyeSvg } from '../images/icons/eye-outline.svg';
import { ReactComponent as NoEyeSvg } from '../images/icons/eye-off-outline.svg';

function PasswordInput(props) {
    const [hideState, setHideState] = useState(true);

    const handleClick = (e) => {
        console.log(e.target.id);
        if (e.target.id === "show-pass") {
            setHideState(false);
        } else {
            setHideState(true);
        }
    }

    if (hideState) {
        return(
            <div className="form-item-container">
                <label htmlFor="pwd">Password</label>

                <div className="input-container">
                    <input type="password" id="pwd" name="pwd" placeholder="Enter password" ></input>
                    <div id="show-pass" onClick={handleClick}>
                        <EyeSvg id="show-pass"/>
                    </div>
                </div>

                <p id="pass-error-login">Your password was incorrect</p>
            </div> 
        );
    } else {
        return(
            <div className="form-item-container">
                <label htmlFor="pwd">Password</label>

                <div className="input-container">
                    <input type="text" id="pwd" name="pwd" placeholder="Enter password" className="show"></input>
                    <div id="hide-pass" onClick={handleClick}>
                        <NoEyeSvg id="hide-pass" />
                    </div>
                </div>

                <p id="pass-error-login">Your password was incorrect</p>
            </div> 
        )
    }

}

export default PasswordInput;