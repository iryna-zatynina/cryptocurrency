import {useState} from 'react';

const useInput = (initialValueState, initialPlaceholderState) => {

    const [value, setValue] = useState(initialValueState);
    const onChange = (e) => {
        setValue(e.target.value)
    }
    const clearValue = () => {
        setValue("")
    }

    const [errorStyle, setErrorStyle] = useState({})
    const toggleToErrorStyle = () => {
        setErrorStyle({background: "#fce6e6"})
    }
    const toggleToNormalStyle= () => {
        setErrorStyle({background: "white"})
    }

    const [placeholder, setPlaceholder] = useState(initialPlaceholderState);
    const addPlaceholder = (message) => {
        setPlaceholder(message);
    }

    return {value, onChange, clearValue, errorStyle, toggleToErrorStyle, toggleToNormalStyle, placeholder, addPlaceholder};
};

export default useInput;