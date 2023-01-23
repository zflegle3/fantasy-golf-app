import axios from "axios";



//Create new League
const createLeague = async (leagueData, token) => {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }//required for protected routes
    const response = await axios.post("http://localhost:8080/league/create", leagueData, config);
    return response.data;
}

const getLeaguesAll = async (token) => {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }//required for protected routes
    const response = await axios.get("http://localhost:8080/league/getAll", config);
    // console.log(response);
    return response.data;
}

const leagueService = {
    createLeague,
    getLeaguesAll
}

export default leagueService
