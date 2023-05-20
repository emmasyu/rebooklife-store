import { createApp } from "vue";
import { createPinia } from "pinia";
import axios from "axios";
import VueAxios from "vue-axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faBackwardFast,
  faBars,
  faBookmark as fasBookmark,
  faCaretDown,
  faCaretLeft,
  faCaretUp,
  faCaretRight,
  faCartShopping,
  faEnvelope,
  faEye,
  faEyeSlash,
  faForwardFast,
  faPenToSquare,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  faLine,
  faLinkedin,
  faSquareGithub,
  faSquareInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faBookmark as farBookmark } from "@fortawesome/free-regular-svg-icons";

import App from "./App.vue";
import router from "./router";
import * as filters from "./filters";

import "./assets/scss/all.scss";

library.add(
  faBackwardFast,
  faBars,
  fasBookmark,
  faCaretDown,
  faCaretLeft,
  faCaretUp,
  faCaretRight,
  faCartShopping,
  faEnvelope,
  faEye,
  faEyeSlash,
  faForwardFast,
  faPenToSquare,
  faTrash,
  faXmark,
  faLine,
  faLinkedin,
  faSquareGithub,
  faSquareInstagram,
  farBookmark
);

const app = createApp(App);
const pinia = createPinia();
app.config.globalProperties.$filters = filters;

app.use(VueAxios, axios);
app.use(pinia);
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
