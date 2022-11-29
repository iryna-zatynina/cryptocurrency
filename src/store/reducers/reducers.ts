import {combineReducers} from "redux";
import {authReducer} from "./auth/auth";
import {AuthState} from "./auth/types";
import {CryptosState} from "./cryptos/types";
import {cryptosReducer} from "./cryptos/cryptosReduser";

export interface StoreTypes {
    auth: AuthState,
    cryptosReducer: CryptosState
}

export const rootReducer = combineReducers({
    auth: authReducer,
    cryptosReducer: cryptosReducer
})