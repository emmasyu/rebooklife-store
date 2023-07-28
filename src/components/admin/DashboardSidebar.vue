<template>
  <nav
    class="d-flex flex-column justify-content-between align-items-center flex-shrink-0 py-8 bg-primary w-10 vh-100"
  >
    <div class="text-center">
      <img
        class="w-8 mb-4"
        src="@/assets/images/rebooklife-logo-white.png"
        alt="rebooklife"
      />
      <RouterLink class="btn btn-outline-light btn-sm px-3" to="/"
        >回到二搜書</RouterLink
      >
    </div>
    <ul class="w-100 fs-5">
      <li class="text-center bg-secondary-hover">
        <RouterLink class="d-block py-4" to="/dashboard/products"
          ><img
            class="mb-3 w-4"
            src="@/assets/images/book-white.png"
            alt="products-list"
          />
          <p class="text-light">產品列表</p></RouterLink
        >
      </li>
      <li class="text-center bg-secondary-hover">
        <RouterLink class="d-block py-4" to="/dashboard/coupons"
          ><img
            class="mb-3 w-4"
            src="@/assets/images/bookmark-white.png"
            alt="coupons-list"
          />
          <p class="text-light">優惠券管理</p></RouterLink
        >
      </li>
      <li class="text-center bg-secondary-hover">
        <RouterLink class="d-block py-4" to="/dashboard/orders"
          ><img
            class="mb-3 w-4"
            src="@/assets/images/order-white.png"
            alt="orders-list"
          />
          <p class="text-light">訂單狀況</p></RouterLink
        >
      </li>
      <li class="text-center bg-secondary-hover">
        <a class="d-block py-4" href="#" @click.prevent="logout"
          ><img
            class="mb-3 w-4"
            src="@/assets/images/user-white.png"
            alt="logout"
          />
          <p class="text-light">登出</p></a
        >
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import useStatedStore from '@/stores/states';
import { postUserLogout } from '@/api';

export default {
  computed: {
    ...mapState(useStatedStore, ['isLoading']),
  },
  methods: {
    ...mapActions(useStatedStore, ['changeLoadingState', 'pushToastMessage']),
    async logout() {
      this.changeLoadingState(true, '登出系統中');
      try {
        const response = await postUserLogout();
        if (response.data.success) {
          this.pushToastMessage('成功：已登出系統');
          this.$router.push('/login');
        }
      } catch (error) {
        this.pushToastMessage(
          '登出功能失效，請重新整理或聯繫網站維護人員協助處理',
          {
            success: false,
          },
        );
      }
      this.changeLoadingState(false);
    },
  },
};
</script>

<style lang="scss" scoped>
.router-link-active {
  background-color: #876e32;
}
</style>
