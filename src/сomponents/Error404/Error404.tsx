import React from 'react';
import {Link} from "react-router-dom";
import "./Error404.scss"

const Error404 = () => {

    return (
        <div className="Error404">
            <div className="container">
                <p>"The page you are looking for can't be found"</p>
                <p className="error-number">404</p>
                <Link className="btn" to={"/"}>"To main page"</Link>
            </div>
        </div>
    );
};

export default Error404;