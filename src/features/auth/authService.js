//used for making http requests, sending data back, setting data to local storage
import axios from "axios";

//Register new user
const register = async(userData) => {
    const response = await axios.post(process.env.REACT_APP_API_URL+"/users/create", userData);

    if (response.data) {
        console.log(response.data);
        localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data.user;
};

//Login existing user
const login = async(userData) => {
    const response = await axios.post(process.env.REACT_APP_API_URL+"/users/login", userData);
    console.log(userData);
    if (response.data) {
        console.log(response.data);
        localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data.user;
};

//Logout user
const logout = async() => { 
    localStorage.removeItem("user");
};

//Create new League
const createLeague = async (leagueData, token) => {
    let config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }//required for protected routes
    const response = await axios.post(process.env.REACT_APP_API_URL+"/leagues/create", leagueData, config);
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data.user;
}


//Create new League
const joinLeague = async (leagueData, token) => {
    let config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }//required for protected routes
    const response = await axios.put(process.env.REACT_APP_API_URL+"/league/join", leagueData, config);
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
}


const updateDetails = async(userData) => {
    const response = await axios.put(process.env.REACT_APP_API_URL+"/users/update/details", userData);
    if (response.data) {
        console.log(response.data);
        localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data.user;
};

const updatePassword = async(userData) => {
    const response = await axios.put(process.env.REACT_APP_API_URL+"/users/update/password", userData);
    if (response.data) {
        console.log(response.data);
        localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data.user;
};



const authService = { register, login, logout, createLeague, joinLeague, updateDetails, updatePassword }

export default authService;