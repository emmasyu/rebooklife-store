<template>
  <span
    class="position-absolute top-0 end-4 end-xl-5 text-secondary-light text-highlight-hover cursor-pointer z-2"
    @click="toggleFavorite(id)"
    ><font-awesome-icon
      class="align-top fs-5 fs-lg-4 fs-xl-2"
      :icon="[isFavorite(id) ? 'fas' : 'far', 'bookmark']"
  /></span>
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
