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
    <BadgeLabel v-if="navLink.name === 'shopping cart'" :num="cartsTotalQty" />
    <TooltipLabel :title="navLink.title" />
  </RouterLink>
  <CartDropdown @closeDropdown="closeDropdown" />
</template>

<script>
import { mapState } from 'pinia';
import useCartsStore from '@/stores/carts';
import dropdownMixin from '@/components/mixins/dropdownMixin';
import BadgeLabel from '@/components/front/BadgeLabel.vue';
import TooltipLabel from '@/components/front/TooltipLabel.vue';
import CartDropdown from './CartDropdown.vue';

export default {
  props: {
    navLink: {
      type: Object,
      required: true,
    },
    isScrollTop: {
      type: Boolean,
      default: true,
    },
  },
  components: { CartDropdown, BadgeLabel, TooltipLabel },
  computed: {
    ...mapState(useCartsStore, ['carts', 'cartsTotalQty']),
    navLinkPhoto() {
      // eslint-disable-next-line consistent-return
      return (name) => {
        switch (name) {
          case 'bookstore':
            return new URL(
              '@/assets/images/openbook-white.png',
              import.meta.url,
            ).href;
          case 'bookmark':
            return new URL(
              '@/assets/images/bookmark-white.png',
              import.meta.url,
            ).href;
          case 'shopping cart':
            return new URL(
              '@/assets/images/shopping-cart-white.png',
              import.meta.url,
            ).href;
          case 'order':
            return new URL('@/assets/images/order-white.png', import.meta.url)
              .href;
          // no default
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
