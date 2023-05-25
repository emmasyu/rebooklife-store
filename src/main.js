import { createApp } from "vue";
import { createPinia } from "pinia";
import axios from "axios";
import VueAxios from "vue-axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

import App from "./App.vue";
import router from "./router";
import * as filters from "./filters";

import "./assets/scss/all.scss";

library.add(fas, far, fab);

const app = createApp(App);
const pinia = createPinia();
app.config.globalProperties.$filters = filters;

app.use(VueAxios, axios);
app.use(pinia);
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
