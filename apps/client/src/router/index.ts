import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/users',
    name: 'users',
    component: () =>
      import(/* webpackChunkName: "chat" */ '../views/UserView.vue'),
  },
  {
    path: '/chat',
    name: 'chat',
    component: () =>
      import(/* webpackChunkName: "chat" */ '../views/ChatView.vue'),
  },
  {
    path: '/gallery',
    name: 'gallery',
    component: () =>
      import(/* webpackChunkName: "chat" */ '../views/UploadsView.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
