import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./Registration.scss"
import {useTranslation} from "react-i18next";
import axios from "axios";
import Loader from "../Loader/Loader";

interface RegistrationProps {
    show: boolean,
    handleClose: () => void
}

const Registration = ({show, handleClose}: RegistrationProps) => {

    const {t} = useTranslation();

    const [showLoader, setShowLoader] = useState<boolean>(false);

    const [emailValue, setEmailValue] = useState<string>("");
    const [passwordValue, setPasswordValue] = useState<string>("");
    const [nameValue, setNameValue] = useState<string>("");
    const [telValue, setTelValue] = useState<string>("");

    const [emailPlaceholder, setEmailPlaceholder] = useState<string>("Enter address");
    const [passwordPlaceholder, setPasswordPlaceholder] = useState<string>("Password");
    const [namePlaceholder, setNamePlaceholder] = useState<string>("Your name");
    const [telPlaceholder, setTelPlaceholder] = useState<string>("Phone number (optional)");

    const [emailStyle, setEmailStyle] = useState<Object>({background: 'white'});
    const [passwordStyle, setPasswordStyle] = useState<Object>({background: 'white'});
    const [nameStyle, setNameStyle] = useState<Object>({background: 'white'});
    const [telStyle, setTelStyle] = useState<Object>({background: 'white'});

    const [buttonValue, setButtonValue] = useState<string>("Continue");
    const [buttonStyle, setButtonStyle] = useState<Object>({background: "lightgray"});

    let valid: boolean = true;

    const validation = () => {
        const emailRegex = /@/g;
        if (!emailRegex.test(emailValue) && emailValue.length !== 0) {
            setEmailValue("")
            setEmailStyle({background: '#fce6e6'})
            setEmailPlaceholder("Don't forget about @")
            valid = false;
        } else if (emailValue.length === 0) {
            setEmailValue("")
            setEmailStyle({background: '#fce6e6'})
            valid = false;
        }

        if (passwordValue.length < 3 && passwordValue.length !== 0) {
            setPasswordStyle({background: '#fce6e6'})
            setPasswordValue("")
            setPasswordPlaceholder("Too short password")
            valid = false;
        } else if (passwordValue.length === 0) {
            setPasswordValue("")
            setPasswordStyle({background: '#fce6e6'})
            valid = false;
        }

        const nameRegex = /[a-zA-Z]+$/g;
        if (!nameRegex.test(nameValue) && nameValue.length !== 0) {
            setNameValue("")
            setNameStyle({background: '#fce6e6'})
            setNamePlaceholder("Enter only latin letters")
            valid = false;
        } else if (nameValue.length < 3 && nameValue.length !== 0) {
            setNameStyle({background: '#fce6e6'})
            setNameValue("")
            setNamePlaceholder("Too short name")
            valid = false;
        } else if (nameValue.length === 0) {
            setNameStyle({background: '#fce6e6'})
            setNameValue("")
            valid = false;
        }
        if (telValue.length < 10 && telValue.length !== 0) {
            setTelStyle({background: '#fce6e6'})
            setTelValue("")
            setTelPlaceholder("Too short phone number")
            valid = false;
        }
    }

    const register = () => {
        validation();
        console.log(valid)
        if (valid) {
            setShowLoader(true)
            axios.post(`https://user-simple.herokuapp.com/auth/registration`, {
                email: emailValue,
                password: passwordValue,
                fullName: nameValue,
                phone: telValue === "" ? null : telValue
            })
                .then((response) => {
                    setShowLoader(false);
                    if (response.data.status === "user created") {
                        setButtonValue("Done!");
                        setButtonStyle({background: "green"})
                        setEmailValue("");
                        setPasswordValue("");
                        setNameValue("")
                        setTelValue("")
                        setTimeout(() => {
                            handleClose();
                        }, 1000)
                    } else if (response.data.status === "email is used") {
                        setButtonValue("This email already exists...");
                        setButtonStyle({background: "red"})
                    }
                })
        }

    }

    const onEmailChange = (e) => {
        setEmailValue(e.target.value);
        setEmailStyle({background: 'white'});
        setButtonValue("Continue");
        setButtonStyle({background: "lightgrey"})
    }
    const onPasswordChange = (e) => {
        setPasswordValue(e.target.value);
        setPasswordStyle({background: 'white'});
    }
    const onNameChange = (e) => {
        setNameValue(e.target.value);
        setNameStyle({background: 'white'});
    }
    const onTelChange = (e) => {
        setTelValue(e.target.value);
    }
    const onTelFocus = () => {
        setTelStyle({background: 'white'})
        setTelPlaceholder("Phone number (optional)")
    }

    return (
        <>
            <Modal className="Registration" show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <Modal.Title>{t("Sign Up")}</Modal.Title>
                    <p>{t("Already have an account?")} <span onClick={handleClose}>{t("Login")}</span></p>
                    <form>
                        <input type="email" placeholder={t(emailPlaceholder)} value={emailValue} onChange={onEmailChange} style={emailStyle}/>
                        <input type="password" placeholder={t(passwordPlaceholder)} value={passwordValue} onChange={onPasswordChange} style={passwordStyle}/>
                        <input type="text" placeholder={t(namePlaceholder)} value={nameValue} onChange={onNameChange} style={nameStyle}/>
                        <input type="tel" placeholder={t(telPlaceholder)} value={telValue} onChange={onTelChange} onFocus={onTelFocus} style={telStyle}/>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="continue-btn" onClick={register} style={buttonStyle}>
                        {t(buttonValue)}
                    </Button>
                </Modal.Footer>
            </Modal>
            {showLoader && <Loader />}
        </>
    );
};

export default Registration;