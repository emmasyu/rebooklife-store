<template>
  <div class="store-bg">
    <main class="container pt-11 pb-12 px-7 fs-6 fs-lg-5 fs-xl-4">
      <nav aria-label="breadcrumb " class="pt-lg-11">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <RouterLink to="/bookstore">全部</RouterLink>
          </li>
          <li class="breadcrumb-item">
            <RouterLink :to="`/bookstore/${product.category}`">{{
              product.category
            }}</RouterLink>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {{ product.subcategory }}
          </li>
        </ol>
      </nav>

      <div class="d-flex mb-7 mb-xl-8">
        <div class="w-9 w-lg-12 w-xl-13 w-xxl-14">
          <img
            :src="product.imageUrl"
            :alt="product.title"
            class="w-100 rounded-2 rounded-xl-4 shadow"
          />
        </div>
        <div class="align-self-end ps-4 ps-lg-8 text-primary">
          <p class="d-none d-lg-block text-decoration-line-through text-gray">
            NT$ {{ product.origin_price }}元
          </p>
          <p>
            NT$
            <span class="fs-5 fw-bold fs-lg-3">{{ product.price }}</span
            >元　<span
              ><br class="d-lg-none" />| 庫存：{{ product.qty }}
              {{ product.unit }}</span
            >
          </p>

          <div
            class="fixed-bottom d-flex gap-0 position-lg-static gap-lg-4 text-center my-lg-4"
          >
            <button
              href="#"
              class="btn btn-primary p-0 rounded-0 fs-6 fs-lg-5 fs-xl-4 w-100 py-3 w-lg-auto px-lg-10 px-xl-11 py-lg-4 rounded-lg-2"
              @click.prevent="addBookToCart(product.id)"
            >
              加入購物車
            </button>
            <button
              href="#"
              class="btn btn-secondary p-0 rounded-0 fs-6 fs-lg-5 fs-xl-4 w-6 py-3 w-lg-auto px-lg-11 py-lg-4 rounded-lg-2"
              @click.prevent="toggleFavorite(product.id)"
            >
              <span class="d-none d-lg-inline me-2">加入收藏</span>
              <font-awesome-icon
                class="fs-4"
                :icon="[isFavorite(product.id) ? 'fas' : 'far', 'bookmark']"
              />
            </button>
          </div>
          <p class="d-none d-lg-block">付款方式： Web ATM、信用卡一次付清</p>
        </div>
      </div>
      <h3 class="fs-5 fw-bold mb-4 fs-lg-4 fs-xl-3 mb-xl-5">
        {{ product.title }}
      </h3>
      <p class="mb-2 mb-xl-4">作者：{{ product.author }}</p>
      <p class="mb-2 mb-xl-4">出版年：{{ product.publication_year }}</p>
      <p class="mb-2 mb-xl-4">出版社：{{ product.publishing }}</p>
      <p class="mb-11">ISBN：{{ product.ISBN }}</p>
      <header
        class="bg-primary fs-5 fw-bold py-2 ps-7 text-white fs-lg-4 py-lg-4 fs-xl-3"
      >
        簡介
      </header>
      <p class="d-block pt-7 pt-xl-8 px-xl-7 text-pre-line">
        {{ isExpandIntro ? product?.book_intro : trimIntro }}
      </p>
      <div class="text-end mb-11">
        <a
          v-if="product.book_intro?.length > 130"
          href="#"
          class="text-decoration-underline-hover fs-xl-5 fw-bold"
          @click.prevent="toggleExpandIntro"
          >{{ isExpandIntro ? "...收合文章" : "閱讀更多..." }}</a
        >
      </div>
      <header
        class="bg-primary fs-5 fw-bold py-2 ps-7 text-white fs-lg-4 py-lg-4 fs-xl-3"
      >
        章節
      </header>
      <p class="pt-7 ps-4 pt-xl-8 px-xl-8 text-pre-line">
        {{ isExpandChapter ? product?.book_chapter : trimChapter }}
      </p>
      <div class="text-end mb-11">
        <a
          v-if="product.book_chapter?.length > 130"
          href="#"
          class="text-decoration-underline-hover fs-xl-5 fw-bold"
          @click.prevent="toggleExpandChapter"
          >{{ isExpandChapter ? "...收合文章" : "閱讀更多..." }}</a
        >
      </div>
      <header class="fs-5 fw-bold ps-7 fs-lg-4 fs-xl-3 mb-xl-7">
        相關書籍
      </header>
      <RelatedBook :category="product.category" :currentId="product.id" />
    </main>
  </div>
</template>
<script>
import { mapState, mapActions } from "pinia";
import useProductsStore from "@/stores/products.js";
import useFavoritesStore from "@/stores/favorites.js";
import useCartsStore from "@/stores/carts.js";
import useRecentStore from "@/stores/recent.js";
import RelatedBook from "./components/RelatedBook.vue";

export default {
  components: { RelatedBook },
  data() {
    return {
      isExpandIntro: false,
      isExpandChapter: false,
    };
  },
  computed: {
    ...mapState(useProductsStore, ["product"]),
    ...mapState(useFavoritesStore, ["isFavorite"]),
    trimIntro() {
      return this.$filters.trim(this.product?.book_intro ?? "", 130);
    },
    trimChapter() {
      return this.$filters.trim(this.product?.book_chapter ?? "", 130);
    },
  },
  methods: {
    ...mapActions(useProductsStore, ["getProduct"]),
    ...mapActions(useCartsStore, ["addCart"]),
    ...mapActions(useFavoritesStore, ["toggleFavorite"]),
    ...mapActions(useRecentStore, ["addRecent"]),
    async addBookToCart(id) {
      const data = { product_id: id, qty: 1 };
      await this.addCart(data);
    },
    toggleExpandIntro() {
      this.isExpandIntro = !this.isExpandIntro;
    },
    toggleExpandChapter() {
      this.isExpandChapter = !this.isExpandChapter;
    },
  },
  created() {
    this.getProduct(this.$route.params.bookId);
    this.addRecent(this.$route.params.bookId);
  },
};
</script>
<style lang="scss" scoped>
header,
.overflow-x-auto {
  margin-left: -32px;
  margin-right: -32px;
  @media (min-width: 1200px) {
    margin-left: 0;
    margin-right: 0;
  }
}
</style>
