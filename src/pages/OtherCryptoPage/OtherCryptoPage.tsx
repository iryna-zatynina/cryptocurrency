import React from 'react';
import Header from "../../сomponents/Header/Header";
import Footer from "../../сomponents/Footer/Footer";
import OtherCrypto from "../../сomponents/OtherCrypto/OtherCrypto";

const OtherCryptoPage = () => {
    return (
        <div>
            <Header showLandingButtons={false} showAccountButtons={true}/>
            <OtherCrypto />
            <Footer/>
        </div>
    );
};

export default OtherCryptoPage;