import { defineStore } from 'pinia';
import stateStore from './states';

const useStateStore = stateStore();

export default defineStore('favorites', {
  state: () => ({ favorites: [] }),

  getters: {
    isFavorite() {
      return (id) => this.favorites?.some((item) => item.id === id);
    },
  },

  actions: {
    getFavorites() {
      const favoritesJson = localStorage.getItem('favorites');
      if (favoritesJson) {
        this.favorites = JSON.parse(favoritesJson);
      }
    },
    setFavorite() {
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    },
    addFavorite(id) {
      this.favorites?.push({ id, stars: null });
      this.setFavorite();
      useStateStore.pushToastMessage('成功：已加入最愛');
    },
    removeFavorite(id) {
      const index = this.favorites?.findIndex((item) => item.id === id);
      this.favorites?.splice(index, 1);
      this.setFavorite();
      useStateStore.pushToastMessage('成功：從最愛移除');
    },
    checkIsFavorite(id) {
      return this.favorites?.some((item) => item.id === id);
    },
    toggleFavorite(id) {
      if (this.checkIsFavorite(id)) {
        this.removeFavorite(id);
      } else {
        this.addFavorite(id);
      }
    },
    giveStars(id, stars) {
      const targetIndex = this.favorites.findIndex((item) => item.id === id);
      this.favorites[targetIndex].stars = stars;
      this.setFavorite();
    },
  },
});
