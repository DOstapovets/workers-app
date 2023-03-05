<template>
  <v-img v-bind="$props" :lazy-src="blurHash" :src="upload?.originalUrl || upload">
    <template v-slot:placeholder>
      <div class="d-flex align-center justify-center fill-height">
        <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
      </div>
    </template>
    <slot></slot>
  </v-img>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import type { Upload } from 'app-types';

import { decodeBlurHash } from '../../utils/image'

@Options({
  props: {
    upload: {
      type: Object as () => Upload,
      required: true
    }
  }
})
export default class AppImage extends Vue {

  get blurHash() {
    if (this.upload?.meta?.blurhash) {
      return decodeBlurHash(this.upload?.meta?.blurhash, 32, 32);
    }
    return null
  }
}
</script>