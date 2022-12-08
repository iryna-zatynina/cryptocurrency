import React, {useCallback, useRef, useState} from 'react';
import Header from "../../сomponents/Header/Header";
import Footer from "../../сomponents/Footer/Footer";
import PersonalProfile, {IData} from "../../сomponents/PersonalProfile/PersonalProfile";
import BackButton from "../../сomponents/BackButton/BackButton";
import ChangeButton from "../../сomponents/ChangeButton/ChangeButton";
import ChangeProfile from "../../сomponents/ChangeProfile/ChangeProfile";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {StoreTypes} from "../../store/reducers/reducers";
import {getPersonalDataAction} from "../../store/reducers/personalData/personalReducer";

const MyAccount = () => {

    const [showChangeBlock, setShowChangeBlock] = useState<boolean>(false);

    const onChangeButtonClick = () =>{
        setShowChangeBlock(!showChangeBlock);
    }

    const ref = useRef<HTMLDivElement>(null);
    const buttonHandler = () => {
        setTimeout(() => {
            if (ref.current) {
                ref.current.scrollIntoView();
            }
        }, 100)
    };

    const [loader, setLoader] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const formatDate = (dc) => {
        return new Date(dc).toLocaleDateString()
    }

    const {token} = useSelector((state: StoreTypes) => state.auth.auth)

    const dispatch = useDispatch()
    const personalData = useSelector((state: StoreTypes) => state.personalDataReducer.data)

    const setPersonalData = useCallback((personalData: IData) => {
        dispatch(getPersonalDataAction(personalData))
    }, [dispatch, personalData])


    const getPersonalData = () => {
        setLoader(true);
        axios.get(`http://31.42.189.118:8000/auth/getAccountInformation`, {
            headers: {
                'authorization': token
            }
        })
            .then(({data}) => {
                setPersonalData({
                    name: data.fullName,
                    email: data.email,
                    tel: data.phone ? data.phone : "not specified",
                    regDate: formatDate(data.dc)
                })
            })
            .catch(() => {
                setError(true)
            })
            .finally(() => {
                setLoader(false);
            })
    }

    return (
        <>
            <Header showLandingButtons={false} showAccountButtons={true}/>
            <BackButton />
            <PersonalProfile loader={loader} error={error} getPersonalData={getPersonalData} />
            <ChangeButton onChangeButtonClick={onChangeButtonClick} showChangeBlock={showChangeBlock} buttonHandler={buttonHandler}/>
            {showChangeBlock && <ChangeProfile getPersonalData={getPersonalData} onChangeButtonClick={onChangeButtonClick} ref={ref}/>}
            <Footer />
        </>
    );
};

export default MyAccount;