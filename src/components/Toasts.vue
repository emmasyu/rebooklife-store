<template>
  <div
    class="toast-container position-absolute p-3 bottom-0 end-0"
    style="transform: rotate(180deg)"
  >
    <ToastCard v-for="(msg, key) in toastMessage" :key="key" :msg="msg" />
  </div>
</template>

<script>
import ToastCard from "@/components/ToastCard.vue";
import { mapState } from "pinia";
import useStateStore from "../stores/states.js";

export default {
  components: { ToastCard },
  data() {
    return {};
  },
  computed: {
    ...mapState(useStateStore, ["toastMessage"]),
  },
};
</script>
