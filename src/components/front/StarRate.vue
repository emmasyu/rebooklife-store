<template>
  <div class="d-flex flex-row-reverse justify-content-center">
    <input
      v-for="i in 5"
      :key="i"
      type="radio"
      :name="`${product?.id}${tempName}`"
      :value="6 - i"
      v-model="stars"
      class="cursor-pointer text-gray"
      @click="giveStars(product?.id, 6 - i)"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import useFavoritesStore from "@/stores/favorites.js";

export default {
  props: {
    product: {
      type: Object,
    },
    tempName: {
      type: String,
      default: "",
    },
  },
  computed: {
    ...mapState(useFavoritesStore, ["favorites"]),
    stars() {
      return this.favorites?.find((item) => item.id === this.product?.id)
        ?.stars;
    },
  },
  methods: {
    ...mapActions(useFavoritesStore, ["giveStars"]),
  },
};
</script>

<style lang="scss" scoped>
input[type="radio"] {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  &::before {
    content: "★";
    font-size: 16px;
    @media (min-width: 1200px) {
      font-size: 20px;
    }
  }
  &:hover::before,
  &:hover ~ &::before,
  &:checked::before,
  &:checked ~ &::before {
    color: #deb657;
  }
}
</style>
