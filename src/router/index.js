import { createRouter, createWebHistory } from "vue-router";
import { store } from "../store";

const Home = () => import("@/views/Home.vue");
const About = () => import("@/views/About.vue");
const Manage = () => import("@/views/Manage.vue");
const Song = () => import("@/views/Song.vue");

const routes = [
  {
    name: "home",
    path: "/",
    component: Home,
  },
  {
    name: "about",
    path: "/about",
    component: About,
  },
  {
    name: "manage",
    path: "/manage-music",
    meta: {
      requiresAuth: true,
    },
    component: Manage,
  },
  {
    path: "/manage",
    redirect: { name: "manage" },
  },
  {
    name: "song",
    path: "/song/:id",
    component: Song,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: { name: "home" },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: "text-yellow-500",
});

//Global route guard
router.beforeEach((to, from, next) => {
  console.log("Global Guard to", to.matched);

  if (!to.matched.some((record) => record.meta.requiresAuth)) {
    next();

    return;
  }

  if (store.state.auth.isUserLoggedIn) {
    next();
  } else {
    next({ name: "home" });
  }
});

export default router;
