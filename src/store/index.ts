import type { InjectionKey } from "vue";
import { createStore, Store } from "vuex";

// define your typings for the store state
export interface State {
  authModalShow: boolean;
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    authModalShow: false,
  },
  mutations: {
    toggleAuthModal: (state: State) => {
      state.authModalShow = !state.authModalShow;
    },
  },
  getters: {},
  actions: {},
  modules: {},
});
