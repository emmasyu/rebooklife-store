import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
      };
    }
    return {
      top: 0,
    };
  },
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/front/HomeView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/admin/LoginView.vue"),
    },
    {
      path: "/coupons",
      name: "coupons",
      component: () => import("../views/front/CouponsView.vue"),
    },
    {
      path: "/bookstore",
      name: "bookstore",
      component: () => import("../views/front/StoreView.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/admin/DashboardView.vue"),
      children: [
        {
          path: "products",
          component: () => import("../views/admin/AdminProductsView.vue"),
        },
        {
          path: "coupons",
          component: () => import("../views/admin/AdminCouponsView.vue"),
        },
        {
          path: "orders",
          component: () => import("../views/admin/AdminOrdersView.vue"),
        },
      ],
    },
  ],
});

export default router;
