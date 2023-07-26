<template>
  <AdCouponCol />
  <StoreNavbar />
  <RouterView :key="$route.fullPath" />
  <StoreFooter />
  <GoTop />
</template>

<script>
import StoreNavbar from "./components/Navbar/StoreNavbar.vue";
import StoreFooter from "./components/StoreFooter.vue";
import AdCouponCol from "@/components/front/AdCouponCol.vue";
import GoTop from "@/components/front/GoTop.vue";
import { mapActions } from "pinia";
import useCartsStore from "@/stores/carts.js";
import useProductsStore from "@/stores/products.js";
import useFavoritesStore from "@/stores/favorites.js";
import useRecentStore from "@/stores/recent.js";

export default {
  components: { StoreNavbar, AdCouponCol, StoreFooter, GoTop },
  methods: {
    ...mapActions(useCartsStore, ["getCarts"]),
    ...mapActions(useProductsStore, ["getProductsAll"]),
    ...mapActions(useFavoritesStore, ["getFavorites"]),
    ...mapActions(useRecentStore, ["getRecent"]),
  },
  created() {
    this.getCarts();
    this.getProductsAll();
    this.getFavorites();
    this.getRecent();
  },
};
</script>
