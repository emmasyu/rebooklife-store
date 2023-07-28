<template>
  <div
    class="transition position-fixed ps-3 py-3 mt-10 pe-4 top-0 w-5 text-gray fs-6 bg-black bg-opacity-75 rounded-start-3 start-100 d-flex align-items-center"
    :class="{ 'show-hint': showHint }"
    style="writing-mode: vertical-rl"
  >
    <button
      type="button"
      class="text-white bg-transparent border-0 d-flex p-0 text-secondary-hover p-2"
      @click="showHint = false"
    >
      <FontAwesomeIcon :icon="['fas', 'xmark']" />
    </button>
    <span class="d-lg-none">≡</span>提示－<RouterLink
      to="/bookstore"
      class="text-white text-secondary-hover"
      >找書 → 前往商城購物</RouterLink
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      showHint: false,
    };
  },
  methods: {
    enterStore() {
      this.$router.push('/bookstore');
    },
  },
  mounted() {
    setTimeout(() => {
      this.showHint = true;
    }, 3000);
  },
};
</script>

<style lang="scss" scoped>
.show-hint {
  transform: translateX(-100%);
}
.float-vertical {
  animation: float-vertical 0.5s ease-in-out infinite alternate;
}
@keyframes float-vertical {
  from {
    transform: translateY(0rem);
  }
  to {
    transform: translateY(-0.5rem);
  }
}
</style>
