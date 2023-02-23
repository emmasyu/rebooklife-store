import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/DashboardView.vue"),
      children: [
        {
          path: "products",
          component: () => import("../views/ProductsView.vue"),
        },
        {
          path: "coupons",
          component: () => import("../views/CouponsView.vue"),
        },
        {
          path: "orders",
          component: () => import("../views/OrdersView.vue"),
        },
      ],
    },
  ],
});

export default router;
