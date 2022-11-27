import React from 'react';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {StoreTypes} from "../../store/reducers/reducers";
import Header from "../../сomponents/Header/Header";
import Footer from "../../сomponents/Footer/Footer";
import "./CryptoList.scss"
import AllCryptos from "../../сomponents/AllCryptos/AllCryptos";

const CryptoList = () => {

    return (
        <div className="CryptoList">
            <Header showLandingButtons={false} showAccountButtons={true}/>
            <AllCryptos />
            <Footer />
        </div>
    );
};

export default CryptoList;