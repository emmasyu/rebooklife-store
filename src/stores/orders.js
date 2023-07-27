import { guest } from "../api";
import { defineStore } from "pinia";
import stateStore from "./states";

const useStateStore = stateStore();

const { getOrders, getOrder, postOrder, postPay } = guest;

export default defineStore("order", {
  state: () => ({
    orders: [],
    pagination: {},
    order: {},
    orderId: "",
    localOrders: [],
  }),

  actions: {
    async getOrders() {
      useStateStore.changeLoadingState(true);
      try {
        const response = await getOrders((page = 1));
        if (response.data.success) {
          this.orders = response.data.orders;
          this.pagination = response.data.pagination;
        }
      } catch (error) {
        useStateStore.pushToastMessage(
          "獲取訂單失敗，請重新整理再操作或聯絡我們",
          {
            success: false,
          }
        );
      } finally {
        useStateStore.changeLoadingState(false);
      }
    },
    async getOrder(id) {
      useStateStore.changeLoadingState(true);
      try {
        const response = await getOrder(id);
        if (response.data.success) {
          this.order = response.data.order;
        }
      } catch (error) {
        useStateStore.pushToastMessage(
          "獲取訂單失敗，請重新整理再操作或聯絡我們",
          {
            success: false,
          }
        );
      } finally {
        useStateStore.changeLoadingState(false);
      }
    },
    async postOrderInfo(data) {
      useStateStore.changeLoadingState(true);
      try {
        const response = await postOrder({
          data: data,
        });
        if (response.data.success) {
          useStateStore.pushToastMessage("成功：已建立訂單");
          const { orderId, create_at, total } = await response.data;
          this.addLocalOrders(orderId, create_at, total);
        } else {
          useStateStore.pushToastMessage("錯誤：訂單建立失敗", response.data);
        }
      } catch (error) {
        useStateStore.pushToastMessage(
          "建立訂單失敗，請重新整理再操作或聯絡我們",
          {
            success: false,
          }
        );
      } finally {
        useStateStore.changeLoadingState(false);
      }
    },
    async postPayOrder(id) {
      useStateStore.changeLoadingState(true);
      try {
        const response = await postPay(id);
        if (this.order.is_paid) {
          useStateStore.pushToastMessage("錯誤：此筆訂單已付過款", {
            success: false,
          });
        } else if (response.data.success) {
          useStateStore.pushToastMessage("成功：已成功付款");
        } else {
          useStateStore.pushToastMessage("錯誤：付款失敗", response.data);
        }
      } catch (error) {
        useStateStore.pushToastMessage(
          "訂單付款失敗，請重新整理再操作或聯絡我們",
          {
            success: false,
          }
        );
      } finally {
        useStateStore.changeLoadingState(false);
      }
    },
    setLocalOrders() {
      localStorage.setItem("orders", JSON.stringify(this.localOrders));
    },
    getLocalOrders() {
      const ordersJson = localStorage.getItem("orders");
      if (ordersJson) {
        this.localOrders = JSON.parse(ordersJson);
      }
    },
    addLocalOrders(orderId, create_at, total) {
      this.getLocalOrders();
      this.localOrders.push({ orderId, create_at, total });
      this.setLocalOrders();
    },
  },
});
