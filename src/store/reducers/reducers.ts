import {combineReducers} from "redux";
import {authReducer} from "./auth/auth";
import {AuthState} from "./auth/types";
import {CurrencyState} from "./currency/types";
import {currencyReducer} from "./currency/currencyReduser";
import {personalDataReducer} from "./personalData/personalReducer";
import {PersonalDataState} from "./personalData/types";

export interface StoreTypes {
    auth: AuthState,
    currencyReducer: CurrencyState,
    personalDataReducer: PersonalDataState
}

export const rootReducer = combineReducers({
    auth: authReducer,
    currencyReducer: currencyReducer,
    personalDataReducer: personalDataReducer
})