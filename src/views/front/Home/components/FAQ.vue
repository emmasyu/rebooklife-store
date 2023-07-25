<template>
  <div class="faq border rounded px-2 py-3 mb-4">
    <div
      class="d-flex justify-content-between cursor-pointer"
      data-bs-toggle="collapse"
      :data-bs-target="`#${faq.question}`"
      aria-expanded="true"
      :aria-controls="`${faq.question}`"
    >
      <h4 class="fs-6 fs-md-5 px-2 pe-7">Q：{{ faq.question }}</h4>
      <FontAwesomeIcon
        class="fs-4 pe-2"
        :icon="[
          'fas',
          faq.isExpanded === 'true' ? 'caret-down' : 'caret-right',
        ]"
      />
    </div>
    <div :id="`${faq.question}`" data-bs-parent="#accordion" class="collapse">
      <hr />
      <p class="px-2">A：{{ faq.answer }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["faq"],
};
</script>

<style lang="scss" scoped>
.faq:has(.show) {
  background-color: rgba($color: #000, $alpha: 0.5);
  transition: all 0.5s ease-in;
}
</style>
