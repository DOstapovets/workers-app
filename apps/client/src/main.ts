import './registerServiceWorker';

import { createApp } from 'vue';

import store from './store';
import core from './plugins/core';
import router from './plugins/router';
import vuetify from './plugins/vuetify';

import App from './App.vue';

const app = createApp(App).use(vuetify).use(store).use(router).use(core);

app.mount('#app');
