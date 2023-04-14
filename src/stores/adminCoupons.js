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
      return this.coupons.reduce(
        (all, curr) =>
          !all.includes(curr.category) ? [...all, curr.category] : all,
        []
      );
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
      } catch (error) {
        console.log(error);
      }
      useStateStore.changeLoadingState(false);
    },
    async postNewCoupon(item) {
      useStateStore.changeLoadingState(true);
      item.createTime = new Date().getTime();
      try {
        const response = await postCoupon({ data: item });
        console.log("updateCoupon", response);
        await this.getCoupons();
      } catch (error) {
        console.log(error);
      }
      useStateStore.changeLoadingState(false);
    },
    async putUpdateCoupon(item) {
      useStateStore.changeLoadingState(true);
      try {
        const response = await putCoupon(item.id, {
          data: item,
        });
        console.log("updateCoupon", response);
        await this.getCoupons();
      } catch (error) {
        console.log(error);
      }
      useStateStore.changeLoadingState(false);
    },
    async deleteOneCoupon(item) {
      useStateStore.changeLoadingState(true);
      try {
        const response = await deleteCoupon(item.id);
        console.log("deleteCoupon", response);
        await this.getCoupons();
      } catch (error) {
        console.log(error);
      }
      useStateStore.changeLoadingState(false);
    },
  },
});
