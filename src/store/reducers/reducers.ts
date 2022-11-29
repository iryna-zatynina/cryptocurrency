import {combineReducers} from "redux";
import {authReducer} from "./auth/auth";
import {AuthState} from "./auth/types";
import {CurrencyState} from "./currency/types";
import {currencyReducer} from "./currency/currencyReduser";

export interface StoreTypes {
    auth: AuthState,
    currencyReducer: CurrencyState
}

export const rootReducer = combineReducers({
    auth: authReducer,
    currencyReducer: currencyReducer
})