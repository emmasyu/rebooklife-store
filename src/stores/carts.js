import { guest } from "../api";
import { defineStore } from "pinia";
import stateStore from "./states";

const useStateStore = stateStore();

const { getCarts, postCart, putCart, deleteCart, deleteAllCarts, postCoupon } =
  guest;

export default defineStore("cart", {
  state: () => ({ carts: {} }),

  getters: {
    cartsTotalQty() {
      return this.carts?.carts?.length;
    },
  },

  actions: {
    async getCarts() {
      useStateStore.changeLoadingState(true);
      try {
        const response = await getCarts();
        if (response.data.success) {
          this.carts = response.data.data;
        }
      } catch (error) {
        console.log(error);
      }
      useStateStore.changeLoadingState(false);
    },
    async addCart(data) {
      useStateStore.changeLoadingState(true);
      try {
        const response = await postCart({ data: data });
        if (response.data.success) {
          useStateStore.pushToastMessage("成功：已新增產品到購物車");
          await this.getCarts();
        } else {
          useStateStore.pushToastMessage("錯誤：新增產品失敗", response.data);
        }
      } catch (error) {
        console.log(error);
      }
      useStateStore.changeLoadingState(false);
    },
    async updateCart(id, data) {
      useStateStore.changeLoadingState(true);
      try {
        const response = await putCart(id, {
          data: data,
        });
        if (response.data.success) {
          useStateStore.pushToastMessage("成功：已更新購物車產品");
          await this.getCarts();
        } else {
          useStateStore.pushToastMessage("錯誤：更新產品失敗", response.data);
        }
      } catch (error) {
        console.log(error);
      }
      useStateStore.changeLoadingState(false);
    },
    async deleteCart(id) {
      useStateStore.changeLoadingState(true);
      try {
        const response = await deleteCart(id);
        if (response.data.success) {
          useStateStore.pushToastMessage("成功：已刪除購物車產品");
          await this.getCarts();
        } else {
          useStateStore.pushToastMessage("錯誤：刪除產品失敗", response.data);
        }
      } catch (error) {
        console.log(error);
      }
      useStateStore.changeLoadingState(false);
    },
    async deleteAllCarts() {
      useStateStore.changeLoadingState(true);
      try {
        const response = await deleteAllCarts();
        if (response.data.success) {
          useStateStore.pushToastMessage("成功：已清空購物車");
          await this.getCarts();
        } else {
          useStateStore.pushToastMessage("錯誤：清空購物車失敗", response.data);
        }
      } catch (error) {
        console.log(error);
      }
      useStateStore.changeLoadingState(false);
    },
    async postUseCoupon(data) {
      useStateStore.changeLoadingState(true);
      try {
        const response = await postCoupon({ data: data });
        if (response.data.success) {
          useStateStore.pushToastMessage("成功：已套用優惠券");
          await this.getCarts();
        } else {
          useStateStore.pushToastMessage("錯誤：套用優惠券失敗", response.data);
        }
      } catch (error) {
        console.log(error);
      }
      useStateStore.changeLoadingState(false);
    },
  },
});
