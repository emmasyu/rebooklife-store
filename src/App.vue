<template>
  <LoadingOverlay />
  <ToastsBox />
  <RouterView />
</template>

<script>
import LoadingOverlay from "@/components/global/LoadingOverlay.vue";
import ToastsBox from "@/components/global/ToastsBox.vue";
import AOS from "aos";
import "aos/dist/aos.css";

export default {
  components: {
    LoadingOverlay,
    ToastsBox,
  },
  mounted() {
    AOS.init();
  },
};
</script>

<style lang="scss">
@import "./assets/scss/all";
</style>
