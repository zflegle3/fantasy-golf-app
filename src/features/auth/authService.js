//used for making http requests, sending data back, setting data to local storage
import axios from "axios";

const API_URL = "http://localhost:8080/user/";

//Register new user
const register = async(userData) => {
    const response = await axios.post("http://localhost:8080/user/create", userData);

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
};

const logout = async() => { 
    localStorage.removeItem("user");
};


const authService = { register, logout }

export default authService;