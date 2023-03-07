<template>
  <v-container fluid class="d-flex h-100">
    <v-row class="align-stretch">
      <v-col cols="12" md="6" offset-md="3" class="d-flex flex-column justify-center">
        <v-card>
          <v-card-title>Login</v-card-title>
          <v-card-text>
            <v-form @enter="localLogin">
              <v-text-field label="Username" v-model="formData.username" />
              <v-text-field label="Password" v-model="formData.password" />
            </v-form>
            <v-alert v-if="err" type="error" :text="err" />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn block variant="tonal" color="primary" :loading="loading" @click="localLogin">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { AxiosError } from 'axios';
import { Options, Vue } from 'vue-class-component';

interface LoginForm {
  username: string;
  password: string;
}

const initialValues: LoginForm = {
  username: '',
  password: ''
};

@Options({
})
export default class LoginView extends Vue {
  formData = initialValues;
  loading = false;
  err = '';

  async localLogin() {
    try {
      this.loading = true;

      await this.$auth.login(this.formData);

      this.$router.push({ name: 'home' });
    } catch (error) {
      this.err = (error as AxiosError<{ message: string }>)?.response?.data?.message || (error as Error).message;
    }
    this.loading = false;
  }
}
</script>