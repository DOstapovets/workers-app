import './registerServiceWorker';

import { createApp } from 'vue';

import AppSdk from 'app-sdk';

import router from './router';
import store from './store';
import vuetify from './vuetify';

import App from './App.vue';

const app = createApp(App).use(vuetify).use(store).use(router);

app.config.globalProperties.$sdk = new AppSdk(() =>
  localStorage.getItem('token'),
);

app.mount('#app');
