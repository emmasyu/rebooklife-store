import { guest } from "../api";
import { defineStore } from "pinia";
import stateStore from "./states";

const useStateStore = stateStore();

const { getOrders, getOrder, postOrder, postPay } = guest;

export default defineStore("order", {
  state: () => ({ orders: [], pagination: {}, order: {}, userForm: {} }),

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
          this.$router.push(`/bookstore/orderPay/${response.data.orderId}`);
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
    updatedUserForm(data) {
      this.userForm = { ...data };
    },
  },
});
