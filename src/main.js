import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import { store } from "./store/index";
import VeeValidatePlugin from "./includes/validation.js";
import { auth } from "./includes/firebase.js";
import icon from "./directives/icon";
import "./assets/base.css";

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);

    app.use(store);
    app.use(router);
    app.use(VeeValidatePlugin);
    app.directive("icon", icon);

    app.mount("#app");
  }
});
