import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./Login.scss";
import {useTranslation} from "react-i18next";
import axios from "axios";
import Loader from "../Loader/Loader";
import {useNavigate} from "react-router-dom";

interface LoginProps {
    showLogin: boolean,
    handleCloseLogin: () => void
}

const Login = ({showLogin, handleCloseLogin}: LoginProps) => {

    const {t} = useTranslation();
    const navigate = useNavigate()

    const [showLoader, setShowLoader] = useState<boolean>(false);

    const [emailValue, setEmailValue] = useState<string>("");
    const [passwordValue, setPasswordValue] = useState<string>("");

    const [emailPlaceholder, setEmailPlaceholder] = useState<string>("Enter address");
    const [passwordPlaceholder, setPasswordPlaceholder] = useState<string>("Password");

    const [emailStyle, setEmailStyle] = useState<Object>({background: 'white'});
    const [passwordStyle, setPasswordStyle] = useState<Object>({background: 'white'});

    const [buttonValue, setButtonValue] = useState<string>("Continue");
    const [buttonStyle, setButtonStyle] = useState<Object>({background: "lightgray"});

    let valid: boolean = true;
    const EMAIL_REGEX = /@/g;

    const validation = () => {
        if (!EMAIL_REGEX.test(emailValue) && emailValue.length !== 0) {
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
    }

    const login = () => {
        validation();
        if (valid) {
            setShowLoader(true)
            axios.post(`https://user-simple.herokuapp.com/auth/login`, {
                email: emailValue,
                password: passwordValue
            })
                .then((response) => {
                    setShowLoader(false);
                    if (response.data.status === "user is not defined") {
                        setButtonValue("This email is not registered");
                        setButtonStyle({background: "red"})
                    } else if (response.data.status === "an incorrect password") {
                        setButtonValue("An incorrect password");
                        setButtonStyle({background: "red"})
                    } else {
                        setButtonValue("Done!");
                        setButtonStyle({background: "green"})
                        setEmailValue("");
                        setPasswordValue("");
                        setTimeout(() => {
                            handleCloseLogin();
                            navigate("/cryptos")
                        }, 1000)
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
        setButtonValue("Continue");
        setButtonStyle({background: "lightgrey"})
    }

    return (
        <>
            <Modal className="Login " show={showLogin} onHide={handleCloseLogin} centered>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <Modal.Title>{t("Log In")}</Modal.Title>
                    <form>
                        <input type="email" placeholder={t(emailPlaceholder)} value={emailValue} onChange={onEmailChange} style={emailStyle}/>
                        <input type="password" placeholder={t(passwordPlaceholder)} value={passwordValue} onChange={onPasswordChange} style={passwordStyle}/>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="continue-btn" onClick={login} style={buttonStyle}>
                        {t(buttonValue)}
                    </Button>
                </Modal.Footer>
            </Modal>
            {showLoader && <Loader />}
        </>
    );
};

export default Login;