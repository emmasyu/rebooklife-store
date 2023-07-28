<template>
  <teleport to="body">
    <div
      v-if="isLoading"
      class="bg-black text-light p-2 fixed-top w-100 h-100 d-flex justify-content-center align-items-center bg-opacity-50"
      style="z-index: 1060"
    >
      <div class="bounce">
        <span
          v-for="(letter, index) in bounceLetterArray"
          :key="index"
          class="bounce-letter"
          :style="`animation-delay: ${index * 0.1}s`"
          >{{ letter }}</span
        >
      </div>
    </div>
  </teleport>
</template>

<script>
import { mapState } from 'pinia';
import useStateStore from '@/stores/states';

export default {
  computed: {
    ...mapState(useStateStore, ['isLoading', 'loadingBounceLetter']),
    bounceLetterArray() {
      return this.loadingBounceLetter.split('');
    },
  },
};
</script>

<style>
.bounce-letter {
  animation: bounce 0.7s infinite alternate;
  transform: translateY(0);
  display: inline-block;
}

@keyframes bounce {
  0% {
    transform: translateY(0);
    text-shadow: rgba(255, 255, 255, 0.4) 0 1.5em 0.35em;
  }
  100% {
    transform: translateY(0.5rem);
    text-shadow: rgba(255, 255, 255, 0.4) 0 0.5em 0.35em;
  }
}
</style>
