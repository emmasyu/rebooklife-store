import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
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
      children: [
        {
          path: "",
          name: "books",
          component: () => import("../views/front/BookStoreView.vue"),
          children: [
            {
              path: ":category?",
              name: "category",
              component: () => import("../views/front/CategoryView.vue"),
            },
            {
              path: ":category/:subcategory",
              name: "subcategory",
              component: () => import("../views/front/SubcategoryView.vue"),
            },
          ],
        },
        {
          path: "book/:bookId",
          component: () => import("../views/front/BookView.vue"),
        },
      ],
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
    {
      path: "/:pathMatch(.*)*",
      name: "404 not found",
      component: () => import("../views/NotFound.vue"),
    },
  ],
});

export default router;
