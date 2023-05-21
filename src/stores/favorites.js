import { defineStore } from "pinia";
import stateStore from "./states";

const useStateStore = stateStore();

export default defineStore("favorites", {
  state: () => ({ favorites: [] }),

  getters: {
    isFavorite() {
      return (id) => {
        return this.favorites?.includes(id);
      };
    },
  },

  actions: {
    getFavorites() {
      const favoritesJson = localStorage.getItem("favorites");
      if (favoritesJson) {
        this.favorites = JSON.parse(favoritesJson);
      }
    },
    setFavorite() {
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
    },
    addFavorite(id) {
      this.favorites?.push(id);
      this.setFavorite();
      useStateStore.pushToastMessage("成功：已加入最愛");
    },
    removeFavorite(id) {
      const index = this.favorites?.indexOf(id);
      this.favorites?.splice(index, 1);
      this.setFavorite();
      useStateStore.pushToastMessage("成功：從最愛移除");
    },
    checkIsFavorite(id) {
      return this.favorites?.includes(id);
    },
    toggleFavorite(id) {
      if (this.checkIsFavorite(id)) {
        this.removeFavorite(id);
      } else {
        this.addFavorite(id);
      }
    },
  },
});
