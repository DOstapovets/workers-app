/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module '@vue/runtime-core' {
  import type AppSdk from 'app-sdk';
  import type AuthService from 'app-core/auth';
  interface ComponentCustomProperties {
    $sdk: AppSdk;
    $auth: AuthService;
  }
}
