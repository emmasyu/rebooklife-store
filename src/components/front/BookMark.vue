<template>
  <span
    class="bg-white w-lg-5 h-lg-5 w-3 h-3 position-absolute top-0 end-0 mt-3 mt-xl-4 me-3 me-xl-4 z-2 cursor-pointer rounded-circle outline outline-5 outline-primary outline-offset--1 d-flex justify-content-center align-items-center text-white drop-shadow"
  >
    <span
      class="text-primary-light text-primary-hover"
      @click="toggleFavorite(id)"
      ><font-awesome-icon
        class="align-center fs-lg-3 fs-3"
        :icon="[isFavorite(id) ? 'fas' : 'far', 'bookmark']"
    /></span>
  </span>
</template>

<script>
import { mapState, mapActions } from "pinia";
import useFavoritesStore from "@/stores/favorites.js";

export default {
  props: ["id"],
  computed: {
    ...mapState(useFavoritesStore, ["isFavorite"]),
  },
  methods: {
    ...mapActions(useFavoritesStore, ["toggleFavorite"]),
  },
};
</script>

<style lang="scss" scoped>
.drop-shadow {
  filter: drop-shadow(0px 0px 3px #390000);
  &:hover {
    filter: drop-shadow(0px 0px 3px #cccccc);
  }
}
</style>
