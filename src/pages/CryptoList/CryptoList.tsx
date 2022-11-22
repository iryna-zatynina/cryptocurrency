import React from 'react';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {StoreTypes} from "../../store/reducers/reducers";

const CryptoList = () => {

    const {logout} = useSelector((state: StoreTypes) => state.auth.auth)
    const navigate = useNavigate();

    const logOut = () => {
        logout();
        navigate("/")
    }

    return (
        <div>
            cryptos
            <button onClick={logOut}>log out</button>
        </div>
    );
};

export default CryptoList;