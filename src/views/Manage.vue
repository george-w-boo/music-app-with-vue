<template>
  <!-- Main Content -->
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <upload-songs />
      </div>
      <div class="col-span-2">
        <div
          class="bg-white rounded border border-gray-200 relative flex flex-col"
        >
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i
              class="fa fa-compact-disc float-right text-green-400 text-2xl"
            ></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <composition-item
              v-for="(song, i) in songs"
              :key="song.docId"
              :song="song"
              :updateSong="updateSong"
              :index="i"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import UploadSongs from "@/components/Upload.vue";
import CompositionItem from "@/components/CompositionItem.vue";
import { auth, songsCollection } from "@/includes/firebase";
// import { store } from "@/store/index.js";
export default {
  name: "Manage",
  components: {
    UploadSongs,
    CompositionItem,
  },
  data() {
    return {
      songs: [],
    };
  },
  async created() {
    const snapshot = await songsCollection
      .where("uid", "==", auth.currentUser.uid)
      .get();

    snapshot.forEach((document) => {
      const song = {
        ...document.data(),
        docId: document.id,
      };

      this.songs.push(song);
    });
  },
  methods: {
    updateSong(i, values) {
      console.log("updatingsong");
      this.songs[i].modifiedName = values.modifiedName;
      this.songs[i].genre = values.genre;
    },
  },
  // beforeRouteEnter(to, from, next) {
  //   if (store.state.isUserLoggedIn) {
  //     next();
  //   } else {
  //     next({ name: "home" });
  //   }
  // },
};
</script>

<style></style>
