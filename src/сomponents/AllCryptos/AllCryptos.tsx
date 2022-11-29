import React, {useEffect, useState, useCallback} from 'react';
import "./AllCryptos.scss"
import axios from "axios";
import Loader from "../Loader/Loader";
import {useDispatch, useSelector} from "react-redux";
import {StoreTypes} from "../../store/reducers/reducers";
import CryptoInfo, {ICrypto} from "../CryptoInfo/CryptoInfo";
import {useTranslation} from "react-i18next";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import CurrencyDropdown from "../CurrencyDropdown/CurrencyDropdown";
import {getCryptosAction} from "../../store/reducers/cryptos/cryptosReduser";

const AllCryptos = () => {

    const {token} = useSelector((state: StoreTypes) => state.auth.auth);
    const [currency, setCurrency] = useState('USD');

    const dispatch = useDispatch()
    const cryptos = useSelector((state: StoreTypes) => state.cryptosReducer.cryptos)

    const setCryptos = useCallback((cryptos: ICrypto[]) => {
        dispatch(getCryptosAction(cryptos))
    }, [dispatch])

    useEffect(() => {
        setLoader(true);
        axios.get(`https://user-simple.herokuapp.com/crypto/list?currency=${currency}`, {
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
    }, [token, currency, setCryptos])


    const {t} = useTranslation();
    const [loader, setLoader] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false)

    return (
        <div className="AllCryptos">
            <div className="container">
                <h1>{t("All Cryptocurrencies")}</h1>
                <div className="chose-currency">
                    <span>{t("Currency")}:</span>
                    <CurrencyDropdown currency={currency} setCurrency={setCurrency} />
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
    );
};

export default AllCryptos;