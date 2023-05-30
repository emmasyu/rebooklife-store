<template>
  <AdCouponCol />
  <StoreNavbar />
  <RouterView :key="$route.fullPath" />
  <StoreFooter />
  <Top />
</template>
<script>
import StoreNavbar from "./components/Navbar/Navbar.vue";
import StoreFooter from "./components/Footer.vue";
import AdCouponCol from "@/components/front/AdCouponCol.vue";
import Top from "@/components/front/Top.vue";
import { mapActions } from "pinia";
import useCartsStore from "@/stores/carts.js";
import useProductsStore from "@/stores/products.js";
import useFavoritesStore from "@/stores/favorites.js";
import useRecentStore from "@/stores/recent.js";

export default {
  components: { StoreNavbar, AdCouponCol, StoreFooter, Top },
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
