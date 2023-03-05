<template>
  <v-menu v-model="showPopover" :close-on-content-click="false" :close-delay="500" :open-on-hover="true">

    <template v-slot:activator="{ props }">
      <slot name="activator" v-bind="props">
        <span style="cursor: pointer" v-bind="props">
          <user-avatar :user="user" />
          {{ user.fullName || user.username }}
          <span v-if="user.fullName" class="text-secondary text-xs">
            ({{ user.username }})
          </span>
        </span>
      </slot>
    </template>

    <v-card width="250">
      <AppImage :upload="user.cover" class="align-end pb-2" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        height="200px" cover>
        <v-list-item class="w-100">
          <template v-slot:prepend>
            <UserAvatar :user="user" />
          </template>
          <v-list-item-title class="text-white">{{ user.fullName || user.username }}</v-list-item-title>
          <v-list-item-subtitle v-if="user.fullName" class="text-white">{{ user.username }}</v-list-item-subtitle>
        </v-list-item>
      </AppImage>
      <v-list v-show="expanded" variant="text" density="compact">
        <v-list-item v-if="user.email">
          <template v-slot:prepend>
            <v-icon size="small">mdi-email</v-icon>
          </template>
          <v-list-item-title>
            <v-tooltip activator="parent" location="bottom" :text="user.email"></v-tooltip>
            <span>{{ user.email }}</span>
          </v-list-item-title>
        </v-list-item>
      </v-list>
      <v-card-actions>
        <v-btn size="small" color="" variant="text" icon="mdi-message" />
        <v-btn size="small" color="" variant="text" icon="mdi-information" />
        <v-spacer />
        <v-btn variant="plain" class="ml-a" @click="() => expanded = !expanded" icon>
          <v-icon :icon="expanded ? 'mdi-chevron-up' : 'mdi-chevron-down'"></v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import type { User } from 'app-types';
import { Vue, Options } from 'vue-class-component';
import AppImage from '../common/AppImage.vue';

import UserAvatar from './UserAvatar.vue';

@Options({
  components: { UserAvatar, AppImage },
  props: {
    user: {
      type: Object as () => User,
      required: true
    }
  }
})
export default class UserProfilePopover extends Vue {
  showPopover = false;
  expanded = false;
}
</script>