<template>
  <nav
    class="d-flex flex-column justify-content-between align-items-center flex-shrink-0 py-8 bg-primary w-10 vh-100"
  >
    <div class="text-center">
      <img
        class="w-8 mb-4"
        src="../assets/images/rebooklife-logo-white.png"
        alt="rebooklife"
      />
      <a class="btn btn-outline-light btn-sm px-3" href="/products"
        >回到二搜書</a
      >
    </div>
    <ul class="w-100 p-0 fs-5 mb-0">
      <li class="text-center mb-4">
        <RouterLink class="d-block py-4" to="/dashboard/products"
          ><img
            class="mb-3 w-4"
            src="../assets/images/book-white.png"
            alt="products-list"
          />
          <p class="text-light">產品列表</p></RouterLink
        >
      </li>
      <li class="text-center mb-4">
        <RouterLink class="d-block py-4" to="/dashboard/coupons"
          ><img
            class="mb-3 w-4"
            src="../assets/images/bookmark-white.png"
            alt="coupons-list"
          />
          <p class="text-light">優惠券管理</p></RouterLink
        >
      </li>
      <li class="text-center mb-4">
        <RouterLink class="d-block py-4" to="/dashboard/orders"
          ><img
            class="mb-3 w-4"
            src="../assets/images/order-white.png"
            alt="orders-list"
          />
          <p class="text-light">訂單狀況</p></RouterLink
        >
      </li>
      <li class="text-center">
        <a class="d-block py-4" href="#" @click.prevent="logout"
          ><img
            class="mb-3 w-4"
            src="../assets/images/user-white.png"
            alt="logout"
          />
          <p class="text-light">登出</p></a
        >
      </li>
    </ul>
  </nav>
</template>

<script>
import { postUserLogout } from "../api";
export default {
  methods: {
    async logout() {
      try {
        const response = await postUserLogout();
        console.log("postUserLogout", response);
        if (response.data.success) {
          this.$router.push("/login");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
li:hover {
  background-color: #876e32;
}
.router-link-active {
  background-color: #876e32;
}
</style>
