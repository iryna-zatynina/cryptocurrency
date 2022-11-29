import React, {useEffect, useState} from 'react';
import "./PersonalProfile.scss"
import {useTranslation} from "react-i18next";
import axios from "axios";
import {useSelector} from "react-redux";
import {StoreTypes} from "../../store/reducers/reducers";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import BackButton from "../BackButton/BackButton";

interface IData {
    name: string,
    email: string,
    tel: string,
    regDate: string
}

const PersonalProfile = () => {
    const {token} = useSelector((state: StoreTypes) => state.auth.auth)

    useEffect(() => {
        setLoader(true);
        axios.get(`https://user-simple.herokuapp.com/auth/getAccountInformation`, {
            headers: {
                'authorization': token
            }
        })
            .then(({data}) => {
                setData({
                    name: data.fullName,
                    email: data.email,
                    tel: data.phone ? data.phone : "not specified",
                    regDate: formatDate(data.dc)
                })
            })
            .catch(() => {
                setError(true)
            })
            .finally(() => {
                setLoader(false);
            })
    }, [token])

    const {t} = useTranslation();
    const [loader, setLoader] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [data, setData] = useState<IData>({
        name: '',
        email: '',
        tel: '',
        regDate: ''
    });

    const formatDate = (dc) => {
        return new Date(dc).toLocaleDateString()
    }

    return (
        <div className="PersonalProfile">
            <div className="container">
                {error ? <ErrorMessage /> :
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
                }
            </div>
            {loader && <Loader />}
        </div>
    );
};

export default PersonalProfile;
