<template>
  <button
    v-if="text"
    :type="type"
    class="btn btn-primary rounded-0 rounded-lg-2 w-100 w-lg-auto py-3 py-lg-4 px-lg-10 px-xl-11 fw-bold"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'button',
    },
    text: {
      type: String,
    },
  },
};
</script>
