import { defineStore } from "pinia";

export default defineStore("scroll state", {
  state: () => ({
    blockTopY: { home: 0, about: 0, faq: 0, contact: 0 },
  }),
  actions: {
    getContentTop(target) {
      Array.from(target?.children).forEach((e) => {
        this.blockTopY[e.id] = e.getBoundingClientRect().y;
      });
    },
  },
});
