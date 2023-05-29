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
      component: () => import("../views/front/Home/HomeView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/admin/LoginView.vue"),
    },
    {
      path: "/coupons",
      name: "coupons",
      component: () => import("../views/front/Coupons/CouponsView.vue"),
    },
    {
      path: "/bookstore",
      name: "bookstore",
      component: () => import("../views/front/Store/StoreView.vue"),
      children: [
        {
          path: "",
          name: "books",
          component: () =>
            import("../views/front/Store/BookStore/BookStoreView.vue"),
          children: [
            {
              path: ":category?",
              name: "category",
              component: () =>
                import(
                  "../views/front/Store/BookStore/Category/CategoryView.vue"
                ),
            },
            {
              path: ":category/:subcategory",
              name: "subcategory",
              component: () =>
                import(
                  "../views/front/Store/BookStore/Subcategory/SubcategoryView.vue"
                ),
            },
          ],
        },
        {
          path: "book/:bookId",
          component: () =>
            import("../views/front/Store/BookDetail/BookView.vue"),
        },
        {
          path: "search",
          name: "search",
          component: () =>
            import("../views/front/Store/SearchBooks/SearchBooksView.vue"),
        },
        {
          path: "bookmark",
          name: "bookmark",
          component: () =>
            import("../views/front/Store/Bookmark/BookmarkView.vue"),
        },
        {
          path: "cart",
          name: "cart",
          component: () => import("../views/front/Store/Cart/CartView.vue"),
          children: [
            {
              path: "",
              name: "cart",
              component: () =>
                import("../views/front/Store/Cart/CartList/CartListView.vue"),
            },
            {
              path: "order",
              name: "order",
              component: () =>
                import("../views/front/Store/Cart/Order/OrderView.vue"),
            },
            {
              path: "orderPay/:orderId",
              name: "orderPay",
              component: () =>
                import("../views/front/Store/Cart/OrderPay/OrderPayView.vue"),
            },
            {
              path: "OrderFinish/:orderId",
              name: "OrderFinish",
              component: () =>
                import(
                  "../views/front/Store/Cart/OrderFinish/OrderFinishView.vue"
                ),
            },
          ],
        },
        {
          path: "searchOrder",
          name: "searchOrder",
          children: [
            {
              path: ":orderId?",
              component: () =>
                import("../views/front/Store/SearchOrder/SearchOrderView.vue"),
            },
          ],
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
