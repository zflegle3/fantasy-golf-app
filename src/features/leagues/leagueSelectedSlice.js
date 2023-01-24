import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import leagueSelectedService from "./leagueSelectedService";

const initialState = {
    league: null, //to hold all league data for the current selected league
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

//Get all user leagues
export const getLeagueOne = createAsyncThunk("league/getOne", async (leagueId, thunkAPI)=> {
    console.log("leagueID is", leagueId);
    try {
        const token = thunkAPI.getState().auth.user.token; //token required b/c protected route
        console.log("token is", token);
        return await leagueSelectedService.getLeagueOne(leagueId, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }

})

export const leagueSelectedSlice = createSlice({
    name: "leagueData",
    initialState,
    reducers: {
        resetSelected: (state) => initialState
    }, 
    extraReducers: (builder) => {
        builder
            //Get One League by ID
            .addCase(getLeagueOne.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getLeagueOne.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true; 
                state.league = action.payload; 
            })
            .addCase(getLeagueOne.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})


export const { resetSelected } = leagueSelectedSlice.actions
export default leagueSelectedSlice.reducer