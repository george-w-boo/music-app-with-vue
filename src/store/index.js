import { createStore } from "vuex";
import { auth, usersCollection } from "../includes/firebase.js";
import { Howl } from "howler";

export const store = createStore({
  state: {
    authModalShow: false,
    isUserLoggedIn: false,
    currentSong: {},
    sound: {},
    seek: "00:00",
    duration: "00:00",
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
    newSong(state, payload) {
      state.currentSong = payload;
      state.sound = new Howl({
        src: [payload.url],
        html5: true,
      });
    },
    updatePosition(state) {
      state.seek = state.sound.seek();
      state.duration = state.sound.duration();
    },
  },
  getters: {
    playing: (state) => {
      console.log("getters > playing > state", state);
      if (state.sound.playing) {
        console.log("state.sound.playing()", state.sound.playing());
        return state.sound.playing();
      }

      return false;
    },
  },
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
    async login({ commit, state }, payload) {
      await auth.signInWithEmailAndPassword(payload.email, payload.password);

      commit("toggleAuth");
    },
    async signout({ commit, state }) {
      await auth.signOut();

      commit("toggleAuth");
    },
    async newSong({ commit, state, dispatch }, payload) {
      commit("newSong", payload);

      state.sound.play();

      state.sound.on("play", () => {
        requestAnimationFrame(() => {
          dispatch("progress");
        });
      });
    },
    async toggleAudio({ state }) {
      if (!state.sound.playing) {
        return;
      }

      if (state.sound.playing()) {
        state.sound.pause();
      } else {
        state.sound.play();
      }
    },
    progress({ commit, state, dispatch }) {
      commit("updatePosition");

      if (state.sound.playing()) {
        requestAnimationFrame(() => {
          dispatch("progress");
        });
      }
    },
  },
  modules: {},
});
