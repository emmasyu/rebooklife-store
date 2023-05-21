import { guest } from "../api";
import { defineStore } from "pinia";
import stateStore from "./states";

const useStateStore = stateStore();

const { getProductsOnPage, getProductsAll, getProduct } = guest;

export default defineStore("product", {
  state: () => ({
    product: {},
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
        if (!all[curr.category].includes(curr.subcategory))
          all[curr.category].push(curr.subcategory);
        return all;
      }, {});
    },
    isNewerProduct() {
      const newerProducts = this.productsAll
        .sort((a, b) => b.createTime - a.createTime)
        .slice(0, 3);
      return (target) => {
        return newerProducts.some((book) => book.id === target);
      };
    },
    relatedProducts() {
      return (category) => {
        return this.productsAll.filter((item) => item.category === category);
      };
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
        const response = await getProductsAll();
        console.log("getProductsAll", response);
        if (response.data.success) {
          this.productsAll = response.data.products;
        }
      } catch (error) {
        console.log(error);
      }
      useStateStore.changeLoadingState(false);
    },
    async getProduct(id) {
      useStateStore.changeLoadingState(true);
      try {
        const response = await getProduct(id);
        console.log("getProduct", response);
        if (response.data.success) {
          this.product = response.data.product;
        }
      } catch (error) {
        console.log(error);
      }
      useStateStore.changeLoadingState(false);
    },
  },
});
