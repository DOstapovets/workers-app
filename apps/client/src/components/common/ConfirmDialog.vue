<template>
  <v-dialog v-model="dialog" max-width="500px" persistent>
    <v-card>
      <v-card-title class="headline">
        <slot name="title">{{ title }}</slot>
      </v-card-title>
      <v-card-text>
        <slot name="message">
          {{ message }}
        </slot>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" text @click="() => resolve(false)">Cancel</v-btn>
        <v-btn text @click="() => resolve(true)">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    title: {
      type: String,
    },
    message: {
      type: String,
    },
  }
})
export default class ConfirmDialog extends Vue {
  dialog = false;

  confirm() {
    this.dialog = true;

    return new Promise((resolve) => {
      this.resolve = resolve;
    }).then((result) => {
      this.dialog = false;
      return result;
    })
  }
}
</script>