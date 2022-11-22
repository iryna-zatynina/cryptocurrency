import React from 'react';
import {Route, Routes} from "react-router";
import Landing from "../pages/Landing/Landing";
import CryptoList from "../pages/CryptoList/CryptoList";
import OtherCrypto from "../pages/OtherCrypto/OtherCrypto";
import Profile from "../pages/Profile/Profile";
import {useAuth} from "./auth.hook";

const useRoutes = (isLogin: boolean) => {
    if (isLogin) {
        return (
            <Routes>
                <Route path="/" element={<CryptoList /> } />
                <Route path="/id" element={<OtherCrypto /> } />
                <Route path="/profile" element={<Profile /> } />
            </Routes>
        );
    } else {
        return (
            <Routes>
                <Route path="/" element={<Landing /> } />
            </Routes>
        );
    }

};


export default useRoutes;