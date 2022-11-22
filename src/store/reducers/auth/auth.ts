import {AuthAction, AuthEnum, AuthState} from "./types";

const defaultState = {
    auth: {
        login: () => {},
        logout: () => {},
        token: "",
        isReady: false
    }
}

export const authReducer = (state = defaultState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AuthEnum.ADD_AUTH_DATA:
            return {...state, auth: action.payload}
        default:
            return state
    }
}