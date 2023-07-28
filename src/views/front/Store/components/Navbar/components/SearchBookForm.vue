<template>
  <input
    type="text"
    placeholder="輸入搜尋書籍關鍵字"
    class="bg-primary bg-lg-transparent rounded-0 border-0 border-bottom border-gray text-light outline-none px-2 fs-5 w-100"
    :class="[{ 'fs-lg-4 text-lg-gray': isScrollTop }, { 'd-none': !isSearch }]"
    v-model="inputText"
    @keyup.enter="searchBook"
    @change="inputSearchText(inputText)"
  />
</template>

<script>
import { mapState, mapActions } from 'pinia';
import useStatesStore from '@/stores/states';

export default {
  props: {
    isScrollTop: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      inputText: '',
    };
  },
  computed: {
    ...mapState(useStatesStore, ['isSearch']),
  },
  watch: {
    isSearch() {
      if (!this.isSearch) {
        this.inputText = '';
        this.inputSearchText('');
      }
    },
  },
  methods: {
    ...mapActions(useStatesStore, ['toggleSearchInput', 'inputSearchText']),
    searchBook() {
      if (!this.inputText) return;
      this.$router.push({
        path: '/bookstore/search',
        query: { searchText: this.inputText.trim() },
      });
      this.toggleSearchInput();
    },
  },
};
</script>
