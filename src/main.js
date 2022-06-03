import { createApp } from "vue";
import App from "./App.vue";
// import router
import { store } from "./store/index";
import VeeValidatePlugin from "./includes/validation.js";
import { auth } from "./includes/firebase.js";
import "./assets/base.css";

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);

    app.use(store);
    app.use(VeeValidatePlugin);

    app.mount("#app");
  }
});
