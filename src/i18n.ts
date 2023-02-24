import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import fr from "../src/locales/fr/commons.json";
import en from "../src/locales/en/commons.json";

const resources = {
	fr: fr,
	en: en,
};

i18n.use(initReactI18next).init({
	resources,
	lng: "fr",
	fallbackLng: "fr",
	defaultNS: "commons",
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
