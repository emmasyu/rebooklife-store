<template>
  <button
    v-if="text"
    class="btn btn-outline-primary rounded-0 rounded-lg-2 bg-light bg-primary-hover bg-opacity-75-hover w-100 w-lg-auto py-3 py-lg-4 px-lg-10 px-xl-11 fw-bold"
  >
    {{ text }}
  </button>
</template>
<script>
export default {
  props: ["text"],
};
</script>
