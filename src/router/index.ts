//Autoři: Josef Kotoun, Jiří Vlasák
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import EventsCalendar from "../views/EventsCalendarView.vue";
import Users from "../views/UsersListView.vue";
import Events from "../views/EventsListView.vue";
import EventPage from "../views/EventDetailsView.vue";
import LoginPage from "../views/LoginView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "EventsCalendar",
    component: EventsCalendar,
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
    path: "/event/:id",
    name: "event",
    component: EventPage,

  },
  {
    path: "/login",
    name: "login",
    component: LoginPage
  },
  {
    path: "/User/:id",
    name: "User",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/UserView.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
