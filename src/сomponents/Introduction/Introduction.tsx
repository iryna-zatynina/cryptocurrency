import React from 'react';
import "./Introduction.scss"

const Introduction: React.FC = () => {
    return (
        <div className="Introduction" style={{background: "url('./img/bg1.jpeg')", backgroundSize: "cover", backgroundPosition: "center"}}>
            <div className="container">
                <p className="title">Trade 450+ <br/> Crypto CFDs</p>
                <p>Lower your trading costs on over 450+ Crypto CFDs with Crypto.com tight spreads and 0 commissions - BTC, ETH, MANA, DOGE, SHIB and hundreds of other altcoins.</p>
            </div>
        </div>
    );
};

export default Introduction;