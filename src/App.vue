<template>
  <LoadingOverlay />
  <Toasts />
  <RouterView />
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import Toasts from "@/components/Toasts.vue";

export default {
  components: {
    LoadingOverlay,
    Toasts,
  },
};
</script>

<style lang="scss">
@import "./assets/scss/all";
</style>
