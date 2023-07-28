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
            清空購物車確認
          </h5>
          <button
            type="button"
            class="btn-close ms-0"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body px-9 py-7 fs-6 fs-lg-5 text-center">
          <FontAwesomeIcon
            :icon="['far', 'face-sad-cry']"
            class="text-primary fs-2 mb-4"
          />
          <p class="mb-4">確認清空購物車所有商品？</p>
          <p class="text-primary fw-bold">(清空後就無法恢復囉!!!)</p>
        </div>
        <div class="modal-footer p-0">
          <button
            type="button"
            class="btn btn-primary w-100 fs-5 py-2 py-lg-4"
            @click.prevent="deleteAllBooks"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia';
import useCartsStore from '@/stores/carts';
import modalMixin from '@/components/mixins/modalMixin';

export default {
  mixins: [modalMixin],
  methods: {
    ...mapActions(useCartsStore, ['deleteAllCarts']),
    async deleteAllBooks() {
      await this.deleteAllCarts();
      this.hideModal();
    },
  },
};
</script>
