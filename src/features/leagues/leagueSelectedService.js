import axios from "axios";

const getLeagueOne = async (leagueId, token) => {
    let config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }//required for protected routes
    let payload = {
        _id: leagueId,
    }
    const response = await axios.post("https://fantasy-golf-41.herokuapp.com/league/getOne", payload, config,);
    return response.data;
}

//Update League Settings
const updateLeagueSettings = async (leagueData, token) => {
    let config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }//required for protected routes
    const response = await axios.put(process.env.REACT_APP_API_URL+"/league/update/settings", leagueData, config);
    if (response.data) {
        localStorage.setItem("leagueSelected", JSON.stringify(response.data));
    }
    return response.data;
}

//Update League Settings
const updateLeaguePasscodeInput = async (leagueData, token) => {
    let config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }//required for protected routes
    const response = await axios.put(process.env.REACT_APP_API_URL+"/league/update/passcode-in", leagueData, config);
    if (response.data) {
        localStorage.setItem("leagueSelected", JSON.stringify(response.data));
    }
    return response.data;
}

//Update League Settings
const updateLeaguePasscodeAuto = async (leagueData, token) => {
    let config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }//required for protected routes
    const response = await axios.put(process.env.REACT_APP_API_URL+"/league/update/passcode-auto", leagueData, config);
    if (response.data) {
        localStorage.setItem("leagueSelected", JSON.stringify(response.data));
    }
    return response.data;
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
