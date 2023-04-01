import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import authService from "./authService";

//Get user from local storage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

//Register new user
export const register = createAsyncThunk("auth/register", async (user, thunkAPI) => {
    try{
        return await authService.register(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

//Login existing user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
    try{
        return await authService.login(user);
    } catch (error) {
        console.log(error);
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const logout = createAsyncThunk("auth/logout", async () => {
    await authService.logout();
})

//Create a new League
export const createLeague = createAsyncThunk("league/create", async (leagueData, thunkAPI)=> {
    try {
        const token = thunkAPI.getState().auth.user.token; //token required b/c protected route
        return await authService.createLeague(leagueData,token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }

})

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetUser: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload; 
                //returned user data as payload from register function
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
                //rejectwithvalue returns message as payload in catch above
                state.user = null;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true; 
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = "We were unable to verify login credentials you entered";  
                state.user = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            })
            .addCase(createLeague.pending, (state) => {
                state.isLoading = true; 
            })
            .addCase(createLeague.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                //returns an updated user with new league data
                state.user = action.payload;
            })
            .addCase(createLeague.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = "We were unable to create a new league";  
            })

            

    }
})

export const { resetUser } = authSlice.actions
export default authSlice.reducer

