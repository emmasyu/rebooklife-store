import { createApp } from "vue";
import { createPinia } from "pinia";
import axios from "axios";
import VueAxios from "vue-axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faEye,
  faEyeSlash,
  faTrash,
  faPenToSquare,
  faCaretDown,
  faCaretLeft,
  faCaretRight,
  faBackwardFast,
  faForwardFast,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import App from "./App.vue";
import router from "./router";
import * as filters from "./filters";

import "./assets/scss/all.scss";

library.add(
  faEye,
  faEyeSlash,
  faTrash,
  faPenToSquare,
  faCaretDown,
  faCaretLeft,
  faCaretRight,
  faBackwardFast,
  faForwardFast,
  faBars,
  faXmark
);

const app = createApp(App);
const pinia = createPinia();
app.config.globalProperties.$filters = filters;

app.use(VueAxios, axios);
app.use(pinia);
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
