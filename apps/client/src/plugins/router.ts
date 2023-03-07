import store from '@/store';
import {
  createRouter,
  createWebHistory,
  NavigationGuardWithThis,
  RouteRecordRaw,
} from 'vue-router';
import HomeView from '../views/HomeView.vue';

const isAuthenticated: NavigationGuardWithThis<undefined> = (
  to,
  from,
  next,
) => {
  const isAuthenticated = store.getters['auth/isAuthenticated'];

  if (isAuthenticated) {
    next();
  } else {
    next({ name: 'login' });
  }
};

const isNotAuthenticated: NavigationGuardWithThis<undefined> = (
  to,

  from,
  next,
) => {
  const isAuthenticated = store.getters['auth/isAuthenticated'];

  if (isAuthenticated) {
    next({ name: 'home' });
  } else {
    next();
  }
};

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    beforeEnter: isAuthenticated,
    component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
    beforeEnter: isNotAuthenticated,
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/LoginView.vue'),
  },
  {
    path: '/users',
    name: 'users',
    beforeEnter: isAuthenticated,
    component: () =>
      import(/* webpackChunkName: "chat" */ '../views/UserView.vue'),
  },
  {
    path: '/chat',
    name: 'chat',
    beforeEnter: isAuthenticated,
    component: () =>
      import(/* webpackChunkName: "chat" */ '../views/ChatView.vue'),
  },
  {
    path: '/gallery',
    name: 'gallery',
    beforeEnter: isAuthenticated,
    component: () =>
      import(/* webpackChunkName: "chat" */ '../views/UploadsView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
