<template>
  <div
    class="sticky-bottom d-flex gap-0 gap-lg-4 pb-lg-5 justify-content-center"
  >
    <ButtonOutline :text="buttonText?.last" @click.prevent="clickLastButton" />
    <Button :text="buttonText?.next" @click.prevent="clickNextButton" />
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import useCartsStore from "@/stores/carts.js";
import useOrdersStore from "@/stores/orders.js";
import Button from "@/components/front/Button.vue";
import ButtonOutline from "@/components/front/ButtonOutline.vue";

export default {
  components: { Button, ButtonOutline },
  computed: {
    ...mapState(useCartsStore, ["cartsTotalQty"]),
    buttonText() {
      switch (this.$route.name) {
        case "cart":
          if (this.cartsTotalQty === 0) return { last: "回到商店" };
          return { last: "繼續購物", next: "確認結帳" };
        case "orderPay":
          return { last: "取消付款", next: "確認結帳" };
        case "orderFinish":
          return { last: "查看訂單", next: "前往商店" };
      }
    },
  },
  methods: {
    ...mapActions(useOrdersStore, ["postPayOrder"]),
    clickLastButton() {
      if (this.cartsTotalQty === 0) this.$router.push("/bookstore");
      switch (this.$route.name) {
        case "cart":
          this.$router.push("/bookstore");
          break;
        case "orderPay":
          this.$router.push("/bookstore");
          break;
        case "orderFinish":
          this.$router.push(
            `/bookstore/search_order/${this.$route.params.orderId}`
          );
          break;
      }
    },
    async clickNextButton() {
      switch (this.$route.name) {
        case "cart":
          this.$router.push("/bookstore/cart/order");
          break;
        case "orderPay":
          await this.postPayOrder(this.$route.params.orderId);
          this.$router.push(
            `/bookstore/cart/order_finish/${this.$route.params.orderId}`
          );
          break;
        case "orderFinish":
          this.$router.push("/bookstore");
          break;
      }
    },
  },
};
</script>
