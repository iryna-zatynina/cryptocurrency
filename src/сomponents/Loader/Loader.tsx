import React from 'react';
import "./Loader.scss";

const Loader: React.FC = () => {
    return (
        <div className="Loader">
            <div className="spin-wrapper">
                <div className="spinner"></div>
            </div>
        </div>
    );
};

export default Loader;