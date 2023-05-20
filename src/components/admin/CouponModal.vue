<template>
  <div
    class="modal modal-lg fade"
    id="couponModal"
    tabindex="-1"
    aria-labelledby="couponModalLabel"
    aria-hidden="true"
    ref="modal"
    @click="closeCategorySelect"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header justify-content-end">
          <h5
            class="modal-title fs-5 text-primary w-100 text-center fw-bold"
            id="couponModalLabel"
          >
            {{ isNewCoupon ? "新增優惠券" : "編輯優惠券" }}
          </h5>
          <button
            type="button"
            class="btn-close ms-0"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body px-8 pt-7">
          <div class="mb-7">
            <div class="mb-4">
              <div
                class="d-flex align-items-center border-bottom border-secondary px-5 py-4"
              >
                <label class="text-primary fw-bold w-10" for="category"
                  >優惠種類：</label
                >
                <input
                  class="form-control rounded-0 p-0"
                  type="text"
                  id="category"
                  placeholder="請輸入優惠種類"
                  maxlength="4"
                  required
                  v-model="couponForm.category"
                />
                <div class="position-relative">
                  <font-awesome-icon
                    class="text-primary position-relative"
                    style="cursor: pointer"
                    :icon="['fas', 'caret-down']"
                    @click.stop="toggleCategory"
                  />
                  <div
                    v-show="isOpenCategory"
                    class="list-group position-absolute end-0 w-10"
                  >
                    <a
                      v-for="item in couponsCategory"
                      href="#"
                      class="list-group-item list-group-item-action text-center"
                      :class="{ active: couponForm.category === item }"
                      @click.prevent="selectCategory(item)"
                    >
                      {{ item }}
                    </a>
                  </div>
                </div>
              </div>
              <div
                class="d-flex align-items-center border-bottom border-secondary px-5 py-4"
              >
                <label class="text-primary fw-bold w-10" for="title"
                  >優惠活動<sup>*</sup>：</label
                >
                <input
                  class="form-control rounded-0 p-0"
                  type="text"
                  id="title"
                  placeholder="請輸入優惠活動"
                  maxlength="15"
                  required
                  v-model="couponForm.title"
                />
              </div>

              <div
                class="d-flex align-items-center border-bottom border-secondary px-5 py-4"
              >
                <label class="text-primary fw-bold w-10" for="due_date"
                  >優惠期限<sup>*</sup>：</label
                >
                <input
                  class="form-control rounded-0 p-0"
                  type="date"
                  id="due_date"
                  placeholder="請選擇到期日"
                  required
                  v-model="due_date"
                />
              </div>

              <div
                class="d-flex align-items-center border-bottom border-secondary px-5 py-4"
              >
                <label class="text-primary fw-bold w-10" for="percent"
                  >折扣%<sup>*</sup>：</label
                >
                <input
                  class="form-control rounded-0 p-0"
                  type="number"
                  id="percent"
                  placeholder="請輸入折扣百分比"
                  required
                  v-model.number="couponForm.percent"
                />
              </div>

              <div
                class="d-flex align-items-center border-bottom border-secondary px-5 py-4"
              >
                <label class="text-primary fw-bold w-10" for="code"
                  >優惠碼<sup>*</sup>：</label
                >
                <input
                  class="form-control rounded-0 p-0"
                  type="text"
                  id="code"
                  placeholder="請輸入優惠碼"
                  maxlength="10"
                  required
                  v-model="couponForm.code"
                />
              </div>

              <div
                class="d-flex align-items-center border-bottom border-secondary px-5 py-4"
              >
                <label class="text-primary fw-bold w-10" for="notes"
                  >備註：</label
                >
                <input
                  class="form-control rounded-0 p-0"
                  type="text"
                  id="notes"
                  placeholder="請輸入備註說明"
                  maxlength="21"
                  required
                  v-model="couponForm.notes"
                />
              </div>
            </div>
            <div class="d-flex justify-content-center">
              <input
                class="form-check-input"
                type="checkbox"
                id="is_enabled"
                style="cursor: pointer"
                v-model="couponForm.is_enabled"
                :true-value="1"
                :false-value="0"
              />
              <label
                for="is_enabled"
                class="text-primary fw-bold ms-4"
                style="cursor: pointer"
                >是否啟用<sup>*</sup></label
              >
            </div>
          </div>
        </div>
        <div class="modal-footer p-0">
          <button
            type="button"
            class="btn btn-primary w-100 fs-4"
            @click="updateCoupon"
          >
            {{ isNewCoupon ? "確認新增" : "確認修改" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from "../mixins/modalMixin";

export default {
  props: ["tempCoupon", "couponsCategory", "isNewCoupon"],
  data() {
    return {
      couponForm: {},
      due_date: "",
      isOpenCategory: false,
    };
  },
  watch: {
    tempCoupon() {
      this.couponForm = { ...this.tempCoupon };
      this.due_date = this.$filters.convertTimeToISO(this.tempCoupon.due_date);
    },
    due_date() {
      this.couponForm.due_date = this.$filters.convertTimeToValue(
        this.due_date
      );
    },
  },

  methods: {
    toggleCategory() {
      this.isOpenCategory = !this.isOpenCategory;
    },
    closeCategorySelect() {
      this.isOpenCategory = false;
    },
    selectCategory(item) {
      this.couponForm.category = item;
      this.isOpenCategory = false;
    },
    updateCoupon() {
      this.$emit("update-coupon", this.couponForm);
    },
  },
  mixins: [modalMixin],
};
</script>
