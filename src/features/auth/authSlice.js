import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import authService from "./authService";

//Get user from local storage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoding: false,
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

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoding = false;
            state.isSuccess = false;
            state.message = "";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoding = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoding = false;
                state.isSuccess = true;
                state.user = action.payload; 
                //returned user data as payload from register function
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoding = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload 
                //rejectwithvalue returns message as payload in catch above
                state.user = null;
            })
    }
})

export const { reset } = authSlice.actions
export default authSlice.reducer

