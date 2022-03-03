import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Blog from "../views/Blog.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/blog/:id/:title/",
    name: "Blog",
    component: Blog
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
