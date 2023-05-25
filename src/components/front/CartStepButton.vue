<template>
  <div
    class="sticky-bottom d-flex gap-0 gap-lg-4 pb-lg-5 justify-content-center"
  >
    <ButtonOutline :text="buttonText.last" @click.prevent="clickLastButton()" />
    <Button :text="buttonText.next" @click.prevent="clickNextButton()" />
  </div>
</template>
<script>
import { mapState } from "pinia";
import useCartsStore from "@/stores/carts.js";
import Button from "@/components/front/Button.vue";
import ButtonOutline from "@/components/front/ButtonOutline.vue";

export default {
  components: { Button, ButtonOutline },
  computed: {
    ...mapState(useCartsStore, ["cartsTotalQty"]),
    buttonText() {
      if (this.cartsTotalQty === 0) return { last: "回到商店" };
      switch (this.$route.name) {
        case "cart":
          return { last: "繼續購物", next: "確認結帳" };
        case "order":
          return { last: "更改購物車", next: "送出訂單" };
        case "orderPay":
          return { last: "取消訂單", next: "確認結帳" };
        case "OrderFinish":
          return { last: "查看訂單", next: "前往商店" };
      }
    },
  },
  methods: {
    clickLastButton() {
      if (this.cartsTotalQty === 0) this.$router.push("/bookstore");
      switch (this.$route.name) {
        case "cart":
          this.$router.push("/bookstore");
          break;
        case "order":
          this.$router.push("/bookstore/cart");
          break;
        case "orderPay":
          this.$router.push("/bookstore");
          break;
        case "OrderFinish":
          this.$router.push("/bookstore/searchOrder");
          break;
      }
    },
    clickNextButton() {
      switch (this.$route.name) {
        case "cart":
          this.$router.push("/bookstore/cart/order");
          break;
        case "order":
          this.$emit("sendOrder");
          break;
        case "orderPay":
          this.$emit("payOrder");
          break;
        case "OrderFinish":
          this.$router.push("/bookstore");
          break;
      }
    },
  },
};
</script>
