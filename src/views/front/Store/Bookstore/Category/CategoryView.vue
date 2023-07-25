<template>
  <template v-if="currentCategory === ''">
    <div
      class="pb-8 pb-lg-10"
      v-for="(value, key) in productsOfFeatured"
      :key="key"
    >
      <p
        v-if="value.books.length !== 0"
        class="bg-primary py-1 ps-7 mb-4 text-light fw-bold rounded-5 rounded-bottom-0 bg-lg-transparent text-lg-primary border-start border-primary border-5 rounded-lg-0 mb-xl-6"
      >
        {{ value.name }}
      </p>
      <ul
        class="d-flex gap-5 ps-4 overflow-x-auto gap-lg-8 overflow-x-xl-hidden gap-xl-9 ps-xl-5"
      >
        <li class="text-primary" v-for="book in value.books" :key="book.id">
          <BookCard :book="book" />
        </li>
      </ul>
      <div
        v-if="value.books.length > 3"
        class="d-none d-xl-block text-end pt-6 fs-5 fw-bold"
      >
        <RouterLink
          :to="`/bookstore/all/${value.name}`"
          class="text-decoration-underline-hover"
          >查看更多...</RouterLink
        >
      </div>
    </div>
  </template>
  <div class="pb-8 pb-lg-10" v-for="subcategory in category" :key="subcategory">
    <p
      class="bg-primary py-1 ps-7 mb-4 text-light fw-bold rounded-5 rounded-bottom-0 bg-lg-transparent text-lg-primary border-start border-primary border-5 rounded-lg-0 mb-xl-6"
    >
      {{ subcategory }}
    </p>
    <ul
      class="d-flex gap-5 ps-4 overflow-x-auto gap-lg-8 overflow-x-xl-hidden gap-xl-9 ps-xl-5"
    >
      <li
        class="text-primary"
        v-for="book in productsOfSubcategory(subcategory)"
        :key="book.id"
      >
        <BookCard :book="book" />
      </li>
    </ul>
    <div
      v-if="productsOfSubcategory(subcategory).length > 3"
      class="d-none d-xl-block text-end pt-6 fs-5 fw-bold"
    >
      <RouterLink
        :to="`/bookstore/${currentCategory}/${subcategory}`"
        class="text-decoration-underline-hover"
        >查看更多...</RouterLink
      >
    </div>
  </div>
</template>

<script>
import { mapState } from "pinia";
import useProductsStore from "@/stores/products.js";
import useFavoritesStore from "@/stores/favorites.js";
import useRecentStore from "@/stores/recent.js";
import BookCard from "@/components/front/BookCard.vue";

export default {
  components: { BookCard },
  data() {
    return {
      currentCategory: this.$route.params.category,
    };
  },
  computed: {
    ...mapState(useProductsStore, [
      "productsAll",
      "productsCategory",
      "productsOfFeatured",
    ]),
    ...mapState(useFavoritesStore, ["favorites"]),
    ...mapState(useRecentStore, ["recent"]),
    category() {
      return this.productsCategory[this.currentCategory];
    },
    productsOfSubcategory() {
      return (subcategory) => {
        return this.productsAll?.filter(
          (book) => book.subcategory === subcategory
        );
      };
    },
  },
  mounted() {
    if (!this.category) {
      this.$router.push("/bookstore");
    }
  },
};
</script>
