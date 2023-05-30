<template>
  <div
    class="modal modal-xl fade"
    id="orderModal"
    tabindex="-1"
    aria-labelledby="orderModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header justify-content-end">
          <h5
            class="modal-title fs-5 text-primary w-100 text-center fw-bold"
            id="orderModalLabel"
          >
            {{ `訂單狀態(${tempOrder.id})` }}
          </h5>
          <button
            type="button"
            class="btn-close ms-0"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body d-flex px-8 pt-7 gap-8">
          <div class="w-50 text-primary">
            <p
              class="border border-primary fw-bold py-1 px-5 d-inline-block mb-7"
            >
              訂單資訊
            </p>
            <table>
              <tr>
                <td class="fw-bold pe-5 pb-7">訂單日期</td>
                <td class="pb-7">
                  {{ $filters.convertTimeToLocaleDate(tempOrder.create_at) }}
                </td>
              </tr>
              <tr>
                <td class="fw-bold pe-5 pb-7">訂單編號</td>
                <td class="pb-7">{{ tempOrder.id }}</td>
              </tr>
              <tr>
                <td class="fw-bold pe-5 pb-7">訂單金額</td>
                <td class="pb-7">
                  NT$
                  {{ $filters.thousandSeparator(tempOrder.total) }}
                </td>
              </tr>
              <tr>
                <td class="fw-bold pe-5 pb-7">付款狀態</td>
                <td class="pb-7" :class="{ 'text-success': tempOrder.is_paid }">
                  {{ tempOrder.paid_date ? "已付款" : "未付款" }}
                  <span v-if="tempOrder.paid_date"
                    >({{
                      $filters.convertTimeToLocale(tempOrder.paid_date)
                    }})</span
                  >
                </td>
              </tr>
            </table>
            <hr />
            <table class="mt-7">
              <tr>
                <td class="fw-bold pe-5 pb-7">收件人姓名</td>
                <td class="pb-7">
                  {{ tempOrder.user?.name }}
                </td>
              </tr>
              <tr>
                <td class="fw-bold pe-5 pb-7">連絡電話</td>
                <td class="pb-7">{{ tempOrder.user?.tel }}</td>
              </tr>
              <tr>
                <td class="fw-bold pe-5 pb-7">電子郵件</td>
                <td class="pb-7">
                  {{ tempOrder.user?.email }}
                </td>
              </tr>
              <tr>
                <td class="fw-bold pe-5 pb-7">收件地址</td>
                <td class="pb-7">
                  {{ tempOrder.user?.address }}
                </td>
              </tr>
            </table>
          </div>
          <div class="w-50">
            <p
              class="border border-primary fw-bold py-1 px-5 d-inline-block text-primary mb-7"
            >
              下單產品
            </p>
            <div style="height: 385px" class="overflow-auto mb-7">
              <div v-for="item in tempOrder.products" class="d-flex gap-4 mb-4">
                <img
                  :src="item.product.imageUrl"
                  :alt="item.product.title"
                  class="w-6"
                />
                <p class="w-11">
                  {{ $filters.trim(item.product.title, 30) }}
                </p>
                <p class="text-end">{{ item.qty }}</p>
                <p class="ms-auto">
                  NT$
                  <span class="text-primary">{{
                    $filters.thousandSeparator(item.final_total)
                  }}</span>
                </p>
              </div>
            </div>
            <select
              class="form-select text-center w-13 ms-auto"
              aria-label="Default select example"
              v-model="orderInfo.ship"
            >
              <option value="未出貨">未出貨</option>
              <option value="發貨中">發貨中</option>
              <option value="已發貨">已發貨</option>
            </select>
          </div>
        </div>
        <div class="modal-footer p-0">
          <button
            type="button"
            class="btn btn-primary w-100 fs-4"
            @click="updateOrder"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from "../mixins/modalMixin";

export default {
  props: ["tempOrder"],

  data() {
    return {
      orderInfo: {},
    };
  },
  watch: {
    tempOrder() {
      this.orderInfo = { ...this.tempOrder };
    },
  },
  methods: {
    updateOrder() {
      this.$emit("update-order", this.orderInfo);
    },
  },
  mixins: [modalMixin],
};
</script>
