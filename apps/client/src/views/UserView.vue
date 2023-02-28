<template>
  <v-container>
    <h2 class="mb-4">Users</h2>
    <v-sheet class="pa-4">
      <user-table />
    </v-sheet>

  </v-container>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

import UserTable from '../components/Users/UserTable.vue';

@Options({
  components: { UserTable }
})
export default class UsersView extends Vue {

}
</script>

