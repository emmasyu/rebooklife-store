<template>
  <div class="store-bg w-100">
    <div class="container fs-6 fs-lg-5 fs-xl-4">
      <div
        class="vh-100 vstack justify-content-center align-items-center position-relative"
      >
        <div
          class="text-secondary fs-3-first-letter fs-lg-1-first-letter fw-bold pt-12"
        >
          <p
            class="mb-3"
            data-aos="fade-up-right"
            data-aos-delay="300"
            data-aos-duration="1500"
          >
            當這本書再次找到它的主人
          </p>
          <p
            class="mb-3"
            data-aos="fade-up-left"
            data-aos-delay="600"
            data-aos-duration="1500"
          >
            將賦予它一段新的生命
            <span class="d-none d-lg-inline-block"
              >，為彼此開啟一段新的知識旅程...</span
            >
          </p>
          <p
            class="d-lg-none"
            data-aos="fade-up-right"
            data-aos-delay="900"
            data-aos-duration="1500"
          >
            為彼此開啟一段新的知識旅程...
          </p>
        </div>
        <div
          class="position-absolute position-lg-static bottom-0 pb-11 pb-lg-0 ps-lg-5 pt-lg-10 float-vertical"
        >
          <p class="text-primary d-lg-none">看書去</p>
          <img src="@/assets/images/guide-line.png" alt="go to read" />
        </div>
      </div>
      <div class="pb-9 row">
        <div class="col-lg-3 pe-xxl-8">
          <CategoryList />
        </div>
        <div class="col-lg-9 ps-lg-8">
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryList from "./components/CategoryList.vue";

export default {
  components: { CategoryList },
};
</script>

<style lang="scss" scoped>
.float-vertical {
  animation: float-vertical 0.5s ease-in-out infinite alternate;
}
@keyframes float-vertical {
  from {
    transform: translateY(0rem);
  }
  to {
    transform: translateY(-0.5rem);
  }
}
</style>
