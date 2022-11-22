export interface AuthState {
    auth: {
        login: (JWTtoken: string) => void,
        logout: () => void,
        token: string,
        isReady: boolean,
    }
}

export enum AuthEnum {
    ADD_AUTH_DATA = "ADD_AUTH_DATA"
}

export interface AddAuthDataAction {
    type: AuthEnum.ADD_AUTH_DATA,
    payload: {
        token: string, isReady: boolean, login: (JWTtoken: string) => void, logout: () => void
    }
}

export type AuthAction =
    AddAuthDataAction


