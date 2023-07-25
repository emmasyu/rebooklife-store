<template>
  <div class="store-bg">
    <div class="container fs-6 fs-lg-5 fs-xl-4 text-secondary">
      <div class="pt-11 ps-7 pt-lg-13">
        <div class="ps-4 border-start border-secondary border-2 border-lg-4">
          <p class="mb-2">
            搜尋結果：「 <strong>{{ $route.query.searchText }}</strong> 」共查得
            {{ searchBookResult.length }} 件
          </p>
        </div>
      </div>
      <div
        v-if="searchBookResult.length === 0"
        class="min-vh-90 d-flex justify-content-center align-items-center min-vh-lg-75"
      >
        <div class="fs-3-first-letter fs-lg-1-first-letter fw-bold">
          <p class="mb-3">查不到此書...</p>
          <p class="mb-3">換個關鍵字搜尋或回到二搜書找分類</p>
          <div class="text-center pt-12 pb-lg-12 pt-lg-8">
            <RouterLink
              class="btn btn-outline-primary btn-sm px-7 fs-sm-5 py-sm-4 rounded-sm-2"
              to="/bookstore"
            >
              回到二搜書店 →
            </RouterLink>
          </div>
        </div>
      </div>
      <div v-else class="min-vh-90 min-vh-lg-75">
        <ul
          class="d-flex flex-wrap gap-8 gap-xl-9 justify-content-center justify-content-xl-start align-items-end py-8 px-lg-7"
        >
          <li class="list" v-for="book in searchBookResult" :key="book.id">
            <BookCard :book="book" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "pinia";
import useProductsStore from "@/stores/products.js";
import BookCard from "@/components/front/BookCard.vue";

export default {
  components: { BookCard },
  computed: {
    ...mapState(useProductsStore, ["productsAll"]),
    searchBookResult() {
      return this.productsAll.filter((book) =>
        book.title.match(this.$route.query.searchText)
      );
    },
  },
};
</script>
