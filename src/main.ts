import { createApp } from "vue";
import App from "./App.vue";
// import router
import { store } from "./store/index";
import "./assets/base.css";
import { key } from "./store";

const app = createApp(App);

app.use(store, key);
app.mount("#app");
