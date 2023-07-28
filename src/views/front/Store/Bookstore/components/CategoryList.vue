<template>
  <p class="d-none d-lg-block text-primary fw-bold text-center mb-4 fs-xxl-3">
    / 書籍分類 /
  </p>
  <ul
    class="ps-4 text-nowrap d-flex gap-2 overflow-x-auto text-primary fw-bold pb-7 flex-lg-column gap-lg-0 text-center ps-lg-0"
  >
    <li class="border rounded-1 border-primary rounded-lg-0">
      <RouterLink
        to="/bookstore"
        class="d-block px-2 py-1 py-lg-4 bg-primary-hover text-white-hover"
        :class="{ active: currentCategory === '' || currentCategory === 'all' }"
      >
        全部
      </RouterLink>
      <ul
        v-if="currentCategory === '' || currentCategory === 'all'"
        class="d-none d-lg-block border-start border-primary border-5"
      >
        <li v-for="(item, key) in productsOfFeatured" :key="key">
          <RouterLink
            v-if="item.books.length > 0"
            :to="`/bookstore/all/${item.name}`"
            class="d-block px-2 py-lg-3 bg-primary-hover text-white-hover border-top rounded-1 border-primary rounded-lg-0"
            :class="{ active: currentSubcategory === item.name }"
            >{{ item.name }}</RouterLink
          >
        </li>
      </ul>
    </li>
    <li
      v-for="(value, key) in productsCategory"
      :key="key"
      class="border rounded-1 border-primary rounded-lg-0 border-top-lg-0"
    >
      <RouterLink
        :to="`/bookstore/${key}`"
        class="d-block px-2 py-1 py-lg-4 bg-primary-hover text-white-hover"
        :class="{ active: currentCategory === key }"
      >
        {{ key }}
      </RouterLink>
      <ul
        v-if="currentCategory === key"
        class="d-none d-lg-block border-start border-primary border-5"
      >
        <li v-for="subcategory in value" :key="subcategory">
          <RouterLink
            :to="`/bookstore/${currentCategory}/${subcategory}`"
            class="d-block px-2 py-lg-3 bg-primary-hover text-white-hover border-top rounded-1 border-primary rounded-lg-0"
            :class="{ active: currentSubcategory === subcategory }"
            >{{ subcategory }}</RouterLink
          >
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
import { mapState } from 'pinia';
import useProductsStore from '@/stores/products';

export default {
  data() {
    return {
      currentCategory: this.$route.params.category,
      currentSubcategory: this.$route.params.subcategory,
    };
  },
  computed: {
    ...mapState(useProductsStore, ['productsCategory', 'productsOfFeatured']),
  },
};
</script>

<style lang="scss" scoped>
.active {
  background-color: #390000;
  color: white;
  @media (min-width: 992px) {
    box-shadow: 0 -1px 0 #fff;
  }
}
</style>
