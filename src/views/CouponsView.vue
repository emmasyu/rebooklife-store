<template>
  <LoadingOverlay />
  <div class="w-100 p-8">
    <div class="d-flex justify-content-end align-items-center mb-7">
      <p>
        <a
          @click.prevent="openCouponModal(true)"
          class="btn btn-outline-primary"
          href="/coupons"
          >+ 新增優惠券</a
        >
      </p>
    </div>
    <div
      class="px-7 py-2 mb-8 overflow-auto border-dashed"
      style="height: 640px"
    >
      <table class="table table-hover">
        <thead class="text-primary fs-4 text-center">
          <tr>
            <th class="w-7">啟用</th>
            <th class="w-10">期限</th>
            <th>優惠活動</th>
            <th class="w-10">折扣</th>
            <th class="w-10">折扣碼</th>
            <th class="w-7">編輯</th>
          </tr>
        </thead>
        <tbody class="text-primary fs-5">
          <tr v-for="item in coupons" :key="item.id">
            <td class="text-center">
              <input
                class="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
                :checked="item.is_enabled === 1"
                disabled
              />
            </td>
            <td>{{ convertTimeToLocaleDate(item.due_date) }}</td>
            <td>{{ item.title }} {{ item.notes ? `/ ${item.notes}` : "" }}</td>
            <td class="text-center">{{ item.percent }}%</td>
            <td class="text-center">{{ item.code }}</td>
            <td class="text-center">
              <font-awesome-icon
                icon="fa-solid fa-pen-to-square"
                class="me-3"
                style="cursor: pointer"
                @click.prevent="openCouponModal(false, item)"
              />
              <font-awesome-icon
                icon="fa-solid fa-trash"
                style="cursor: pointer"
                @click.prevent="openDeleteCouponModal(item)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination :pages="pagination" @emit-pages="switchPage" />
  </div>

  <CouponModal
    ref="couponModal"
    :temp-coupon="tempCoupon"
    :couponsCategory="couponsCategory"
    :isNewCoupon="isNewCoupon"
    @update-coupon="updateCoupon"
  />
  <DeleteModal
    ref="deleteModal"
    :temp-coupon="tempCoupon"
    @del-item="deleteCoupon"
  />
</template>

<script>
import { mapState, mapActions } from "pinia";
import useAdminCouponsStore from "../stores/adminCoupons.js";
import CouponModal from "../components/CouponModal.vue";
import DeleteModal from "../components/DeleteModal.vue";
import Pagination from "@/components/Pagination.vue";
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import { convertTimeToLocaleDate } from "../filters/date.js";

export default {
  components: {
    CouponModal,
    DeleteModal,
    Pagination,
    LoadingOverlay,
  },
  data() {
    return {
      tempCoupon: {},
      isNewCoupon: false,
    };
  },
  computed: {
    ...mapState(useAdminCouponsStore, [
      "coupons",
      "pagination",
      "couponsCategory",
    ]),
  },
  watch: {},
  methods: {
    ...mapActions(useAdminCouponsStore, [
      "getCoupons",
      "postNewCoupon",
      "putUpdateCoupon",
      "deleteOneCoupon",
    ]),
    convertTimeToLocaleDate,
    openCouponModal(isNewCoupon, item) {
      if (isNewCoupon) {
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000,
        };
      } else {
        this.tempCoupon = { ...item };
      }
      this.isNewCoupon = isNewCoupon;
      this.$refs.couponModal.showModal();
    },
    openDeleteCouponModal(item) {
      this.tempCoupon = item;
      this.$refs.deleteModal.showModal();
    },
    async updateCoupon(item) {
      if (this.isNewCoupon) {
        await this.postNewCoupon(item);
      } else {
        await this.putUpdateCoupon(item);
      }
      this.$refs.couponModal.hideModal();
    },
    async deleteCoupon() {
      await this.deleteOneCoupon(this.tempCoupon);
      this.$refs.deleteModal.hideModal();
    },
    switchPage(page) {
      this.getCoupons(page);
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>

<style scoped>
.border-dashed {
  border: 1px;
  border-style: dashed;
  border-radius: 30px;
}
</style>
