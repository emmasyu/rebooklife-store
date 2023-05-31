<template>
  <span
    v-if="num > 0"
    class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary-light fw-normal"
  >
    {{ num }}
  </span>
</template>

<script>
export default {
  props: ["num"],
};
</script>
