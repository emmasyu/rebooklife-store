import { api, path } from "../api/configs.js";
import { defineStore } from "pinia";
import axios from "axios";

export default defineStore("Admin Api", {
  state: () => ({
    product(item) {
      if (item == "getProducts") {
        return `${api}api/${path}/admin/products`;
      }
      if (item == "updateProduct") {
        return `${api}api/${path}/admin/product`;
      }
    },
    products: [],
  }),

  actions: {
    getProducts(page = 1) {
      const api = `${this.product("getProducts")}?page=${page}`;
      axios
        .get(api)
        .then((res) => {
          console.log(res.data.products);
          if (res.data.success) {
            this.products = res.data.products;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getProductsAll() {
      const api = `${this.product("getProducts")}/all`;
      axios
        .get(api)
        .then((res) => {
          console.log(res.data.products);
          if (res.data.success) {
            this.products = res.data.products;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
});
