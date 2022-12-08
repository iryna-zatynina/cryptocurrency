import React, {useEffect, useState} from 'react';
import Header from "../../сomponents/Header/Header";
import Footer from "../../сomponents/Footer/Footer";
import "./CryptoList.scss"
import CurrencyDropdown from "../../сomponents/CurrencyDropdown/CurrencyDropdown";
import ErrorMessage from "../../сomponents/ErrorMessage/ErrorMessage";
import CryptoInfo, {ICrypto} from "../../сomponents/CryptoInfo/CryptoInfo";
import Loader from "../../сomponents/Loader/Loader";
import {StoreTypes} from "../../store/reducers/reducers";
import axios from "axios";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";

const CryptoList = () => {

    const {token} = useSelector((state: StoreTypes) => state.auth.auth);
    const currency = useSelector((state: StoreTypes) => state.currencyReducer.currency)

    useEffect(() => {
        setLoader(true);
        axios.get(`http://31.42.189.118:8000/crypto/list?currency=${currency}`, {
            headers: {
                'authorization': token
            }
        })
            .then(({data}) => {
                setCryptos(data.list);
            })
            .catch(() => {
                setError(true);
            })
            .finally(() => {
                setLoader(false);
            })
    }, [token, currency])


    const {t} = useTranslation();
    const [loader, setLoader] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false)
    const [cryptos, setCryptos] = useState([]);


    return (
        <div className="CryptoList">
            <Header showLandingButtons={false} showAccountButtons={true}/>
            <div className="allCryptos">
                <div className="container">
                    <h1>{t("All Cryptocurrencies")}</h1>
                    <div className="chose-currency">
                        <span>{t("Currency")}:</span>
                        <CurrencyDropdown />
                    </div>

                    {error ? <ErrorMessage /> :
                        <div>
                            <div className="headings">
                                <span>N</span>
                                <span>{t("Name")}</span>
                                <span>{t("Price in")} {currency}</span>
                                <span>{t("Symbol")}</span>
                            </div>
                            {cryptos.map((item: ICrypto, num) => {
                                return <CryptoInfo num={num+1} item={item} key={item.id}/>
                            })}
                        </div>
                    }
                </div>
                {loader && <Loader />}
            </div>
            <Footer />
        </div>
    );
};

export default CryptoList;