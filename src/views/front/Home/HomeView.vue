<template>
  <div class="home-bg cover-blur">
    <AdCouponCol />
    <Navbar />
    <Content />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Content from "./components/Content.vue";
import AdCouponCol from "@/components/front/AdCouponCol.vue";

export default {
  components: {
    Navbar,
    Content,
    AdCouponCol,
  },
};
</script>

<style scoped>
.cover-blur::before {
  backdrop-filter: initial;
}
</style>
