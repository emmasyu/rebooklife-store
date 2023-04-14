<template>
  <LoadingOverlay />
  <RouterView />
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import LoadingOverlay from "@/components/LoadingOverlay.vue";

export default {
  components: {
    LoadingOverlay,
  },
};
</script>

<style lang="scss">
@import "./assets/scss/all";
</style>
