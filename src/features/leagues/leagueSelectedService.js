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

const leagueSelectedService = {
    getLeagueOne
}

export default leagueSelectedService
