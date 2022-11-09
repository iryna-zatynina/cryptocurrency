import React from 'react';
import {Route, Routes} from "react-router";
import Landing from "../pages/Landing/Landing";

const useRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Landing /> } />
        </Routes>
    );
};


export default useRoutes;