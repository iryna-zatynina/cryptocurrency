import React from 'react';
import "./CryptoInfo.scss";

export interface ItemInterface {
    id: number,
    name: string,
    price: string,
    symbol: string
}
interface CryptoInfoProps {
    item: ItemInterface,
    num: number
}


const CryptoInfo = ({item, num}: CryptoInfoProps) => {

    return (
        <div className="CryptoInfo">
            <span>{num}</span>
            <span>{item.name}</span>
            <span>{item.price}</span>
            <span>{item.symbol}</span>
        </div>
    );
};

export default CryptoInfo;