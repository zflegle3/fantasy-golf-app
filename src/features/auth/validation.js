import axios from "axios";

//USERNAME FORMAT VALIDATION
const validateUserNameFormat = (userName) => {
    return userName.match(/^[a-zA-Z0-9]+$/);
};

//ACTIVE USER DB VALIDATION BY USERNAME
export const checkUserDb = async (userIn) => {
    console.log(userIn);
    //checks for user in db and returns true if found, false if not found
    const responseUsername = await axios.post(process.env.REACT_APP_API_URL+"/users/read/username", {username: userIn});
    console.log(responseUsername);
    if (responseUsername.data.id) {
        return true;
    } else {
        return false;
    }
}

//ACTIVE USER DB VALIDATION BY EMAIL
export const checkEmailDb = async (userEmail) => {
    const responseEmail = await axios.post(process.env.REACT_APP_API_URL+"/users/read/email", {email: userEmail});
    if (responseEmail.data.id) {
        return true;
    } else {
        return false;
    }
}

//ACTIVE USER CREDENTIALS VALIDATION
export const validateUsernameEmail = async (userEmailOrNameIn) => {
    //Validates username/email is populated
    //only handles emails currently
    if (userEmailOrNameIn.length > 0) {
        if ( await checkUserDb(userEmailOrNameIn)) {
            //username is valid
            return(true);
        } else if (await checkEmailDb(userEmailOrNameIn)) {
            //email is valid
            return(true);
        }else {
            //invalid user credentials 
            document.querySelector(".form-item-container.email-in").classList.add("invalid");
            document.getElementById("email-error").textContent = `Sorry, we were unable to find anyone using ${userEmailOrNameIn}`;
        }
    } else {
        document.querySelector(".form-item-container.email-in").classList.add("invalid");
        document.getElementById("email-error").textContent = "Cannot be empty";
    }
}


//NEW USERNAME VALIDATION
export const checkNewUserName = async (userNameIn) => {
    //LENGTH
    if (userNameIn.length > 2 && userNameIn.length < 16) {
        //FORMAT (Numbers and letters only 0-XX characters)
        if (validateUserNameFormat(userNameIn)) { 
            // AVAILABILITY IN DATABASE
            console.log(await checkUserDb(userNameIn));
            if ( await checkUserDb(userNameIn)) {
                //returns true if username already exists
                document.querySelector(".form-item-container.user-name-in").classList.add("invalid");
                document.getElementById("user-name-error").textContent = `Whoops! ${userNameIn} is already taken`;
                return false;
            } else {
                document.getElementById("user-name-error").className = "";
                document.getElementById("user-name-error").textContent = "Username Error";
                return true;
            };
        } else {
            document.querySelector(".form-item-container.user-name-in").classList.add("invalid");
            document.getElementById("user-name-error").textContent = `Only letter and numbers, between 3 to 15 characters`;
        }
    } else {
        if (userNameIn.length < 1) {
            document.querySelector(".form-item-container.user-name-in").classList.add("invalid");
            document.getElementById("user-name-error").textContent = "Cannot be empty";
        } else {
            document.querySelector(".form-item-container.user-name-in").classList.add("invalid");
            document.getElementById("user-name-error").textContent = `Only letter and numbers, between 3 to 15 characters`;
        }
    };
}


//EMAIL FORMAT VALIDATION
export const validateEmailFormat = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};


//NEW EMAIL VALIDATION
export const checkNewEmail = async(emailIn) => {
    //LENGTH
    if (emailIn.length > 0) {
        //FORMAT
        if (validateEmailFormat(emailIn)) {
            //AVAILABILITY IN DATABASE
            if (await checkEmailDb(emailIn)) {
                //returns true if email already exists
                document.querySelector(".form-item-container.email-in").classList.add("invalid");
                document.getElementById("email-error").textContent = `Whoops! ${emailIn} is already taken `;
                return false;
            } else {
                document.getElementById("email-error").className = "";
                document.getElementById("email-error").textContent = "Email Error";
                return true;
            };
        } else {
            document.querySelector(".form-item-container.email-in").classList.add("invalid");
            document.getElementById("email-error").textContent = "Oops, that looks like an invalid email";
            return false;
        }
    } else {
        document.querySelector(".form-item-container.email-in").classList.add("invalid");
        document.getElementById("email-error").textContent = "Cannot be empty";
        return false;
    };
}

