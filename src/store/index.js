import { createStore } from "vuex";
import { auth, usersCollection } from "../includes/firebase.js";

export const store = createStore({
  state: {
    authModalShow: false,
    isUserLoggedIn: false,
  },
  mutations: {
    toggleAuthModal: (state) => {
      state.authModalShow = !state.authModalShow;
    },
    toggleAuth: (state) => {
      console.log("isUserLoggedIn", state.isUserLoggedIn);
      state.isUserLoggedIn = !state.isUserLoggedIn;
      console.log("isUserLoggedIn", state.isUserLoggedIn);
    },
  },
  getters: {},
  actions: {
    async register({ commit }, payload) {
      await auth.createUserWithEmailAndPassword(
        payload.email,
        payload.password
      );

      await usersCollection.add({
        name: payload.name,
        email: payload.email,
        age: payload.age,
        country: payload.country,
      });

      commit("toggleAuth");
    },
  },
  modules: {},
});
