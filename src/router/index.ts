import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  // RouterView,
} from "vue-router";
// import { h } from "vue";
import HomePage from "@/components/pages/HomePage.vue";
import { appName } from "@/services/configservice.ts";
import tenantService from "@/services/tenantService.ts";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
    meta: {
      title: "Home",
      requiresAuth: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach(async (to, from, next) => {
router.beforeEach(async (to, _from, next) => {
  window.document.title = `${
    to.meta?.title || ""
  } | ${tenantService.getTenant()} ${appName}`;
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    //route requires auth
    next();
  } else {
    //free route
    next();
  }
});
export default router;
