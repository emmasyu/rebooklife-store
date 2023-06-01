<template>
  <div class="h-100 vstack justify-content-between">
    <div
      class="w-lg-10 w-xl-11 w-xxl-12 position-relative linear-hover cursor-pointer text-primary vstack"
      style="width: 120px"
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
      <NewMark :id="book.id" />
      <BookMark :id="book.id" />
      <div class="mt-auto">
        <h4 class="fs-6 fw-bold fs-lg-5 mb-lg-4 fs-xl-4">
          {{ trimTitle }}
        </h4>
        <p class="fs-5 mb-4 d-none">作者：菲莉帕.派瑞(Philippa Perry)著</p>
        <p class="fs-5 d-none">
          {{ trimIntro }}
        </p>
      </div>
    </div>
    <div>
      <div class="d-flex align-items-center justify-content-between">
        <a
          href="#"
          class="animation-shake p-1 text-primary-light-hover"
          @click.prevent="addBookToCart(book.id)"
          ><font-awesome-icon :icon="['fas', 'cart-shopping']"
        /></a>
        <p>
          NT$<span class="text-secondary p-lg-1 fs-lg-4">{{
            $filters.thousandSeparator(book.price)
          }}</span
          >元
        </p>
      </div>
      <p class="text-gray text-end text-decoration-line-through fs-lg-5">
        NT${{ $filters.thousandSeparator(book.origin_price) }}元
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import useCartsStore from "@/stores/carts.js";
import BookMark from "@/components/front/BookMark.vue";
import NewMark from "@/components/front/NewMark.vue";
import { useWindowSize } from "@vueuse/core";

export default {
  setup() {
    const { width } = useWindowSize();
    return { width };
  },
  props: ["book"],
  components: { BookMark, NewMark },
  computed: {
    bookPhoto() {
      return new URL(this.book.imageUrl, import.meta.url).href;
    },
    trimTitle() {
      if (this.width >= 1400) {
        return this.$filters.trim(this.book.title, 20);
      }
      if (this.width >= 992) {
        return this.$filters.trim(this.book.title, 17);
      }
      return this.$filters.trim(this.book.title, 12);
    },
    trimIntro() {
      if (this.width >= 1400) {
        return this.$filters.trim(this.book.book_intro, 37);
      }
      return this.$filters.trim(this.book.book_intro, 22);
    },
  },
  methods: {
    ...mapActions(useCartsStore, ["addCart"]),
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
