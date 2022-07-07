import { createI18n } from 'vue-i18n'
import enUS from "./lang/enUS.json";
import zhCN from "./lang/zhCN.json";
import zhTW from "./lang/zhTW.json";

const messages = {
  enUS, zhCN, zhTW
}

const i18n = createI18n({
  // legacy: false,
  // globalInjection: true,

  locale: 'enUS',
  messages
})

export default i18n