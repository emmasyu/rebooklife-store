import { createApp } from "vue";
import { createPinia } from "pinia";
import axios from "axios";
import VueAxios from "vue-axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { Form, Field, ErrorMessage, defineRule, configure } from "vee-validate";
import AllRules from "@vee-validate/rules";
import { localize, setLocale } from "@vee-validate/i18n";
import zhTW from "@vee-validate/i18n/dist/locale/zh_TW.json";

import App from "./App.vue";
import router from "./router";
import * as filters from "./filters";

import "./assets/scss/all.scss";

library.add(fas, far, fab);
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,
});

setLocale("zh_TW");

const app = createApp(App);
const pinia = createPinia();
app.config.globalProperties.$filters = filters;

app.use(VueAxios, axios);
app.use(pinia);
app.use(router);
app.component("FontAwesomeIcon", FontAwesomeIcon);
app.component("VForm", Form);
app.component("VField", Field);
app.component("ErrorMessage", ErrorMessage);

app.mount("#app");
