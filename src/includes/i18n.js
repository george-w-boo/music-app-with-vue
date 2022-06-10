import { createI18n } from "vue-i18n";
import en from "../locales/en.json";
import ua from "../locales/ua.json";

// combines translation files into one file
function loadLocaleMessages() {
  const locales = [{ en: en }, { ua: ua }];
  const messages = {};
  locales.forEach((lang) => {
    const key = Object.keys(lang);
    messages[key] = lang[key];
  });
  return messages;
}

export default createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages: loadLocaleMessages(),
  numberFormats: {
    en: {
      currency: { style: "currency", currency: "USD" },
    },
    ua: {
      currency: { style: "currency", currency: "UAH" },
    },
  },
});
