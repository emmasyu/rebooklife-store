<template>
  <span
    class="tooltip-hover position-absolute top-100 start-50 translate-middle-x vstack align-items-center"
  >
    <div class="tooltip-arrow-hover bg-primary w-1 h-1"></div>
    <div class="bg-primary text-nowrap text-light py-1 px-3 rounded-2">
      {{ title }}
    </div>
  </span>
</template>
<script>
export default {
  props: ["title"],
};
</script>
<style lang="scss" scoped>
.tooltip-hover {
  display: none;
  .tooltip-arrow-hover {
    clip-path: polygon(50% 56%, 0% 100%, 100% 100%);
  }
}
</style>
