<template>
  <v-menu v-model="showPopover" :close-on-content-click="false" :close-delay="500" :open-on-hover="true">

    <template v-slot:activator="{ props }">
      <slot name="activator" v-bind="props">
        <span style="cursor: pointer" v-bind="props">
          <v-icon>mdi-account</v-icon> {{ user.fullName || user.username }} <span v-if="user.fullName"
            class="text-secondary text-xs">
            ({{ user.username }})
          </span>
        </span>
      </slot>
    </template>

    <v-card width="250">
      <v-img src="https://cdn.vuetifyjs.com/images/cards/house.jpg" class="align-end pb-4"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px" cover>
        <v-card-title class="text-white">{{ user.fullName || user.username }}</v-card-title>
        <v-card-subtitle v-if="user.fullName" class="text-white">{{ user.username }}</v-card-subtitle>
      </v-img>
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
@Options({
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