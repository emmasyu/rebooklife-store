<template>
  <div class="home-bg cover-blur">
    <AdCouponCol />
    <Navbar />
    <HomePage />
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import HomePage from "../components/HomePage.vue";
import AdCouponCol from "../components/AdCouponCol.vue";

export default {
  components: {
    Navbar,
    HomePage,
    AdCouponCol,
  },
};
</script>

<style scoped>
.cover-blur::before {
  backdrop-filter: initial;
}
</style>
