import React from 'react';
import "./CryptoInfo.scss";
import {Link} from "react-router-dom";

export interface ICrypto {
    id: number,
    name: string,
    price: string,
    symbol: string
}
interface CryptoInfoProps {
    item: ICrypto,
    num: number
}

const CryptoInfo = ({item, num}: CryptoInfoProps) => {

    return (
        <div className="CryptoInfo">
            <Link to={`${num}`} onClick={() => {
                console.log(item)}}>
                <span>{num}</span>
                <span className="name">{item.name}</span>
                <span>{item.price}</span>
                <span>{item.symbol}</span>
            </Link>
        </div>
    );
};

export default CryptoInfo;