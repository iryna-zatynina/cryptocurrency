import {useState} from "react";

const useSubmitButton = (initialState) => {

    const [label, setLabel] = useState(initialState);
    const [style, setStyle] = useState({});

    const toggleToDone = () => {
        setLabel("Done");
        setStyle({background: "green"});
    }

    const toggleToError = (error) => {
        setLabel(error);
        setStyle({background: "red"});
    }

    const toggleToSubmit = () => {
        setLabel("Submit");
        setStyle({});
    }

    return {label, style, toggleToDone, toggleToError, toggleToSubmit};
};

export default useSubmitButton;