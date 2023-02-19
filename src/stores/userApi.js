import { api } from "../api/configs.js";
import { defineStore } from "pinia";
import axios from "axios";
import router from "../router";

export default defineStore("User Api", {
  state: () => ({
    account(item) {
      if (item == "login") {
        return `${api}admin/signin`;
      }
      if (item == "logout") {
        return `${api}logout`;
      }
      if (item == "userCheck") {
        return `${api}api/user/check`;
      }
    },
  }),

  actions: {
    login(user) {
      const api = this.account("login");
      axios.post(api, user).then((res) => {
        const { token, expired } = res.data;
        console.log(res.data);
        document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
        console.log(router);
        router.push({ name: "dashboard" });
      });
    },
  },
});
