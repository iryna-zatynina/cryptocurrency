import React from 'react';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {StoreTypes} from "../../store/reducers/reducers";
import Header from "../../сomponents/Header/Header";
import Footer from "../../сomponents/Footer/Footer";
import "./CryptoList.scss"

const CryptoList = () => {

    const {logout} = useSelector((state: StoreTypes) => state.auth.auth)
    const navigate = useNavigate();

    const logOut = () => {
        logout();
        navigate("/");
    }

    return (
        <div className="CryptoList">
            <Header showLandingButtons={false} showAccountButtons={true}/>
            <button className="button" onClick={logOut}>log out</button>
            <Footer />
        </div>
    );
};

export default CryptoList;