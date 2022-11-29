import {CurrencyEnum, CurrencyAction, CurrencyState} from "./types";

const defaultState: CurrencyState = {
    currency: "USD"
}

export const currencyReducer = (state = defaultState, action: CurrencyAction): CurrencyState => {
    switch (action.type) {
        case CurrencyEnum.CHANGE_CURRENCY:
            return {...state, currency: action.payload}
        default:
            return state
    }
}

export const changeCurrencyAction = (payload) => ({type: CurrencyEnum.CHANGE_CURRENCY, payload})