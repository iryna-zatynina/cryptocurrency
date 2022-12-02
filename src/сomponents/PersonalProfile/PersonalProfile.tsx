import React, {useEffect} from 'react';
import "./PersonalProfile.scss"
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {StoreTypes} from "../../store/reducers/reducers";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export interface IData {
    name: string,
    email: string,
    tel: string,
    regDate: string
}

interface PersonalProfileProps {
    loader: boolean,
    error: boolean,
    getPersonalData: () => void
}

const PersonalProfile = ({loader, error, getPersonalData}: PersonalProfileProps) => {

    const personalData = useSelector((state: StoreTypes) => state.personalDataReducer.data)

    useEffect(() => {
        getPersonalData();

    }, [])

    const {t} = useTranslation();

    return (
        <div className="PersonalProfile">
            <div className="container">
                {error ? <ErrorMessage /> :
                    <div className="wrapper">
                        <h1>{t("My account")}</h1>
                        <p>{t("Name")}:</p>
                        <span>{personalData.name}</span>
                        <p>{t("Email")}:</p>
                        <span>{personalData.email}</span>
                        <p>{t("Phone number")}:</p>
                        <span>{personalData.tel}</span>
                        <p>{t("Registration date")}:</p>
                        <span>{personalData.regDate}</span>
                    </div>
                }
            </div>
            {loader && <Loader />}
        </div>
    );
};

export default PersonalProfile;
