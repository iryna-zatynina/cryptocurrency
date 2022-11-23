import React from 'react';
import Header from "../../сomponents/Header/Header";
import PersonalProfile from "../../сomponents/PersonalProfile/PersonalProfile";
import Footer from "../../сomponents/Footer/Footer";

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