import { defineStore } from 'pinia';
import { admin } from '../api';
import stateStore from './states';
import orderStore from './orders';

const useStateStore = stateStore();
const useOrderStore = orderStore();

const {
  getOrdersOnPage, putOrder, deleteOrder, deleteAllOrders,
} = admin;

export default defineStore('admin order', {
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
              0,
            );
            return order;
          });
        }
      } catch (error) {
        useStateStore.pushToastMessage(
          '資料獲取失敗，請重新整理再操作或通知系統維護人員',
          {
            success: false,
          },
        );
      } finally {
        useStateStore.changeLoadingState(false);
      }
    },
    async putUpdateOrder(item) {
      useStateStore.changeLoadingState(true);
      try {
        const response = await putOrder(item.id, {
          data: item,
        });
        if (response.data.success) {
          useStateStore.pushToastMessage('成功：已更新訂單狀態');
          await this.getOrders();
        } else {
          useStateStore.pushToastMessage(
            '錯誤：更新訂單狀態失敗',
            response.data,
          );
        }
      } catch (error) {
        useStateStore.pushToastMessage(
          '資料更新失敗，請重新整理再操作或通知系統維護人員',
          {
            success: false,
          },
        );
      } finally {
        useStateStore.changeLoadingState(false);
      }
    },
    async deleteOneOrder(item) {
      useStateStore.changeLoadingState(true);
      try {
        const response = await deleteOrder(item.id);
        if (response.data.success) {
          useStateStore.pushToastMessage('成功：已刪除訂單');
          await this.getOrders();
        } else {
          useStateStore.pushToastMessage('錯誤：刪除訂單失敗', response.data);
        }
      } catch (error) {
        useStateStore.pushToastMessage(
          '資料刪除失敗，請重新整理再操作或通知系統維護人員',
          {
            success: false,
          },
        );
      } finally {
        useStateStore.changeLoadingState(false);
      }
    },
    async deleteAllPayOrders() {
      useStateStore.changeLoadingState(true);
      try {
        const response = await deleteAllOrders();
        if (response.data.success) {
          useOrderStore.deleteLocalOrders('all');
          useStateStore.pushToastMessage('成功：已刪除全部訂單');
          await this.getOrders();
        } else {
          useStateStore.pushToastMessage(
            '錯誤：刪除全部訂單失敗',
            response.data,
          );
        }
      } catch (error) {
        useStateStore.pushToastMessage(
          '資料刪除失敗，請重新整理再操作或通知系統維護人員',
          {
            success: false,
          },
        );
      } finally {
        useStateStore.changeLoadingState(false);
      }
    },
  },
});
