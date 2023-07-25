<template>
  <Background />
  <AdCouponCol />
  <Navbar />
  <Content />
  <Hint />
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Content from "./components/Content.vue";
import Background from "./components/Background.vue";
import Hint from "./components/Hint.vue";
import AdCouponCol from "@/components/front/AdCouponCol.vue";

export default {
  components: {
    Navbar,
    Content,
    Background,
    Hint,
    AdCouponCol,
  },
};
</script>
