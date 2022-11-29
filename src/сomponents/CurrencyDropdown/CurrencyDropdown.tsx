import React from 'react';
import "./CurrencyDropdown.scss"
import Dropdown from "react-bootstrap/Dropdown";

interface CurrencyDropdownProps {
    currency: string,
    setCurrency: (argument: string) => void
}

const CurrencyDropdown = ({currency, setCurrency}: CurrencyDropdownProps) => {
    return (
        <Dropdown className="CurrencyDropdown">
            <Dropdown.Toggle id="dropdown-basic">
                {currency}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={() => {setCurrency('USD')}} href="#/action-1">USD</Dropdown.Item>
                <Dropdown.Item onClick={() => {setCurrency('EUR')}} href="#/action-2">EUR</Dropdown.Item>
                <Dropdown.Item onClick={() => {setCurrency('UAH')}} href="#/action-3">UAH</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default CurrencyDropdown;