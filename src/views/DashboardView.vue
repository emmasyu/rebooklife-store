<template>
  <div class="d-flex">
    <Navbar />
    <RouterView />
  </div>
</template>

<script>
import { mapActions } from "pinia";
import userApi from "../stores/userApi";
import Navbar from "../components/Navbar.vue";

export default {
  components: {
    Navbar,
  },
  methods: {
    ...mapActions(userApi, ["checkUser"]),
  },
  created() {
    this.checkUser();
  },
};
</script>
