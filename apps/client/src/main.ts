import { createApp } from 'vue';

import './registerServiceWorker';

import router from './router';
import store from './store';
import vuetify from './vuetify';

import App from './App.vue';

createApp(App).use(vuetify).use(store).use(router).mount('#app');
