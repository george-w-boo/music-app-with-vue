<template>
  <!-- Header -->
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <router-link
        class="text-white font-bold uppercase text-2xl mr-4"
        :to="{ name: 'home' }"
        exact-active-class="no-active"
        >{{ $t("header.music") }}</router-link
      >

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li>
            <router-link class="px-2 text-white" :to="{ name: 'about' }">{{
              $t("header.about")
            }}</router-link>
          </li>
          <li v-if="!isUserLoggedIn">
            <a
              class="px-2 text-white"
              href="#"
              @click.prevent="toggleAuthModal"
              >{{ $t("header.log_reg") }}</a
            >
          </li>
          <template v-else>
            <li>
              <router-link class="px-2 text-white" :to="{ name: 'manage' }">{{
                $t("header.manage")
              }}</router-link>
            </li>
            <li>
              <a class="px-2 text-white" href="#" @click.prevent="signout">{{
                $t("header.logout")
              }}</a>
            </li>
          </template>
        </ul>
        <ul class="flex flex-row mt-1 ml-auto">
          <li>
            <a href="#" class="px-2 text-white" @click.prevent="changeLocale">
              {{ currentLocale }}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "AppHeader",
  computed: {
    ...mapState({
      isUserLoggedIn: (state) => state.auth.isUserLoggedIn,
    }),
    currentLocale() {
      return this.$i18n.locale === "ua" ? "Ukrainian" : "English";
    },
  },
  methods: {
    ...mapMutations(["toggleAuthModal"]),
    signout() {
      this.$store.dispatch("signout");

      if (this.$route.name === "manage") {
        this.$router.push({ name: "home" });
      }
    },
    changeLocale() {
      this.$i18n.locale = this.$i18n.locale === "ua" ? "en" : "ua";
    },
  },
};
</script>

<style></style>
