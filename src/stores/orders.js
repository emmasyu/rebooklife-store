import { guest } from "../api";
import router from "@/router";
import { defineStore } from "pinia";
import stateStore from "./states";

const useStateStore = stateStore();

const { getOrders, getOrder, postOrder, postPay } = guest;

export default defineStore("order", {
  state: () => ({
    orders: [],
    pagination: {},
    order: {},
    userForm: {},
    userFormValidate: {},
  }),

  getters: {
    checkFormValidate() {
      console.log("isread", this.userForm?.read);
      console.log("userForm", this.userForm);
      console.log("FormValidate", this.userFormValidate);
      console.log("iserror", Object.values(this.userFormValidate ?? {}));
      return (
        Object.values(this.userFormValidate ?? {}).length === 0 &&
        this.userForm?.read === "checked"
      );
    },
  },

  actions: {
    async getOrders() {
      useStateStore.changeLoadingState(true);
      try {
        const response = await getOrders((page = 1));
        console.log("getOrders", response);
        if (response.data.success) {
          this.orders = response.data.orders;
          this.pagination = response.data.pagination;
        }
      } catch (error) {
        console.log(error);
      }
      useStateStore.changeLoadingState(false);
    },
    async getOrder(id) {
      useStateStore.changeLoadingState(true);
      try {
        const response = await getOrder(id);
        console.log("getOrder", response);
        if (response.data.success) {
          this.order = response.data.order;
        }
      } catch (error) {
        console.log(error);
      }
      useStateStore.changeLoadingState(false);
    },
    async postOrderInfo(data) {
      useStateStore.changeLoadingState(true);
      try {
        const response = await postOrder({
          data: data,
        });
        console.log("postOrderInfo", response);
        if (response.data.success) {
          useStateStore.pushToastMessage("成功：已建立訂單");
          router.push(`/bookstore/cart/orderPay/${response.data.orderId}`);
        } else {
          useStateStore.pushToastMessage("錯誤：訂單建立失敗", response.data);
        }
      } catch (error) {
        console.log(error);
      }
      useStateStore.changeLoadingState(false);
    },
    async postPayOrder(id) {
      useStateStore.changeLoadingState(true);
      try {
        const response = await postPay(id);
        console.log("postPayOrder", response);
        if (response.data.success) {
          useStateStore.pushToastMessage("成功：已成功付款");
        } else {
          useStateStore.pushToastMessage("錯誤：付款失敗", response.data);
        }
      } catch (error) {
        console.log(error);
      }
      useStateStore.changeLoadingState(false);
    },
    getUserForm(data, error) {
      this.userForm = { ...data };
      this.userFormValidate = { ...error };
    },
  },
});
