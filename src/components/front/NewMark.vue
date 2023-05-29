<template>
  <div
    v-if="isNewerProduct(id)"
    class="w-8 w-lg-10 h-8 h-lg-10 clippath position-absolute top-0 bg-secondary"
  >
    <p class="fs-lg-4 text-light">新上架</p>
  </div>
</template>

<script>
import { mapState } from "pinia";
import useProductsStore from "@/stores/products.js";

export default {
  props: ["id"],
  computed: {
    ...mapState(useProductsStore, ["isNewerProduct"]),
  },
};
</script>
<style lang="scss" scoped>
.clippath {
  clip-path: polygon(1px 25px, 1px 60px, 60px 1px, 25px 1px);
  p {
    transform-origin: 38px 17px;
    transform: rotate(-45deg);
  }
  @media (min-width: 992px) {
    clip-path: polygon(1px 60px, 1px 120px, 120px 1px, 60px 1px);
    p {
      transform-origin: 75px 15px;
      transform: rotate(-45deg);
    }
  }
}
</style>
