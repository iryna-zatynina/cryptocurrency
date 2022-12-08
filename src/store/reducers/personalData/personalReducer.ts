import {PersonalDataEnum, PersonalDataAction, PersonalDataState} from "./types";

const defaultState: PersonalDataState = {
    data: {
        name: "",
        email: "",
        tel: "",
        regDate: ""
    }
}

export const personalDataReducer = (state = defaultState, action: PersonalDataAction): PersonalDataState => {
    switch (action.type) {
        case PersonalDataEnum.GET_PERSONAL_DATA:
            return {...state, data: action.payload}
        default:
            return state
    }
}

export const getPersonalDataAction = (payload) => ({type: PersonalDataEnum.GET_PERSONAL_DATA, payload})