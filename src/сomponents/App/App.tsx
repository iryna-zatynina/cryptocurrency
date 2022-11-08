import React from 'react';
import "./App.scss"
import useRoutes from "../../hooks/route.hook";
import {BrowserRouter} from "react-router-dom";
import "../../i18n";

const App:React.FC = () => {

    const routes = useRoutes();

    return (
        <div className="App">
            <BrowserRouter>
                {routes}
            </BrowserRouter>
        </div>
    );
};

export default App;
