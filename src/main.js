import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import { store } from "./store/index";
import VeeValidatePlugin from "./includes/validation.js";
import { auth } from "./includes/firebase.js";
import icon from "./directives/icon";
import i18n from "./includes/i18n";
import "./assets/base.css";
import ProgressBar from "./includes/progress-bar";
import "nprogress/nprogress.css";

ProgressBar(router);

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);

    app.use(i18n);
    app.use(store);
    app.use(router);
    app.use(VeeValidatePlugin);
    app.directive("icon", icon);

    app.mount("#app");
  }
});
