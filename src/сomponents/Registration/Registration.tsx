import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./Registration.scss"
import {useTranslation} from "react-i18next";
import axios from "axios";
import Loader from "../Loader/Loader";
import {NAME_REGEX, EMAIL_REGEX, CLEAR_STRING, ClEAR_STYLE, ERROR_STYLE} from "../../shared/global.variables"
import useInput from "../../hooks/input.hook";
import useSubmitButton from "../../hooks/submitButton.hook";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

interface RegistrationProps {
    showRegistration: boolean,
    handleCloseRegistration: () => void
}

const Registration = ({showRegistration, handleCloseRegistration}: RegistrationProps) => {

    const {t} = useTranslation();

    const [showLoader, setShowLoader] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const email = useInput("", "Enter address");
    const password = useInput("", "Password");
    const name = useInput("", "Your name");
    const tel = useInput("", "Phone number (optional)");
    const submitButton = useSubmitButton("Continue");

    let valid: boolean = true;

    const emailValidation = () => {
        if (!EMAIL_REGEX.test(email.value) && email.value.length !== 0) {
            email.setValue(CLEAR_STRING);
            email.setInputStyle(ERROR_STYLE);
            email.setPlaceholder("Don't forget about @");
            valid = false;
        } else if (email.value.length === 0) {
            email.setValue(CLEAR_STRING);
            email.setInputStyle(ERROR_STYLE);
            valid = false;
        } else {
            valid = true
        }
    }
    const passwordValidation = () => {
        if (password.value.length < 3 && password.value.length !== 0) {
            password.setValue(CLEAR_STRING);
            password.setInputStyle(ERROR_STYLE);
            password.setPlaceholder("Too short password");
            valid = false;
        } else if (password.value.length === 0) {
            password.setValue(CLEAR_STRING);
            password.setInputStyle(ERROR_STYLE);
            valid = false;
        }
    }
    const nameValidation = () => {
        if (!NAME_REGEX.test(name.value) && name.value.length !== 0) {
            name.setValue(CLEAR_STRING);
            name.setInputStyle(ERROR_STYLE);
            name.setPlaceholder("Enter only latin letters");
            valid = false;
        } else if (name.value.length < 3 && name.value.length !== 0) {
            name.setValue(CLEAR_STRING);
            name.setInputStyle(ERROR_STYLE);
            name.setPlaceholder("Too short name")
            valid = false;
        } else if (name.value.length === 0) {
            name.setValue(CLEAR_STRING);
            name.setInputStyle(ERROR_STYLE);
            valid = false;
        }
    }
    const telValidation = () => {
        if (tel.value.length < 10 && tel.value.length !== 0) {
            tel.setValue(CLEAR_STRING);
            tel.setInputStyle(ClEAR_STYLE);
            tel.setPlaceholder("Too short phone number")
            valid = false;
        }
    }

    const register = () => {
        emailValidation();
        passwordValidation();
        nameValidation();
        telValidation();
        if (valid) {
            setShowLoader(true)
            axios.post(`http://31.42.189.118:8000/auth/registration`, {
                email: email.value,
                password: password.value,
                fullName: name.value,
                phone: tel.value === "" ? null : tel.value
            }, {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            })
                .then((response) => {
                    if (response.data.status === "user created") {
                        submitButton.toggleToDone();
                        email.setValue(CLEAR_STRING)
                        password.setValue(CLEAR_STRING)
                        name.setValue(CLEAR_STRING)
                        tel.setValue(CLEAR_STRING)
                        setTimeout(() => {
                            handleCloseRegistration();
                        }, 1000)
                    } else if (response.data.status === "email is used") {
                        submitButton.toggleToError("This email already exists...");
                    }
                })
                .catch(() => {
                    setError(true)
                })
                .finally(() => {
                    setShowLoader(false);
                })
        }
    }

    return (
        <>
            {error && <ErrorMessage />}
            <Modal className="Registration" show={showRegistration} onHide={handleCloseRegistration} centered>
                {error ? <ErrorMessage /> :
                    <div>
                        <Modal.Header closeButton>
                        </Modal.Header>
                        <Modal.Body>
                            <Modal.Title>{t("Sign Up")}</Modal.Title>
                            <p>{t("Already have an account?")} <span onClick={handleCloseRegistration}>{t("Login")}</span></p>
                            <form>
                                <input
                                    type="email"
                                    placeholder={t(email.placeholder)}
                                    value={email.value}
                                    onChange={(e) => email.setValue(e.target.value)}
                                    onFocus={() => {email.setPlaceholder("Enter address"); email.setInputStyle(ClEAR_STYLE)}}
                                    style={email.inputStyle}/>
                                <input
                                    type="password"
                                    placeholder={t(password.placeholder)}
                                    value={password.value}
                                    onChange={(e) => password.setValue(e.target.value)}
                                    onFocus={() => {password.setPlaceholder("Password"); password.setInputStyle(ClEAR_STYLE)}}
                                    style={password.inputStyle}/>
                                <input
                                    type="text"
                                    placeholder={t(name.placeholder)}
                                    value={name.value}
                                    onChange={(e) => name.setValue(e.target.value)}
                                    onFocus={() => {name.setPlaceholder("your name"); name.setInputStyle(ClEAR_STYLE)}}
                                    style={name.inputStyle}/>
                                <input
                                    type="tel"
                                    placeholder={t(tel.placeholder)}
                                    value={tel.value}
                                    onChange={(e) => tel.setValue(e.target.value)}
                                    onFocus={() => {tel.setInputStyle(ClEAR_STYLE); tel.setPlaceholder("Phone number (optional)")}}
                                    style={tel.inputStyle}/>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className="continue-btn"
                                onClick={register}
                                style={submitButton.style}>
                                {t(submitButton.label)}
                            </Button>
                        </Modal.Footer>
                    </div>}
            </Modal>
            {showLoader && <Loader />}
        </>
    );
};

export default Registration;