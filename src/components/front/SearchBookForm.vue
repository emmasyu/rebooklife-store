<template>
  <input
    type="text"
    placeholder="輸入搜尋書籍關鍵字"
    class="bg-primary bg-lg-transparent border-0 border-bottom border-gray text-light outline-none px-2 fs-5 w-100"
    :class="[{ 'fs-lg-4 text-lg-gray': isScrollTop }, { 'd-none': !isSearch }]"
    v-model="searchText"
    @change="searchBook"
  />
</template>
<script>
import { mapState, mapActions } from "pinia";
import useStatesStore from "@/stores/states.js";

export default {
  props: ["isScrollTop"],
  data() {
    return {
      searchText: "",
    };
  },
  computed: {
    ...mapState(useStatesStore, ["isSearch"]),
  },
  methods: {
    ...mapActions(useStatesStore, ["toggleSearchInput"]),
    searchBook() {
      this.$router.push({
        path: "/bookstore/search",
        query: { searchText: this.searchText },
      });
      this.searchText = "";
      this.toggleSearchInput();
    },
  },
};
</script>
