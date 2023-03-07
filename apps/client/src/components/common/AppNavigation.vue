<template>
  <v-navigation-drawer expand-on-hover absolute rail>
    <v-list>
      <v-list-item v-if="isAuthenticated" :prepend-avatar="user.avatar.originalUrl" :title="user.fullName"
        :subtitle="user.username">
        <template v-slot:image>
          <UserAvatar :user="user" />
        </template>
      </v-list-item>
    </v-list>
    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-apps" title="Dashboard" link to="/" />

      <v-divider class="mx-3 my-5" />

      <v-list-item prepend-icon="mdi-chat" title="Chat" to="chat" />

      <v-list-item prepend-icon="mdi-account-multiple" title="Users" to="users" />

      <v-list-item prepend-icon="mdi-cloud-upload-outline" title="Gallery" to="gallery" />
    </v-list>

    <template v-slot:append>
      <v-list-item prepend-icon="mdi-logout" title="Logout" link @click="logout" />
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import UserAvatar from '../users/UserAvatar.vue';

@Options({
  components: {
    UserAvatar
  }
})
export default class AppNavigation extends Vue {

  get user() {
    return this.$store?.state?.auth?.user;
  }

  get isAuthenticated() {
    return this.$store?.getters['auth/isAuthenticated'];
  }

  logout() {
    this.$auth.logout().then(() => {
      this.$router.push({ name: 'login' });
    })
  }
}
</script>