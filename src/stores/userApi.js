import { userRequest, authToken } from "../api/configs.js";
import { defineStore } from "pinia";
import router from "../router";

export default defineStore("User Api", {
  state: () => ({
    postUserLogin: (data) => userRequest.post("admin/signin", data),
    postUserLogout: () => userRequest.post("logout"),
    postUserCheck: () => userRequest.post("api/user/check"),
  }),

  actions: {
    async login(user) {
      try {
        const response = await this.postUserLogin(user);
        if (response.data.success) {
          const { token, expired } = response.data;
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
          router.push("/dashboard/products");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async checkUser() {
      try {
        const response = await this.postUserCheck();
        if (!response.data.success) {
          router.push("/login");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async logout() {
      try {
        const response = await this.postUserLogout();
        if (response.data.success) {
          router.push("/login");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
