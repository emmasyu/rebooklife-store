import { admin } from "../api";
import { defineStore } from "pinia";
import stateStore from "./states";

const useStateStore = stateStore();

const { getCouponsOnPage, postCoupon, putCoupon, deleteCoupon } = admin;

export default defineStore("admin coupon", {
  state: () => ({
    coupons: [],
    pagination: {},
  }),

  getters: {
    couponsCategory() {
      let resultCategory = [];
      this.coupons.forEach((item) => {
        if (!resultCategory.some((category) => category === item.category)) {
          resultCategory.push(item.category);
        }
      });
      return resultCategory;
    },
  },

  actions: {
    async getCoupons(page = 1) {
      useStateStore.changeLoadingState(true);
      try {
        const response = await getCouponsOnPage(page);
        console.log("getCoupons", response);
        if (response.data.success) {
          this.coupons = response.data.coupons;
          this.pagination = response.data.pagination;
        }
        useStateStore.changeLoadingState(false);
      } catch (error) {
        console.log(error);
      }
    },
    async postNewCoupon(item) {
      useStateStore.changeLoadingState(true);
      item.createTime = new Date().getTime();
      try {
        const response = await postCoupon({ data: item });
        console.log("updateCoupon", response);
        this.getCoupons();
      } catch (error) {
        console.log(error);
      }
    },
    async putUpdateCoupon(item) {
      useStateStore.changeLoadingState(true);
      try {
        const response = await putCoupon(item.id, {
          data: item,
        });
        console.log("updateCoupon", response);
        this.getCoupons();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteOneCoupon(item) {
      useStateStore.changeLoadingState(true);
      try {
        const response = await deleteCoupon(item.id);
        console.log("deleteCoupon", response);
        this.getCoupons();
      } catch (error) {
        console.log(error);
      }
    },
  },
});
