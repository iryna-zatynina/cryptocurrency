export interface CurrencyState {
    currency: string
}

export enum CurrencyEnum {
    CHANGE_CURRENCY = "CHANGE_CURRENCY"
}

export interface ChangeCurrencyAction {
    type: CurrencyEnum.CHANGE_CURRENCY,
    payload: string
}

export type CurrencyAction = ChangeCurrencyAction

