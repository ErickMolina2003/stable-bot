import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import LandingPage from "../views/landing-page.vue";
import ChatPage from "../views/chat-page.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "LandingPage",
    component: ChatPage,
  },
  {
    path: "/chat",
    name: "ChatPage",
    component: ChatPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
