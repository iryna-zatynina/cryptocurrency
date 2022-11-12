import React from 'react';
import Header from "../../сomponents/Header/Header";
import Footer from "../../сomponents/Footer/Footer";
import Introduction from "../../сomponents/Introduction/Introduction";

const Landing: React.FC = () => {
    return (
        <div>
            <Header />
            <Introduction />
            <Footer />
        </div>
    );
};

export default Landing;