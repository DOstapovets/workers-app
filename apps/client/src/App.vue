<template>
  <v-app id="inspire">
    <!-- <app-system-bar /> -->

    <app-navigation />

    <!-- <app-header /> -->
    <v-main col>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import AppSystemBar from './components/common/AppSystemBar.vue';
import AppNavigation from './components/common/AppNavigation.vue';
import AppHeader from './components/common/AppHeader.vue';

@Options({
  components: { AppHeader, AppSystemBar, AppNavigation },
})
export default class App extends Vue { }
</script>


<style lang="scss"></style>
