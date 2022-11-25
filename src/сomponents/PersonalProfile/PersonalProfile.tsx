import React, {useEffect, useState} from 'react';
import "./PersonalProfile.scss"
import {useTranslation} from "react-i18next";
import axios from "axios";
import {useSelector} from "react-redux";
import {StoreTypes} from "../../store/reducers/reducers";
import Loader from "../Loader/Loader";

interface IData {
    name: string,
    email: string,
    tel: string,
    regDate: string
}

const PersonalProfile = () => {

    useEffect(() => {
        setLoader(true);
        axios.get(`https://user-simple.herokuapp.com/auth/getAccountInformation`, {
            headers: {
                'authorization': token
            }
        })
            .then((response) => {
                setData({
                    name: response.data.fullName,
                    email: response.data.email,
                    tel: response.data.phone ? response.data.phone : "not specified",
                    regDate: formatDate(response.data.dc)
                })
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setLoader(false);
            })
    }, [])

    const {t} = useTranslation();
    const [loader, setLoader] = useState<boolean>(false);
    const [data, setData] = useState<IData>({
        name: '',
        email: '',
        tel: '',
        regDate: ''
    });
    const {token} = useSelector((state: StoreTypes) => state.auth.auth)

    const formatDate = (data) => {
        const date = new Date(data);
        return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
    }

    return (
        <div className="PersonalProfile">
            <div className="container">
                <div className="wrapper">
                    <h1>{t("My account")}</h1>
                    <p>{t("Name")}:</p>
                    <span>{data.name}</span>
                    <p>{t("Email")}:</p>
                    <span>{data.email}</span>
                    <p>{t("Phone number")}:</p>
                    <span>{data.tel}</span>
                    <p>{t("Registration date")}:</p>
                    <span>{data.regDate}</span>
                </div>
            </div>
            {loader && <Loader />}
        </div>
    );
};

export default PersonalProfile;