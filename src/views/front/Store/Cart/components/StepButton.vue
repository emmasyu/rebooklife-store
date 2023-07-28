<template>
  <div
    class="sticky-bottom d-flex gap-0 gap-lg-4 pb-lg-5 justify-content-center"
  >
    <ButtonOutline :text="buttonText?.last" @click.prevent="clickLastButton" />
    <ButtonSolid :text="buttonText?.next" @click.prevent="clickNextButton" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import useCartsStore from '@/stores/carts';
import useOrdersStore from '@/stores/orders';
import ButtonSolid from '@/components/front/ButtonSolid.vue';
import ButtonOutline from '@/components/front/ButtonOutline.vue';

export default {
  components: { ButtonSolid, ButtonOutline },
  computed: {
    ...mapState(useCartsStore, ['cartsTotalQty']),
    // eslint-disable-next-line vue/return-in-computed-property, consistent-return
    buttonText() {
      switch (this.$route.name) {
        case 'cart':
          if (this.cartsTotalQty === 0) return { last: '回到商店' };
          return { last: '繼續購物', next: '確認結帳' };
        case 'orderPay':
          return { last: '取消付款', next: '確認結帳' };
        case 'orderFinish':
          return { last: '查看訂單', next: '前往商店' };
        // no default
      }
    },
  },
  methods: {
    ...mapActions(useOrdersStore, ['postPayOrder']),
    clickLastButton() {
      if (this.cartsTotalQty === 0) this.$router.push('/bookstore');
      switch (this.$route.name) {
        case 'cart':
          this.$router.push('/bookstore');
          break;
        case 'orderPay':
          this.$router.push('/bookstore');
          break;
        case 'orderFinish':
          this.$router.push(
            `/bookstore/search_order/${this.$route.params.orderId}`,
          );
          break;
        // no default
      }
    },
    async clickNextButton() {
      switch (this.$route.name) {
        case 'cart':
          this.$router.push('/bookstore/cart/order');
          break;
        case 'orderPay':
          await this.postPayOrder(this.$route.params.orderId);
          this.$router.push(
            `/bookstore/cart/order_finish/${this.$route.params.orderId}`,
          );
          break;
        case 'orderFinish':
          this.$router.push('/bookstore');
          break;
        // no default
      }
    },
  },
};
</script>
