import { adminRequest } from "../api/configs.js";
import { defineStore } from "pinia";

export default defineStore("Admin Api", {
  state: () => ({
    getProductsOnPage: (data) =>
      adminRequest.get(`/admin/products?page=${data}`),
    getProductsAll: () => adminRequest.get("/admin/products/all"),

    products: [],
  }),

  actions: {
    async getProducts(page = 1) {
      try {
        const response = await this.getProductsOnPage(page);
        if (response.data.success) {
          this.products = response.data.products;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getProductsAll() {
      try {
        const response = await this.getProductsAll();
        if (response.data.success) {
          this.products = response.data.products;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
