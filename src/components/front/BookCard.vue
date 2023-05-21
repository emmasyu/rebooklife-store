<template>
  <div
    class="w-8 w-lg-10 w-xl-11 w-xxl-12 position-relative linear-hover cursor-pointer text-primary"
  >
    <div
      class="position-absolute w-100 h-100 top-0 start-0 z-1"
      @click.self="getProductPage(book.id)"
    ></div>
    <img
      :src="bookPhoto"
      :alt="book.title"
      class="w-100 mb-2 rounded-1 mb-lg-4 rounded-xl-4 shadow"
    />
    <div
      v-if="isNewerProduct(book.id)"
      class="w-8 w-lg-10 h-8 h-lg-10 clippath position-absolute top-0 bg-secondary"
    >
      <p class="fs-lg-4 text-light">新上架</p>
    </div>
    <span
      class="position-absolute top-0 end-4 end-xl-5 text-secondary-light text-highlight-hover cursor-pointer z-2"
      @click="toggleFavorite(book.id)"
      ><font-awesome-icon
        class="align-top fs-5 fs-lg-4 fs-xl-2"
        :icon="[isFavorite(book.id) ? 'fas' : 'far', 'bookmark']"
    /></span>
    <div>
      <h4 class="fs-6 fw-bold lh-base fs-lg-5 mb-lg-4 fs-xl-4">
        {{ trimTitle }}
      </h4>
      <p class="fs-5 mb-4 d-none">作者：菲莉帕.派瑞(Philippa Perry)著</p>
      <p class="fs-5 d-none">
        {{ trimIntro }}
      </p>
    </div>
  </div>
  <div class="d-flex align-items-center justify-content-between">
    <a
      href="#"
      class="animation-shake p-1 text-primary-light-hover"
      @click.prevent="addBookToCart(book.id)"
      ><font-awesome-icon :icon="['fas', 'cart-shopping']"
    /></a>
    <p>
      NT$<span class="text-secondary p-lg-1 fs-lg-4">{{ book.price }}</span
      >元
    </p>
  </div>
  <p class="text-gray text-end text-decoration-line-through fs-lg-5">
    NT${{ book.origin_price }}元
  </p>
</template>
<script>
import { mapState, mapActions } from "pinia";
import useCartsStore from "@/stores/carts.js";
import useFavoritesStore from "@/stores/favorites.js";
import useProductsStore from "@/stores/products.js";
import { useWindowSize } from "@vueuse/core";
const { width } = useWindowSize();

export default {
  data() {
    return {
      width,
    };
  },
  props: ["book"],
  computed: {
    ...mapState(useFavoritesStore, ["isFavorite"]),
    ...mapState(useProductsStore, ["isNewerProduct"]),
    bookPhoto() {
      return new URL(this.book.imageUrl, import.meta.url).href;
    },
    trimTitle() {
      if (this.width >= 1400) {
        return this.$filters.trim(this.book.title, 22);
      }
      if (this.width >= 992) {
        return this.$filters.trim(this.book.title, 18);
      }
      return this.$filters.trim(this.book.title, 14);
    },
    trimIntro() {
      if (this.width >= 1400) {
        return this.$filters.trim(this.book.book_intro, 39);
      }
      return this.$filters.trim(this.book.book_intro, 22);
    },
  },
  methods: {
    ...mapActions(useCartsStore, ["addCart"]),
    ...mapActions(useFavoritesStore, ["toggleFavorite"]),
    async addBookToCart(id) {
      const data = { product_id: id, qty: 1 };
      await this.addCart(data);
    },
    getProductPage(id) {
      this.$router.push(`/bookstore/book/${id}`);
    },
  },
};
</script>
<style lang="scss" scoped>
.clippath {
  clip-path: polygon(1px 25px, 1px 60px, 60px 1px, 25px 1px);
  p {
    transform-origin: 38px 17px;
    transform: rotate(-45deg);
  }
  @media (min-width: 992px) {
    clip-path: polygon(1px 60px, 1px 120px, 120px 1px, 60px 1px);
    p {
      transform-origin: 75px 15px;
      transform: rotate(-45deg);
    }
  }
}
.animation-shake {
  transition: 0.3s;
  &:hover {
    animation: shake 200ms alternate infinite;
  }
  @keyframes shake {
    from {
      transform: rotate(5deg) scale(1.5);
    }
    to {
      transform: rotate(-5deg) scale(1.5);
    }
  }
}

.linear-hover {
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    top: 100%;
    bottom: 1rem;
    background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 1));
  }
  &:hover {
    // transition: all 0.5s ease-in;
    @media (min-width: 1200px) {
      &::before {
        transition: all 0.5s ease-in-out;
        top: 0;
        border-radius: 1.25rem;
      }
      width: 248px !important;
      margin-right: -1.5rem;
      margin-left: -1.5rem;
      margin-bottom: 0.575rem;
      div {
        position: absolute;
        bottom: 2.5rem;
        left: 1.5rem;
        right: 1.5rem;
        color: white;
      }
      p {
        display: block !important;
      }
      .clippath {
        display: none;
      }
    }
    @media (min-width: 1400px) {
      width: 298px !important;
    }
  }
}
</style>
