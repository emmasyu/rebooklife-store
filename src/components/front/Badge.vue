<template>
  <span
    v-if="cartsTotalQty > 0"
    class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary-light fw-normal"
  >
    {{ cartsTotalQty }}
  </span>
</template>
<script>
import { mapState } from "pinia";
import useCartsStore from "@/stores/carts.js";

export default {
  computed: {
    ...mapState(useCartsStore, ["cartsTotalQty"]),
  },
};
</script>
