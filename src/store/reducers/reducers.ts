import {combineReducers} from "redux";
import {authReducer} from "./auth/auth";
import {AuthState} from "./auth/types";

export interface StoreTypes {
    auth: AuthState
}

export const rootReducer = combineReducers({
    auth: authReducer,
})