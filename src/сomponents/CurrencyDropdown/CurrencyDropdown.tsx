import React, {useCallback} from 'react';
import "./CurrencyDropdown.scss"
import Dropdown from "react-bootstrap/Dropdown";
import {useDispatch, useSelector} from "react-redux";
import {StoreTypes} from "../../store/reducers/reducers";
import {changeCurrencyAction} from "../../store/reducers/currency/currencyReduser";

interface CurrencyDropdownProps {
    currency: string,
    setCurrency: (argument: string) => void
}

const CurrencyDropdown = () => {

    const dispatch = useDispatch()
    const currency = useSelector((state: StoreTypes) => state.currencyReducer.currency)
    const setCurrency = useCallback((currency: string) => {
        dispatch(changeCurrencyAction(currency))
    }, [dispatch])

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