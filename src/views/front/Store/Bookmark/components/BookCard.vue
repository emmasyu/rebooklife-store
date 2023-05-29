<template>
  <div class="w-8 w-lg-9 w-xl-11 text-primary position-relative">
    <img
      :src="product?.imageUrl"
      :alt="product?.title"
      class="w-100 mb-2 rounded-1 mb-lg-4 rounded-xl-4 shadow cursor-pointer"
      @click="$emit('open-bookmark-modal', product)"
    />
    <span
      class="position-absolute top-0 end-4 end-xl-5 text-secondary-light text-highlight-hover cursor-pointer"
      @click="toggleFavorite(product?.id)"
      ><font-awesome-icon
        class="align-top fs-5 fs-lg-4 fs-xl-2"
        :icon="[isFavorite(product?.id) ? 'fas' : 'far', 'bookmark']"
    /></span>
    <h4 class="fs-6 fs-lg-5 fs-xl-4 fw-bold">{{ trimTitle() }}</h4>
    <Stars :product="product" />
  </div>
</template>
<script>
import { mapState, mapActions } from "pinia";
import useFavoritesStore from "@/stores/favorites.js";
import useProductsStore from "@/stores/products.js";
import Stars from "@/components/front/Stars.vue";
import { useWindowSize } from "@vueuse/core";

export default {
  components: { Stars },
  props: ["item"],
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
        return this.$filters.trim(this.product?.title, 18);
      }
      if (this.width >= 992) {
        return this.$filters.trim(this.product?.title, 17);
      }
      return this.$filters.trim(this.product?.title, 14);
    },
  },
};
</script>
