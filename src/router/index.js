import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

const isAuthRequired = (route) =>
  route.matched.some((record) => record.meta.authRequired);

router.beforeEach((to, from, next) => {
  const authRequired = isAuthRequired(to);
  const isAuthenticated = localStorage.getItem("authToken") || true;

  if (authRequired && !isAuthenticated) {
    localStorage.clear();
    return next({ name: "login" });
  }

  next();
});

export default router;
