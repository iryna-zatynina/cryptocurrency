import {IData} from "../../../сomponents/PersonalProfile/PersonalProfile";

export interface PersonalDataState {
    data: IData
}

export enum PersonalDataEnum {
    GET_PERSONAL_DATA = "GET_PERSONAL_DATA"
}

export interface GetPersonalDataAction {
    type: PersonalDataEnum.GET_PERSONAL_DATA,
    payload: IData
}

export type PersonalDataAction = GetPersonalDataAction