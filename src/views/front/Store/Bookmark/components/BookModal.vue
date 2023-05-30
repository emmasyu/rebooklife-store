<template>
  <div
    class="modal modal-lg fade"
    id="bookmarkModal"
    tabindex="-1"
    aria-labelledby="bookmarkModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header justify-content-end">
          <h5
            class="modal-title fs-5 text-primary w-100 text-center fw-bold"
            id="bookmarkModalLabel"
          >
            我的收藏
          </h5>
          <button
            type="button"
            class="btn-close ms-0"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body px-9 py-7 fs-6 fs-lg-5 fs-xl-4">
          <div class="d-flex flex-column align-items-center text-center">
            <div class="mb-3">
              <Stars :product="tempProduct" :tempName="'temp'" />
            </div>
            <div class="w-9 w-lg-11 w-xl-12 text-primary position-relative">
              <img
                :src="tempProduct.imageUrl"
                :alt="tempProduct.title"
                class="w-100 mb-2 rounded-1 mb-lg-4 rounded-xl-4 shadow shadow-small-hover cursor-pointer mb-4 mb-xl-5"
                @click.self="getProductPage(tempProduct?.id)"
              />
              <BookMark :id="tempProduct?.id" />
              <h4 class="fs-6 fs-lg-5 fs-xl-4 fw-bold">
                {{ trimTitle() }}
              </h4>
              <p>
                NT$
                <span class="text-secondary fw-bold fs-5 fs-lg-4 fs-xl-3">{{
                  tempProduct.price
                }}</span>
                元
              </p>
              <p class="text-gray text-decoration-line-through fs-xl-5">
                NT${{ tempProduct.origin_price }}元
              </p>
            </div>
          </div>
        </div>
        <div class="modal-footer p-0">
          <button
            type="button"
            class="btn btn-primary w-100 fs-5 fs-lg-4 py-2 py-lg-4"
            @click.prevent="addBookToCart(tempProduct.id)"
          >
            加入購物車
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import useCartsStore from "@/stores/carts.js";
import modalMixin from "@/components/mixins/modalMixin";
import BookMark from "@/components/front/BookMark.vue";
import Stars from "@/components/front/Stars.vue";

export default {
  components: { Stars, BookMark },
  props: ["tempProduct"],
  mixins: [modalMixin],

  methods: {
    ...mapActions(useCartsStore, ["addCart"]),
    trimTitle() {
      return this.$filters.trim(this.tempProduct?.title, 20);
    },
    getProductPage(id) {
      this.$router.push(`/bookstore/book/${id}`);
      this.hideModal();
    },
    async addBookToCart(id) {
      const data = { product_id: id, qty: 1 };
      await this.addCart(data);
      this.hideModal();
    },
  },
};
</script>
