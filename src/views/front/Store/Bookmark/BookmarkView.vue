<template>
  <div class="store-bg">
    <div class="container fs-6 fs-lg-5 fs-xl-4 text-secondary">
      <div class="min-vh-100 pb-11">
        <div class="pt-11 ps-7 pt-lg-13">
          <div class="ps-4 border-start border-secondary border-2 border-lg-4">
            <p class="mb-7">收藏書籍</p>
          </div>
        </div>

        <div
          class="border border-secondary rounded-2 border-dashed border-1 mx-4 mx-lg-6"
        >
          <div
            v-if="favorites?.length === 0"
            class="min-vh-75 d-flex justify-content-center align-items-center min-vh-lg-60"
          >
            <div class="text-center">
              <p class="fw-bold mb-3">你還沒有任何收藏哦！</p>
              <div class="pt-7 pb-lg-8 pt-lg-4">
                <RouterLink
                  class="btn btn-outline-primary btn-sm px-7 fs-lg-5 py-lg-4 rounded-lg-2"
                  to="/bookstore"
                >
                  回到二搜書店 →
                </RouterLink>
              </div>
            </div>
          </div>

          <div
            class="min-vh-75 min-vh-lg-60 d-flex gap-7 gap-lg-8 flex-wrap align-items-end justify-content-center justify-content-sm-start py-5 py-lg-8 px-5 px-sm-8 px-md-10 px-lg-9 px-xl-8 px-xxl-12"
          >
            <template v-for="item in favorites" :key="item.id">
              <BookmarkCard
                @open-bookmark-modal="openBookmarkModal"
                :item="item"
              />
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
  <BookmarkModal :tempProduct="tempProduct" ref="bookmarkModal" />
</template>

<script>
import { mapState } from "pinia";
import useFavoritesStore from "@/stores/favorites.js";
import BookmarkModal from "./components/BookModal.vue";
import BookmarkCard from "./components/BookCard.vue";

export default {
  components: { BookmarkModal, BookmarkCard },
  data() {
    return {
      tempProduct: {},
    };
  },
  computed: {
    ...mapState(useFavoritesStore, ["favorites"]),
  },
  methods: {
    openBookmarkModal(product) {
      this.tempProduct = product;
      this.$refs.bookmarkModal.showModal();
    },
  },
};
</script>
