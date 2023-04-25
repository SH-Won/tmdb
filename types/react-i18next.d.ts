import { resources, defaultLanguage } from "@/i18n";
import ko from '@/i18n/ko.json'
import en from '@/i18n/en.json'
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultLanguage : typeof defaultLanguage
    resources : {
      ko : typeof ko
      en : typeof en
    }
  }
}

