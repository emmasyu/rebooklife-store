<template>
  <div class="container mt-9 mb-12 mb-lg-8 px-7 min-vh-75 min-vh-lg-60">
    <div
      class="border-0 border-lg-1 border-secondary border-dashed rounded-5 p-lg-7"
    >
      <div
        v-if="cartsTotalQty === 0"
        class="vstack gap-7 justify-content-center vh-75 vh-lg-50 pb-7"
      >
        <p class="text-center text-primary fw-bold">
          您的購物車內還沒有任何商品， <br />
          前往商店繼續看看吧！
        </p>
      </div>
      <table v-else class="mx-auto fw-bold">
        <thead
          class="d-none d-lg-table-header-group text-primary text-center fs-lg-4"
        >
          <tr class="border-bottom border-content">
            <th class="pb-4">商品</th>
            <th class="pb-4">書名</th>
            <th class="pb-4">數量</th>
            <th class="pb-4 w-lg-9">金額</th>
            <th></th>
          </tr>
        </thead>
        <tbody class="text-content fs-6 fs-lg-5 vstack d-lg-table-row-group">
          <tr
            v-for="cart in carts.carts"
            class="d-block border-bottom border-gray d-lg-table-row"
          >
            <td
              class="d-block d-lg-table-cell float-start py-7 pe-4 px-lg-5 px-xl-9"
            >
              <img
                :src="cart.product.imageUrl"
                :alt="cart.product.title"
                class="w-8 w-xl-9 rounded-1"
              />
            </td>
            <td
              class="d-block d-lg-table-cell pt-7 pt-lg-0 mb-1 vw-sm-75 vw-md-50 w-lg-auto"
            >
              <h4 class="fs-6 fs-lg-5 fw-bold">
                {{ $filters.trim(cart.product.title, 30) }}
              </h4>
              <p class="d-none d-sm-block fs-6 fw-normal text-secondary">
                作者：{{ cart.product.author }}
              </p>
            </td>
            <td class="d-block d-lg-table-cell mb-1 px-lg-5 px-xl-8">
              <div
                class="d-flex align-items-center justify-content-between border border-primary w-8 w-lg-9"
              >
                <button
                  type="button"
                  class="border-0 bg-transparent py-2 px-3 bg-primary-hover text-light-hover"
                  @click.prevent="minusOneQty(cart)"
                >
                  －
                </button>
                <p>{{ cart.qty }}</p>
                <button
                  type="button"
                  class="border-0 bg-transparent py-2 px-3 bg-primary-hover text-light-hover"
                  @click.prevent="addOneQty(cart)"
                >
                  ＋
                </button>
              </div>
            </td>
            <td class="d-block d-lg-table-cell text-lg-end pe-lg-3">
              <p>
                NT$ <span class="text-primary">{{ cart.total }}</span>
              </p>
              <p class="text-decoration-line-through text-gray fs-6">
                NT$ {{ cart.product.origin_price * cart.qty }}
              </p>
            </td>
            <td class="d-block d-lg-table-cell text-end py-2 px-lg-5 px-xl-8">
              <button
                type="button"
                class="btn p-2 text-primary-light-hover"
                @click.prevent="deleteBook(cart.id)"
              >
                <font-awesome-icon class="fs-5" :icon="['fas', 'trash']" />
              </button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="5">
              <div
                class="d-lg-flex flex-row-reverse align-items-center justify-content-between px-lg-5 px-xl-8"
              >
                <div class="my-4 mt-lg-7">
                  <div
                    class="d-flex text-gray text-decoration-line-through mb-2 fs-6"
                  >
                    <p class="me-auto">小計</p>
                    <p>NT${{ originTotal }}</p>
                  </div>
                  <div class="d-flex text-primary">
                    <p class="me-auto">總計</p>
                    <p class="text-secondary">NT${{ carts.total }}</p>
                  </div>
                </div>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm fs-lg-5 py-lg-4 px-lg-8 rounded-lg-2"
                  @click.prevent="deleteAllBooks"
                >
                  清空購物車
                </button>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import useCartsStore from "@/stores/carts.js";

export default {
  computed: {
    ...mapState(useCartsStore, ["carts", "cartsTotalQty"]),
    originTotal() {
      return this.carts.carts?.reduce((all, curr) => {
        return all + curr.product.origin_price * curr.qty;
      }, 0);
    },
  },
  methods: {
    ...mapActions(useCartsStore, [
      "updateCart",
      "deleteCart",
      "deleteAllCarts",
    ]),
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
    async deleteAllBooks() {
      await this.deleteAllCarts();
    },
  },
};
</script>