//CURRENT PASSWORD VALIDATION FOR UPDATE
export const checkPassDb = async (idIn, passIn, tokenIn) => {
    let config = {
        headers: {
            authorization: `Bearer ${tokenIn}`
        }
    };//required for protected routes
    const responsePass = await axios.post(process.env.REACT_APP_API_URL+"/users/read/password", {id: idIn, password: passIn}, config);
    //returns false if passwords match, true if not matching 
    return responsePass.data.passMatch;
};

//CURRENT PASSWORD VALIDATION FOR RESET
//Different jwt and authentication verification for reset
export const checkPassDbReset = async (idIn, passIn, tokenIn) => {
    const responsePass = await axios.post(process.env.REACT_APP_API_URL+"/user/read/reset", {id: idIn, password: passIn, token: tokenIn});
    //returns false if passwords match, true if not matching 
    return responsePass.data.passMatch;
};


//NEW PASSWORD VALIDATION
export const checkNewPass = (passwordIn) => {
    let passTest = true;
    let passErrorLen = document.getElementById("pass-error-signin-length");
    let passErrorUp = document.getElementById("pass-error-signin-upper");
    let passErrorNum = document.getElementById("pass-error-signin-number");
    let passErrorSp = document.getElementById("pass-error-signin-special");

    //8 characters
    if(passwordIn.length < 8) {
        passTest = false;
        passErrorLen.classList = "";
    } else {
        passErrorLen.classList = "valid";
    }
    //uppercase
    if(!passwordIn.match(/[A-Z]/g)) {
        passTest = false;
        passErrorUp.classList = "";
    } else {
        passErrorUp.classList = "valid";
    }
    //number
    if(!passwordIn.match(/[0-9]/g)) {
        passTest = false;
        passErrorNum.classList = "";
    } else {
        passErrorNum.classList = "valid";
    }
    // special character
    if(!passwordIn.match(/[!@#\$%\^&\*]/g)) {
        passTest = false;
        passErrorSp.classList = "";
    } else {
        passErrorSp.classList = "valid";
    }
    //handle error text output on password input
    if (!passTest) {
        document.querySelector(".form-item-container.pass-in").classList.add("invalid");
        document.getElementById("pass-error").textContent = "Password does not meet criteria";
    }
    return passTest;
};

//FIRST NAME VALIDATION
export const checkFirstName = (firstIn) => {
    //validates first name is populated
    if (firstIn.length > 0) {
        document.getElementById("name-first-error").className = "";
        document.getElementById("name-first-error").textContent = "First Name Error";
        return true;
    } else {
        document.querySelector(".form-item-container.name-first").classList.add("invalid");
        document.getElementById("name-first-error").textContent = "Cannot be empty";
        return false;
    }
}

//LAST NAME VALIDATION
export const checkLastName = (lastIn) => {
    //validates last name is populated
    if (lastIn.length > 0) {
        document.getElementById("name-last-error").className = "";
        document.getElementById("name-last-error").textContent = "Last Name Error";
        return true;
    } else {
        document.querySelector(".form-item-container.name-last").classList.add("invalid");
        document.getElementById("name-last-error").textContent = "Cannot be empty";
        return false;
    }
}

//USERNAME FORMAT VALIDATION
function returnFileSize(number) {
    // //returns file size in KB
    // if (number < 1024) {
    //   return `${number} bytes`;
    // } else if (number >= 1024 && number < 1048576) {
    //   return `${(number / 1024).toFixed(1)} KB`;
    // } else if (number >= 1048576) {
    //   return `${(number / 1048576).toFixed(1)} MB`;
    // }
    return (number / 1024).toFixed(1);
  }
export const checkFileSize = (fileIn) => {
    //validates last name is populated
    const fileSize = returnFileSize(fileIn.size)
    if (fileSize > 500) {
        //set error
        document.getElementById("img-preview").textContent = "Image exceeds size limit";
        document.getElementById("img-preview").classList.add("invalid");
        return false;
    } else {
        //reset error
        document.getElementById("img-preview").className = "";
        return true;
    }
}
