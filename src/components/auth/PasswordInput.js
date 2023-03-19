import { useState } from 'react';
import { FaEye, FaEyeSlash} from 'react-icons/fa';
import { addFocus, removeFocus} from '../../features/style';


function PasswordInput({passStatus}) {
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

    if (hideState) {
        return(
            <div className={`form-item-container ${passStatus} pass-in`}>
                <label htmlFor="pwd">password</label>
                <div className="input-container pass-in">
                    <input type="password" id="pass-in" name="pwd" placeholder="Enter password" onFocus={addFocus} onBlur={removeFocus}></input>
                    <button id="show-pass" onClick={handleClick}>
                        <FaEye id="show-pass"/>
                    </button>
                </div>

                <p id="pass-error">Password Error</p>
            </div> 
        );
    } else {
        return(
            <div className={`form-item-container ${passStatus} pass-in`}>
                <label htmlFor="pwd">password</label>

                <div className="input-container pass-in">
                    <input type="text" id="pass-in" name="pwd" placeholder="Enter password" className="show" onFocus={addFocus} onBlur={removeFocus}></input>
                    <button id="hide-pass" onClick={handleClick}>
                        <FaEyeSlash id="hide-pass" />
                    </button>
                </div>

                <p id="pass-error">Password Error</p>
            </div> 
        )
    }

}

export default PasswordInput;