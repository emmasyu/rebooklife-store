<template>
  <nav class="pt-4 pt-lg-9 fixed-top container">
    <div
      class="bg-primary d-flex align-items-center justify-content-between px-4 py-2 rounded-pill position-relative"
      :class="{ 'bg-lg-transparent': isScrollTop }"
    >
      <RouterLink to="/" class="px-3 py-1 py-lg-2 order-0">
        <img
          src="@/assets/images/rebooklife-logo-white.png"
          alt="二搜書 Re Book Life"
          class="w-7"
          :class="[isScrollTop ? 'w-lg-10 filter-black' : 'w-lg-8']"
        />
      </RouterLink>

      <div
        class="order-first order-lg-0 ms-lg-auto d-flex align-items-center position-lg-relative flex-lg-row-reverse w-lg-50"
      >
        <a
          href="#"
          class="position-relative px-3 py-2 p-lg-3"
          @click.prevent="searchBook"
        >
          <img
            src="@/assets/images/search-white.png"
            :alt="navLinks.searchLink.name"
            class="w-2"
            :class="[isScrollTop ? 'w-lg-5 filter-black' : 'w-lg-3']"
          />
          <TooltipLabel :title="navLinks.searchLink.title" />
        </a>
        <div
          class="search position-absolute bg-primary bg-lg-transparent py-2"
          :class="{ 'w-0 start-100': !isSearch }"
        >
          <SearchBookForm :isScrollTop="isScrollTop" />
        </div>
      </div>
      <a
        class="order-1 text-light px-4 py-2 d-lg-none"
        data-bs-toggle="collapse"
        href="#collapseNavbar"
        role="button"
        aria-expanded="false"
        aria-controls="collapseNavbar"
        ref="collapse"
        @click.prevent="getCollapseBtn"
      >
        <FontAwesomeIcon
          :icon="['fas', isExpanded === 'true' ? 'xmark' : 'bars']"
          class="w-1"
        />
      </a>
      <ul
        class="collapse position-absolute end-0 top-100 mt-4 px-2 position-lg-static d-lg-flex m-lg-0 p-lg-0"
        id="collapseNavbar"
      >
        <li
          class="bg-primary bg-lg-transparent rounded-5 mb-2 mb-lg-0 position-relative"
          @click="hideCollapse"
          v-for="item in navLinks.navLink"
          :key="item.name"
        >
          <StoreNavLink :navLink="item" :isScrollTop="isScrollTop">
          </StoreNavLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useWindowScroll } from '@vueuse/core';
import useStatesStore from '@/stores/states';
import TooltipLabel from '@/components/front/TooltipLabel.vue';
import collapseMixin from '@/components/mixins/collapseMixin';
import navLinksData from '@/data/storeNavLinks.json';
import SearchBookForm from './components/SearchBookForm.vue';
import StoreNavLink from './components/NavLink.vue';

export default {
  components: { StoreNavLink, TooltipLabel, SearchBookForm },
  data() {
    return {
      isExpanded: 'false',
      navLinks: navLinksData,
      y: useWindowScroll().y,
    };
  },
  computed: {
    ...mapState(useStatesStore, ['isSearch', 'searchText']),
    isScrollTop() {
      return this.y === 0;
    },
  },
  methods: {
    ...mapActions(useStatesStore, ['toggleSearchInput', 'inputSearchText']),
    getCollapseBtn() {
      this.isExpanded = this.$refs.collapse?.ariaExpanded;
    },
    searchBook() {
      if (this.isSearch && this.searchText) {
        this.$router.push({
          path: '/bookstore/search',
          query: { searchText: this.searchText.trim() },
        });
        this.toggleSearchInput();
      } else {
        this.toggleSearchInput();
      }
    },
  },
  created() {
    window.addEventListener('click', () => this.hideCollapse());
  },
  mixins: [collapseMixin],
};
</script>

<style lang="scss" scoped>
.search {
  left: 60px;
  width: calc(100% - 120px);
  transition: all 0.3s;
}
:deep .filter-black {
  @media (min-width: 992px) {
    filter: brightness(20%);
  }
}
nav div,
:deep img {
  transition: all 0.5s ease;
}
:is(li, a):hover:deep .tooltip-hover {
  @media (min-width: 992px) {
    display: flex;
  }
}
</style>
