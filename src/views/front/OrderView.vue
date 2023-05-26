<template>
  <div
    class="container mt-9 mb-12 mb-lg-8 px-7 min-vh-75 min-vh-lg-60 text-primary fw-bold fs-6 fs-xl-5 pt-7 pt-lg-0"
  >
    <div class="vstack flex-lg-row gap-lg-5 justify-content-center">
      <div
        class="border-0 border-lg-1 border-dashed border-secondary rounded-5 p-lg-7 col"
      >
        <div
          class="d-flex justify-content-between justify-content-lg-center pb-4 border-bottom border-gray"
          @click="toggleList"
        >
          <p class="fs-lg-5 fs-xl-4">
            訂單內容
            <span class="d-lg-none p-2">
              <font-awesome-icon
                :icon="['fas', isOpenList ? 'caret-down' : 'caret-right']"
              />
            </span>
          </p>
          <p class="d-lg-none">總額 NT$ {{ carts.final_total }}</p>
        </div>
        <template v-if="width >= 992 || isOpenList">
          <OrderList :carts="carts.carts" />
          <div
            v-if="!isAllUseCoupon"
            class="py-4 border-bottom border-lg-0 hstack gap-2 gap-lg-4 flex-wrap justify-content-center"
          >
            <input
              type="text"
              class="border-0 border-bottom border-secondary bg-transparent py-2 px-4 outline-none py-xl-4"
              placeholder="請輸入優惠券代碼"
              size="12"
              v-model="couponCode"
            />
            <button
              type="button"
              class="btn btn-sm btn-outline-primary text-nowrap fs-xl-5 rounded-xl-2 py-xl-4"
              @click.prevent="applyCoupon()"
            >
              套用優惠券代碼
            </button>
            <RouterLink to="/coupons" class="p-1"
              ><font-awesome-icon
                class="fs-5 me-2"
                :icon="['fas', 'circle-exclamation']"
              />取得優惠券代碼 ?</RouterLink
            >
          </div>
          <div class="py-4 border-bottom border-gray border-lg-0">
            <p
              v-if="carts.carts?.[0].coupon"
              class="text-secondary fw-normal mb-2"
            >
              <span>{{ isAllUseCoupon ? "全部商品皆" : "部分商品" }}</span
              >已套用 -
              {{ carts.carts?.[0].coupon.code }}
              {{ carts.carts?.[0].coupon.percent * 0.1 }}折優惠
            </p>
            <div
              v-if="carts.carts?.[0].coupon"
              class="hstack justify-content-between text-gray fw-normal mb-2 text-decoration-line-through"
            >
              <p>總計</p>
              <p>NT$ {{ carts.total }}</p>
            </div>
            <div class="hstack justify-content-between">
              <p><span v-if="carts.carts?.[0].coupon">折扣後</span>總計</p>
              <p class="fs-5 fs-xl-4 text-secondary">
                NT$ {{ carts.final_total }}
              </p>
            </div>
          </div>
        </template>
      </div>
      <OrderForm />
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "pinia";
import useCartsStore from "@/stores/carts.js";
import OrderList from "@/components/front/OrderList.vue";
import OrderForm from "@/components/front/OrderForm.vue";
import { useWindowSize } from "@vueuse/core";
const { width } = useWindowSize();

export default {
  components: { OrderList, OrderForm },
  data() {
    return {
      isOpenList: false,
      couponCode: "",
      width,
    };
  },
  computed: {
    ...mapState(useCartsStore, ["carts"]),
    isAllUseCoupon() {
      return Object.values(this.carts.carts ?? {}).every((cart) => cart.coupon);
    },
  },
  methods: {
    ...mapActions(useCartsStore, ["postUseCoupon"]),
    toggleList() {
      this.isOpenList = !this.isOpenList;
    },
    async applyCoupon() {
      const data = { code: this.couponCode };
      await this.postUseCoupon(data);
      this.couponCode = "";
    },
  },
};
</script>

<style lang="scss" scoped>
input {
  &:focus-visible {
    border: none;
  }
}
</style>
