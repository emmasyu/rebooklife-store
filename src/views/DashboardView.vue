<template><Navbar /></template>

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
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    this.axios.defaults.headers.common.Authorization = token;
    this.checkUser();
  },
};
</script>
