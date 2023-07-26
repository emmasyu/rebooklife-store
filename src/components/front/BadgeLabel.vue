<template>
  <div
    v-if="num > 0"
    class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary-light fw-normal font-monospace letter-spacing-0"
  >
    {{ num }}
  </div>
</template>

<script>
export default {
  props: {
    num: [String, Number],
  },
};
</script>
