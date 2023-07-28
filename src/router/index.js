import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
      };
    }
    if (
      (from.name === 'category' || from.name === 'subcategory')
      && (to.name === 'category' || to.name === 'subcategory')
    ) {
      // eslint-disable-next-line consistent-return
      return;
    }
    if (savedPosition) {
      return savedPosition;
    }
    return {
      top: 0,
    };
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/front/Home/HomeView.vue'),
      meta: { title: '首頁' },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/admin/LoginView.vue'),
      meta: { title: '登入系統' },
    },
    {
      path: '/coupons',
      name: 'coupons',
      component: () => import('@/views/front/Coupons/CouponsView.vue'),
      meta: { title: '優惠券專區' },
    },
    {
      path: '/bookstore',
      component: () => import('@/views/front/Store/StoreView.vue'),
      children: [
        {
          path: '',
          name: 'bookstore',
          component: () => import('@/views/front/Store/Bookstore/BookStoreView.vue'),

          children: [
            {
              path: ':category?',
              name: 'category',
              component: () => import(
                '@/views/front/Store/Bookstore/Category/CategoryView.vue'
              ),
            },
            {
              path: ':category/:subcategory',
              name: 'subcategory',
              component: () => import(
                '@/views/front/Store/Bookstore/Subcategory/SubcategoryView.vue'
              ),
            },
          ],
        },
        {
          path: 'book/:bookId',
          name: 'book',
          component: () => import('@/views/front/Store/BookDetail/BookDetailView.vue'),
          meta: { title: '書籍內容簡介' },
        },
        {
          path: 'search',
          name: 'search',
          component: () => import('@/views/front/Store/SearchBooks/SearchBooksView.vue'),
          meta: { title: '搜索書籍' },
        },
        {
          path: 'bookmark',
          name: 'bookmark',
          component: () => import('@/views/front/Store/Bookmark/BookmarkView.vue'),
          meta: { title: '我的收藏' },
        },
        {
          path: 'cart',
          component: () => import('@/views/front/Store/Cart/CartView.vue'),
          children: [
            {
              path: '',
              name: 'cart',
              component: () => import('@/views/front/Store/Cart/CartList/CartListView.vue'),
              meta: { title: '購物車清單' },
            },
            {
              path: 'order',
              name: 'order',
              component: () => import('@/views/front/Store/Cart/Order/OrderView.vue'),
              meta: { title: '填寫訂單' },
            },
            {
              path: 'order_pay/:orderId',
              name: 'orderPay',
              component: () => import('@/views/front/Store/Cart/OrderPay/OrderPayView.vue'),
              meta: { title: '確認訂單' },
            },
            {
              path: 'order_finish/:orderId',
              name: 'orderFinish',
              component: () => import(
                '@/views/front/Store/Cart/OrderFinish/OrderFinishView.vue'
              ),
              meta: { title: '完成訂單' },
            },
          ],
        },
        {
          path: 'search_order',
          name: 'searchOrder',
          children: [
            {
              path: ':orderId?',
              component: () => import('@/views/front/Store/SearchOrder/SearchOrderView.vue'),
              meta: { title: '搜索訂單' },
            },
          ],
        },
      ],
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/admin/DashboardView.vue'),
      meta: { title: '管理系統' },
      children: [
        {
          path: 'products',
          name: 'adminProducts',
          component: () => import('@/views/admin/AdminProductsView.vue'),
        },
        {
          path: 'coupons',
          name: 'adminCoupons',
          component: () => import('@/views/admin/AdminCouponsView.vue'),
        },
        {
          path: 'orders',
          name: 'adminOrders',
          component: () => import('@/views/admin/AdminOrdersView.vue'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404 not found',
      component: () => import('@/views/NotFound.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const titleFromParams = to.params?.subcategory ?? to.params?.category;
  const titleFromQuery = to.query?.searchText;
  const defaultTitle = '二搜書 | 二手書籍電商平台，書本的傳承與知識的傳遞';
  if (titleFromParams || titleFromQuery) {
    document.title = `${titleFromParams || titleFromQuery} - ${defaultTitle}`;
  } else if (to.meta?.title) {
    document.title = `${to.meta?.title} - ${defaultTitle}`;
  } else {
    document.title = defaultTitle;
  }
  next();
});

export default router;
