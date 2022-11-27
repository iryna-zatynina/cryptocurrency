import React from 'react';
import Header from "../../сomponents/Header/Header";
import Footer from "../../сomponents/Footer/Footer";
import PersonalProfile from "../../сomponents/PersonalProfile/PersonalProfile";

const MyAccount = () => {
    return (
        <>
           <Header showLandingButtons={false} showAccountButtons={true}/>
           <PersonalProfile />
            <Footer />
        </>
    );
};

export default MyAccount;