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
      const userCred = await auth.createUserWithEmailAndPassword(
        payload.email,
        payload.password
      );

      await usersCollection.doc(userCred.user.uid).set({
        name: payload.name,
        email: payload.email,
        age: payload.age,
        country: payload.country,
      });

      await userCred.user.updateProfile({
        displayName: payload.name,
      });

      commit("toggleAuth");
    },
    init_login({ commit }) {
      const user = auth.currentUser;

      if (user) {
        commit("toggleAuth");
      }
    },
    async login({ commit }, payload) {
      console.log("isUserLoggedIn", isUserLoggedIn);
      await auth.signInWithEmailAndPassword(payload.email, payload.password);

      console.log("isUserLoggedIn", isUserLoggedIn);
      commit("toggleAuth");
      console.log("isUserLoggedIn", isUserLoggedIn);
    },
  },
  modules: {},
});
