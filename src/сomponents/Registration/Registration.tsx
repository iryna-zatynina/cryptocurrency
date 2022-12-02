import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./Registration.scss"
import {useTranslation} from "react-i18next";
import axios from "axios";
import Loader from "../Loader/Loader";
import {NAME_REGEX, EMAIL_REGEX} from "../../shared/global.variables"
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
            email.clearValue();
            email.toggleToErrorStyle();
            email.addPlaceholder("Don't forget about @");
            valid = false;
        } else if (email.value.length === 0) {
            email.clearValue();
            email.toggleToErrorStyle();
            valid = false;
        }
    }
    const passwordValidation = () => {
        if (password.value.length < 3 && password.value.length !== 0) {
            password.clearValue();
            password.toggleToErrorStyle();
            password.addPlaceholder("Too short password");
            valid = false;
        } else if (password.value.length === 0) {
            password.clearValue();
            password.toggleToErrorStyle();
            valid = false;
        }
    }
    const nameValidation = () => {
        if (!NAME_REGEX.test(name.value) && name.value.length !== 0) {
            name.clearValue();
            name.toggleToErrorStyle();
            name.addPlaceholder("Enter only latin letters");
            valid = false;
        } else if (name.value.length < 3 && name.value.length !== 0) {
            name.clearValue();
            name.toggleToErrorStyle();
            name.addPlaceholder("Too short name")
            valid = false;
        } else if (name.value.length === 0) {
            name.clearValue();
            name.toggleToErrorStyle();
            valid = false;
        }
    }
    const telValidation = () => {
        if (tel.value.length < 10 && tel.value.length !== 0) {
            tel.clearValue();
            tel.toggleToErrorStyle()
            tel.addPlaceholder("Too short phone number")
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
            axios.post(`https://user-simple.herokuapp.com/auth/registration`, {
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
                        email.clearValue()
                        password.clearValue()
                        name.clearValue()
                        tel.clearValue()
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
                                    onChange={email.onChange}
                                    onFocus={() => {email.addPlaceholder("Enter address"); email.toggleToNormalStyle()}}
                                    style={email.errorStyle}/>
                                <input
                                    type="password"
                                    placeholder={t(password.placeholder)}
                                    value={password.value}
                                    onChange={password.onChange}
                                    onFocus={() => {password.addPlaceholder("Password"); password.toggleToNormalStyle()}}
                                    style={password.errorStyle}/>
                                <input
                                    type="text"
                                    placeholder={t(name.placeholder)}
                                    value={name.value}
                                    onChange={name.onChange}
                                    onFocus={() => {name.addPlaceholder("your name"); name.toggleToNormalStyle()}}
                                    style={name.errorStyle}/>
                                <input
                                    type="tel"
                                    placeholder={t(tel.placeholder)}
                                    value={tel.value}
                                    onChange={tel.onChange}
                                    onFocus={() => {tel.toggleToNormalStyle(); tel.addPlaceholder("Phone number (optional)")}}
                                    style={tel.errorStyle}/>
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