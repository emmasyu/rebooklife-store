<template>
  <span
    v-if="navLink.title === '購物車'"
    data-bs-toggle="dropdown"
    data-bs-auto-close="outside"
    class="position-absolute w-100 h-100 d-none d-lg-block top-0 cursor-pointer z-n1 z-lg-1"
  ></span>
  <RouterLink :to="navLink.path" class="d-block p-3">
    <img
      :src="navLinkPhoto(navLink.name)"
      :alt="navLink.name"
      class="w-3"
      :class="[
        { 'filter-black': isScrollTop },
        isScrollTop ? 'w-lg-5' : 'w-lg-3',
      ]"
    />
    <Budge v-if="navLink.name === 'shopping cart'" :num="cartsTotalQty" />
    <Tooltip :title="navLink.title" />
  </RouterLink>
  <CartDropdown @closeDropdown="closeDropdown" />
</template>
<script>
import { mapState } from "pinia";
import useCartsStore from "@/stores/carts.js";
import dropdownMixin from "@/components/mixins/dropdownMixin";
import CartDropdown from "./CartDropdown.vue";
import Budge from "@/components/front/Badge.vue";
import Tooltip from "@/components/front/Tootip.vue";
import { useWindowSize } from "@vueuse/core";

export default {
  props: ["navLink", "isScrollTop"],
  setup() {
    const { width } = useWindowSize();
    return { width };
  },
  components: { CartDropdown, Budge, Tooltip },
  computed: {
    ...mapState(useCartsStore, ["carts", "cartsTotalQty"]),
    navLinkPhoto() {
      return (name) => {
        switch (name) {
          case "bookstore":
            return new URL(
              `@/assets/images/openbook-white.png`,
              import.meta.url
            ).href;
          case "bookmark":
            return new URL(
              `@/assets/images/bookmark-white.png`,
              import.meta.url
            ).href;
          case "shopping cart":
            return new URL(
              `@/assets/images/shopping-cart-white.png`,
              import.meta.url
            ).href;
          case "order":
            return new URL(`@/assets/images/order-white.png`, import.meta.url)
              .href;
        }
      };
    },
  },
  methods: {
    closeDropdown() {
      this.hideDropdown();
    },
  },

  mixins: [dropdownMixin],
};
</script>
