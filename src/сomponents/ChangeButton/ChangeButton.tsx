import React from 'react';
import "./ChangeButton.scss"
import {useTranslation} from "react-i18next";

interface ChangeButtonProps {
    onChangeButtonClick: () => void,
    buttonHandler: () => void,
    showChangeBlock: boolean
}

const ChangeButton = ({onChangeButtonClick, buttonHandler, showChangeBlock}: ChangeButtonProps) => {

    const {t} = useTranslation();

    const onClick = () => {
        onChangeButtonClick();
        if (!showChangeBlock) {
            buttonHandler()
        }
    }
    return (
        <div className="ChangeButton">
            <div className="container">
                <button onClick={onClick}>{t('Change profile')}</button>
            </div>
        </div>
    );
};

export default ChangeButton;