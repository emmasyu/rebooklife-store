<template>
  <button
    v-if="y >= 300"
    type="button"
    class="float-vertical position-fixed bg-primary bg-primary-light-hover bottom-0 end-0 w-6 h-6 rounded-5 border border-3 border-light d-flex justify-content-center align-items-center mb-9 mb-lg-8 me-4 me-lg-8 fs-6 cursor-pointer z-2"
    @click.prevent="scrollTop"
  >
    <FontAwesomeIcon :icon="['fas', 'circle-up']" class="text-white fs-3" />
  </button>
</template>

<script>
import { useWindowScroll } from '@vueuse/core';

export default {
  data() {
    return {
      y: useWindowScroll().y,
    };
  },
  methods: {
    scrollTop() {
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
.float-vertical {
  animation: float-vertical 0.5s ease-in-out infinite alternate;
}
@keyframes float-vertical {
  from {
    transform: translateY(0rem);
  }
  to {
    transform: translateY(-0.5rem);
  }
}
</style>
