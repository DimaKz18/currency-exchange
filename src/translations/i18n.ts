import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
	en: { translation: require('./en.json') },
};

i18n.use(initReactI18next).init({
	resources,
	ns: Object.keys(resources),
	lng: 'en',
	fallbackLng: 'en',
	debug: true,
	react: {
		useSuspense: false,
	},
	interpolation: {
		escapeValue: false,
	},
});

export const i18next = i18n;
