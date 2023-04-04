import { defineStore } from "pinia";

export default defineStore("states", {
  state: () => ({
    isLoading: false,
  }),
  actions: {
    changeLoadingState(state) {
      if (state === true) {
        console.log("changeLoadingState", "true");
        this.isLoading = true;
      } else {
        this.isLoading = false;
        console.log("changeLoadingState", "false");
      }
    },
  },
});
