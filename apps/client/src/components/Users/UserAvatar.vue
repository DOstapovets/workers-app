<template>
  <v-avatar size="32" color="grey lighten-4" icon="mdi-account" :image="user?.avatar?.originalUrl" class="mr-2">
  </v-avatar>
</template>

<script lang="ts">
import type { User } from 'app-types';
import { Options, Vue } from 'vue-class-component';
@Options({
  props: {
    user: {
      type: Object as () => User,
      required: true
    }
  }
})
export default class UserAvatar extends Vue { }
</script>