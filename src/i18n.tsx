import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import translationEN from './locales/en/translation.json'
import translationUA from './locales/ua/translation.json';
import translationRU from './locales/ru/translation.json';

const resources = {
    en: {
        translation: translationEN
    },
    ua: {
        translation: translationUA
    },
    ru: {
        translation: translationRU
    }
}

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "en",
        fallbackLng: "ua",
        interpolation: {
            escapeValue: false
        }
    })