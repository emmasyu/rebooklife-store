<template>
  <AdCouponCol />
  <StoreNavbar />
  <RouterView :key="$route.fullPath" />
  <StoreFooter />
  <GoTop />
</template>

<script>
import { mapActions } from 'pinia';
import AdCouponCol from '@/components/front/AdCouponCol.vue';
import GoTop from '@/components/front/GoTop.vue';
import useCartsStore from '@/stores/carts';
import useProductsStore from '@/stores/products';
import useFavoritesStore from '@/stores/favorites';
import useRecentStore from '@/stores/recent';
import StoreFooter from './components/StoreFooter.vue';
import StoreNavbar from './components/Navbar/StoreNavbar.vue';

export default {
  components: {
    StoreNavbar,
    AdCouponCol,
    StoreFooter,
    GoTop,
  },
  methods: {
    ...mapActions(useCartsStore, ['getCarts']),
    ...mapActions(useProductsStore, ['getProductsAll']),
    ...mapActions(useFavoritesStore, ['getFavorites']),
    ...mapActions(useRecentStore, ['getRecent']),
  },
  created() {
    this.getCarts();
    this.getProductsAll();
    this.getFavorites();
    this.getRecent();
  },
};
</script>
