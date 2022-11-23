import React, {useEffect, useState} from 'react';
import "./PersonalProfile.scss"
import {useTranslation} from "react-i18next";
import axios from "axios";
import {useSelector} from "react-redux";
import {StoreTypes} from "../../store/reducers/reducers";
import Loader from "../Loader/Loader";

const PersonalProfile = () => {

    useEffect(() => {
        setLoader(true);
        axios.get(`https://user-simple.herokuapp.com/auth/getAccountInformation`, {
            headers: {
                'authorization': token
            }
        })
            .then((response) => {
                setName(response.data.fullName);
                setEmail(response.data.email);
                setRegDate(formatDate(response.data.dc));
                response.data.phone ? setTel(response.data.phone) : setTel("not specified");
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
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [tel, setTel] = useState<string>("");
    const [regDate, setRegDate] = useState<string | number>("");
    const {token} = useSelector((state: StoreTypes) => state.auth.auth)

    const formatDate = (data) => {
        const date = new Date(data);
        let day: string | number = date.getDate();
        if (day < 10) day = '0' + day;
        let month: string | number = date.getMonth();
        if (month < 10) month = '0' + month;
        let year = date.getFullYear();
        return day + '.' + month + '.' + year;
    }
    return (
        <div className="PersonalProfile">
            <div className="container">
                <div className="wrapper">
                    <h1>{t("My account")}</h1>
                    <p>{t("Name")}:</p>
                    <span>{name}</span>
                    <p>{t("Email")}:</p>
                    <span>{email}</span>
                    <p>{t("Phone number")}:</p>
                    <span>{tel}</span>
                    <p>{t("Registration date")}:</p>
                    <span>{regDate}</span>
                </div>
            </div>
            {loader && <Loader />}
        </div>
    );
};

export default PersonalProfile;