<template>
  <button
    v-if="text"
    class="btn btn-primary rounded-0 rounded-lg-2 w-100 w-lg-auto py-3 py-lg-4 px-lg-11 fw-bold"
  >
    {{ text }}
  </button>
</template>
<script>
export default {
  props: ["text"],
};
</script>
