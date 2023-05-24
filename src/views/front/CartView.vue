<template>
  <div class="cart-bg min-vh-100 pt-11 position-relative">
    <CartProgressBar />
    <RouterView />
    <CartStepButton />
  </div>
</template>
<script>
import CartProgressBar from "@/components/front/CartProgressBar.vue";
import CartStepButton from "../../components/front/CartStepButton.vue";

export default {
  components: { CartProgressBar, CartStepButton },
};
</script>
