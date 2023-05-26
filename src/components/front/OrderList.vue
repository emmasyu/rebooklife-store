<template>
  <ul class="ps-0 pt-4 pt-lg-7 mb-0 border-bottom border-lg-0">
    <li
      v-for="cart in carts"
      :key="cart.id"
      class="d-flex gap-4 gap-xl-7 justify-content-between align-items-center mb-4 mb-lg-7 px-lg-5 pb-4 pb-lg-7 border-bottom-lg border-lg-content"
    >
      <div class="position-relative">
        <img
          :src="cart.product.imageUrl"
          :alt="cart.product.title"
          class="w-7 w-lg-8 rounded-1"
        />
        <Badge :num="cart.qty" />
      </div>
      <div>
        <h4 class="fs-6 fs-xl-5 text-content fw-bold lh-base">
          {{ cart.product.title }}
        </h4>
        <p class="d-none d-sm-block fs-6 fw-normal text-secondary">
          作者：{{ cart.product.author }}
        </p>
      </div>
      <p class="text-content d-none d-lg-block">1</p>
      <div class="text-end">
        <p
          v-if="cart.coupon"
          class="text-gray text-decoration-line-through fs-xl-6"
        >
          NT$ {{ cart.total }}
        </p>
        <p class="text-secondary w-7 w-lg-8 min-w-lg-content">
          NT$ {{ cart.final_total }}
        </p>
      </div>
    </li>
  </ul>
</template>
<script>
import Badge from "@/components/front/Badge.vue";

export default {
  props: ["carts"],
  components: { Badge },
};
</script>
