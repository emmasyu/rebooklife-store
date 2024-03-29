import { defineStore } from 'pinia';
import { admin } from '../api';
import stateStore from './states';

const useStateStore = stateStore();

const {
  getProductsOnPage,
  getProductsAllObj,
  postProduct,
  putProduct,
  deleteProduct,
} = admin;

export default defineStore('admin product', {
  state: () => ({
    products: [],
    pagination: {},
    productsAll: [],
  }),

  getters: {
    productsCategory() {
      return this.productsAll.reduce((all, curr) => {
        if (!all[curr.category]) {
          all[curr.category] = [curr.subcategory];
        }
        if (!all[curr.category].includes(curr.subcategory)) {
          all[curr.category].push(curr.subcategory);
        }
        return all;
      }, {});
    },
  },

  actions: {
    async getProducts(page = 1) {
      useStateStore.changeLoadingState(true);
      try {
        const response = await getProductsOnPage(page);
        if (response.data.success) {
          this.products = response.data.products;
          this.pagination = response.data.pagination;
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
    async getProductsAll() {
      useStateStore.changeLoadingState(true);
      try {
        const response = await getProductsAllObj();
        if (response.data.success) {
          this.productsAll = Object.values(response.data.products);
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
    async postNewProduct(item) {
      useStateStore.changeLoadingState(true);
      const newProduct = item;
      newProduct.createTime = new Date().getTime();
      try {
        const response = await postProduct({ data: newProduct });
        if (response.data.success) {
          useStateStore.pushToastMessage('成功：已新增產品');
          await this.getProductsAll();
        } else {
          useStateStore.pushToastMessage('錯誤：新增產品失敗', response.data);
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
    async putUpdateProduct(item) {
      useStateStore.changeLoadingState(true);
      try {
        const response = await putProduct(item.id, {
          data: item,
        });
        if (response.data.success) {
          useStateStore.pushToastMessage('成功：已更新產品');
          await this.getProductsAll();
        } else {
          useStateStore.pushToastMessage('錯誤：更新產品失敗', response.data);
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
    async deleteOneProduct(item) {
      useStateStore.changeLoadingState(true);
      try {
        const response = await deleteProduct(item.id);
        if (response.data.success) {
          useStateStore.pushToastMessage('成功：已刪除產品');

          await this.getProductsAll();
        } else {
          useStateStore.pushToastMessage('錯誤：刪除產品失敗', response.data);
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
