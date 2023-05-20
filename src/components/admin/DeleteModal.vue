<template>
  <div
    class="modal fade"
    id="deleteModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="deleteModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header justify-content-end">
          <h5
            class="modal-title fs-5 text-primary w-100 text-center fw-bold"
            id="deleteModalLabel"
          >
            {{
              tempProduct ? "刪除商品" : tempCoupon ? "刪除優惠券" : "刪除訂單"
            }}
          </h5>
          <button
            type="button"
            class="btn-close ms-0"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body text-center px-8 py-7">
          <img
            v-if="tempItem.imageUrl"
            class="rounded-2 w-9 shadow mb-4"
            :src="tempItem.imageUrl"
            :alt="tempItem.title"
          />
          <p>是否刪除</p>
          <p class="py-2">
            <strong class="text-danger"
              >{{
                tempItem.title ||
                `${tempItem.user ? tempItem.user.email : "全部"}訂單`
              }}
              ?</strong
            >
          </p>
          <p>(刪除後將無法恢復)</p>
        </div>
        <div class="modal-footer p-0">
          <button
            type="button"
            class="btn btn-primary w-100 fs-4"
            @click="$emit('del-item')"
          >
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from "../mixins/modalMixin";

export default {
  props: ["tempProduct", "tempCoupon", "tempOrder"],
  mixins: [modalMixin],
  computed: {
    tempItem() {
      return this.tempProduct || this.tempCoupon || this.tempOrder;
    },
  },
};
</script>
