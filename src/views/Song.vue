<template>
  <main>
    <!-- Music Header -->
    <section class="w-full mb-8 py-14 text-center text-white relative">
      <div
        class="absolute inset-0 w-full h-full box-border bg-contain music-bg"
        style="background-image: url(/assets/img/song-header.png)"
      ></div>
      <div class="container mx-auto flex items-center">
        <!-- Play/Pause Button -->
        <button
          type="button"
          class="z-50 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none"
          @click.prevent="newSong(song)"
        >
          <i
            class="fas"
            :class="{ 'fa-play': !playing, 'fa-pause': playing }"
          ></i>
        </button>
        <div class="z-50 text-left ml-8">
          <!-- Song Info -->
          <div class="text-3xl font-bold">{{ song.modifiedName }}</div>
          <div>{{ song.genre }}</div>
          <div class="song-price">{{ $n(1, "currency") }}</div>
        </div>
      </div>
    </section>
    <!-- Form -->
    <section class="container mx-auto mt-6" id="comments">
      <div
        class="bg-white rounded border border-gray-200 relative flex flex-col"
      >
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <!-- Comment Count -->
          <span class="card-title">{{
            $tc("song.comments_count", song.comment_count, {
              count: song.comment_count,
            })
          }}</span>
          <i class="fa fa-comments float-right text-green-400 text-2xl"></i>
        </div>
        <div class="p-6">
          <div
            class="text-white text-center font-bold p-4 mb-4"
            :class="commentAlertVariant"
            v-if="commentShowAlert"
          >
            {{ commentAlertMessage }}
          </div>
          <vee-form
            :validation-schema="schema"
            @submit="addComment"
            v-if="isUserLoggedIn"
          >
            <vee-field
              as="textarea"
              name="comment"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-4"
              placeholder="Your comment here..."
            ></vee-field>
            <ErrorMessage class="text-red-600" name="comment" />
            <button
              type="submit"
              class="py-1.5 px-3 rounded text-white bg-green-600 block"
              :disabled="commentInSubmission"
            >
              Submit
            </button>
          </vee-form>
          <!-- Sort Comments -->
          <select
            v-model="sort"
            class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          >
            <option value="1">Latest</option>
            <option value="2">Oldest</option>
          </select>
        </div>
      </div>
    </section>
    <!-- Comments -->
    <ul class="container mx-auto">
      <li
        class="p-6 bg-gray-50 border border-gray-200"
        v-for="comment in sortedComments"
        :key="comment.docID"
      >
        <!-- Comment Author -->
        <div class="mb-5">
          <div class="font-bold">{{ comment.name }}</div>
          <time>{{ comment.datePosted }}</time>
        </div>

        <p>
          {{ comment.content }}
        </p>
      </li>
    </ul>
  </main>
</template>

<script>
import { songsCollection, auth, commentsCollection } from "@/includes/firebase";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "Song",
  data() {
    return {
      song: {},
      comments: [],
      sort: "1",
      schema: {
        comment: "required|min:3",
      },
      commentInSubmission: false,
      commentShowAlert: false,
      commentAlertVariant: "bg-blue-500",
      commentAlertMessage: "Please wait. Your comment is being submitted",
    };
  },
  computed: {
    ...mapState({
      isUserLoggedIn: (state) => state.auth.isisUserLoggedIn,
    }),
    ...mapGetters(["playing"]),
    sortedComments() {
      return this.comments.slice().sort((a, b) => {
        if (this.sort === "1") {
          return new Date(b.datePosted) - new Date(a.datePosted);
        }

        return new Date(a.datePosted) - new Date(b.datePosted);
      });
    },
  },
  async beforeRouteEnter(to, from, next) {
    const songSnapshot = await songsCollection.doc(to.params.id).get();

    next((vm) => {
      if (!songSnapshot.exists) {
        vm.$router.push({ name: "home" });

        return;
      }

      const { sort } = vm.$route.query;

      vm.sort = sort === "1" || sort === "2" ? sort : "1";

      vm.song = songSnapshot.data();
      vm.getComments();
    });
  },
  methods: {
    ...mapActions(["newSong"]),
    async addComment(values, { resetForm }) {
      this.commentInSubmission = true;
      this.commentShowAlert = true;
      this.commentAlertVariant = "bg-blue-500";
      this.commentAlertMessage = "Please wait. Your comment is being submitted";

      const comment = {
        content: values.comment,
        datePosted: new Date().toString(),
        songID: this.$route.params.id,
        name: auth.currentUser.displayName,
        uid: auth.currentUser.uid,
      };

      await commentsCollection.add(comment);

      this.song.comment_count += 1;
      await songsCollection.doc(this.$route.params.id).update({
        comment_count: this.song.comment_count,
      });

      this.getComments();

      this.commentInSubmission = false;
      this.commentShowAlert = false;
      this.commentAlertVariant = "bg-green-500";
      this.commentAlertMessage = "Your comment has been added.";

      resetForm();
    },
    async getComments() {
      const snapshots = await commentsCollection
        .where("songID", "==", this.$route.params.id)
        .get();

      this.comments = [];

      snapshots.forEach((doc) => {
        this.comments.push({
          docID: doc.id,
          ...doc.data(),
        });
      });
    },
  },
  watch: {
    sort(newVal) {
      if (newVal === this.$route.query.sort) {
        return;
      }

      this.$router.push({
        query: {
          sort: newVal,
        },
      });
    },
  },
};
</script>
