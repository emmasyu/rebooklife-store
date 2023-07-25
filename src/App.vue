<template>
  <LoadingOverlay />
  <Toasts />
  <RouterView />
</template>

<script>
import LoadingOverlay from "@/components/global/LoadingOverlay.vue";
import Toasts from "@/components/global/Toasts.vue";
import AOS from "aos";
import "aos/dist/aos.css";

export default {
  components: {
    LoadingOverlay,
    Toasts,
  },
  mounted() {
    AOS.init();
  },
};
</script>

<style lang="scss">
@import "./assets/scss/all";
</style>
