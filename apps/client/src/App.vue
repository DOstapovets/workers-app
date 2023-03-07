<template>
  <v-app id="inspire">
    <!-- <app-system-bar /> -->

    <app-navigation v-if="isAuthenticated" />

    <!-- <app-header /> -->
    <v-main class="overflow-auto  vh-100" col>
      <router-view v-slot="{ Component }">
        <transition name="scale-slide">
          <component class="vh-100" :is="Component" />
        </transition>
      </router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Watch } from 'vue-property-decorator'
import { Options, Vue } from 'vue-class-component';

import AppSystemBar from './components/common/AppSystemBar.vue';
import AppNavigation from './components/common/AppNavigation.vue';
import AppHeader from './components/common/AppHeader.vue';

@Options({
  components: { AppHeader, AppSystemBar, AppNavigation },
})
export default class App extends Vue {
  get isAuthenticated() {
    return this.$store?.getters['auth/isAuthenticated'];
  }

  @Watch('isAuthenticated')
  onIsAuthenticatedChanged(isAuthenticated: boolean) {
    if (!isAuthenticated) {
      this.$router.push({ name: 'login' });
    }
  }
}
</script>


<style lang="scss">
.vh-100 {
  height: 100vh;
}
</style>

<style lang="scss" scoped>
.scale-slide-enter-active,
.scale-slide-leave-active {
  position: absolute;
  transition: all 0.15s ease-in-out;
}

.scale-slide-enter-from {
  left: -100%;
}

.scale-slide-enter-to {
  left: 0%;
}

.scale-slide-leave-from {
  transform: scale(1);
  opacity: 1;
}

.scale-slide-leave-to {
  transform: scale(0.8);
  opacity: 0;
}
</style>