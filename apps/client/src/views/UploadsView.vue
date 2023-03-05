<template>
  <v-container>
    <h2 class="mb-4">Uploads</h2>
    <v-sheet class="pa-4">
      <v-row>
        <v-col cols="12" md="6" lg="4" v-for="upload in uploads" :key="upload._id">
          <app-image :upload="upload" />
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script lang="ts">
import type { Upload } from 'app-types';
import { Vue, Options } from 'vue-class-component'

import AppImage from '../components/common/AppImage.vue';

@Options({
  components: { AppImage },
})
export default class UploadsView extends Vue {
  loading = false;
  uploads: Upload[] = [];

  async fetchUploads() {
    try {
      this.loading = true;

      const { data } = await this.$sdk.api.upload.getUploads();

      this.uploads = data;
    } catch (error) {
      console.error(error);
    }
    this.loading = false;
  }
  mounted() {
    this.fetchUploads();
  }
}
</script>