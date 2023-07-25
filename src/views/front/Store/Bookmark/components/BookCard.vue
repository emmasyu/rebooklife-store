<template>
  <div
    class="w-8 w-lg-9 w-xl-11 text-primary position-relative vstack justify-content-end gap-2 flex-grow-0"
  >
    <div class="position-relative">
      <img
        :src="product?.imageUrl"
        :alt="product?.title"
        class="w-100 rounded-1 rounded-xl-4 shadow cursor-pointer shadow-small-hover object-fit-cover"
        style="aspect-ratio: 8 / 11"
        @click="$emit('open-bookmark-modal', product)"
      />
      <BookMark :id="product?.id" v-if="isVisibleMark" />
    </div>
    <h4 class="fs-6 fs-lg-5 fs-xl-4 fw-bold">{{ trimTitle() }}</h4>
    <Stars :product="product" />
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import useFavoritesStore from "@/stores/favorites.js";
import useProductsStore from "@/stores/products.js";
import BookMark from "@/components/front/BookMark.vue";
import Stars from "@/components/front/Stars.vue";
import { useWindowSize } from "@vueuse/core";

export default {
  components: { BookMark, Stars },
  props: ["item", "isVisibleMark"],
  setup() {
    const { width } = useWindowSize();
    return { width };
  },
  computed: {
    ...mapState(useFavoritesStore, ["isFavorite"]),
    ...mapState(useProductsStore, ["productsAll"]),
    product() {
      return this.productsAll?.find((book) => book.id === this.item.id);
    },
  },
  methods: {
    ...mapActions(useFavoritesStore, ["toggleFavorite"]),
    trimTitle() {
      if (this.width >= 1200) {
        return this.$filters.trim(this.product?.title, 16);
      }
      if (this.width >= 992) {
        return this.$filters.trim(this.product?.title, 14);
      }
      return this.$filters.trim(this.product?.title, 10);
    },
  },
};
</script>
