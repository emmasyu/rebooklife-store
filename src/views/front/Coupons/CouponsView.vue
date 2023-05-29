<template>
  <div class="home-bg cover-blur">
    <div
      class="position-relative text-white w-100 min-vh-100 py-8 px-3 bg-black bg-opacity-50"
    >
      <RouterLink class="d-block text-center mb-9" to="/">
        <img
          src="@/assets/images/rebooklife-logo-white.png"
          alt="rebooklife"
          class="w-7"
        />
      </RouterLink>
      <div class="d-flex align-items-center justify-content-center mb-4">
        <img
          src="@/assets/images/search-white.png"
          alt="coupons"
          class="w-2 me-3"
        />
        <h2 class="fs-3 fw-bold me-6">優惠券專區</h2>
      </div>

      <div class="swiper mx-md-7 w-lg-75 mx-lg-auto">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide w-12 w-lg-13"
            v-for="item in coupons"
            :key="item.id"
          >
            <CouponCard :coupon="item" />
          </div>
        </div>
      </div>
      <div class="text-center mb-8">
        <RouterLink
          class="btn btn-outline-light btn-sm px-7 fs-sm-5 py-sm-4 rounded mt-8"
          to="/bookstore"
        >
          進入二搜書店 →
        </RouterLink>
      </div>
    </div>
  </div>
</template>
<script>
import swiperMixin from "@/components/mixins/swiperMixin.js";
import CouponCard from "./components/CouponCard.vue";
import couponsData from "@/data/coupons.json";
export default {
  components: { CouponCard },
  data() {
    return {
      coupons: couponsData.coupons,
    };
  },
  beforeMount() {
    this.assignOptions({
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      spaceBetween: 48,
      coverflowEffect: {
        rotate: 35,
        stretch: 30,
        depth: 100,
        modifier: 0.8,
        slideShadows: false,
      },
    });
  },
  mixins: [swiperMixin],
};
</script>
