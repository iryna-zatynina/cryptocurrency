import {useState} from 'react';

const useInput = (initialValueState, initialPlaceholderState) => {

    const [value, setValue] = useState(initialValueState);


    const [inputStyle, setInputStyle] = useState({})


    const [placeholder, setPlaceholder] = useState(initialPlaceholderState);


    return {value, setValue, inputStyle, setInputStyle, placeholder, setPlaceholder};
};

export default useInput;