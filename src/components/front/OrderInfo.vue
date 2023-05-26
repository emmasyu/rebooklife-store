<template>
  <div class="w-lg-75 w-xxl-50 mx-auto">
    <p class="pb-4 pt-lg-7 border-bottom border-lg-primary text-center fs-lg-4">
      <slot>訂單建立成功</slot>
    </p>
    <div
      class="my-4 p-4 shadow-small shadow-lg-none bg-primary-light bg-opacity-10 rounded-2 rounded-lg-0 bg-lg-transparent"
    >
      <div class="d-flex mb-4 mb-lg-7 gap-4">
        <p class="min-w-content">訂單日期</p>
        <p class="fw-normal">
          {{ $filters.convertTimeToLocale(order.create_at) }}
        </p>
      </div>
      <div class="d-flex mb-4 mb-lg-7 gap-4">
        <p class="min-w-content">訂單編號</p>
        <p class="fw-normal">{{ $route.params.orderId }}</p>
      </div>
      <div class="d-flex mb-4 mb-lg-7 gap-4">
        <p class="min-w-content">收件人名</p>
        <p class="fw-normal">{{ order.user?.name }}</p>
      </div>
      <div class="d-flex mb-4 mb-lg-7 gap-4">
        <p class="min-w-content">聯絡電話</p>
        <p class="fw-normal">{{ order.user?.tel }}</p>
      </div>
      <div class="d-flex mb-4 mb-lg-7 gap-4">
        <p class="min-w-content">電子郵件</p>
        <p class="fw-normal">{{ order.user?.email }}</p>
      </div>
      <div class="d-flex mb-4 mb-lg-7 gap-4">
        <p class="min-w-content">收件地址</p>
        <p class="fw-normal">
          {{ order.user?.address }}
        </p>
      </div>
      <div v-if="order.message" class="d-flex mb-4 mb-lg-7 gap-4">
        <p class="min-w-content">訂單備註</p>
        <p class="fw-normal">{{ order.message }}</p>
      </div>
      <div v-if="order.paid_date" class="d-flex mb-4 mb-lg-7 gap-4">
        <p class="min-w-content">付款日期</p>
        <p class="fw-normal">
          {{ $filters.convertTimeToLocale(order.paid_date) }}
        </p>
      </div>
      <div class="d-flex gap-4">
        <p class="min-w-content">訂單金額</p>
        <p class="fw-normal">
          NT${{ order.total }}
          <span @click="toggleList"
            ><font-awesome-icon
              :icon="['fas', isOpenList ? 'caret-down' : 'caret-right']"
              class="cursor-pointer px-4"
          /></span>
        </p>
      </div>
    </div>
    <div v-if="isOpenList" class="py-4 text-content">
      <OrderList :carts="order.products" />
    </div>
  </div>
</template>
<script>
import OrderList from "@/components/front/OrderList.vue";

export default {
  components: { OrderList },
  props: ["order"],
  data() {
    return {
      isOpenList: false,
    };
  },
  methods: {
    toggleList() {
      this.isOpenList = !this.isOpenList;
    },
  },
};
</script>
