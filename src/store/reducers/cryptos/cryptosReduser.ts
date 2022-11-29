import {CryptosEnum, CryptosAction, CryptosState} from "./types";

const defaultState: CryptosState = {
    cryptos: []
}

export const cryptosReducer = (state = defaultState, action: CryptosAction): CryptosState => {
    switch (action.type) {
        case CryptosEnum.GET_CRYPTOS:
            return {...state, cryptos: action.payload}
        default:
            return state
    }
}

export const getCryptosAction = (payload) => ({type: CryptosEnum.GET_CRYPTOS, payload})