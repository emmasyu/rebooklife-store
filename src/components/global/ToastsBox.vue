<template>
  <div
    class="toast-container fixed-bottom w-100 pt-9 px-3 pt-lg-3 end-0"
    style="transform: rotate(180deg); z-index: 1060"
  >
    <ToastCard v-for="(msg, key) in toastMessage" :key="key" :msg="msg" />
  </div>
</template>

<script>
import { mapState } from 'pinia';
import useStateStore from '@/stores/states';
import ToastCard from './ToastCard.vue';

export default {
  components: { ToastCard },
  computed: {
    ...mapState(useStateStore, ['toastMessage']),
  },
};
</script>
