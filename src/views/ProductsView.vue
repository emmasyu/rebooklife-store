<template>
  <div>後台產品頁面</div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import adminApi from "../stores/adminApi";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(adminApi, ["products"]),
  },
  methods: {
    ...mapActions(adminApi, ["getProducts", "getProductsAll"]),
  },
  created() {
    this.getProducts(2);
    // this.getProductsAll();
  },
};
</script>
