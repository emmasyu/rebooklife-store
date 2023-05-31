<template>
  <div class="cart-bg min-vh-100 pt-11 position-relative">
    <CartProgressBar />
    <RouterView />
    <CartStepButton />
  </div>
</template>

<script>
import CartProgressBar from "./components/ProgressBar.vue";
import CartStepButton from "./components/StepButton.vue";

export default {
  components: { CartProgressBar, CartStepButton },
};
</script>
