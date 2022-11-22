import {combineReducers} from "redux";
import {authReducer} from "./auth/auth";
import {AuthState} from "./auth/types";
import {currencyReducer} from "./currency/currency";
import {CurrencyState} from "./currency/types";

export interface StoreTypes {
    auth: AuthState
    currency: CurrencyState
}

export const rootReducer = combineReducers({
    auth: authReducer,
    currency: currencyReducer
})