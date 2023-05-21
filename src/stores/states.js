import { defineStore } from "pinia";

export default defineStore("states", {
  state: () => ({
    isLoading: false,
    loadingBounceLetter: "",
    toastMessage: [],
    isSearch: false,
  }),
  actions: {
    changeLoadingState(state, letter = "資料讀取中") {
      if (state === true) {
        console.log("changeLoadingState", "true");
        this.loadingBounceLetter = letter + "，請稍後...";
        this.isLoading = true;
      } else {
        this.isLoading = false;
        console.log("changeLoadingState", "false");
      }
    },
    pushToastMessage(title, data = { success: true }) {
      this.toastMessage.push({
        title,
        style: data.success ? "success" : "danger",
        content: data.message,
      });
    },
    toggleSearchInput() {
      this.isSearch = !this.isSearch;
    },
  },
});
