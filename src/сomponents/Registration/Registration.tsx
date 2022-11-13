import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./Registration.scss"
import {useTranslation} from "react-i18next";

interface RegistrationProps {
    show: boolean,
    handleClose: () => void
}

const Registration = ({show, handleClose}: RegistrationProps) => {

    const {t} = useTranslation();

    return (
        <Modal className="Registration" show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <Modal.Title>{t("Sign Up")}</Modal.Title>
                <p>{t("Already have an account?")} <span onClick={handleClose}>{t("Login")}</span></p>
                <form>
                    <input type="email" placeholder={t("Enter address")}/>
                    <input type="password" placeholder={t("Password")}/>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button className="continue-btn" onClick={handleClose}>
                    {t("Continue")}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Registration;