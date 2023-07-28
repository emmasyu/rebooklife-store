<template>
  <HomeBackground />
  <AdCouponCol />
  <HomeNavbar />
  <HomeContent />
  <HomeHint />
</template>

<script>
import AdCouponCol from '@/components/front/AdCouponCol.vue';
import HomeNavbar from './components/HomeNavbar.vue';
import HomeContent from './components/HomeContent.vue';
import HomeBackground from './components/HomeBackground.vue';
import HomeHint from './components/HomeHint.vue';

export default {
  components: {
    HomeNavbar,
    HomeContent,
    HomeBackground,
    HomeHint,
    AdCouponCol,
  },
};
</script>
