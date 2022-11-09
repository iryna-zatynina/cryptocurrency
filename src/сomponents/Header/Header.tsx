import React, {FunctionComponent} from 'react';
import "./Header.scss"
import {Dropdown, DropdownButton, Nav, Navbar} from "react-bootstrap";
import {TbWorld} from "react-icons/tb";
import {useTranslation} from "react-i18next";

const Header:FunctionComponent = () => {

    const {t, i18n} = useTranslation();

    return (
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
                            <Nav.Link href="#" className="log-in">{t("Log In")}</Nav.Link>
                            <Nav.Link href="#" className="sign-up">{t("Sign Up")}</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </div>
    );
};

export default Header;