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
    const response = await axios.post("http://localhost:8080/league/getOne", payload, config,);
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
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
}

const leagueSelectedService = {
    getLeagueOne, updateLeagueSettings
}

export default leagueSelectedService
