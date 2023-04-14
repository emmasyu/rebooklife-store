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
        console.log("getOrders", response);
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
        console.log("updateOrder", response);
        await this.getOrders();
      } catch (error) {
        console.log(error);
      }
      useStateStore.changeLoadingState(false);
    },
    async deleteOneOrder(item) {
      useStateStore.changeLoadingState(true);
      try {
        const response = await deleteOrder(item.id);
        console.log("deleteOrder", response);
        await this.getOrders();
      } catch (error) {
        console.log(error);
      }
      useStateStore.changeLoadingState(false);
    },
    async deleteAllPayOrders() {
      useStateStore.changeLoadingState(true);
      try {
        const response = await deleteAllOrders();
        console.log("deleteAllOrders", response);
        await this.getOrders();
      } catch (error) {
        console.log(error);
      }
      useStateStore.changeLoadingState(false);
    },
  },
});
