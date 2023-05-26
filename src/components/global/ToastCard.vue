<template>
  <div
    class="toast"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
    ref="toast"
    style="transform: rotate(180deg)"
  >
    <div class="toast-header" :class="`text-bg-${msg.style}`">
      <strong class="me-auto">{{ msg.title }}</strong>
      <button
        type="button"
        class="btn-close"
        data-bs-theme="dark"
        data-bs-dismiss="toast"
        aria-label="Close"
        style="filter: invert(1) grayscale(1) brightness(2)"
      ></button>
    </div>
    <div class="toast-body" v-if="msg.content">
      <p v-if="typeof msg.content === 'object'" v-for="content in msg.content">
        {{ "‧ " + content }}
      </p>
      <p v-else>
        {{ msg.content }}
      </p>
    </div>
  </div>
</template>

<script>
import Toast from "bootstrap/js/dist/toast";

export default {
  name: "ToastCard",
  props: ["msg"],
  mounted() {
    const toastEl = this.$refs.toast;
    const toast = new Toast(toastEl, {
      delay: 3500,
    });
    toast.show();
  },
};
</script>
