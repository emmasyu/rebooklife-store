<template>
  <nav aria-label="Page navigation example" v-if="pages.total_pages">
    <ul class="pagination justify-content-center gap-4">
      <li class="page-item" :class="{ disabled: !pages.has_pre }">
        <a
          class="page-link"
          href="#"
          aria-label="FirstPage"
          @click.prevent="updatePage(1)"
        >
          <FontAwesomeIcon :icon="['fas', 'backward-fast']" />
        </a>
      </li>
      <li class="page-item" :class="{ disabled: !pages.has_pre }">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="updatePage(pages.current_page - 1)"
        >
          <FontAwesomeIcon :icon="['fas', 'caret-left']" />
        </a>
      </li>
      <li
        class="page-item"
        v-for="page in pages.total_pages"
        :key="page"
        :class="{ active: page === pages.current_page }"
      >
        <a class="page-link" href="#" @click.prevent="updatePage(page)">
          {{ page }}
        </a>
      </li>
      <li class="page-item" :class="{ disabled: !pages.has_next }">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="updatePage(pages.current_page + 1)"
        >
          <FontAwesomeIcon :icon="['fas', 'caret-right']" />
        </a>
      </li>
      <li class="page-item" :class="{ disabled: !pages.has_next }">
        <a
          class="page-link"
          href="#"
          aria-label="FirstPage"
          @click.prevent="updatePage(pages.total_pages)"
        >
          <FontAwesomeIcon :icon="['fas', 'forward-fast']" />
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    pages: {
      type: Object,
      required: true,
    },
  },
  methods: {
    updatePage(page) {
      this.$emit('emit-pages', page);
    },
  },
};
</script>
