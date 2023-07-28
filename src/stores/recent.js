import { defineStore } from 'pinia';

export default defineStore('recent', {
  state: () => ({ recent: [] }),

  actions: {
    getRecent() {
      const recentJson = localStorage.getItem('recent');
      if (recentJson) {
        this.recent = JSON.parse(recentJson);
      }
    },
    setRecent() {
      localStorage.setItem('recent', JSON.stringify(this.recent));
    },
    addRecent(id) {
      if (this.recent?.includes(id)) {
        this.recent.splice(this.recent.indexOf(id), 1);
      }
      this.recent?.unshift(id);
      if (this.recent?.length >= 10) {
        this.recent?.splice(10);
      }
      this.setRecent();
    },
  },
});
