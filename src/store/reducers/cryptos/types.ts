import {ICrypto} from "../../../сomponents/CryptoInfo/CryptoInfo";

export interface CryptosState {
    cryptos: ICrypto[]
}

export enum CryptosEnum {
    GET_CRYPTOS = "GET_CRYPTOS"
}

export interface GetCryptosAction {
    type: CryptosEnum.GET_CRYPTOS,
    payload: ICrypto[]
}

export type CryptosAction = GetCryptosAction

