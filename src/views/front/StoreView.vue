<template>
  <AdCouponCol />
  <StoreNavbar />
  <RouterView />
  <StoreFooter />
</template>
<script>
import StoreNavbar from "@/components/front/StoreNavbar.vue";
import AdCouponCol from "@/components/front/AdCouponCol.vue";
import StoreFooter from "@/components/front/StoreFooter.vue";
import { mapActions } from "pinia";
import useCartsStore from "@/stores/carts.js";
import useProductsStore from "@/stores/products.js";
import useFavoritesStore from "@/stores/favorites.js";

export default {
  components: { StoreNavbar, AdCouponCol, StoreFooter },
  methods: {
    ...mapActions(useCartsStore, ["getCarts"]),
    ...mapActions(useProductsStore, ["getProductsAll"]),
    ...mapActions(useFavoritesStore, ["getFavorites"]),
  },
  created() {
    this.getCarts();
    this.getProductsAll();
    this.getFavorites();
  },
};
</script>
