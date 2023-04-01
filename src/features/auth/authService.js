//used for making http requests, sending data back, setting data to local storage
import axios from "axios";

//Register new user
const register = async(userData) => {
    const response = await axios.post(process.env.REACT_APP_API_URL+"/user/create", userData);

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
};

//Login existing user
const login = async(userData) => {
    const response = await axios.post(process.env.REACT_APP_API_URL+"/user/login", userData);

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
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
    const response = await axios.post(process.env.REACT_APP_API_URL+"/league/create", leagueData, config);
    return response.data;
}


const authService = { register, login, logout, createLeague }

export default authService;