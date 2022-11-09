import React from 'react';
import {Route, Routes} from "react-router";
import Landing from "../pages/Landing/Landing";
import CryptoList from "../pages/CryptoList/CryptoList";
import OtherCrypto from "../pages/OtherCrypto/OtherCrypto";
import Profile from "../pages/Profile/Profile";

const useRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Landing /> } />
            <Route path="/cryptos" element={<CryptoList /> } />
            <Route path="/id" element={<OtherCrypto /> } />
            <Route path="/profile" element={<Profile /> } />
        </Routes>
    );
};


export default useRoutes;