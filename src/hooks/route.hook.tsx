import React from 'react';
import {Route, Routes} from "react-router";
import Landing from "../pages/Landing/Landing";
import CryptoList from "../pages/CryptoList/CryptoList";
import OtherCryptoPage from "../pages/OtherCryptoPage/OtherCryptoPage";
import Page404 from "../pages/Page404/Page404";
import MyAccount from "../pages/MyAccount/MyAccount";

const useRoutes = (isLogin: boolean) => {
    if (isLogin) {
        return (
            <Routes>
                <Route path="/" element={<CryptoList /> } />
                <Route path="/:id" element={<OtherCryptoPage /> } />
                <Route path="/profile" element={<MyAccount /> } />
                <Route path="*" element={<Page404 /> } />
            </Routes>
        );
    } else {
        return (
            <Routes>
                <Route path="/" element={<Landing /> } />
                <Route path="*" element={<Page404 /> } />
            </Routes>
        );
    }
};

export default useRoutes;
