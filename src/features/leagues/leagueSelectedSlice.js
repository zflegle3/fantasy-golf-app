import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import leagueSelectedService from "./leagueSelectedService";

const initialState = {
    league: null, //to hold all league data for the current selected league
    leagueError: false,
    leagueSuccess: false,
    leagueLoading: false,
    leagueMessage: "",
}

//Get all user leagues
export const getLeagueOne = createAsyncThunk("league/getOne", async (leagueId, thunkAPI)=> {
    try {
        const token = thunkAPI.getState().auth.user.token; //token required b/c protected route
        return await leagueSelectedService.getLeagueOne(leagueId, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

//Update an existing league's settings
export const updateLeagueSettings = createAsyncThunk("/league/update/settings", async (leagueData, thunkAPI)=> {
    try {
        const token = thunkAPI.getState().auth.user.token; //token required b/c protected route
        return await leagueSelectedService.updateLeagueSettings(leagueData,token);
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
                state.leagueLoading = true;
            })
            .addCase(getLeagueOne.fulfilled, (state, action) => {
                state.leagueLoading = false;
                state.leagueSuccess = true; 
                state.league = action.payload; 
            })
            .addCase(getLeagueOne.rejected, (state, action) => {
                state.leagueLoading = false;
                state.leagueError = true;
                state.leagueMessage = action.payload;
            })
            //Update League Settings
            .addCase(updateLeagueSettings.pending, (state) => {
                state.leagueLoading = true;
            })
            .addCase(updateLeagueSettings.fulfilled, (state, action) => {
                state.leagueLoading = false;
                state.leagueSuccess = true; 
                state.league = action.payload;
            })
            .addCase(updateLeagueSettings.rejected, (state, action) => {
                state.leagueLoading = false;
                state.leagueError = true;
                state.leagueMessage = action.payload;
            })
    }
})


export const { resetSelected } = leagueSelectedSlice.actions
export default leagueSelectedSlice.reducer