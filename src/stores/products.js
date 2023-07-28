import { defineStore } from 'pinia';
import { guest } from '../api';
import stateStore from './states';
import favoritesStore from './favorites';
import recentStore from './recent';

const useStateStore = stateStore();
const useFavoritesStore = favoritesStore();
const useRecentStore = recentStore();

const { getProductsOnPage, getProductsAll, getProduct } = guest;

export default defineStore('product', {
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
        if (!all[curr.category].includes(curr.subcategory)) {
          all[curr.category].push(curr.subcategory);
        }
        return all;
      }, {});
    },
    isNewerProduct() {
      const newerProducts = this.productsAll
        .sort((a, b) => b.createTime - a.createTime)
        .slice(0, 3);
      return (target) => newerProducts.some((book) => book.id === target);
    },
    relatedProducts() {
      return (category) => this.productsAll.filter((item) => item.category === category);
    },
    randomProducts() {
      const copyProductsAll = JSON.parse(JSON.stringify(this.productsAll));
      return copyProductsAll.sort(() => Math.random() - 0.5);
    },
    favoriteProducts() {
      return this.productsAll?.filter((book) => useFavoritesStore.favorites.map((item) => item.id).includes(book.id));
    },
    recentBooks() {
      return useRecentStore.recent.reduce((all, curr) => {
        const currentBook = this.productsAll?.filter(
          (book) => book.id === curr,
        );
        return [...all, ...currentBook];
      }, []);
    },
    productsOfFeatured() {
      return {
        popular: {
          name: '熱門書籍',
          books: this.randomProducts.slice(0, 10),
        },
        recommend: {
          name: '推薦書籍',
          books: this.favoriteProducts,
        },
        recent: {
          name: '最近瀏覽',
          books: this.recentBooks,
        },
      };
    },
  },

  actions: {
    async getProducts(page = 1) {
      useStateStore.changeLoadingState(true);
      try {
        const response = await getProductsOnPage(page);
        if (response.data.success) {
          this.products = response.data.products;
          this.pagination = response.data.pagination;
        }
      } catch (error) {
        useStateStore.pushToastMessage(
          '書籍資料獲取失敗，請重新整理再操作或聯絡我們',
          {
            success: false,
          },
        );
      } finally {
        useStateStore.changeLoadingState(false);
      }
    },
    async getProductsAll() {
      useStateStore.changeLoadingState(true);
      try {
        const response = await getProductsAll();
        if (response.data.success) {
          this.productsAll = response.data.products;
        }
      } catch (error) {
        useStateStore.pushToastMessage(
          '書籍資料獲取失敗，請重新整理再操作或聯絡我們',
          {
            success: false,
          },
        );
      } finally {
        useStateStore.changeLoadingState(false);
      }
    },
    async getProduct(id) {
      useStateStore.changeLoadingState(true);
      try {
        const response = await getProduct(id);
        if (response.data.success) {
          this.product = response.data.product;
        }
      } catch (error) {
        useStateStore.pushToastMessage(
          '書籍資料獲取失敗，請重新整理再操作或聯絡我們',
          {
            success: false,
          },
        );
      } finally {
        useStateStore.changeLoadingState(false);
      }
    },
  },
});
