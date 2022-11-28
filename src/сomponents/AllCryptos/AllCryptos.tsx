import React, {useEffect, useState} from 'react';
import "./AllCryptos.scss"
import axios from "axios";
import Loader from "../Loader/Loader";
import {useSelector} from "react-redux";
import {StoreTypes} from "../../store/reducers/reducers";
import CryptoInfo, {ItemInterface} from "../CryptoInfo/CryptoInfo";
import Dropdown from 'react-bootstrap/Dropdown';
import {useTranslation} from "react-i18next";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const AllCryptos = () => {

    const {token} = useSelector((state: StoreTypes) => state.auth.auth);
    const [currency, setCurrency] = useState('USD');

    useEffect(() => {
        setLoader(true);
        axios.get(`https://user-simple.herokuapp.com/crypto/list?currency=${currency}`, {
            headers: {
                'authorization': token
            }
        })
            .then(({data}) => {
                setData(data.list)
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
    const [data, setData] = useState([]);
    const [error, setError] = useState<boolean>(false)

    return (
        <div className="AllCryptos">
            <div className="container">
                <h1>{t("All Cryptocurrencies")}</h1>
                <div className="chose-currency">
                    <span>{t("Currency")}:</span>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {currency}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => {setCurrency('USD')}} href="#/action-1">USD</Dropdown.Item>
                            <Dropdown.Item onClick={() => {setCurrency('EUR')}} href="#/action-2">EUR</Dropdown.Item>
                            <Dropdown.Item onClick={() => {setCurrency('UAH')}} href="#/action-3">UAH</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                {error ? <ErrorMessage /> :
                    <div>
                        <div className="headings">
                            <span>N</span>
                            <span>{t("Name")}</span>
                            <span>{t("Price in")} {currency}</span>
                            <span>{t("Symbol")}</span>
                        </div>
                        {data.map((item: ItemInterface, num) => {
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