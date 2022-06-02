import { createApp } from "vue";
import App from "./App.vue";
// import router
import { store } from "./store/index";
import VeeValidatePlugin from "./includes/validation.js";
import "./assets/base.css";
import { key } from "./store";
import { defineRule } from "vee-validate";

const app = createApp(App);

app.use(store, key);
app.use(VeeValidatePlugin);
app.mount("#app");
