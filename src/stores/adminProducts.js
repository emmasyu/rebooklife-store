import { admin } from "../api";
import { defineStore } from "pinia";
import stateStore from "./states";

const useStateStore = stateStore();

const {
  getProductsOnPage,
  getProductsAllObj,
  postProduct,
  putProduct,
  deleteProduct,
} = admin;

export default defineStore("admin product", {
  state: () => ({
    products: [],
    pagination: {},
    productsAll: [],
  }),

  getters: {
    productsCategory() {
      return this.productsAll.reduce((all, curr) => {
        if (all[curr.category]) {
          if (!all[curr.category].includes(curr.subcategory))
            all[curr.category].push(curr.subcategory);
        } else {
          all[curr.category] = [curr.subcategory];
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
        console.log("getProducts", response);
        if (response.data.success) {
          this.products = response.data.products;
          this.pagination = response.data.pagination;
        }
      } catch (error) {
        console.log(error);
      }
      useStateStore.changeLoadingState(false);
    },
    async getProductsAll() {
      useStateStore.changeLoadingState(true);
      try {
        const response = await getProductsAllObj();
        console.log("getProductsAll", response);
        if (response.data.success) {
          this.productsAll = Object.values(response.data.products);
        }
      } catch (error) {
        console.log(error);
      }
      useStateStore.changeLoadingState(false);
    },
    async postNewProduct(item) {
      useStateStore.changeLoadingState(true);
      item.createTime = new Date().getTime();
      try {
        const response = await postProduct({ data: item });
        console.log("updateProduct", response);
        await this.getProductsAll();
      } catch (error) {
        console.log(error);
      }
      useStateStore.changeLoadingState(false);
    },
    async putUpdateProduct(item) {
      useStateStore.changeLoadingState(true);
      try {
        const response = await putProduct(item.id, {
          data: item,
        });
        console.log("updateProduct", response);
        await this.getProductsAll();
      } catch (error) {
        console.log(error);
      }
      useStateStore.changeLoadingState(false);
    },
    async deleteOneProduct(item) {
      useStateStore.changeLoadingState(true);
      try {
        const response = await deleteProduct(item.id);
        console.log("deleteProduct", response);
        await this.getProductsAll();
      } catch (error) {
        console.log(error);
      }
      useStateStore.changeLoadingState(false);
    },
  },
});
