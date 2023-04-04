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
} from "@fortawesome/free-solid-svg-icons";

import App from "./App.vue";
import router from "./router";

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
  faForwardFast
);

const app = createApp(App);
const pinia = createPinia();

app.use(VueAxios, axios);
app.use(pinia);
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
