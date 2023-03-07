import type { Module } from 'vuex';

import { User } from 'app-types';

const authModule: Module<any, any> = {
  namespaced: true,
  state: {
    user: null,
    token: null,
  },
  getters: {
    // computed properties for stores
    isAuthenticated(state) {
      return !!state.user && !!state.token;
    },
  },
  mutations: {
    // synchronous changes to the store
    setUser(state, user: User) {
      state.user = user;
    },
    setToken(state, token: string) {
      state.token = token;
      console.log(this);
    },
  },
};

export default authModule;
