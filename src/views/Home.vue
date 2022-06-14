<template>
  <main>
    <section class="mb-8 py-20 text-white text-center relative">
      <!-- Introduction -->
      <div
        class="absolute inset-0 w-full h-full bg-contain introduction-bg"
        style="background-image: url(assets/img/header.png)"
      ></div>
      <div class="container mx-auto">
        <div class="text-white main-header-content">
          <h1 class="font-bold text-5xl mb-5">{{ $t("home.listen") }}</h1>
          <p class="w-full md:w-8/12 mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            et dolor mollis, congue augue non, venenatis elit. Nunc justo eros,
            suscipit ac aliquet imperdiet, venenatis et sapien. Duis sed magna
            pulvinar, fringilla lorem eget, ullamcorper urna.
          </p>
        </div>
      </div>

      <img
        class="relative block mx-auto mt-5 -mb-20 w-auto max-w-full"
        src="/assets/img/introduction-music.png"
      />
    </section>

    <!-- Main Content -->
    <section class="container mx-auto">
      <div
        class="bg-white rounded border border-gray-200 relative flex flex-col"
      >
        <div
          class="px-6 pt-6 pb-5 font-bold border-b border-gray-200"
          v-icon.right.yellow="'headphones-alt'"
        >
          <!-- Alternatve use of v-icon directive -->
          <!-- <div
          class="px-6 pt-6 pb-5 font-bold border-b border-gray-200"
          v-icon-secondary="{ type: 'headphones-alt', right: true }"
        > -->
          <span class="card-title">Songs</span>
        </div>
        <!-- Playlist -->
        <ol id="playlist">
          <song-item v-for="song in songs" :key="song.docID" :song="song" />
        </ol>
        <!-- .. end Playlist -->
      </div>
    </section>
  </main>
</template>

<script>
import { songsCollection } from "@/includes/firebase";
import SongItem from "@/components/SongItem.vue";
import IconSecondary from "../directives/icon-secondary";

export default {
  name: "HomePage",
  components: {
    SongItem,
  },
  directives: {
    "icon-secondary": IconSecondary,
  },
  data() {
    return {
      songs: [],
      maxPerPage: 25,
      isRequestPending: false,
    };
  },
  async created() {
    this.updateSongs();

    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    async updateSongs() {
      if (this.isRequestPending) {
        return;
      }

      this.isRequestPending = true;

      let snapshopts;

      if (this.songs.length) {
        const prevLastDoc = await songsCollection
          .doc(this.songs[this.songs.length - 1].docID)
          .get();

        snapshopts = await songsCollection
          .orderBy("modifiedName")
          .startAfter(prevLastDoc)
          .limit(this.maxPerPage)
          .get();
      } else {
        snapshopts = await songsCollection
          .orderBy("modifiedName")
          .limit(this.maxPerPage)
          .get();
      }

      snapshopts.forEach((document) => {
        this.songs.push({
          docID: document.id,
          ...document.data(),
        });
      });

      console.log("songs", this.songs);

      this.isRequestPending = false;
    },
    handleScroll() {
      const { scrollTop, offsetHeight } = document.documentElement;
      const { innerHeight } = window;

      const bottomOfWindow =
        Math.round(scrollTop) + innerHeight === offsetHeight;

      if (bottomOfWindow) {
        this.updateSongs();
      }
    },
  },
};
</script>
