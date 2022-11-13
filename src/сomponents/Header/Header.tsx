import React, {useState} from 'react';
import "./Header.scss"
import {Dropdown, DropdownButton, Nav, Navbar} from "react-bootstrap";
import {TbWorld} from "react-icons/tb";
import {useTranslation} from "react-i18next";
import Registration from "../Registration/Registration";

const Header:React.FC = () => {

    const {t, i18n} = useTranslation();
    const [show, setShow] = useState<boolean>(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                                <Nav.Link href="#" className="log-in">{t("Log In")}</Nav.Link>
                                <Nav.Link href="#" className="sign-up" onClick={handleShow}>{t("Sign Up")}</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            </div>
            {show && <Registration show={show} handleClose={handleClose} />}
        </React.Fragment>
    );
};
export default Header;