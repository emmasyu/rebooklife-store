<template>
  <div
    class="related-book position-relative d-flex align-items-center justify-content-center text-primary text-xl-light z-0"
  >
    <p v-if="sliceRelatedProducts(currentId)?.length === 0">...敬請期待...</p>
    <ul
      class="d-flex gap-4 ms-xl-7 pt-5 overflow-x-auto gap-lg-8 justify-content-xl-center overflow-x-xl-hidden ms-xl-7 pt-xl-10 pb-xl-9"
    >
      <li
        class="w-7 w-lg-9 w-xl-10 w-xxl-11 flex-shrink-0 cursor-pointer"
        v-for="book in sliceRelatedProducts(currentId)"
        :key="book.id"
        @click="getProductPage(book.id)"
      >
        <img
          :src="book.imageUrl"
          :alt="book.title"
          class="w-100 rounded-1 rounded-xl-4 mb-2 shadow-small shadow-hover object-fit-cover"
          style="aspect-ratio: 8 / 11"
        />
        <p>{{ trimTitle(book.title) }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "pinia";
import useProductsStore from "@/stores/products.js";
import { useWindowSize } from "@vueuse/core";

export default {
  props: {
    category: {
      type: String,
    },
    currentId: {
      type: String,
    },
  },
  data() {
    return {
      width: useWindowSize().width,
    };
  },
  computed: {
    ...mapState(useProductsStore, ["relatedProducts"]),
    trimTitle() {
      return (title) => {
        if (this.width >= 1400) {
          return this.$filters.trim(title, 16);
        }
        if (this.width >= 992) {
          return this.$filters.trim(title, 14);
        }
        return this.$filters.trim(title, 8);
      };
    },
    sliceRelatedProducts() {
      return (id) => {
        const exceptRelatedProducts = this.relatedProducts(
          this.category
        ).filter((book) => book.id !== id);
        if (this.width >= 1200) {
          return exceptRelatedProducts.slice(0, 4);
        }
        return exceptRelatedProducts;
      };
    },
  },
  methods: {
    getProductPage(id) {
      this.$router.push(`/bookstore/book/${id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.related-book {
  @media (min-width: 1200px) {
    border: 26px #876e32 solid;
    &::after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0px;
      right: 0px;
      z-index: -2;
      background-color: #4f4630;
    }
    &::before {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0px;
      right: 0px;
      z-index: -1;
      background-color: #3a3425;
      clip-path: polygon(
        0 0,
        10% 15%,
        90% 15%,
        100% 0,
        100% 100%,
        90% 85%,
        10% 85%,
        0 100%
      );
    }
  }
}
</style>
