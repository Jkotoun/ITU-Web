import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Users from "../views/Users.vue";
import Events from "../views/EventsPage.vue";


Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Users",
    name: "Users",
    component: Users,
  },
  {
    path: "/Events",
    name: "Events",
    component: Events,
  },
  {
    path: "/User/:id",
    name: "User",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/UserPage.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
