import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ko from './ko.json'
import en from './en.json'
export const defaultLanguage = 'ko'
export const resources = {
  ko : {translation : ko},
  en : {translation : en},
} as const

i18n.use(initReactI18next).init({
  resources,
  lng : defaultLanguage,
  // fallbackLng: {
  //       // "en-US": ["en-US"], // 한국어 불러오는 것이 실패했을 경우 영문을 써라 라는 말입니다.
  //   // default: ["ko-KR"]
  //   "en" : ['en'],
  //   default : ['ko'],
  // },
  // debug: true,
  // keySeparator: false,
  // interpolation: {
  //   escapeValue: false
  // },
  // react: {
  //   useSuspense: false
  // }
})

export default i18n