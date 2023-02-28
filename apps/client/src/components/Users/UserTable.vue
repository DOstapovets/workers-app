<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-data-table-server :loading="loading" :headers="headers" :items="users" class="elevation-2">
    <template v-slot:loading>
      <v-progress-linear indeterminate color="primary" />
    </template>
    <template v-slot:item.username="{ item }">
      <UserProfilePopover :user="item.value" />
    </template>
    <template v-slot:item.actions="{ item }">
      <v-btn size="small" variant="text" icon>
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn size="small" color="error" @click="() => confirmDeleteUser(item.value._id)" variant="text" icon>
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>
  </v-data-table-server>
  <confirm-dialog title="Delete user" message="Are you sure?" ref="deleteConfirmDialog" />
</template>

<script lang="ts">
import { User } from 'app-types';
import { Options, Vue } from 'vue-class-component';
import ConfirmDialog from '../common/ConfirmDialog.vue';
import UserProfilePopover from './UserProfilePopover.vue';

@Options({
  components: { UserProfilePopover, ConfirmDialog }
})
export default class UserTable extends Vue {

  loading = false;
  headers = [{
    title: 'Username',
    key: 'username'
  }, {
    title: 'Actions',
    key: 'actions',
    align: 'end'
  }];
  users: User[] = [];

  async localFetchUsers() {
    this.loading = true;
    try {
      const { data } = await this.$sdk.api.user.getUsers();

      this.users = data;
    } catch (error) {
      console.log(error);
    }
    this.loading = false;
  }

  async confirmDeleteUser(id: string) {
    try {
      if (await this.$refs.deleteConfirmDialog.confirm()) {
        this.loading = true;
        await this.$sdk.api.user.deleteUser(id);
        this.users = this.users.filter((user: User) => user._id !== id);
        this.loading = false;
      }
    } catch (error) {
      this.loading = false
      console.log(error);
    }
  }

  mounted() {
    this.localFetchUsers();
  }
}
</script>
