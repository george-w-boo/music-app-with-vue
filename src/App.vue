<template>
  <app-header />

  <router-view></router-view>

  <!-- Player -->
  <app-player />

  <auth-modal />
</template>

<script lang="ts">
import AppHeader from "./components/Header.vue";
import AuthModal from "./components/Auth.vue";
import AppPlayer from "./components/Player.vue";
export default {
  name: "App",
  components: {
    AppHeader,
    AuthModal,
    AppPlayer,
  },
  created() {
    this.$store.dispatch("init_login");
  },
};
</script>
