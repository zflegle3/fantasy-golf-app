import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import leagueReducer from "../features/leagues/leagueSlice"
import modalReducer from "../features/modals/modalSlice"
import leagueSelectedReducer from "../features/leagues/leagueSelectedSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        leagues: leagueReducer,
        leagueSelected: leagueSelectedReducer,
        modal: modalReducer,

    },
}); 