import { createStore } from "vuex";
import auth from "./modules/auth";
import player from "./modules/player";

export const store = createStore({
  modules: {
    auth,
    player,
  },
});
