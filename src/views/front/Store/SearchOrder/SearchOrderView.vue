<template>
  <div class="cart-bg min-vh-100 py-11 position-relative">
    <div class="container px-8 mt-lg-11 fs-6 fs-lg-5 text-primary fw-bold">
      <div class="d-flex justify-content-center align-items-center mb-7">
        <input
          type="search"
          class="w-100 w-lg-50 py-1 py-lg-2 px-2 fs-6 fs-lg-5 border-primary outline-none rounded-5 text-center bg-transparent"
          placeholder="請輸入訂單編號"
          v-model="searchInput"
          @keyup.enter="getOrderPage"
        />
        <a
          class="d-none d-lg-inline-block ms-4"
          href="#"
          @click.prevent="getOrderPage"
          ><img
            src="@/assets/images/search-white.png"
            alt="search"
            class="w-4 filter-black"
        /></a>
      </div>
      <div
        class="text-primary fw-bold fs-6 fs-lg-5 border-0 border-lg-1 border-dashed border-secondary rounded-5 d-flex justify-content-center mb-lg-7"
      >
        <div
          v-if="!$route.params.orderId"
          class="vstack justify-content-center align-items-center min-vh-75 min-vh-lg-60"
        >
          <p>請輸入訂單邊號查詢</p>
        </div>
        <div
          v-else-if="!order"
          class="vstack justify-content-center align-items-center min-vh-75 min-vh-lg-60"
        >
          <p>{{ $route.params.orderId }}</p>
          <p class="mb-3">查詢結果：</p>
          <p class="fw-normal text-center">
            Oh! 找不到這筆訂單<br />請重新查詢
          </p>
        </div>
        <OrderInfo v-else-if="order" :order="order">訂單內容</OrderInfo>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import useOrdersStore from "@/stores/orders.js";
import OrderInfo from "@/components/front/OrderInfo.vue";

export default {
  components: { OrderInfo },
  data() {
    return {
      searchInput: "",
    };
  },
  computed: {
    ...mapState(useOrdersStore, ["order"]),
  },
  methods: {
    ...mapActions(useOrdersStore, ["getOrder"]),
    getOrderPage() {
      if (!this.searchInput) return;
      this.$router.push(`/bookstore/search_order/${this.searchInput.trim()}`);
      this.getOrder(this.searchInput.trim());
    },
  },
};
</script>

<style lang="scss" scoped>
.filter-black {
  filter: brightness(20%);
}
</style>
