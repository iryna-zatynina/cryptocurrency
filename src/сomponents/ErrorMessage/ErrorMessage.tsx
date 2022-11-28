import React from 'react';

const ErrorMessage: React.FC = () => {
    const img = require("./error.gif");
    return (
        <div>
            <img style={{display: 'block', width: '250px', height: '60vh', objectFit: 'contain', margin: '0 auto'}} src={img} alt=""/>
        </div>
    );
};

export default ErrorMessage;