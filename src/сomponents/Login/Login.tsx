import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./Login.scss";
import {useTranslation} from "react-i18next";
import axios from "axios";
import Loader from "../Loader/Loader";
import {useNavigate} from "react-router-dom";
import {EMAIL_REGEX} from "../../shared/global.variables"
import {useSelector} from "react-redux";
import {StoreTypes} from "../../store/reducers/reducers";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

interface LoginProps {
    showLogin: boolean,
    handleCloseLogin: () => void
}

const Login = ({showLogin, handleCloseLogin}: LoginProps) => {

    const {t} = useTranslation();
    const navigate = useNavigate();
    const {login} = useSelector((state: StoreTypes) => state.auth.auth);

    const [showLoader, setShowLoader] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const [emailValue, setEmailValue] = useState<string>("");
    const [passwordValue, setPasswordValue] = useState<string>("");

    const [emailPlaceholder, setEmailPlaceholder] = useState<string>("Enter address");
    const [passwordPlaceholder, setPasswordPlaceholder] = useState<string>("Password");

    const [emailStyle, setEmailStyle] = useState<Object>({background: 'white'});
    const [passwordStyle, setPasswordStyle] = useState<Object>({background: 'white'});

    const [buttonValue, setButtonValue] = useState<string>("Continue");
    const [buttonStyle, setButtonStyle] = useState<Object>({background: "lightgray"});

    let valid: boolean = true;

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

    const loginPros = () => {
        validation();
        if (valid) {
            setShowLoader(true)
            axios.post(`http://31.42.189.118:8000/auth/login`, {
                email: emailValue,
                password: passwordValue
            }, {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
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
                            login(response.data.token);
                            navigate("/");
                        }, 1000)
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
                {error ? <ErrorMessage /> :
                <div>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                        <Modal.Title>{t("Log In")}</Modal.Title>
                        <form>
                            <input type="email" placeholder={t(emailPlaceholder)} value={emailValue} onChange={onEmailChange} style={emailStyle}/>
                            <input type="password" placeholder={t(passwordPlaceholder)} value={passwordValue} onChange={onPasswordChange} style={passwordStyle}/>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="continue-btn" onClick={loginPros} style={buttonStyle}>
                            {t(buttonValue)}
                        </Button>
                    </Modal.Footer>
                </div>}
            </Modal>
            {showLoader && <Loader />}
        </>
    );
};
export default Login;