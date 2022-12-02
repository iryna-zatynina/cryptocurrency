import React, {forwardRef, useState} from 'react';
import "./ChangeProfile.scss"
import {useTranslation} from "react-i18next";
import useInput from "../../hooks/input.hook";
import axios from "axios";
import {useSelector} from "react-redux";
import {StoreTypes} from "../../store/reducers/reducers";
import {NAME_REGEX} from "../../shared/global.variables";
import useSubmitButton from "../../hooks/submitButton.hook";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

interface ChangeProfileProps {
    onChangeButtonClick: () => void,
    getPersonalData: () => void
}
type Ref = HTMLDivElement;

const ChangeProfile = forwardRef<Ref, ChangeProfileProps>(({onChangeButtonClick, getPersonalData},  ref) => {

    const {t} = useTranslation();
    const name = useInput("", "");
    const currentPassword = useInput("", "");
    const newPassword = useInput("", "");
    const submitName = useSubmitButton("Submit");
    const submitPassword = useSubmitButton("Submit");
    const {token} = useSelector((state: StoreTypes) => state.auth.auth);
    const [loader, setLoader] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    let valid: boolean = true;

    const nameValidation = (name) => {
        if (!NAME_REGEX.test(name.value) && name.value.length !== 0) {
            name.clearValue();
            name.toggleToErrorStyle();
            name.addErrorMessage("Enter only latin letters");
            valid = false;
        } else if (name.value.length < 3 && name.value.length !== 0) {
            name.clearValue();
            name.toggleToErrorStyle();
            name.addErrorMessage("Too short name")
            valid = false;
        } else if (name.value.length === 0) {
            name.clearValue();
            name.toggleToErrorStyle();
            valid = false;
        }
    }
    const passwordValidation = (password) => {
        if (password.value.length < 3 && password.value.length !== 0) {
            password.clearValue();
            password.toggleToErrorStyle()
            password.addErrorMessage("Too short password")
            valid = false;
        } else if (password.value.length === 0) {
            password.clearValue();
            password.toggleToErrorStyle()
            valid = false;
        }
    }
    const changeName = () => {
        nameValidation(name);
        if (valid) {
            setLoader(true);
            axios.post(`https://user-simple.herokuapp.com/auth/changeAccountName`, {
                name: name.value
            },{
                headers: {
                    'authorization': token
                }
            })
                .then(() => {
                    name.clearValue();
                    name.toggleToNormalStyle();
                    submitName.toggleToDone();
                    setTimeout(() => {
                        onChangeButtonClick();
                        getPersonalData();
                    }, 1000)
                })
                .catch(() => {
                    setError(true)
                })
                .finally(() => {
                    setLoader(false);
                })
        }
    }

    const changePassword = () => {
        passwordValidation(currentPassword);
        passwordValidation(newPassword);
        if (valid) {
            setLoader(true);
            axios.post(`https://user-simple.herokuapp.com/auth/changeAccountPassword`, {
                oldPassword: currentPassword.value,
                newPassword: newPassword.value
            },{
                headers: {
                    'authorization': token
                }
            })
                .then(({data}) => {
                    currentPassword.clearValue();
                    newPassword.clearValue();
                    if (data.status === "an incorrect old password") {
                        submitPassword.toggleToError("Error");
                        currentPassword.addPlaceholder("An incorrect old password");
                        currentPassword.toggleToErrorStyle();
                        currentPassword.clearValue();
                        newPassword.clearValue();
                        setTimeout(() => {
                            submitPassword.toggleToSubmit()
                        }, 1000)
                    } else {
                        submitPassword.toggleToDone()
                        setTimeout(() => {
                            onChangeButtonClick();
                        }, 1000)
                    }
                })
                .catch(() => {
                    setError(true)
                })
                .finally(() => {
                    setLoader(false);
                })
        }
    }

    return (
        <div ref={ref} className="ChangeProfile">
            <div className="container">
                {error ? <ErrorMessage/> :
                    <div className="wrapper">
                        <h1>{t("Change profile")}</h1>
                        <h2>{t("Change name")}</h2>
                        <form>
                            <span>{t("New name")}:</span>
                            <input
                                onFocus={() => {
                                    name.toggleToNormalStyle();
                                    name.addPlaceholder("")
                                }}
                                placeholder={t(name.placeholder)}
                                style={name.errorStyle}
                                value={name.value}
                                onChange={name.onChange} type="text"/>
                            <button
                                style={submitName.style}
                                onClick={changeName}
                                className="submit-btn"
                                type="button">
                                {t(submitName.label)}
                            </button>
                        </form>
                        <h2>{t("Change password")}</h2>
                        <form>
                            <span>{t("Current password")}:</span>
                            <input
                                onFocus={() => {
                                    currentPassword.toggleToNormalStyle();
                                    currentPassword.addPlaceholder("")
                                }}
                                placeholder={t(currentPassword.placeholder)}
                                style={currentPassword.errorStyle}
                                value={currentPassword.value}
                                onChange={currentPassword.onChange}
                                type="password"/>
                            <span>{t("New password")}:</span>
                            <input
                                onFocus={() => {
                                    newPassword.toggleToNormalStyle();
                                    newPassword.addPlaceholder("")
                                }}
                                placeholder={t(newPassword.placeholder)}
                                style={newPassword.errorStyle}
                                value={newPassword.value}
                                onChange={newPassword.onChange}
                                type="password"/>
                            <button
                                style={submitPassword.style}
                                onClick={changePassword}
                                className="submit-btn"
                                type="button">
                                {t(submitPassword.label)}
                            </button>
                        </form>
                        {loader && <Loader />}
                    </div>
                }
            </div>
        </div>
    );
});

export default ChangeProfile;