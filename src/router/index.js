import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Manage from "@/views/Manage.vue";
import { store } from "../store";

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

  if (store.state.isUserLoggedIn) {
    next();
  } else {
    next({ name: "home" });
  }
});

export default router;
