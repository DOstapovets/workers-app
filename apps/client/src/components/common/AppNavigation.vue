<template>
  <v-navigation-drawer absolute rail>
    <v-list>
      <v-list-item link to="/">
        <v-icon>mdi-apps</v-icon>
      </v-list-item>

      <v-divider class="mx-3 my-5"></v-divider>

      <v-list-item to="chat">
        <v-icon>mdi-chat</v-icon>
      </v-list-item>

      <v-list-item to="users">
        <v-icon>mdi-account-multiple</v-icon>
      </v-list-item>

      <v-list-item to="gallery">
        <v-icon>mdi-cloud-upload-outline</v-icon>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <!-- <v-navigation-drawer
      width="244"
    >
      <v-sheet
        color="grey-lighten-5"
        height="128"
        width="100%"
      ></v-sheet>

      <v-list>
        <v-list-item
          v-for="n in 5"
          :key="n"
          :title="`Item ${ n }`"
          link
        >
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
</template>