<template>
  <div class="dropdown-menu dropdown-menu-end p-4 fw-bold position-absolute">
    <header class="d-flex justify-content-end border-bottom border-primary">
      <p class="align-self-center w-100 text-center pb-4 text-primary fw-bold">
        購物車
      </p>
      <button
        type="button"
        class="btn-close fs-6 p-2"
        aria-label="Close"
        @click="$emit('closeDropdown')"
      ></button>
    </header>
    <!-- 如果購物車是空的 -->
    <template v-if="cartsTotalQty === 0">
      <p class="w-14 px-4 py-8 text-center">
        您的購物車內還沒有任何商品，<br />去添加商品吧！
      </p>
    </template>
    <!-- 購物車清單 -->
    <template v-else>
      <ul class="max-vh-60 overflow-y-scroll">
        <li
          v-for="item in carts.carts"
          :key="item.id"
          class="border-bottom border-primary py-4 px-4 d-flex gap-4 text-content"
        >
          <img
            :src="item.product.imageUrl"
            :alt="item.product.title"
            class="w-8 rounded-2 shadow"
          />
          <div class="d-flex flex-column justify-content-center gap-3 w-11">
            <h4 class="fs-5 fw-bold">
              {{ $filters.trim(item.product.title, 30) }}
            </h4>
            <p class="text-secondary">NT ${{ item.total }}</p>
          </div>
          <div class="d-flex flex-column justify-content-center gap-7">
            <div class="d-flex gap-1">
              <button
                class="bg-transparent border-0 text-content text-primary-light-hover"
                @click="minusOneQty(item)"
              >
                <font-awesome-icon
                  :icon="['fas', 'caret-down']"
                  class="align-baseline"
                />
              </button>
              <span>{{ item.qty }}</span>
              <button
                class="bg-transparent border-0 text-content text-primary-light-hover"
                @click="addOneQty(item)"
              >
                <font-awesome-icon :icon="['fas', 'caret-up']" />
              </button>
            </div>
            <button
              class="bg-transparent border-0 text-content text-primary-light-hover"
              @click="deleteBook(item.id)"
            >
              <font-awesome-icon :icon="['fas', 'trash']" />
            </button>
          </div>
        </li>
        <p class="text-center text-secondary py-6">
          總額 NT${{ carts.final_total }}
        </p>
      </ul>
    </template>

    <footer>
      <RouterLink
        :to="btnData.url"
        class="btn btn-primary w-100"
        @click="$emit('closeDropdown')"
        >{{ btnData.text }}
      </RouterLink>
    </footer>
  </div>
</template>
<script>
// import { RouterLink } from "vue-router";
import { mapState, mapActions } from "pinia";
import useCartsStore from "@/stores/carts.js";
export default {
  computed: {
    ...mapState(useCartsStore, ["carts", "cartsTotalQty"]),
    btnData() {
      return this.cartsTotalQty === 0
        ? { text: "繼續選購", url: "/bookstore" }
        : { text: "前往結帳", url: "/bookstore/cart" };
    },
  },
  methods: {
    ...mapActions(useCartsStore, ["updateCart", "deleteCart"]),
    async addOneQty(item) {
      const data = { product_id: item.id, qty: item.qty + 1 };
      await this.updateCart(item.id, data);
    },
    async minusOneQty(item) {
      if (item.qty === 1) {
        await this.deleteCart(item.id);
      } else {
        const data = { product_id: item.id, qty: item.qty - 1 };
        await this.updateCart(item.id, data);
      }
    },
    async deleteBook(id) {
      await this.deleteCart(id);
    },
  },
};
</script>
