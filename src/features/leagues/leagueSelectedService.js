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
    console.log(leagueId, token, config);
    const response = await axios.post("http://localhost:8080/league/getOne", payload, config,);
    // console.log(response);
    return response.data;
}

const leagueSelectedService = {
    getLeagueOne
}

export default leagueSelectedService
