import React from 'react';
import "./BackButton.scss"
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

const BackButton = () => {

    const {t} = useTranslation();

    return (
        <div className="BackButton">
            <div className="container">
                <Link to={"/"}>{t('BACK')}</Link>
            </div>
        </div>
    );
};

export default BackButton;