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
    productsAll: [],
    pagination: {},
  }),

  getters: {
    productsCategory() {
      let resultCategory = [];
      Object.values(this.productsAll).forEach((item) => {
        if (!resultCategory.some((category) => category === item.category)) {
          resultCategory.push(item.category);
        }
      });
      return resultCategory;
    },
    productsSubcategory() {
      let resultSubcategory = {};
      Object.values(this.productsAll).forEach((item) => {
        if (resultSubcategory[item.category]) {
          if (
            !resultSubcategory[item.category].some(
              (subcategory) => subcategory === item.subcategory
            )
          ) {
            resultSubcategory[item.category].push(item.subcategory);
          }
        } else {
          resultSubcategory[item.category] = [item.subcategory];
        }
      });
      return resultSubcategory;
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
        useStateStore.changeLoadingState(false);
      } catch (error) {
        console.log(error);
      }
    },
    async getProductsAll() {
      useStateStore.changeLoadingState(true);
      try {
        const response = await getProductsAllObj();
        console.log("getProductsAll", response);
        if (response.data.success) {
          this.productsAll = Object.values(response.data.products);
        }
        useStateStore.changeLoadingState(false);
      } catch (error) {
        console.log(error);
      }
    },
    async postNewProduct(item) {
      useStateStore.changeLoadingState(true);
      item.createTime = new Date().getTime();
      try {
        const response = await postProduct({ data: item });
        console.log("updateProduct", response);
        this.getProductsAll();
      } catch (error) {
        console.log(error);
      }
    },
    async putUpdateProduct(item) {
      useStateStore.changeLoadingState(true);
      try {
        const response = await putProduct(item.id, {
          data: item,
        });
        console.log("updateProduct", response);
        this.getProductsAll();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteOneProduct(item) {
      useStateStore.changeLoadingState(true);
      try {
        const response = await deleteProduct(item.id);
        console.log("deleteProduct", response);
        this.getProductsAll();
      } catch (error) {
        console.log(error);
      }
    },
  },
});
