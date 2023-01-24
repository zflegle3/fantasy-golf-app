import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import leagueService from "./leagueService";

const initialState = {
    leaguesAll: [], //to hold id and name for each league user is a member of
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

//Create a new League
export const createLeague = createAsyncThunk("league/create", async (leagueData, thunkAPI)=> {
    try {
        const token = thunkAPI.getState().auth.user.token; //token required b/c protected route
        return await leagueService.createLeague(leagueData,token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }

})

//Get all user leagues
export const getLeaguesAll = createAsyncThunk("league/getAll", async (_, thunkAPI)=> {
    try {
        const token = thunkAPI.getState().auth.user.token; //token required b/c protected route
        return await leagueService.getLeaguesAll(token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }

})


export const leagueSlice = createSlice({
    name: "leagueData",
    initialState,
    reducers: {
        resetLeagues: (state) => initialState
    }, 
    extraReducers: (builder) => {
        builder
            //Create League
            .addCase(createLeague.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createLeague.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.leaguesAll.push({
                    id: action.payload._id,
                    name: action.payload.name
                })
            })
            .addCase(createLeague.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            //Get All Leagues
            .addCase(getLeaguesAll.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getLeaguesAll.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true; 
                state.leaguesAll = action.payload; 
            })
            .addCase(getLeaguesAll.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})


export const { resetLeagues } = leagueSlice.actions
export default leagueSlice.reducer