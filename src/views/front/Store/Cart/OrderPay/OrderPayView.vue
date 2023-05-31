<template>
  <div class="container min-vh-100 mt-9 p-7">
    <div
      class="text-primary fw-bold fs-6 fs-lg-5 border-0 border-lg-1 border-dashed border-secondary rounded-5 d-flex justify-content-center mb-lg-7"
    >
      <OrderInfo :order="order" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import useOrdersStore from "@/stores/orders.js";
import useCartsStore from "@/stores/carts.js";
import OrderInfo from "@/components/front/OrderInfo.vue";

export default {
  components: { OrderInfo },
  computed: {
    ...mapState(useOrdersStore, ["order"]),
  },
  methods: {
    ...mapActions(useOrdersStore, ["getOrder"]),
    ...mapActions(useCartsStore, ["getCarts"]),
  },
  created() {
    this.getOrder(this.$route.params.orderId);
    this.getCarts();
  },
};
</script>
