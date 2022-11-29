import React from 'react';
import Header from "../../сomponents/Header/Header";
import Footer from "../../сomponents/Footer/Footer";
import PersonalProfile from "../../сomponents/PersonalProfile/PersonalProfile";
import BackButton from "../../сomponents/BackButton/BackButton";

const MyAccount = () => {
    return (
        <>
            <Header showLandingButtons={false} showAccountButtons={true}/>
            <BackButton />
            <PersonalProfile />
            <Footer />
        </>
    );
};

export default MyAccount;