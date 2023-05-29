<template>
  <div class="d-flex">
    <Sidebar />
    <RouterView />
  </div>
</template>

<script>
import Sidebar from "@/components/admin/Sidebar.vue";
import { postUserCheck } from "@/api";

export default {
  components: {
    Sidebar,
  },
  methods: {
    async checkUser() {
      try {
        const response = await postUserCheck();
        if (!response.data.success) {
          this.$router.push("/login");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.checkUser();
  },
};
</script>
