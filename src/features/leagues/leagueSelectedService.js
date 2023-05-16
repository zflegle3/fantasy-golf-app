import axios from "axios";

const getLeagueOne = async (payload, token) => {
    let config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }//required for protected routes
    console.log(payload);
    const response = await axios.post(process.env.REACT_APP_API_URL+"/leagues/read", payload, config);
    // const response = await axios.post("http://localhost:8000/league/getOne", payload, config);
    return response.data.league;
}

//Update League Settings
const updateLeagueSettings = async (leagueData, token) => {
    let config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }//required for protected routes
    const response = await axios.put(process.env.REACT_APP_API_URL+"/leagues/update/settings", leagueData, config);
    if (response.data) {
        localStorage.setItem("leagueSelected", JSON.stringify(response.data.league));
    }
    return response.data.league;
}

//Update League Settings
const updateLeaguePasscodeInput = async (leagueData, token) => {
    let config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }//required for protected routes
    const response = await axios.put(process.env.REACT_APP_API_URL+"/leagues/update/passcode-in", leagueData, config);
    if (response.data) {
        localStorage.setItem("leagueSelected", JSON.stringify(response.data));
    }
    return response.data.league;
}

//Update League Settings
const updateLeaguePasscodeAuto = async (leagueData, token) => {
    let config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }//required for protected routes
    const response = await axios.put(process.env.REACT_APP_API_URL+"/leagues/update/passcode-auto", leagueData, config);
    if (response.data) {
        localStorage.setItem("leagueSelected", JSON.stringify(response.data));
    }
    return response.data.league;
}

//Update League Settings
const updateLeagueTeamSettings = async (leagueData, token) => {
    console.log(leagueData);
    let config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }//required for protected routes
    const response = await axios.put(process.env.REACT_APP_API_URL+"/league/update/team", leagueData, config);
    if (response.data) {
        localStorage.setItem("leagueSelected", JSON.stringify(response.data));
    }
    return response.data;
}

const leagueSelectedService = {
    getLeagueOne, updateLeagueSettings, updateLeaguePasscodeInput, updateLeaguePasscodeAuto, updateLeagueTeamSettings
}

export default leagueSelectedService
