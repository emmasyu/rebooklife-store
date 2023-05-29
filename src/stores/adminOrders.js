import { admin } from "../api";
import { defineStore } from "pinia";
import stateStore from "./states";

const useStateStore = stateStore();

const { getOrdersOnPage, putOrder, deleteOrder, deleteAllOrders } = admin;

export default defineStore("admin order", {
  state: () => ({
    orders: [],
    pagination: {},
  }),

  actions: {
    async getOrders(page = 1) {
      useStateStore.changeLoadingState(true);
      try {
        const response = await getOrdersOnPage(page);
        if (response.data.success) {
          this.pagination = response.data.pagination;
          this.orders = response.data.orders.map((order) => {
            order.totalQty = Object.values(order.products).reduce(
              (all, curr) => all + curr.qty,
              0
            );
            return order;
          });
        }
      } catch (error) {
        console.log(error);
      }
      useStateStore.changeLoadingState(false);
    },
    async putUpdateOrder(item) {
      useStateStore.changeLoadingState(true);
      try {
        const response = await putOrder(item.id, {
          data: item,
        });
        if (response.data.success) {
          useStateStore.pushToastMessage("成功：已更新訂單狀態");
          await this.getOrders();
        } else {
          useStateStore.pushToastMessage(
            "錯誤：更新訂單狀態失敗",
            response.data
          );
        }
      } catch (error) {
        console.log(error);
      }
      useStateStore.changeLoadingState(false);
    },
    async deleteOneOrder(item) {
      useStateStore.changeLoadingState(true);
      try {
        const response = await deleteOrder(item.id);
        if (response.data.success) {
          useStateStore.pushToastMessage("成功：已刪除訂單");
          await this.getOrders();
        } else {
          useStateStore.pushToastMessage("錯誤：刪除訂單失敗", response.data);
        }
      } catch (error) {
        console.log(error);
      }
      useStateStore.changeLoadingState(false);
    },
    async deleteAllPayOrders() {
      useStateStore.changeLoadingState(true);
      try {
        const response = await deleteAllOrders();
        if (response.data.success) {
          useStateStore.pushToastMessage("成功：已刪除全部訂單");
          await this.getOrders();
        } else {
          useStateStore.pushToastMessage(
            "錯誤：刪除全部訂單失敗",
            response.data
          );
        }
      } catch (error) {
        console.log(error);
      }
      useStateStore.changeLoadingState(false);
    },
  },
});
