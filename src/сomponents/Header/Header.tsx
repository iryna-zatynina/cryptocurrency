import React, {useState} from 'react';
import "./Header.scss"
import {Dropdown, DropdownButton, Nav, Navbar} from "react-bootstrap";
import {TbWorld} from "react-icons/tb";
import {useTranslation} from "react-i18next";
import Registration from "../Registration/Registration";
import Login from "../Login/Login";

const Header:React.FC = () => {

    const {t, i18n} = useTranslation();
    const [showRegistration, setShowRegistration] = useState<boolean>(false);
    const [showLogin, setShowLogin] = useState<boolean>(false);

    const handleCloseRegistration = () => setShowRegistration(false);
    const handleShowRegistration = () => setShowRegistration(true);
    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => setShowLogin(true);

    return (
        <React.Fragment>
            <div className="Header">
                <div className="container">
                    <Navbar collapseOnSelect expand="md" className="nav">
                        <DropdownButton id="dropdown-basic-button" title={<TbWorld />}>
                            <Dropdown.Item onClick={() => i18n.changeLanguage("en")}>EN</Dropdown.Item>
                            <Dropdown.Item onClick={() => i18n.changeLanguage("ua")}>UA</Dropdown.Item>
                            <Dropdown.Item onClick={() => i18n.changeLanguage("ru")}>RU</Dropdown.Item>
                        </DropdownButton>
                        <div className="logo">crypto</div>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="logins">
                                <Nav.Link href="#" className="log-in" onClick={handleShowLogin}>{t("Log In")}</Nav.Link>
                                <Nav.Link href="#" className="sign-up" onClick={handleShowRegistration}>{t("Sign Up")}</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            </div>
            {showLogin && <Login showLogin={showLogin} handleCloseLogin={handleCloseLogin} />}
            {showRegistration && <Registration showRegistration={showRegistration} handleCloseRegistration={handleCloseRegistration} />}
        </React.Fragment>
    );
};
export default Header;