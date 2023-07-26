<template>
  <div class="d-flex">
    <DashboardSidebar />
    <RouterView />
  </div>
</template>

<script>
import DashboardSidebar from "@/components/admin/DashboardSidebar.vue";
import { postUserCheck } from "@/api";
import { mapActions } from "pinia";
import useStateStore from "@/stores/states.js";

export default {
  components: {
    DashboardSidebar,
  },
  methods: {
    ...mapActions(useStateStore, ["pushToastMessage"]),
    async checkUser() {
      try {
        const response = await postUserCheck();
        if (!response.data.success) {
          this.$router.push("/login");
        }
      } catch (error) {
        this.pushToastMessage(
          `身分驗證功能異常, 請重新整理後再進行操作，或連繫網站維護人員處理`,
          {
            success: false,
          }
        );
      }
    },
  },
  created() {
    this.checkUser();
  },
};
</script>
