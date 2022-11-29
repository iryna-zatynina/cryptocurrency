import React, {useEffect, useState} from 'react';
import "./OtherCrypto.scss"
import axios from "axios";
import {useSelector} from "react-redux";
import {StoreTypes} from "../../store/reducers/reducers";
import Loader from "../Loader/Loader";
import CurrencyDropdown from "../CurrencyDropdown/CurrencyDropdown";
import { MdUpdate } from 'react-icons/md';
import { TbArrowBigTop, TbArrowBigDown } from 'react-icons/tb';
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import BackButton from "../BackButton/BackButton";
import {useParams} from "react-router";
import {useTranslation} from "react-i18next";


interface ICrypto {
    name: string,
    percent_change_1h: string,
    percent_change_7d: string,
    percent_change_24h: string,
    percent_change_30d: string,
    percent_change_60d: string,
    price: string,
    symbol: string,
    topRank: number,
    update_date: string
}

const OtherCrypto = () => {

    const {token} = useSelector((state: StoreTypes) => state.auth.auth);
    const [currency, setCurrency] = useState('USD');

    const id = useParams().id;
    console.log("useParams", id)
    useEffect(() => {
        updateInfo();
    }, [token, currency])

    const {t} = useTranslation();
    const [currencySymbol, setCurrencySymbol] = useState<string>("$");
    const [error, setError] = useState<boolean>(false);
    const [loader, setLoader] = useState<boolean>(false);
    const [crypto, setCrypto] = useState<ICrypto>({
        name: "",
        percent_change_1h: "",
        percent_change_7d: "",
        percent_change_24h: "",
        percent_change_30d: "",
        percent_change_60d: "",
        price: "",
        symbol: "",
        topRank: 0,
        update_date: ""
    })

    const updateInfo = () => {
        setLoader(true);
        axios.get(`https://user-simple.herokuapp.com/crypto/otherCurrency?currency=${currency}&index=${id}`,{
            headers: {
                'authorization': token
            }
        })
            .then(({data}) => {
                console.log("other crypto:", data.crypto.id)
                console.log(data.crypto)
                setCrypto({
                    name: data.crypto.name,
                    percent_change_1h: data.crypto.percent_change_1h,
                    percent_change_7d: data.crypto.percent_change_7d,
                    percent_change_24h: data.crypto.percent_change_24h,
                    percent_change_30d: data.crypto.percent_change_30d,
                    percent_change_60d: data.crypto.percent_change_60d,
                    price: data.crypto.price,
                    symbol: data.crypto.symbol,
                    topRank: data.crypto.topRank,
                    update_date: data.crypto.update_date
                });
                switch (currency) {
                    case "USA":
                        return setCurrencySymbol("$");
                    case "EUR":
                        return setCurrencySymbol("€");
                    case "UAH":
                        return setCurrencySymbol("₴");
                }
            })
            .catch(() => {
                setError(true);
            })
            .finally(() => {
                setLoader(false);
            })
    }

    let changeStyle = {"color": "#13de00"}
    if (crypto.percent_change_1h.includes("-")) {
        changeStyle = {"color": "red"}
    }

    return (
        <div className="OtherCrypto">
            <BackButton />
            {error ? <ErrorMessage/> :
                <div className="container">
                    <h1>{crypto.name}</h1>
                    <div className="wrapper">
                        <p>1 {crypto.symbol} =</p>
                        <div className="currency-block">
                            <h2>{currencySymbol} {crypto.price}</h2>
                            <div style={changeStyle} className="price-change">
                                {crypto.percent_change_1h.includes("-") ? <TbArrowBigDown/> : <TbArrowBigTop/>}

                                <span>{crypto.percent_change_1h}%</span>
                            </div>
                            <CurrencyDropdown currency={currency} setCurrency={setCurrency}/>
                        </div>
                        <p className="update" onClick={updateInfo}><MdUpdate/> {t("Last update")}: {crypto.update_date}</p>
                    </div>
                    <ul className="wrapper info-block">
                        <li>
                            <span className="text">{t("Top rank")}: </span>
                            <span className="num">{crypto.topRank}</span>
                        </li>
                        <li>
                            <span className="text">{t("Chg(24H)")}: </span>
                            <span className="num">{crypto.percent_change_24h}%</span>
                        </li>
                        <li>
                            <span className="text">{t("Chg(7D)")}: </span>
                            <span className="num">{crypto.percent_change_7d}%</span>
                        </li>
                        <li>
                            <span className="text">{t("Chg(30D)")}: </span>
                            <span className="num">{crypto.percent_change_30d}%</span>
                        </li>
                        <li>
                            <span className="text">{t("Chg(60D)")}: </span>
                            <span className="num">{crypto.percent_change_60d}%</span>
                        </li>
                    </ul>
                </div>
            }
            {loader && <Loader />}
        </div>
    );
};

export default OtherCrypto;