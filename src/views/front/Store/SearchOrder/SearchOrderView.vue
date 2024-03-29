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
          class="vstack justify-content-center align-items-center min-vh-75 min-vh-lg-60 text-center"
        >
          <p>輸入訂單邊號進行查詢</p>
          <div v-if="localOrders.length > 0">
            <p>或是點選下列歷史訂單紀錄查看內容</p>
            <ul class="fw-normal">
              <li
                v-for="order in localOrders"
                :key="order"
                @click="getOrderPage(order.orderId)"
                class="border border-primary py-2 px-5 my-2 bg-primary-hover text-white-hover cursor-pointer text-break"
              >
                訂單日期
                {{ $filters.convertTimeToISO(order.create_at) }} <br />
                總計$ {{ $filters.thousandSeparator(order.total) }}
              </li>
            </ul>
          </div>
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
import { mapState, mapActions } from 'pinia';
import useOrdersStore from '@/stores/orders';
import OrderInfo from '@/components/front/OrderInfo.vue';

export default {
  components: { OrderInfo },
  data() {
    return {
      searchInput: '',
    };
  },
  computed: {
    ...mapState(useOrdersStore, ['order', 'localOrders']),
  },
  methods: {
    ...mapActions(useOrdersStore, ['getOrder', 'getLocalOrders', 'deleteLocalOrders']),
    async getOrderPage(id) {
      if (typeof id === 'string') {
        this.$router.push(`/bookstore/search_order/${id}`);
        await this.getOrder(id);
        if (this.order === null) {
          this.deleteLocalOrders(id);
        }
      }
      if (this.searchInput) {
        this.$router.push(`/bookstore/search_order/${this.searchInput.trim()}`);
        this.getOrder(this.searchInput.trim());
      }
    },
  },
  created() {
    this.getLocalOrders();
  },
};
</script>

<style lang="scss" scoped>
.filter-black {
  filter: brightness(20%);
  &:hover {
    filter: brightness(50%);
  }
}
</style>
